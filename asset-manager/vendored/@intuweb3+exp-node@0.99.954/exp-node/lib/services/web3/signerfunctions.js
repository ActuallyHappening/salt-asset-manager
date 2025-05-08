import { ethers } from "ethers";
import { getFeeContract, getVaultContract, getVaultFactoryContract, createViemClient, } from "./helper";
import VaultJson from "../web3/contracts/abi/Vault.json";
import VaultFactoryJson from "../web3/contracts/abi/VaultFactory.json";
export async function createVault(proposedAddresses, vaultName, rotateThreshold, transactionThreshold, adminThreshold, message, groupRng, signer, returnHash) {
    const provider = signer.provider;
    const chainId = await provider
        .getNetwork()
        .then((network) => network.chainId);
    let feeAmount = chainId == 4157
        ? await (await getFeeContract(provider)).getCreationFeeXFI()
        : await (await getFeeContract(provider)).getCreationFeeETH();
    feeAmount = feeAmount.mul(102).div(100);
    if (proposedAddresses.length < 3) {
        console.error("Minimum of 3 participants required");
        return;
    }
    if (Math.ceil((proposedAddresses.length * transactionThreshold) / 100) ===
        proposedAddresses.length) {
        console.error("Signing threshold requirement cannot equal total participants");
        return;
    }
    let gasPrice = await provider.getFeeData();
    let finalgas = gasPrice.gasPrice || ethers.utils.parseUnits(".01", "gwei");
    const vaultFactoryContract = await getVaultFactoryContract(signer.provider);
    let client;
    if (signer.provider) {
        client = await createViemClient(provider);
    }
    else {
        client = await createViemClient(signer);
    }
    const contractAddress = vaultFactoryContract.address;
    const abi = VaultFactoryJson.abi;
    const signerAddress = await signer.getAddress();
    const gE = await client.estimateContractGas({
        address: contractAddress.toLowerCase(),
        abi,
        functionName: "createVault",
        args: [
            proposedAddresses,
            ethers.utils.formatBytes32String(vaultName),
            rotateThreshold,
            transactionThreshold,
            adminThreshold,
            ethers.utils.formatBytes32String(message.substring(0, message.length - 1)),
            groupRng,
        ],
        account: signerAddress.toLowerCase(),
        value: feeAmount.toBigInt(),
    });
    const gasLimit = (gE * BigInt(105)) / BigInt(100);
    //const gasEstimate = await vaultFactoryContract.estimateGas.createVault(
    //  proposedAddresses,
    //  ethers.utils.formatBytes32String(vaultName),
    //  rotateThreshold,
    //  transactionThreshold,
    //  adminThreshold,
    //  ethers.utils.formatBytes32String(message.substring(0, message.length - 1)),
    //  groupRng,
    //  { value: feeAmount }
    //);
    //console.log("gasEstimate : " + gasEstimate);
    //const gasLimit = gE.mul(105).div(100);
    if (returnHash) {
        const unsignedTx = await vaultFactoryContract.populateTransaction.createVault(proposedAddresses, ethers.utils.formatBytes32String(vaultName), rotateThreshold, transactionThreshold, adminThreshold, ethers.utils.formatBytes32String(message.substring(0, message.length - 1)), groupRng, {
            value: feeAmount,
            gasPrice: finalgas.mul(105).div(100),
            gasLimit,
        });
        console.log("unsignedTx : " + unsignedTx);
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit,
        });
        console.log("tx : " + tx);
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    try {
        let res = await vaultFactoryContract
            .connect(signer)
            .createVault(proposedAddresses, ethers.utils.formatBytes32String(vaultName), rotateThreshold, transactionThreshold, adminThreshold, ethers.utils.formatBytes32String(message.substring(0, message.length - 1)), groupRng, {
            value: feeAmount,
            gasPrice: finalgas.mul(105).div(100),
            gasLimit,
        });
        return res;
    }
    catch (e) {
        console.error("Error creating vault: ", e);
        return e;
    }
}
export async function preRegisterStep(vaultAddress, parisEncKey, megaPublicKey, encSharedKey, dbKey, signer, returnHash = false) {
    const provider = signer.provider;
    let gasPrice = await provider.getFeeData();
    let finalgas = gasPrice.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const gasEstimate = await vaultContract.estimateGas.preRegister(parisEncKey, megaPublicKey, encSharedKey, dbKey);
    const gasLimit = gasEstimate.mul(105).div(100);
    if (returnHash) {
        const unsignedTx = await vaultContract.populateTransaction.preRegister(parisEncKey, megaPublicKey, encSharedKey, dbKey, {
            gasPrice: finalgas.mul(105).div(100),
            gasLimit,
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit,
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await vaultContract
        .connect(signer)
        .preRegister(parisEncKey, megaPublicKey, encSharedKey, dbKey, {
        gasPrice: finalgas.mul(105).div(100),
        gasLimit,
    });
}
export async function registerUserAll(vaultAddress, step1Dealings, pedersenOpeningKey, pedersenOpeningKappa, pedersenOpeningLambda, simpleDealingKey, simpleDealingLambda, pedersenTranscriptKey, pedersenTranscriptKappa, pedersenTranscriptLambda, step3Stuff, signer, returnHash = false) {
    const vaultContract = getVaultContract(vaultAddress, signer.provider).connect(signer);
    const p = signer.provider;
    let gasPrice = await p.getFeeData();
    let finalGas = gasPrice.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const gasEstimate = await vaultContract.estimateGas.registerAllSteps(step1Dealings, pedersenOpeningKey, pedersenOpeningKappa, pedersenOpeningLambda, simpleDealingKey, simpleDealingLambda, pedersenTranscriptKey, pedersenTranscriptKappa, pedersenTranscriptLambda, step3Stuff);
    if (returnHash) {
        const unsignedTx = await vaultContract.populateTransaction.registerAllSteps(step1Dealings, pedersenOpeningKey, pedersenOpeningKappa, pedersenOpeningLambda, simpleDealingKey, simpleDealingLambda, pedersenTranscriptKey, pedersenTranscriptKappa, pedersenTranscriptLambda, step3Stuff, {
            gasPrice: finalGas.mul(105).div(100),
            gasLimit: gasEstimate.mul(110).div(100),
            //gasLimit: 10000000,
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit: gasEstimate.mul(110).div(100),
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await vaultContract.registerAllSteps(step1Dealings, pedersenOpeningKey, pedersenOpeningKappa, pedersenOpeningLambda, simpleDealingKey, simpleDealingLambda, pedersenTranscriptKey, pedersenTranscriptKappa, pedersenTranscriptLambda, step3Stuff, {
        gasPrice: finalGas.mul(105).div(100),
        //gasLimit: finalGas.mul(120).div(100),
        gasLimit: gasEstimate.mul(110).div(100),
    });
}
export async function registerUserAllReshare(vaultAddress, step1Dealings, simpleOpeningKeyResharedOnce, pedersenOpeningKappaReshare, pedersenOpeningLambdaReshare, simpleDealingKeyReshareTwice, simpleDealingKappaReshareTwice, transcriptKeyResharedOnce, transcriptKappaResharedOnce, transcriptLambdaResharedOnce, step3Stuff, signer, returnHash) {
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const gasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider).connect(signer);
    const gasEstimate = await vaultContract.estimateGas.registerAllReshareSteps(step1Dealings, simpleOpeningKeyResharedOnce, pedersenOpeningKappaReshare, pedersenOpeningLambdaReshare, simpleDealingKeyReshareTwice, simpleDealingKappaReshareTwice, transcriptKeyResharedOnce, transcriptKappaResharedOnce, transcriptLambdaResharedOnce, step3Stuff);
    const gasLimit = gasEstimate.mul(105).div(100);
    if (returnHash) {
        const unsignedTx = await vaultContract.populateTransaction.registerAllReshareSteps(step1Dealings, simpleOpeningKeyResharedOnce, pedersenOpeningKappaReshare, pedersenOpeningLambdaReshare, simpleDealingKeyReshareTwice, simpleDealingKappaReshareTwice, transcriptKeyResharedOnce, transcriptKappaResharedOnce, transcriptLambdaResharedOnce, step3Stuff, {
            gasPrice: gasPrice.mul(105).div(100),
            gasLimit,
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit,
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await vaultContract.registerAllReshareSteps(step1Dealings, simpleOpeningKeyResharedOnce, pedersenOpeningKappaReshare, pedersenOpeningLambdaReshare, simpleDealingKeyReshareTwice, simpleDealingKappaReshareTwice, transcriptKeyResharedOnce, transcriptKappaResharedOnce, transcriptLambdaResharedOnce, step3Stuff, {
        gasPrice: gasPrice.mul(105).div(100),
        gasLimit,
    });
}
export async function userCompleteVault(vaultAddress, userAddresses, MPK, signer, returnHash) {
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const gasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider).connect(signer);
    const gasEstimate = await vaultContract.estimateGas.completeVault(userAddresses, MPK);
    const gasLimit = gasEstimate.mul(105).div(100);
    if (returnHash) {
        const unsignedTx = await vaultContract.populateTransaction.completeVault(userAddresses, MPK, {
            gasPrice: gasPrice.mul(105).div(100),
            gasLimit,
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit,
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await vaultContract.completeVault(userAddresses, MPK, {
        gasPrice: gasPrice.mul(105).div(100),
        gasLimit,
    });
}
export async function proposeTransaction(vaultAddress, abiEncodedTx, signer, notes, returnHash) {
    //let provider = signer.provider as ethers.providers.StaticJsonRpcProvider;
    const provider = signer.provider;
    const chainId = await provider
        .getNetwork()
        .then((network) => network.chainId);
    let transactionFee = chainId !== 4157
        ? await (await getFeeContract(signer.provider)).getTransactionFeeETH()
        : await (await getFeeContract(signer.provider)).getTransactionFeeXFI();
    let finalTransactionFee = transactionFee.mul(110).div(100);
    //console.log("finalTransactionFee : " + finalTransactionFee.toString());
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const finalGasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider).connect(signer);
    let client;
    if (signer.provider) {
        //provider = signer.provider as ethers.providers.StaticJsonRpcProvider;
        client = await createViemClient(provider);
    }
    else {
        client = await createViemClient(signer);
    }
    const contractAddress = vaultAddress;
    const abi = VaultJson.abi;
    const signerAddress = await signer.getAddress();
    const gE = await client.estimateContractGas({
        address: contractAddress,
        abi,
        functionName: "proposeTransaction",
        args: [abiEncodedTx, notes || "a"], // Provide the arguments for the method
        account: signerAddress,
        value: transactionFee.toBigInt(),
    });
    //console.log(`Estimated Gas: ${gE}`);
    const gasLimit = (gE * BigInt(105)) / BigInt(100);
    //console.log("final gas price: ", gasLimit);
    //const gasEstimate = await vaultContract.estimateGas.proposeTransaction(
    //  abiEncodedTx,
    //  notes || "a",
    //  { value: finalTransactionFee }
    //);
    //const gasLimit = gasEstimate.mul(110).div(100);
    //console.log(Number(transactionFee));
    //console.log(Number(gasLimit));
    //console.log(Number(finalGasPrice));
    if (returnHash) {
        const unsignedTx = await vaultContract.populateTransaction.proposeTransaction(abiEncodedTx, notes, {
            gasPrice: finalGasPrice.mul(105).div(100),
            value: finalTransactionFee,
            gasLimit: gasLimit,
        });
        const tx = await signer.populateTransaction(unsignedTx);
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    //console.log(finalGasPrice);
    //console.log(finalTransactionFee);
    //console.log(gasLimit);
    return await vaultContract
        .connect(signer)
        .proposeTransaction(abiEncodedTx, notes, {
        gasPrice: finalGasPrice.mul(105).div(100),
        value: finalTransactionFee,
        gasLimit: gasLimit,
    });
}
export async function userConfirmTx(vaultAddress, txId, confirmation, signer, returnHash) {
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const gasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider).connect(signer);
    const gasEstimate = await vaultContract.estimateGas.userConfirmTx(txId, confirmation);
    const gasLimit = gasEstimate.mul(105).div(100);
    if (returnHash) {
        const unsignedTx = await vaultContract.populateTransaction.userConfirmTx(txId, confirmation, {
            gasPrice: gasPrice.mul(105).div(100),
            gasLimit,
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit,
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await vaultContract.userConfirmTx(txId, confirmation, {
        gasPrice: gasPrice.mul(105).div(100),
        gasLimit,
    });
}
export async function proposeAddUserInVault(vaultAddress, userToAdd, signer) {
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const gasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    return await getVaultContract(vaultAddress, p)
        .connect(signer)
        .submitUserToAdd(userToAdd, { gasPrice: gasPrice });
}
export async function proposeRotateUserInVault(vaultAddress, userToAdd, userToRemove, signer) {
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const gasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    return await getVaultContract(vaultAddress, signer.provider)
        .connect(signer)
        .submitUsersToRotate(userToAdd, userToRemove, { gasPrice: gasPrice });
}
export async function cancelAddUserInVault(vaultAddress, signer) {
    return await getVaultContract(vaultAddress, signer.provider)
        .connect(signer)
        .cancelUserToAdd();
}
export async function voteFor(vaultAddress, proposalId, signer) {
    return await getVaultContract(vaultAddress, signer.provider)
        .connect(signer)
        .voteFor(proposalId);
}
export async function voteAgainst(vaultAddress, proposalId, signer) {
    return await getVaultContract(vaultAddress, signer.provider)
        .connect(signer)
        .voteAgainst(proposalId);
}
export async function executeProposal(vaultAddress, proposalId, signer) {
    const feeValue = 1000 * 10 ** 9;
    return await getVaultContract(vaultAddress, signer.provider)
        .connect(signer)
        .executeProposal(proposalId, { value: feeValue });
}
/*
  export async function proposeRotationThresholdUpdate(vaultAddress: string, newThreshold: number, signer: Signer) {
    return await getVaultContract(vaultAddress, signer.provider as Provider)
      .connect(signer)
      .proposeRotationThresholdUpdate(newThreshold);
  }
  
  export async function proposeTransactionThresholdUpdate(vaultAddress: string, newThreshold: number, signer: Signer) {
    return await getVaultContract(vaultAddress, signer.provider as Provider)
      .connect(signer)
      .proposeTransactionThresholdUpdate(newThreshold);
  }
  
  export async function proposeAdminThresholdUpdate(vaultAddress: string, newThreshold: number, signer: Signer) {
    return await getVaultContract(vaultAddress, signer.provider as Provider)
      .connect(signer)
      .proposeAdminThresholdUpdate(newThreshold);
  }
  
  export async function proposeVaultNameUpdate(vaultAddress: string, newName: string, signer: Signer) {
    return await getVaultContract(vaultAddress, signer.provider as Provider)
      .connect(signer)
      .proposeVaultNameUpdate(newName);
  }
  */
/*
  export async function reSharingStep1(vaultAddress: string, dealingKey: string, dealingKappa: string, dealingLambda: string, signer: Signer) {
    return await getVaultContract(vaultAddress, signer.provider as Provider)
      .connect(signer)
      .addUserStep1(dealingKey, dealingKappa, dealingLambda);
  }
  
  export async function reSharingStep2(
    vaultAddress: string,
    simpleOpeningKeyResharedOnce: string,
    pedersenOpeningKappaReshare: string,
    pedersenOpeningLambdaReshare: string,
    simpleDealingKeyReshareTwice: string,
    simpleDealingKappaReshare: string,
    transcriptKeyReshareOnce: string,
    transcriptKappaReshare: string,
    transcriptLambdaReshare: string,
    signer: Signer
  ) {
    return await getVaultContract(vaultAddress, signer.provider as Provider)
      .connect(signer)
      .addUserStep2(
        simpleOpeningKeyResharedOnce,
        pedersenOpeningKappaReshare,
        pedersenOpeningLambdaReshare,
        simpleDealingKeyReshareTwice,
        simpleDealingKappaReshare,
        transcriptKeyReshareOnce,
        transcriptKappaReshare,
        transcriptLambdaReshare
      );
  }
  
  export async function reSharingStep3(
    vaultAddress: string,
    simpleKeyReshareTwice: string,
    simpleKappaReshare: string,
    dealingKeyXLambdaReshare: string,
    dealingKappaXLambdaReshare: string,
    transcriptKeyResharedTwice: string,
    transcriptKappaReshare: string,
    signer: Signer
  ) {
    return await getVaultContract(vaultAddress, signer.provider as Provider)
      .connect(signer)
      .addUserStep3(
        simpleKeyReshareTwice,
        simpleKappaReshare,
        dealingKeyXLambdaReshare,
        dealingKappaXLambdaReshare,
        transcriptKeyResharedTwice,
        transcriptKappaReshare
      );
  }
  */
