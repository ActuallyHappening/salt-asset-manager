import { getVaultContract, getVaultFactoryContract } from "./helper";
import { getProposal, getTransaction } from "..";
import { getPreRegisterInfos } from "./utils";
import getContractsDetails from "./contracts/contractInfos";
import { gql, request } from "graphql-request";
import { getGraphEndpoint } from "../../constants.js";
export async function getVault(vaultAddress, provider) {
    const date1 = new Date();
    const vaultContract = getVaultContract(vaultAddress, provider);
    console.log("getVaultvaultinfos");
    const vaultinfo = await vaultContract.vaultInfos();
    let rotateThreshold = vaultinfo.rotateThreshold;
    let transactionThreshold = vaultinfo.transactionThreshold;
    let adminThreshold = vaultinfo.adminThreshold;
    let createdDate = vaultinfo.createdDate;
    let createdBlock = vaultinfo.createdBlock.toNumber();
    let name = vaultinfo.name;
    const proposalCount = (await vaultContract.getProposalCounter()).toNumber();
    const txCount = vaultinfo.transactionCount.toNumber();
    //const vaultComplete = vaultinfo.completed;
    const dEOA = vaultinfo.masterPublicKey;
    const users = Promise.all((await vaultContract.vaultInfos()).users.map(async (user) => {
        return _getVaultUser(vaultContract, user);
    }));
    const date2 = new Date();
    console.log("getVault -: ", date2.getTime() - date1.getTime());
    return {
        users: await users,
        transactionCount: txCount,
        proposalCount: proposalCount,
        vaultAddress: vaultAddress,
        name: name,
        rotateThreshold: Number(rotateThreshold),
        transactionThreshold: Number(transactionThreshold),
        adminThreshold: Number(adminThreshold),
        createdDate: createdDate.toNumber(),
        birthBlock: Number(createdBlock),
        masterPublicAddress: dEOA,
    };
}
export async function _getProposal(vaultAddress, proposalId, provider, abiCoder) {
    const vaultContract = getVaultContract(vaultAddress, provider);
    const { createdBlock } = await vaultContract.vaultInfos();
    const filter = vaultContract.filters.ProposalCreated(proposalId);
    const proposalCreatedEvent = (await vaultContract.queryFilter({ topics: filter.topics }, Number(createdBlock)))[0];
    const logDescription = vaultContract.interface.parseLog({
        topics: proposalCreatedEvent.topics,
        data: proposalCreatedEvent.data,
    });
    const propInfo = await vaultContract.proposalInfos(proposalId);
    let data = "";
    switch (logDescription.args[1]) {
        case 0:
            data = abiCoder.decode(["address"], logDescription.args[2])[0];
            break;
        case 1:
            data = abiCoder.decode(["address"], logDescription.args[2])[0];
            break;
        case 2:
            data = abiCoder.decode(["uint"], logDescription.args[2])[0];
            break;
        case 3:
            data = abiCoder.decode(["uint"], logDescription.args[2])[0];
            break;
        case 4:
            data = abiCoder.decode(["uint"], logDescription.args[2])[0];
            break;
        case 5:
            data = abiCoder.decode(["string"], logDescription.args[2])[0];
            break;
    }
    const proposalUsers = [];
    const { users } = await vaultContract.vaultInfos();
    for (const u of users) {
        const voteInfo = await vaultContract.proposalVoteUserInfos(proposalId, u);
        proposalUsers.push({
            address: u,
            voteStatus: voteInfo,
        });
    }
    return {
        id: propInfo.id.toNumber(),
        voteForNeeded: propInfo.voteForNeeded,
        voteFor: propInfo.voteForCount,
        endTime: propInfo.endTime.toNumber(),
        executed: propInfo.executed,
        type: logDescription.args[1],
        data: data,
        users: proposalUsers,
    };
}
export async function _getTransactions(vaultAddress, provider) {
    const vaultContract = getVaultContract(vaultAddress, provider);
    const { id, votesNeeded } = await vaultContract.transactionInfos(1);
    const chainId = (await provider.getNetwork()).chainId;
    const query = gql `
  {
    transactionProposeds(
    where: { vaultAddress: "${vaultAddress}" }
    orderBy: blockNumber, orderDirection: asc
    ) {
	txId
    transactionHash
    transactionInfo
    notes
  }
    transactionUserConfirmeds(where:{vaultAddress: "${vaultAddress}"} orderBy: blockNumber, orderDirection: asc) {
    txId
    signedTransaction
    user
  }
  }
`;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    const transactions = await fetchSubgraphData()
        .then((data) => {
        return data.transactionProposeds.map((tx) => {
            const signedTransactions = data.transactionUserConfirmeds
                .filter((confirmedTx) => confirmedTx.txId === tx.txId)
                .map((confirmedTx) => ({
                user: confirmedTx.user,
                signedTransaction: confirmedTx.signedTransaction,
            }));
            return {
                id: tx.txId,
                transactionData: tx.transactionInfo,
                transactionNotes: tx.notes,
                signedTransactionsNeeded: Number(votesNeeded),
                userSignedTransactions: signedTransactions,
            };
        });
    })
        .catch((error) => {
        console.error(error);
        return {
            id: 0,
            transactionData: "",
            transactionNotes: "",
            signedTransactionsNeeded: Number(votesNeeded),
            userSignedTransactions: [],
        };
    });
    return transactions;
}
export async function _getTransaction(vaultAddress, txId, provider) {
    const vaultContract = getVaultContract(vaultAddress, provider);
    const { id, votesNeeded } = await vaultContract.transactionInfos(txId);
    const chainId = (await provider.getNetwork()).chainId;
    const query = gql `
  {
    transactionProposeds(
    where: { vaultAddress: "${vaultAddress}", txId: "${txId}" }
    orderBy: blockNumber, orderDirection: asc
    ) {
	txId
    transactionHash
    transactionInfo
    notes
  }
    transactionUserConfirmeds(where:{vaultAddress: "${vaultAddress}", txId: "${txId}"} orderBy: blockNumber, orderDirection: asc) {
    signedTransaction
    user
  }
  }
`;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    const transactions = await fetchSubgraphData()
        .then((data) => {
        if (data.transactionProposeds.length > 0) {
            const tx = data.transactionProposeds[0];
            const signedTransactions = data.transactionUserConfirmeds.map((confirmedTx) => ({
                user: confirmedTx.user,
                signedTransaction: confirmedTx.signedTransaction,
            }));
            return {
                id: tx.txId,
                transactionData: tx.transactionInfo,
                transactionNotes: tx.notes,
                signedTransactionsNeeded: Number(votesNeeded),
                userSignedTransactions: signedTransactions,
            };
        }
        else {
            return {
                id: 0,
                transactionData: "",
                transactionNotes: "",
                signedTransactionsNeeded: Number(votesNeeded),
                userSignedTransactions: [],
            };
        }
    })
        .catch((error) => {
        console.error(error);
        return {
            id: 0,
            transactionData: "",
            transactionNotes: "",
            signedTransactionsNeeded: Number(votesNeeded),
            userSignedTransactions: [],
        };
    });
    return transactions;
}
export async function _getTransactionLean(vaultAddress, txId, provider) {
    const vaultContract = getVaultContract(vaultAddress, provider);
    const { id, votesNeeded } = await vaultContract.transactionInfos(txId);
    const query = gql `
  {
    transactionProposeds(
    where: { vaultAddress: "${vaultAddress}", txId: "${txId}" }
    ) {
    transactionHash
    transactionInfo
    notes
  }
  }
`;
    const chainId = (await provider.getNetwork()).chainId;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    return await fetchSubgraphData()
        .then((data) => {
        const transaction = {
            id: id.toNumber(),
            transactionData: data.transactionProposeds[0].transactionInfo,
            transactionNotes: data.transactionProposeds[0].notes,
            signedTransactionsNeeded: Number(votesNeeded),
            userSignedTransactions: [],
        };
        return transaction;
    })
        .catch((error) => {
        console.error(error);
        return {
            id: 0,
            transactionData: "",
            transactionNotes: "",
            signedTransactionsNeeded: Number(votesNeeded),
            userSignedTransactions: [],
        };
    });
}
export async function getFilteredUserInitializedLogs(userAddress, provider) {
    let testFinalArray = [];
    const query = gql `
  {
    vaultCreateds(
    first: 1000
    where: { proposedAddresses_contains: ["${userAddress}"] }
    orderBy: blockNumber, orderDirection: asc
    ) {
      vaultAddress
    }
  }
`;
    const chainId = (await provider.getNetwork()).chainId;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    let graphResult = await fetchSubgraphData()
        .then((data) => {
        return data;
    })
        .catch((error) => {
        console.error(error);
        return { data: { vaults: [] } };
    });
    if (graphResult.vaultCreateds) {
        testFinalArray = graphResult.vaultCreateds.map((item) => item.vaultAddress);
    }
    const flatArray = testFinalArray.flat();
    return flatArray;
}
export async function getFilteredUserInitializedLogsSingle(userAddress, provider) {
    const date1 = new Date();
    let testFinalArray = [];
    const query = gql `
  {
    vaultCreateds(
    where: { proposedAddresses_contains: ["${userAddress}"] }
    orderBy: blockNumber, orderDirection: asc
    ) {
      vaultAddress
    }
  }
`;
    const chainId = (await provider.getNetwork()).chainId;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    let graphResult = await fetchSubgraphData()
        .then((data) => {
        return data;
    })
        .catch((error) => {
        console.error(error);
        return { data: { vaults: [] } };
    });
    if (graphResult.vaultCreateds) {
        testFinalArray = graphResult.vaultCreateds.map((item) => item.vaultAddress);
    }
    const date2 = new Date();
    if (process.env.DEBUG) {
        console.log("getFilteredUserInitializedLogsSingle : ", date2.getTime() - date1.getTime());
    }
    return testFinalArray;
}
export async function getFilteredUserInitializedLogsSingleWithDeoa(masterPublicAddress, provider) {
    const date1 = new Date();
    let testFinalArray = [];
    const query = gql `
  {
    vaultCompleteds(
    where: { masterPubKey: "${masterPublicAddress}" }
    orderBy: blockNumber, orderDirection: asc
    ) {
      vaultAddress
    }
  }
`;
    const chainId = (await provider.getNetwork()).chainId;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    let graphResult = await fetchSubgraphData()
        .then((data) => {
        return data;
    })
        .catch((error) => {
        console.error(error);
        return { data: { vaults: [] } };
    });
    if (graphResult.vaultCompleteds) {
        testFinalArray = graphResult.vaultCompleteds.map((item) => item.vaultAddress);
    }
    const date2 = new Date();
    if (process.env.DEBUG) {
        console.log("getFilteredUserInitializedLogsSingle : ", date2.getTime() - date1.getTime());
    }
    return testFinalArray;
}
async function _getVaultUser(vaultContract, userAddress) {
    const { isRegistered } = await vaultContract.userInfos(userAddress);
    return {
        address: userAddress,
        isRegistered: isRegistered,
    };
}
export async function getUsersMegaPublicKeysReShare(vaultAddress, provider) {
    const vaultContract = getVaultContract(vaultAddress, provider);
    const { megaPublicKeyArray } = await getPreRegisterInfos(vaultAddress, provider);
    //const { users } = await vaultContract.vaultInfos();
    //steven the following comment lines need to be addressed for when removing a user july 282024
    //const newUserAddress = await vaultContract.getUserToAdd();
    //const addressToRemove = await vaultContract.userToRemove(0);
    //const removedUserIndex = users.findIndex((address:any) => address === addressToRemove);
    //if (addressToRemove.length > 0) {
    //  const result = await getUserPreRegisterInfos(vaultAddress, newUserAddress[0], provider);
    //  megaPublicKeyArray[removedUserIndex] = (result.megaPublicKey);
    //} else if (addressToRemove.length == 0 && newUserAddress.length > 0) {
    //for (const newUser of newUserAddress) {
    //  const result = await getUserPreRegisterInfos(vaultAddress, newUser, provider);
    //  megaPublicKeyArray.push(result.megaPublicKey);
    //}
    //}
    return megaPublicKeyArray;
}
export async function getRotationVaultAddresses(userAddress, provider) {
    const factoryContract = await getVaultFactoryContract(provider);
    const baseVaultAddress = await factoryContract.impl();
    const baseVault = getVaultContract(baseVaultAddress, provider);
    const birthFactoryBlock = getContractsDetails((await provider.getNetwork()).chainId)?.VaultFactory.birthBlock;
    const filterVaultRotateUserRequested = baseVault.filters.VaultRotateUserRequested();
    const vaultRotateUserRequestedLogs = await provider.getLogs({
        ...filterVaultRotateUserRequested,
        fromBlock: birthFactoryBlock,
    });
    return vaultRotateUserRequestedLogs.map((log) => log.address);
}
export async function getSingleVaultDetails(vaultAddress, provider) {
    let vault = await getVault(vaultAddress, provider);
    const [proposals, transactions] = await Promise.all([
        Promise.all(Array.from({ length: vault.proposalCount }, (_, i) => getProposal(vaultAddress, i + 1, provider))),
        Promise.all(Array.from({ length: vault.transactionCount }, (_, i) => getTransaction(vaultAddress, i + 1, provider))),
    ]);
    return {
        ...vault,
        proposals: proposals,
        transactions: transactions,
    };
}
/*
export async function getRegistrationStatus(vaultAddress: string, userAddress: string, provider: Provider) {
  let stepToDo: string;
  let groupStep: string;
  const otherUsers = (await getVaultContract(vaultAddress, provider).vaultInfos()).users.filter((u) => u != userAddress);
  const preRegistration = await getUserPreRegisterInfos(vaultAddress, userAddress, provider);
  if (preRegistration.registered) {
    const step1 = await getUserRegistrationStep1Infos(vaultAddress, userAddress, provider);
    if (step1.pedersenDealingKey.length > 2) {
      const step2 = await getUserRegistrationStep2Infos(vaultAddress, userAddress, provider);
      if (step2.pedersenOpeningLambda.length > 2) {
        const step3 = await getUserRegistrationStep3Infos(vaultAddress, userAddress, provider);
        if (step3.simpleTranscriptKey.length > 2) {
          stepToDo = STEP.DONE;
          groupStep = (await hasAllUsersExecutedStep(vaultAddress, otherUsers, "REGISTER_STEP3", provider)) ? STEP.DONE : STEP.STEP3;
        } else {
          stepToDo = STEP.STEP3;
          groupStep = (await hasAllUsersExecutedStep(vaultAddress, otherUsers, "REGISTER_STEP2", provider)) ? STEP.STEP3 : STEP.STEP2;
        }
      } else {
        stepToDo = STEP.STEP2;
        groupStep = (await hasAllUsersExecutedStep(vaultAddress, otherUsers, "REGISTER_STEP1", provider)) ? STEP.STEP2 : STEP.STEP1;
      }
    } else {
      stepToDo = STEP.STEP1;
      groupStep = (await hasAllUsersExecutedStep(vaultAddress, otherUsers, "PREREGISTER", provider)) ? STEP.STEP1 : STEP.PREREGISTRATION;
    }
  } else {
    stepToDo = STEP.PREREGISTRATION;
    groupStep = STEP.PREREGISTRATION;
  }

  return { stepToDo, groupStep };
}

export async function getReSharingStatus(vaultAddress: string, userAddress: string, provider: Provider) {
  let stepToDo: string;
  let groupStep: string;
  const userToAdd = await getVaultContract(vaultAddress, provider).getUserToAdd();
  const users = (await getVaultContract(vaultAddress, provider).vaultInfos()).users.map((u) => u);
  users.push(...userToAdd);
  const otherUsers = users.filter((u) => u != userAddress);
  stepToDo = STEP.STEP1;
  groupStep = STEP.PREREGISTRATION;

  for (const newUser of userToAdd) {
  const preRegistration = await getUserPreRegisterInfos(vaultAddress, newUser, provider);
  if (preRegistration.registered) {
    const step1 = await getUserReSharingStep1Infos(vaultAddress, userAddress, provider);
    if (step1.registered) {
      const step2 = await getUserReSharingStep2Infos(vaultAddress, userAddress, provider);
      if (step2.registered) {
        const step3 = await getUserReSharingStep3Infos(vaultAddress, userAddress, provider);
        if (step3.registered) {
          stepToDo = STEP.DONE;
          groupStep = (await hasAllUsersExecutedStep(vaultAddress, otherUsers, "RESHARING_STEP3", provider)) ? STEP.DONE : STEP.STEP3;
        } else {
          stepToDo = STEP.STEP3;
          groupStep = (await hasAllUsersExecutedStep(vaultAddress, otherUsers, "RESHARING_STEP2", provider)) ? STEP.STEP3 : STEP.STEP2;
        }
      } else {
        stepToDo = STEP.STEP2;
        groupStep = (await hasAllUsersExecutedStep(vaultAddress, otherUsers, "RESHARING_STEP1", provider)) ? STEP.STEP2 : STEP.STEP1;
      }
    } else {
      stepToDo = STEP.STEP1;
      groupStep = STEP.STEP1;
    }
  } else {
    stepToDo = newUser == userAddress ? STEP.PREREGISTRATION : STEP.STEP1;
    groupStep = STEP.PREREGISTRATION;
  }
}
  return { stepToDo, groupStep };
}
*/
