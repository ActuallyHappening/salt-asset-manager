import { combineSignedTransactions, combineSignedTransactionsWithoutLambda, createRandomMessage, createSeed, formTransaction, getMasterPublicKey, parseTransaction, preRegister, registerStepOne, registerStepTwo, registerStepThree, reshareSignTransaction, reshareStepByOriginalGroup, reshareStepOneByNewUser, reshareStepThree, reshareStepTwo, signTransaction, signTransactionWithoutLambda, getPolybaseKey, } from "./cryptography";
import { createVault, preRegisterStep, proposeTransaction, userCompleteVault, userConfirmTx, registerUserAll, registerUserAllReshare, } from "./web3/signerfunctions";
import { getFilteredUserInitializedLogs, getFilteredUserInitializedLogsSingle, getFilteredUserInitializedLogsSingleWithDeoa, _getProposal, _getTransaction, _getTransactions, _getTransactionLean, getVault, } from "./web3/providerfunctions";
import { getUserPreRegisterInfos, getUserSignature, getUtilsParams, getUserRegistrationAllInfos, getRegistrationStep3InfosDB, getRegistrationReshareStep3InfosDB, } from "./web3/utils";
import { ethers } from "ethers";
import { hexToBytes } from "@noble/hashes/utils";
import ws from "ws";
import { finalizeEvent, getPublicKey } from "nostr-tools/pure";
import { Relay } from "nostr-tools/relay";
import { SimplePool } from "nostr-tools";
import { parseEther } from "viem";
import { createViemClientForTransaction, getVaultContract, } from "./web3/helper";
import { getProviderForChain } from "../constants";
if (typeof window === "undefined") {
    global.WebSocket = ws;
}
//export { getRegistrationStatus, getReSharingStatus } from "./web3/index";
export async function createIntuAccount(addressList, vaultName, rotationThreshold, transactionThreshold, adminThreshold, signer, returnHash = false) {
    //if (addressList.length > 3) {
    //  throw new Error("Only 3 addresses per vault right now.");
    //}
    //if (transactionThreshold > 66 || transactionThreshold < 34) {
    //  throw new Error("2 maximum signers allowed right now.");
    //}
    const { seed } = await createSeed();
    const { message } = await createRandomMessage();
    let createVaultResult = await createVault(addressList, vaultName, rotationThreshold, transactionThreshold, adminThreshold, message, seed, signer, returnHash);
    return createVaultResult;
}
export async function createPolybaseKey(vaultAddress, signer, intuSignature) {
    let signature = "";
    intuSignature
        ? (signature = intuSignature)
        : (signature = await getUserSignature(vaultAddress, signer));
    return await getPolybaseKey(signature);
}
export async function preRegistration(vaultAddress, signer, intuSignature, returnHash) {
    let userAddress = await signer.getAddress();
    let preRegCheck = await getUserPreRegisterInfos(vaultAddress, userAddress, signer.provider);
    if (preRegCheck.registered) {
        console.log("user already preregistered");
        return "User already preregistered";
    }
    let signature;
    intuSignature
        ? (signature = intuSignature)
        : (signature = await getUserSignature(vaultAddress, signer));
    const { encryptionKey, megaPublicKey, encMegaSecretKey } = await preRegister(signature);
    let dbKey = await getPolybaseKey(signature);
    let sk = dbKey.key;
    let pkfinal = getPublicKey(hexToBytes(String(sk)));
    let rh = returnHash || false;
    return await preRegisterStep(vaultAddress, encryptionKey, megaPublicKey, encMegaSecretKey, pkfinal, signer, rh);
}
export async function automateRegistration(vaultAddress, signer, nostrNode, intuSignature) {
    const startTime = Date.now();
    let retries = 0;
    let maxRetries = 50;
    let signature = "";
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    intuSignature
        ? (signature = intuSignature)
        : (signature = await getUserSignature(vaultAddress, signer));
    const userAddress = await signer.getAddress();
    const vaultContract = getVaultContract(vaultAddress, signer.provider);
    let { users, createdDate } = await vaultContract.vaultInfos();
    let seed, threshold, index, megaPkArray, encMegaSecretKey, dbKeyArray;
    const userIndex = users.findIndex((address) => userAddress == address);
    let result = await getUtilsParams(vaultAddress, userAddress, signer.provider);
    seed = result.seed;
    index = result.index;
    megaPkArray = result.megaPkArray;
    encMegaSecretKey = result.encMegaSecretKey[userIndex];
    threshold = result.threshold;
    dbKeyArray = result.dbKeyArray;
    while (dbKeyArray.length < users.length) {
        if (retries < maxRetries) {
            console.log("dbKeyArray length is less than users length, retrying...");
            await sleep(750);
            result = await getUtilsParams(vaultAddress, userAddress, signer.provider);
            seed = result.seed;
            index = result.index;
            megaPkArray = result.megaPkArray;
            encMegaSecretKey = result.encMegaSecretKey[userIndex];
            threshold = result.threshold;
            dbKeyArray = result.dbKeyArray;
            retries++;
        }
        else {
            throw new Error("Waited too long for another user to register");
        }
    }
    let true_threshold = Math.ceil((megaPkArray.length * threshold) / 100);
    let round1counter = [];
    let round2counter = [];
    let round3counter = [];
    let pedersenDealingsKeyArray = [];
    let pedersenDealingsKappaArray = [];
    let pedersenDealingsLambdaArray = [];
    let pedersenOpeningsKeyArray = [];
    let pedersenOpeningsKappaArray = [];
    let pedersenOpeningsLambdaArray = [];
    let simpleKeyDealingsArray = [];
    let simpleLambdaDealingsArray = [];
    let pedersenKeyTranscriptsArray = [];
    let pedersenKappaTranscriptsArray = [];
    let pedersenLambdaTranscriptsArray = [];
    let dealingsKappaTimesLambdaArray = [];
    dealingsKappaTimesLambdaArray = new Array(users.length).fill("");
    let preRelays = ["wss://nostr.intu.xyz"];
    if (nostrNode) {
        preRelays.unshift(nostrNode);
    }
    let relays = [];
    for (const relayUrl of preRelays) {
        try {
            await Relay.connect(relayUrl);
            relays.push(relayUrl);
            break;
        }
        catch (error) {
            console.error(`Error connecting to relay ${relayUrl}:`, error);
        }
    }
    if (relays.length === 0) {
        throw new Error("No relays available");
    }
    const pool = new SimplePool();
    let dbKey = await getPolybaseKey(signature);
    let sk = dbKey.key;
    //let pkfinal = getPublicKey(hexToBytes(String(sk)));
    let h;
    try {
        h = pool.subscribeMany(relays, [
            {
                kinds: [1],
                authors: dbKeyArray,
                since: Number(createdDate),
            },
        ], {
            onevent(event) {
                let data = JSON.parse(event.content);
                if ("pedersen_key_dealing" in data) {
                    pedersenDealingsKeyArray[data.u] = data.pedersen_key_dealing;
                    pedersenDealingsKappaArray[data.u] = data.pedersen_kappa_dealing;
                    pedersenDealingsLambdaArray[data.u] = data.pedersen_lambda_dealing;
                    round1counter[data.u] = 1;
                }
                else if ("simple_key_dealing" in data) {
                    pedersenOpeningsKeyArray[data.u] = data.pedersen_key_opening;
                    pedersenOpeningsKappaArray[data.u] = data.pedersen_kappa_opening;
                    pedersenOpeningsLambdaArray[data.u] = data.pedersen_lambda_opening;
                    simpleKeyDealingsArray[data.u] = data.simple_key_dealing;
                    simpleLambdaDealingsArray[data.u] = data.simple_lambda_dealing;
                    pedersenKeyTranscriptsArray[data.u] = data.pedersen_key_transcript;
                    pedersenKappaTranscriptsArray[data.u] =
                        data.pedersen_kappa_transcript;
                    pedersenLambdaTranscriptsArray[data.u] =
                        data.pedersen_lambda_transcript;
                    round2counter[data.u] = 1;
                }
                else if ("dealing_kappa_times_lambda" in data) {
                    dealingsKappaTimesLambdaArray[data.u] =
                        data.dealing_kappa_times_lambda;
                    round3counter[data.u] = 1;
                }
            },
        });
        if (!h) {
            throw new Error("Failed to create subscription");
        }
    }
    catch (error) {
        console.error("Error connecting to NOSTR relay(s): " + relays + " ERROR: ", error);
        throw error; // Re-throw to handle error at higher level
    }
    const { pedersenDealingArray } = await registerStepOne(seed, true_threshold, index, megaPkArray);
    let step1Data = {
        u: userIndex,
        pedersen_key_dealing: pedersenDealingArray[0],
        pedersen_kappa_dealing: pedersenDealingArray[1],
        pedersen_lambda_dealing: pedersenDealingArray[2],
    };
    let eventTemplate1 = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        content: JSON.stringify(step1Data),
        tags: [],
    };
    const signedEvent1 = finalizeEvent(eventTemplate1, hexToBytes(String(sk)));
    await pool.publish(relays, signedEvent1);
    let completeProcess = false;
    const bigUpdater = async () => {
        try {
            if (retries > maxRetries) {
                return false;
            }
            if (pedersenDealingsKeyArray.length === users.length &&
                simpleKeyDealingsArray.length === users.length &&
                dealingsKappaTimesLambdaArray.length === users.length) {
                if (dealingsKappaTimesLambdaArray.every(Boolean)) {
                    completeProcess = true;
                }
            }
            if (!completeProcess) {
                console.log("round1counter : " + round1counter.filter(Number).length);
                if (round1counter.filter(Number).length === users.length &&
                    !pedersenOpeningsKeyArray[userIndex]) {
                    const { pedersenOpeningArray, simpleDealingArray, pedersenTranscriptArray, } = await registerStepTwo(seed, true_threshold, index, megaPkArray, signature, encMegaSecretKey, pedersenDealingsKeyArray, pedersenDealingsKappaArray, pedersenDealingsLambdaArray);
                    let step2Data = {
                        u: userIndex,
                        pedersen_key_opening: pedersenOpeningArray[0],
                        pedersen_kappa_opening: pedersenOpeningArray[1],
                        pedersen_lambda_opening: pedersenOpeningArray[2],
                        simple_key_dealing: simpleDealingArray[0],
                        simple_lambda_dealing: simpleDealingArray[1],
                        pedersen_key_transcript: pedersenTranscriptArray[0],
                        pedersen_kappa_transcript: pedersenTranscriptArray[1],
                        pedersen_lambda_transcript: pedersenTranscriptArray[2],
                    };
                    let eventTemplate2 = {
                        kind: 1,
                        created_at: Math.floor(Date.now() / 1000),
                        content: JSON.stringify(step2Data),
                        tags: [],
                    };
                    const signedEvent2 = finalizeEvent(eventTemplate2, hexToBytes(String(sk)));
                    await pool.publish(relays, signedEvent2);
                    if (process.env.DEBUG) {
                        console.log("second step COMPLETE");
                    }
                }
                else if (pedersenOpeningsKeyArray[userIndex] &&
                    round2counter.filter(Number).length !== users.length) {
                    console.log("waiting on others to do step 2 --- so we can do step3");
                }
                console.log("round2counter : " + round2counter.filter(Number).length);
                if (round2counter.filter(Number).length === users.length &&
                    !dealingsKappaTimesLambdaArray[userIndex] &&
                    dealingsKappaTimesLambdaArray[userIndex] == "") {
                    console.log("doinground3");
                    const { simpleOpeningArray, multiplyDealingArray, simpleTranscriptArray, } = await registerStepThree(seed, true_threshold, index, megaPkArray, signature, encMegaSecretKey, simpleKeyDealingsArray, simpleLambdaDealingsArray, pedersenKeyTranscriptsArray[userIndex], pedersenKappaTranscriptsArray[userIndex], pedersenOpeningsLambdaArray[userIndex]);
                    let step3Data = {
                        u: userIndex,
                        simple_key_opening: simpleOpeningArray[0],
                        simple_kappa_opening: simpleOpeningArray[1],
                        dealing_key_times_lambda: multiplyDealingArray[0],
                        dealing_kappa_times_lambda: multiplyDealingArray[1],
                        simple_key_transcript: simpleTranscriptArray[0],
                        simple_kappa_transcript: simpleTranscriptArray[1],
                    };
                    let eventTemplate3 = {
                        kind: 1,
                        created_at: Math.floor(Date.now() / 1000),
                        content: JSON.stringify(step3Data),
                        tags: [],
                    };
                    const signedEvent3 = finalizeEvent(eventTemplate3, hexToBytes(String(sk)));
                    await pool.publish(relays, signedEvent3);
                    //console.log("complete final step");
                }
                else if (dealingsKappaTimesLambdaArray[userIndex] &&
                    round3counter.filter(Number).length !== users.length) {
                    console.log("You are all done! Waiting on others to perform step3 so we can complete vault");
                }
                if (round3counter.filter(Number).length === users.length) {
                    console.log("EVERYONE IS DONE");
                    completeProcess = true;
                    await h.close();
                    return true;
                }
            }
        }
        catch (error) {
            console.error("An error occurred in bigUpdater:", error);
        }
    };
    async function keepCheckingUntilTrue() {
        try {
            console.log("performing crypto work");
            while (!completeProcess) {
                try {
                    await sleep(750);
                    retries++;
                    await bigUpdater();
                }
                catch (error) {
                    console.error("An error occurred:", error);
                    break;
                }
            }
            const endTime = Date.now();
            if (process.env.DEBUG) {
                console.log(`Completed in ${endTime - startTime} ms`);
            }
            return true;
        }
        catch (error) {
            console.log("error::", error);
            return false;
        }
    }
    await keepCheckingUntilTrue();
    await h.close();
    return true;
}
export async function registerAllSteps(vaultAddress, signer, intuSignature, nostrNode, returnHash) {
    let signature = "";
    let rh = returnHash || false;
    intuSignature
        ? (signature = intuSignature)
        : (signature = await getUserSignature(vaultAddress, signer));
    let pko = "", pkao = "", plo = "", skd = "", sld = "", pkt = "", pkat = "", plt = "";
    let step1array = [];
    let step3array = [];
    let b64s1;
    let b64s3;
    let dbKey = await getPolybaseKey(signature);
    let pkfinal = getPublicKey(hexToBytes(String(dbKey.key)));
    const pool = new SimplePool();
    let preRelays = ["wss://nostr.intu.xyz"];
    if (nostrNode) {
        preRelays.unshift(nostrNode);
    }
    let relays = [];
    for (const relayUrl of preRelays) {
        try {
            await Relay.connect(relayUrl);
            relays.push(relayUrl);
            break;
        }
        catch (error) {
            console.error(`Error connecting to relay ${relayUrl}:`, error);
        }
    }
    if (relays.length === 0) {
        throw new Error("No relays available");
    }
    let h = pool.subscribeMany(relays, [
        {
            authors: [pkfinal],
        },
    ], {
        onevent(event) {
            let data = JSON.parse(event.content);
            data.pedersen_key_dealing
                ? (step1array = [
                    data.pedersen_key_dealing,
                    data.pedersen_kappa_dealing,
                    data.pedersen_lambda_dealing,
                ])
                : "";
            data.pedersen_key_opening ? (pko = data.pedersen_key_opening) : "";
            data.pedersen_kappa_opening ? (pkao = data.pedersen_kappa_opening) : "";
            data.pedersen_lambda_opening
                ? (plo = data.pedersen_lambda_opening)
                : "";
            data.simple_key_dealing ? (skd = data.simple_key_dealing) : "";
            data.simple_lambda_dealing ? (sld = data.simple_lambda_dealing) : "";
            data.pedersen_key_transcript
                ? (pkt = data.pedersen_key_transcript)
                : "";
            data.pedersen_kappa_transcript
                ? (pkat = data.pedersen_kappa_transcript)
                : "";
            data.pedersen_lambda_transcript
                ? (plt = data.pedersen_lambda_transcript)
                : "";
            data.simple_key_opening
                ? (step3array = [
                    data.simple_key_opening,
                    data.simple_kappa_opening,
                    data.dealing_key_times_lambda,
                    data.dealing_kappa_times_lambda,
                    data.simple_key_transcript,
                    data.simple_kappa_transcript,
                ])
                : "";
            if (step1array.length > 1) {
                b64s1 = btoa(JSON.stringify(step1array));
            }
            if (step3array.length > 1) {
                b64s3 = btoa(JSON.stringify(step3array));
            }
        },
        oneose() {
            h.close();
        },
    });
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    while (!(b64s1 && pko && pkao && plo && skd && sld && pkt && pkat && plt && b64s3)) {
        await sleep(500);
    }
    return await registerUserAll(vaultAddress, b64s1, pko, pkao, plo, skd, sld, pkt, pkat, plt, b64s3, signer, rh);
}
export async function registerAllReshareSteps(vaultAddress, signer, intuSignature, nostrNode, returnHash) {
    let signature = "";
    intuSignature
        ? (signature = intuSignature)
        : (signature = await getUserSignature(vaultAddress, signer));
    let pko = "", pkao = "", plo = "", skd = "", sld = "", pkt = "", pkat = "", plt = "";
    let b64s1;
    let b64s3;
    let step1array = [];
    let step3array = [];
    let rh = returnHash || false;
    let dbKey = await getPolybaseKey(signature);
    let pkfinal = getPublicKey(hexToBytes(String(dbKey.key)));
    const pool = new SimplePool();
    let preRelays = ["wss://nostr.intu.xyz"];
    if (nostrNode) {
        preRelays.unshift(nostrNode);
    }
    let relays = [];
    for (const relayUrl of preRelays) {
        try {
            await Relay.connect(relayUrl);
            relays.push(relayUrl);
            break;
        }
        catch (error) {
            console.error(`Error connecting to relay ${relayUrl}:`, error);
        }
    }
    if (relays.length === 0) {
        throw new Error("No relays available");
    }
    let h = pool.subscribeMany(relays, [
        {
            authors: [pkfinal],
        },
    ], {
        onevent(event) {
            let data = JSON.parse(event.content);
            data.simple_kappa_dealing_reshared_once
                ? (step1array = [
                    data.simple_key_dealing_reshared_once,
                    data.simple_kappa_dealing_reshared_once,
                    data.simple_lambda_dealing_reshared_once,
                ])
                : "";
            data.simple_key_opening_reshared_once
                ? (pko = data.simple_key_opening_reshared_once)
                : "";
            data.simple_kappa_opening_reshared_once
                ? (pkao = data.simple_kappa_opening_reshared_once)
                : "";
            data.simple_lambda_opening_reshared_once
                ? (plo = data.simple_lambda_opening_reshared_once)
                : "";
            data.simple_key_dealing_reshared_twice
                ? (skd = data.simple_key_dealing_reshared_twice)
                : "";
            data.simple_kappa_dealing_reshared
                ? (sld = data.simple_kappa_dealing_reshared)
                : "";
            data.transcript_key_reshared_once
                ? (pkt = data.transcript_key_reshared_once)
                : "";
            data.transcript_kappa_reshared_once
                ? (pkat = data.transcript_kappa_reshared_once)
                : "";
            data.transcript_lambda_reshared_once
                ? (plt = data.transcript_lambda_reshared_once)
                : "";
            data.simple_key_opening_reshared_twice
                ? (step3array = [
                    data.simple_key_opening_reshared_twice,
                    data.simple_kappa_opening_reshared_twice,
                    data.dealing_key_times_lambda_reshare,
                    data.dealing_kappa_times_lambda_reshare,
                    data.simple_key_transcript_reshared_twice,
                    data.simple_kappa_transcript_reshared_twice,
                ])
                : "";
            if (step1array.length > 1) {
                b64s1 = btoa(JSON.stringify(step1array));
            }
            if (step3array.length > 1) {
                b64s3 = btoa(JSON.stringify(step3array));
            }
        },
        oneose() {
            h.close();
        },
    });
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    while (!(b64s1 && pko && pkao && plo && skd && sld && pkt && pkat && plt && b64s3)) {
        await sleep(500);
    }
    return await registerUserAllReshare(vaultAddress, b64s1, pko, pkao, plo, skd, sld, pkt, pkat, plt, b64s3, signer, rh);
}
export async function completeVault(vaultAddress, signer, returnHash) {
    let mpk = "";
    let rh = returnHash || false;
    const { users, completed } = await getVaultContract(vaultAddress, signer.provider).vaultInfos();
    if (completed) {
        console.log("Vault already completed");
        return "Vault is already completed.";
    }
    if (users.length >= 3) {
        //const finalUsers: PromiseOrValue<string>[] = users;
        const finalUsers = [users[0], users[1], users[2]];
        const userAddress = await signer.getAddress();
        const userRegistrationAll = await getUserRegistrationAllInfos(vaultAddress, signer.provider);
        const userIndex = users.findIndex((address) => userAddress == address);
        const step3Crypto = userRegistrationAll[userIndex].step3Stuff;
        if (step3Crypto !== "") {
            let step3Result = JSON.parse(atob(step3Crypto));
            mpk = await getMasterPublicKey(step3Result[4]);
        }
        const MPK = "0x" + mpk;
        return await userCompleteVault(vaultAddress, finalUsers, MPK, signer, rh);
    }
}
export async function submitTransaction(to, value, chainId, nonce, data, gasPrice, gas, vaultAddress, signer, notes = "n/a", returnHash = false, sendingProvider) {
    let date = new Date();
    let provider;
    let client;
    let signerAddress;
    if (!sendingProvider) {
        provider = await getProviderForChain(chainId);
    }
    else {
        provider = sendingProvider;
    }
    client = await createViemClientForTransaction(provider);
    signerAddress = await signer.getAddress();
    let decimal = 18; // steven need to calculate
    let finalGasPrice;
    let gasInfo = await provider.getFeeData();
    if (gasPrice === undefined || gasPrice === null || gasPrice === "") {
        if (gasInfo.gasPrice) {
            finalGasPrice = gasInfo.gasPrice.mul(105).div(100);
        }
        else {
            throw new Error("Unable to determine gas price");
        }
    }
    else {
        finalGasPrice = ethers.BigNumber.from(gasPrice);
    }
    let gE = null;
    const gvc = await getVaultContract(vaultAddress, signer.provider).vaultInfos();
    let masterPublicKey = gvc.masterPublicKey;
    try {
        if (data) {
            gE = await client.estimateGas({
                account: masterPublicKey,
                to: to,
                value: parseEther(String(value)),
                data: data,
            });
        }
        else {
            gE = await client.estimateGas({
                account: masterPublicKey,
                to: to,
                value: parseEther(String(value)),
            });
        }
    }
    catch (e) {
        console.warn(`You are likely experiencing an error because the account ${masterPublicKey} doesn't have enough funds to cover the gas+value being requested to transfer on ${chainId}`);
        console.log(e);
        return;
    }
    let finalGasLimit;
    if (gas === undefined || gas === null || gas === "") {
        if (gE) {
            finalGasLimit = ethers.BigNumber.from(gE).mul(105).div(100);
        }
        else {
            throw new Error("Unable to determine gas limit");
        }
    }
    else {
        finalGasLimit = ethers.BigNumber.from(gas); // Changed from gasPrice to gas
    }
    const formTxResponse = await formTransaction(to, String(value), String(chainId), String(nonce), String(data), finalGasPrice.toString(), finalGasLimit.toString(), String(decimal));
    const response = await proposeTransaction(vaultAddress, formTxResponse, signer, notes, returnHash);
    let date2 = new Date();
    if (process.env.DEBUG) {
        console.log("SUBMIT TX TIME : ", date2.getTime() - date.getTime());
    }
    return response;
}
export async function signTx(vaultAddress, txId, signer, intuSignature, experimental, returnHash) {
    let date = new Date();
    const userAddress = await signer.getAddress();
    let signature = "";
    let transactionData;
    let megaPkArray;
    let encMegaSecretKey;
    let seed;
    let threshold;
    let index;
    let rh = returnHash || false;
    intuSignature
        ? (signature = intuSignature)
        : (signature = await getUserSignature(vaultAddress, signer));
    const { users, resharingOccurred } = await getVaultContract(vaultAddress, signer.provider).vaultInfos();
    const userIndex = users.findIndex((address) => userAddress == address);
    if (!seed || !threshold || !index || !megaPkArray || !encMegaSecretKey) {
        const utilsParams = await getUtilsParams(vaultAddress, userAddress, signer.provider);
        seed = utilsParams.seed;
        threshold = utilsParams.threshold;
        index = utilsParams.index;
        megaPkArray = utilsParams.megaPkArray;
        encMegaSecretKey = utilsParams.encMegaSecretKey[userIndex];
    }
    const thresholdCount = Math.ceil((megaPkArray.length * threshold) / 100);
    if (typeof txId === "bigint") {
        txId = Number(txId);
    }
    else if (typeof txId === "string") {
        txId = parseInt(txId, 10);
    }
    if (!transactionData) {
        let tx = await getTransactionLean(vaultAddress, txId, signer.provider);
        if (!tx) {
            throw new Error("Transaction not found : " + vaultAddress + " " + txId);
        }
        if (tx.transactionData === "") {
            throw new Error("Transaction data is empty : " + vaultAddress + " " + txId);
        }
        transactionData = tx.transactionData;
    }
    const alluserRegInfo = await getUserRegistrationAllInfos(vaultAddress, signer.provider);
    let myRegInfo = alluserRegInfo[userIndex];
    const true_threshold = thresholdCount;
    if (alluserRegInfo && myRegInfo.step3Stuff !== "") {
        let step3Result = JSON.parse(atob(myRegInfo.step3Stuff));
        let signatureResult;
        if (resharingOccurred) {
            let pedersenOpeningLambdaReshare = myRegInfo.pedersenOpeningLambdaReshare;
            let reShareInfos = await getRegistrationReshareStep3InfosDB(vaultAddress, signer.provider);
            signatureResult = await reshareSignTransaction(seed, true_threshold, index, transactionData, signature, encMegaSecretKey, reShareInfos.pedersenDealingsLambdaReshareArray, reShareInfos.dealingsKeyXLambdaReshareArray, reShareInfos.dealingsKappaXLambdaReshareArray, pedersenOpeningLambdaReshare || "", step3Result[4], step3Result[5]);
        }
        else {
            const { dealingKeyXLambdaArray, dealingKappaXLambdaArray } = await getRegistrationStep3InfosDB(vaultAddress, signer.provider);
            if (!experimental) {
                let datesign = new Date();
                signatureResult = await signTransaction(seed, thresholdCount, index, transactionData, signature, encMegaSecretKey, dealingKeyXLambdaArray, dealingKappaXLambdaArray, myRegInfo.pedersenOpeningLambda || "", step3Result[4], step3Result[5], myRegInfo.pedersenTranscriptLambda || "");
                let dateend = new Date();
                console.log("sign transaction CRYPTO : " +
                    (dateend.getTime() - datesign.getTime()) / 1000);
            }
            else {
                signatureResult = await signTransactionWithoutLambda(seed, transactionData, signature, step3Result[0], step3Result[1], step3Result[4], step3Result[5]);
            }
        }
        let date2 = new Date();
        if (process.env.DEBUG) {
            console.log("Time to sign : " + (date2.getTime() - date.getTime()) / 1000);
        }
        return await userConfirmTx(vaultAddress, txId, signatureResult.signedTransaction, signer, rh);
    }
}
export async function combineSignedTx(vaultAddress, txId, signer, experimental) {
    const userAddress = await signer.getAddress();
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    let seed;
    let threshold;
    let megaPkArray;
    let tx;
    let step3Data;
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    let { users } = await vaultContract.vaultInfos();
    const userIndex = users.findIndex((address) => userAddress == address);
    if (!seed || !threshold || !megaPkArray) {
        const utilsParams = await getUtilsParams(vaultAddress, userAddress, signer.provider);
        seed = utilsParams.seed;
        threshold = utilsParams.threshold;
        megaPkArray = utilsParams.megaPkArray;
    }
    if (!step3Data) {
        const alluserRegInfo = await getUserRegistrationAllInfos(vaultAddress, signer.provider);
        let myRegInfo = alluserRegInfo[userIndex];
        step3Data = myRegInfo.step3Stuff;
    }
    let step3Result = JSON.parse(atob(step3Data));
    let true_threshold = Math.ceil((megaPkArray.length * threshold) / 100);
    let attempts = 0;
    let signedTransactions = new Array(users.length).fill("");
    let message;
    while (signedTransactions.filter((tx) => tx !== "").length < true_threshold &&
        attempts < 8) {
        console.log("attempts : " + attempts);
        attempts++;
        txId = typeof txId === "bigint" ? Number(txId) : txId;
        tx = await getTransaction(vaultAddress, txId, signer.provider);
        message = tx.transactionData;
        let signedTransactionsObject = tx.userSignedTransactions;
        signedTransactionsObject.forEach((tx) => {
            const userIndex = users.findIndex((user) => user.toLowerCase() === tx.user.toLowerCase());
            if (userIndex !== -1) {
                signedTransactions[userIndex] = tx.signedTransaction;
            }
            else {
                signedTransactions.push("");
            }
        });
        await sleep(1000); // Wait for 1 second before retrying
    }
    let combinedTxHash;
    if (signedTransactions.length < 2) {
        throw new Error("Hmm, one of the signing nodes failed to do it's job, sorry about that, please try again!");
    }
    if (!experimental) {
        if (signedTransactions.length > 1) {
            combinedTxHash = await combineSignedTransactions(seed, true_threshold, message || "", signedTransactions, step3Result[4], step3Result[5]);
            let hash = combinedTxHash.finalSignedTransaction;
            return hash;
        }
    }
    else {
        //console.log("exp");
        if (signedTransactions.length > 1) {
            combinedTxHash = await combineSignedTransactionsWithoutLambda(seed, true_threshold, message || "", signedTransactions, step3Result[4], step3Result[5]);
            let hash = combinedTxHash.finalSignedTransaction;
            return hash;
        }
    }
}
////////////////////////////////////////////////////////////////////////////  queries //////////////////////////////////////////////////////////////
export async function getVaults(userAddress, provider) {
    console.log("start get vaults");
    const userTransactionCount = await provider.getTransactionCount(userAddress);
    if (userTransactionCount === 0) {
        return [];
    }
    console.log(" userTransactionCount : " + userTransactionCount);
    let vaultData;
    let vaultAddresses = await getFilteredUserInitializedLogs(userAddress, provider);
    if ((vaultAddresses && vaultAddresses.length === 0) ||
        vaultAddresses === undefined) {
        return [];
    }
    vaultData =
        vaultAddresses &&
            (await Promise.all(vaultAddresses.map(async (vaultAddress) => getVault(vaultAddress, provider))));
    return Promise.all(vaultData
        .filter((vault) => vault.users.some((user) => user.address === userAddress))
        .map(async (vault) => {
        const proposals = [];
        for (let i = 1; i <= vault.proposalCount; i++) {
            //proposals.push(
            //  await getProposal(vault.vaultAddress, i, provider)
            //);
        }
        let transactions = [];
        let transactionResult = await getAllTransactions(vault.vaultAddress, provider);
        transactions = transactionResult;
        return {
            ...vault,
            proposals: proposals,
            transactions: transactions,
        };
    })).then((results) => {
        console.log("55");
        return results;
    });
}
export async function getVaultSingle(userAddress, provider) {
    const userTransactionCount = await provider.getTransactionCount(userAddress);
    if (userTransactionCount === 0) {
        return [];
    }
    let vaultData;
    let vaultAddresses = await getFilteredUserInitializedLogsSingle(userAddress, provider);
    if ((vaultAddresses && vaultAddresses.length === 0) ||
        vaultAddresses === undefined) {
        return [];
    }
    vaultData =
        vaultAddresses &&
            (await Promise.all(vaultAddresses.map(async (vaultAddress) => getVault(vaultAddress, provider))));
    return Promise.all(vaultData.map(async (vault) => {
        const proposals = [];
        for (let i = 1; i <= vault.proposalCount; i++) {
            proposals.push(await getProposal(vault.vaultAddress, i, provider));
        }
        let transactions = [];
        let transactionResult = await getAllTransactions(vault.vaultAddress, provider);
        transactions = transactionResult;
        return {
            ...vault,
            proposals: proposals,
            transactions: transactions,
        };
    })).then((results) => {
        return results;
    });
}
export async function getVaultsWithoutTransactions(userAddress, provider) {
    const userTransactionCount = await provider.getTransactionCount(userAddress);
    if (userTransactionCount === 0) {
        return [];
    }
    let vaultData;
    let vaultAddresses = await getFilteredUserInitializedLogs(userAddress, provider);
    if ((vaultAddresses && vaultAddresses.length === 0) ||
        vaultAddresses === undefined) {
        return [];
    }
    vaultData =
        vaultAddresses &&
            (await Promise.all(vaultAddresses.map(async (vaultAddress) => getVault(vaultAddress, provider))));
    return vaultData;
}
export async function getVaultSingleWithDEOA(masterPublicAddress, provider) {
    let vaultData;
    let vaultAddresses = await getFilteredUserInitializedLogsSingleWithDeoa(masterPublicAddress, provider);
    if ((vaultAddresses && vaultAddresses.length === 0) ||
        vaultAddresses === undefined) {
        return [];
    }
    vaultData =
        vaultAddresses &&
            (await Promise.all(vaultAddresses.map(async (vaultAddress) => getVault(vaultAddress, provider))));
    return Promise.all(vaultData.map(async (vault) => {
        const proposals = [];
        for (let i = 1; i <= vault.proposalCount; i++) {
            proposals.push(await getProposal(vault.vaultAddress, i, provider));
        }
        let transactions = [];
        let transactionResult = await getAllTransactions(vault.vaultAddress, provider);
        transactions = transactionResult;
        return {
            ...vault,
            proposals: proposals,
            transactions: transactions,
        };
    })).then((results) => {
        return results;
    });
}
export async function getAllTransactions(vaultAddress, provider) {
    const date1 = new Date();
    const allTransactions = await _getTransactions(vaultAddress, provider).then(async (transactions) => {
        return await Promise.all(transactions.map(async (transaction) => {
            const parseTx = await parseTransaction(transaction.transactionData);
            let transactionObj = {
                id: transaction.txId,
                transactionData: transaction.transactionHash,
                chainId: parseTx.chainId,
                data: parseTx.data,
                gas: parseTx.gas,
                gasPrice: parseTx.gasPrice,
                nonce: parseTx.nonce,
                to: parseTx.to,
                value: parseTx.value,
                signedTransactionsNeeded: transaction.signedTransactionsNeeded,
                userSignedTransactions: transaction.userSignedTransactions,
                transactionNotes: transaction.transactionNotes,
            };
            return transactionObj;
        }));
    });
    const date2 = new Date();
    if (process.env.DEBUG) {
        console.log("Time to get all transactions : ", date2.getTime() - date1.getTime());
    }
    return allTransactions;
}
export async function getTransaction(vaultAddress, txId, provider) {
    const transaction = await _getTransaction(vaultAddress, txId, provider).then(async (transaction) => {
        const parseTx = await parseTransaction(transaction.transactionData);
        return {
            ...transaction,
            chainId: parseTx.chainId,
            data: parseTx.data,
            gas: parseTx.gas,
            gasPrice: parseTx.gasPrice,
            nonce: parseTx.nonce,
            to: parseTx.to,
            value: parseTx.value,
        };
    });
    return transaction;
}
export async function getTransactionLean(vaultAddress, txId, provider) {
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    await sleep(1000);
    const transaction = await _getTransactionLean(vaultAddress, txId, provider).then(async (transaction) => {
        const parseTx = await parseTransaction(transaction.transactionData);
        return {
            ...transaction,
            chainId: parseTx.chainId,
            data: parseTx.data,
            gas: parseTx.gas,
            gasPrice: parseTx.gasPrice,
            nonce: parseTx.nonce,
            to: parseTx.to,
            value: parseTx.value,
        };
    });
    return transaction;
}
export async function automateRotateRegistration(vaultAddress, signer, nostrNode) {
    let signature = await getUserSignature(vaultAddress, signer);
    const userAddress = await signer.getAddress();
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const { users, createdDate } = await vaultContract.vaultInfos();
    let seed, threshold, index, megaPkArray, encMegaSecretKey, dbKeyArray, finalUserCount, simpleTranscriptKey;
    let finalUsers = [];
    const newUserAddress = await vaultContract.getUserToAdd();
    const userToRemove = await vaultContract.getUserToRemove();
    if (userAddress === userToRemove[0]) {
        throw new Error("User being removed cannot particpate");
    }
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    const signerAddress = await signer.getAddress();
    finalUsers = users.concat(newUserAddress);
    let userIndex = finalUsers.findIndex((a) => signerAddress == a);
    console.log("encMegaSecretKey being set to this userindex : " + userIndex);
    let utilsParams = await getUtilsParams(vaultAddress, signerAddress, signer.provider);
    seed = utilsParams.seed;
    index = utilsParams.index;
    megaPkArray = utilsParams.megaPkArray;
    encMegaSecretKey = utilsParams.encMegaSecretKey[userIndex];
    threshold = utilsParams.threshold;
    dbKeyArray = utilsParams.dbKeyArray;
    let true_threshold;
    if (userToRemove && userToRemove[0] && userToRemove[0] !== "") {
        let userIndexToBeRemoved = finalUsers.findIndex((address) => userToRemove[0] == address);
        console.log("userIndexToBeRemoved : " + userIndexToBeRemoved);
        finalUserCount = finalUsers.length - 1;
        if (newUserAddress &&
            newUserAddress[0] &&
            newUserAddress[0] == signerAddress) {
        }
        else if (userIndexToBeRemoved < userIndex) {
        }
    }
    else {
        finalUserCount = finalUsers.length;
    }
    const removedUserIndex = finalUsers.findIndex((address) => address === userToRemove[0]);
    if (removedUserIndex >= 0 && newUserAddress.length === 1) {
        console.log(removedUserIndex + " : " + userToRemove[0]);
        finalUsers[removedUserIndex] = finalUsers[finalUsers.length - 1];
        dbKeyArray[removedUserIndex] = dbKeyArray[finalUsers.length - 1];
        megaPkArray[removedUserIndex] = megaPkArray[finalUsers.length - 1];
        encMegaSecretKey = utilsParams.encMegaSecretKey[userIndex];
        finalUsers.pop();
        dbKeyArray.pop();
        megaPkArray.pop();
    }
    if (newUserAddress[0] === signerAddress) {
        userIndex = removedUserIndex;
    }
    true_threshold = Math.ceil((megaPkArray.length * threshold) / 100);
    const userRegistrationInfo = await getUserRegistrationAllInfos(vaultAddress, signer.provider);
    let step3Crypto;
    if (newUserAddress.includes(signerAddress)) {
        step3Crypto = userRegistrationInfo[0].step3Stuff;
    }
    else {
        step3Crypto = userRegistrationInfo[userIndex].step3Stuff;
    }
    if (step3Crypto !== "") {
        let step3Result = JSON.parse(atob(step3Crypto));
        simpleTranscriptKey = step3Result[4];
    }
    await sleep(500);
    let round1counter = [];
    let round2counter = [];
    let round3counter = [];
    let simpleKeyDealingResharedOnceArray = [];
    let simpleKappaDealingResharedOnceArray = [];
    let simpleLambdaDealingResharedOnceArray = [];
    let simpleOpeningKeyResharedOnce = [];
    let simpleOpeningKappaResharedOnce = [];
    let simpleOpeningLambdaResharedOnce = [];
    let simpleDealingKeyResharedTwice = [];
    let simpleDealingKappaResharedTwice = [];
    let transcriptKeyResharedOnce = [];
    let transcriptKappaResharedOnce = [];
    let transcriptLambdaResharedOnce = [];
    let simpleOpeningKeyResharedTwice = [];
    let simpleOpeningKappaResharedTwice = [];
    let dealingKeyXLambdaReshare = [];
    let dealingKappaXLambdaReshare = [];
    let transcriptKeyResharedTwice = [];
    let transcriptKappaResharedTwice = [];
    let preRelays = ["wss://nostr.intu.xyz"];
    if (nostrNode) {
        preRelays.unshift(nostrNode);
    }
    let relays = [];
    for (const relayUrl of preRelays) {
        try {
            await Relay.connect(relayUrl);
            relays.push(relayUrl);
            break;
        }
        catch (error) {
            console.error(`Error connecting to relay ${relayUrl}:`, error);
        }
    }
    if (relays.length === 0) {
        throw new Error("No relays available");
    }
    let dbKey = await getPolybaseKey(signature);
    let sk = dbKey.key;
    let h;
    const pool = new SimplePool();
    try {
        h = pool.subscribeMany(relays, [
            {
                kinds: [1],
                authors: dbKeyArray,
                since: Number(createdDate),
            },
        ], {
            onevent(event) {
                let data = JSON.parse(event.content);
                console.log("data : " + data.u);
                if ("simple_kappa_dealing_reshared_once" in data) {
                    simpleKeyDealingResharedOnceArray[data.u] =
                        data.simple_key_dealing_reshared_once;
                    simpleKappaDealingResharedOnceArray[data.u] =
                        data.simple_kappa_dealing_reshared_once;
                    simpleLambdaDealingResharedOnceArray[data.u] =
                        data.simple_lambda_dealing_reshared_once;
                    round1counter[data.u] = 1;
                }
                else if ("simple_key_opening_reshared_once" in data) {
                    simpleOpeningKeyResharedOnce[data.u] =
                        data.simple_key_opening_reshared_once;
                    simpleOpeningKappaResharedOnce[data.u] =
                        data.simple_kappa_opening_reshared_once;
                    simpleOpeningLambdaResharedOnce[data.u] =
                        data.simple_lambda_opening_reshared_once;
                    simpleDealingKeyResharedTwice[data.u] =
                        data.simple_key_dealing_reshared_twice;
                    simpleDealingKappaResharedTwice[data.u] =
                        data.simple_kappa_dealing_reshared; //confirm this name
                    transcriptKeyResharedOnce[data.u] =
                        data.transcript_key_reshared_once;
                    transcriptKappaResharedOnce[data.u] =
                        data.transcript_kappa_reshared_once;
                    transcriptLambdaResharedOnce[data.u] =
                        data.transcript_lambda_reshared_once;
                    round2counter[data.u] = 1;
                }
                else if ("simple_key_opening_reshared_twice" in data) {
                    simpleOpeningKeyResharedTwice[data.u] =
                        data.simple_key_opening_reshared_twice;
                    simpleOpeningKappaResharedTwice[data.u] =
                        data.simple_kappa_opening_reshared_twice;
                    dealingKeyXLambdaReshare[data.u] =
                        data.dealing_key_times_lambda_reshare;
                    dealingKappaXLambdaReshare[data.u] =
                        data.dealing_kappa_times_lambda_reshare;
                    transcriptKeyResharedTwice[data.u] =
                        data.simple_key_transcript_reshared_twice;
                    transcriptKappaResharedTwice[data.u] =
                        data.simple_kappa_transcript_reshared_twice;
                    round3counter[data.u] = 1;
                }
            },
        });
    }
    catch (error) {
        console.error("Error subscribing to relays:", error);
    }
    if (newUserAddress.includes(userAddress)) {
        const { reshareDealings } = await reshareStepOneByNewUser(seed, true_threshold, userIndex, megaPkArray);
        let step1Data = {
            u: userIndex,
            simple_key_dealing_reshared_once: "",
            simple_kappa_dealing_reshared_once: reshareDealings[0],
            simple_lambda_dealing_reshared_once: reshareDealings[1],
        };
        let eventTemplate1 = {
            kind: 1,
            created_at: Math.floor(Date.now() / 1000),
            content: JSON.stringify(step1Data),
            tags: [],
        };
        const signedEvent1 = finalizeEvent(eventTemplate1, hexToBytes(String(sk)));
        await pool.publish(relays, signedEvent1);
        console.log("resharestep1done");
    }
    else {
        let signature = await getUserSignature(vaultAddress, signer);
        let isRegistered = await getUserRegistrationAllInfos(vaultAddress, signer.provider);
        let step3Crypto = JSON.parse(atob(isRegistered[userIndex].step3Stuff));
        let simpleOpeningKey = step3Crypto[0];
        const { reshareDealings } = await reshareStepByOriginalGroup(seed, true_threshold, userIndex, signature, simpleOpeningKey, megaPkArray);
        let step1Data = {
            u: userIndex,
            simple_key_dealing_reshared_once: reshareDealings[0],
            simple_kappa_dealing_reshared_once: reshareDealings[1],
            simple_lambda_dealing_reshared_once: reshareDealings[2],
        };
        let eventTemplate1 = {
            kind: 1,
            created_at: Math.floor(Date.now() / 1000),
            content: JSON.stringify(step1Data),
            tags: [],
        };
        const signedEvent1 = finalizeEvent(eventTemplate1, hexToBytes(String(sk)));
        await pool.publish(relays, signedEvent1);
    }
    //round 1 done
    let completeProcess = false;
    const bigUpdater = async () => {
        try {
            if (simpleLambdaDealingResharedOnceArray.length === finalUserCount &&
                simpleDealingKeyResharedTwice.length === finalUserCount &&
                dealingKappaXLambdaReshare.length === finalUserCount) {
                if (dealingKappaXLambdaReshare.every((entry) => entry && entry.length > 0)) {
                    console.log("Completing");
                    completeProcess = true;
                }
            }
            if (!completeProcess) {
                console.log("Round1counter " + round1counter.filter(Number).length);
                if (round1counter.filter(Number).length === finalUserCount &&
                    !simpleOpeningKeyResharedOnce[userIndex]) {
                    simpleKeyDealingResharedOnceArray =
                        simpleKeyDealingResharedOnceArray.filter((item) => item !== "");
                    if (simpleKappaDealingResharedOnceArray.includes("")) {
                        simpleKappaDealingResharedOnceArray =
                            simpleKappaDealingResharedOnceArray.filter((item) => item !== "");
                    }
                    if (simpleLambdaDealingResharedOnceArray.includes("")) {
                        simpleLambdaDealingResharedOnceArray =
                            simpleLambdaDealingResharedOnceArray.filter((item) => item !== "");
                    }
                    const { reshareOpenings, reshareDealings, reshareTranscripts } = await reshareStepTwo(seed, true_threshold, userIndex, megaPkArray, signature, encMegaSecretKey, simpleKeyDealingResharedOnceArray, simpleTranscriptKey, simpleKappaDealingResharedOnceArray, simpleLambdaDealingResharedOnceArray);
                    let step2Data = {
                        u: userIndex,
                        simple_key_opening_reshared_once: reshareOpenings[0],
                        simple_kappa_opening_reshared_once: reshareOpenings[1],
                        simple_lambda_opening_reshared_once: reshareOpenings[2],
                        simple_key_dealing_reshared_twice: reshareDealings[0],
                        simple_kappa_dealing_reshared: reshareDealings[1],
                        transcript_key_reshared_once: reshareTranscripts[0],
                        transcript_kappa_reshared_once: reshareTranscripts[1],
                        transcript_lambda_reshared_once: reshareTranscripts[2],
                    };
                    let eventTemplate2 = {
                        kind: 1,
                        created_at: Math.floor(Date.now() / 1000),
                        content: JSON.stringify(step2Data),
                        tags: [],
                    };
                    const signedEvent2 = finalizeEvent(eventTemplate2, hexToBytes(String(sk)));
                    await pool.publish(relays, signedEvent2);
                    console.log("resharestep2done");
                }
                else if (simpleOpeningKeyResharedOnce[userIndex] &&
                    round2counter.filter(Number).length !== finalUserCount) {
                    //console.log("waiting on others to do step 2 --- so we can do step3");
                }
                console.log("Round2counter " + round2counter.filter(Number).length);
                if (round2counter.filter(Number).length === finalUserCount &&
                    !simpleOpeningKeyResharedTwice[userIndex]) {
                    console.log("doingstep3");
                    const { reshareOpenings, reshareDealings, reshareTranscripts } = await reshareStepThree(seed, true_threshold, userIndex, megaPkArray, signature, encMegaSecretKey, simpleDealingKappaResharedTwice, //step2reshare
                    simpleOpeningLambdaResharedOnce, //step2reshare
                    simpleKeyDealingResharedOnceArray, //step1reshare
                    transcriptKeyResharedOnce[userIndex], //step2reshare
                    transcriptKappaResharedOnce[userIndex] //step2reshare
                    );
                    let step3Data = {
                        u: userIndex,
                        simple_key_opening_reshared_twice: reshareOpenings[0],
                        simple_kappa_opening_reshared_twice: reshareOpenings[1],
                        dealing_key_times_lambda_reshare: reshareDealings[0],
                        dealing_kappa_times_lambda_reshare: reshareDealings[1],
                        simple_key_transcript_reshared_twice: reshareTranscripts[0],
                        simple_kappa_transcript_reshared_twice: reshareTranscripts[1],
                    };
                    let eventTemplate3 = {
                        kind: 1,
                        created_at: Math.floor(Date.now() / 1000),
                        content: JSON.stringify(step3Data),
                        tags: [],
                    };
                    const signedEvent3 = finalizeEvent(eventTemplate3, hexToBytes(String(sk)));
                    await pool.publish(relays, signedEvent3);
                    console.log("resharestep3done");
                }
                else if (dealingKappaXLambdaReshare[userIndex] &&
                    round3counter.filter(Number).length !== finalUserCount) {
                    console.log("You are all done! Waiting on others to perform step3 so we can complete vault");
                }
                if (round3counter.filter(Number).length === finalUserCount) {
                    console.log("EVERYONE IS DONE");
                    completeProcess = true;
                    return true;
                }
            }
        }
        catch (error) {
            console.error("An error occurred in bigUpdater:", error);
        }
    };
    bigUpdater();
    async function keepCheckingUntilTrue() {
        while (!completeProcess) {
            await sleep(1000);
            bigUpdater();
        }
        return true;
    }
    await keepCheckingUntilTrue();
    await pool.close(relays);
    return true;
}
export async function getProposal(vaultAddress, proposalId, provider) {
    return await _getProposal(vaultAddress, proposalId, provider, ethers.utils.defaultAbiCoder);
}
export async function getProposedUser(vaultAddress, provider) {
    const vaultContract = await getVaultContract(vaultAddress, provider);
    return await vaultContract.getUserToAdd();
}
export async function getUserCompletedRotationRegistrationCount(vaultAddress, provider) {
    const vaultContract = await getVaultContract(vaultAddress, provider);
    const count = await vaultContract.userToAddCount();
    return count.toNumber();
}
