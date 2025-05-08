import { getVaultContract } from "./helper";
import { ethers } from "ethers";
import { createViemClient, getVaultContractViem } from "./helper";
import { gql, request } from "graphql-request";
import { getGraphEndpoint } from "../../constants.js";
export async function getUserIndex(vaultAddress, userAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = getVaultContractViem(vaultAddress, client);
    const vaultInfos = await vaultContract.read.vaultInfos();
    const users = vaultInfos.users;
    const index = users.findIndex((address) => address.toLowerCase() === userAddress.toLowerCase());
    if (index < 0) {
        const userToAdd = await vaultContract.read.getUserToAdd();
        const matchedUserIndex = userToAdd.findIndex((user) => user.toLowerCase() === userAddress.toLowerCase());
        if (matchedUserIndex >= 0) {
            return users.length + matchedUserIndex;
        }
        else {
            throw new Error(`the given userAddress: ${userAddress} is not found in the user list of the vault address: ${vaultAddress}`);
        }
    }
    return index;
}
export async function getUserPreRegisterInfos(vaultAddress, userAddress, provider) {
    if (provider.isMetaMask || provider.isRainbow) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    const chainId = (await provider.getNetwork()).chainId;
    const query = gql `
    {
      vaultUserPreRegisters(
        where: {
          vaultAddress: "${vaultAddress}"
          user: "${userAddress}"
        }
          orderBy: blockNumber, orderDirection: asc
      ) {
        user
        dbKey
        encSharedKey
        megaPublicKey
        parisEncKey
      }
    }
  `;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    const result = await fetchSubgraphData()
        .then((data) => {
        if (data &&
            data.vaultUserPreRegisters &&
            data.vaultUserPreRegisters.length > 0) {
            return {
                user: data.vaultUserPreRegisters[0].user,
                registered: true,
                parisEncKey: data.vaultUserPreRegisters[0].parisEncKey,
                megaPublicKey: data.vaultUserPreRegisters[0].megaPublicKey,
                encMegaSecretKey: data.vaultUserPreRegisters[0].encSharedKey,
                dbKey: data.vaultUserPreRegisters[0].dbKey,
            };
        }
        else {
            return {
                user: userAddress,
                registered: false,
                parisEncKey: "",
                megaPublicKey: "",
                encMegaSecretKey: "",
                dbKey: "",
            };
        }
    })
        .catch((error) => {
        //console.error(error);
        return {
            user: userAddress,
            registered: false,
            parisEncKey: "",
            megaPublicKey: "",
            encMegaSecretKey: "",
            dbKey: "",
        };
    });
    return result;
}
export async function getUserRegistrationAllInfos(vaultAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = getVaultContractViem(vaultAddress, client);
    const [vaultInfo] = await Promise.all([
        await vaultContract.read.vaultInfos(),
        client.getBlockNumber(),
    ]);
    let users = vaultInfo.users;
    //const resharingOccurred = vaultInfo.resharingOccurred;
    const userRegistrations = new Array(users.length).fill(null);
    const chainId = (await provider.getNetwork()).chainId;
    const query = gql `
{
  vaultUserRegisteredAlls(
    where: {
      vaultAddress: "${vaultAddress}"
    }
      orderBy: blockNumber, orderDirection: asc
  ) {
    user
    step1Dealings
    openingKey
    openingKappa
    openingLambda
    simpleDealingKey
    simpleDealingKappa
    transcriptKey
    transcriptKappa
    transcriptLambda
    step3Crypto
  }
}
`;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    await fetchSubgraphData()
        .then((data) => {
        data.vaultUserRegisteredAlls.forEach((registration) => {
            const userIndex = users.findIndex((user) => user.toLowerCase() === registration.user.toLowerCase());
            if (userIndex !== -1) {
                userRegistrations[userIndex] = {
                    user: registration.user,
                    registered: true,
                    step1Dealings: registration.step1Dealings || "",
                    pedersenOpeningKey: registration.openingKey || "",
                    pedersenOpeningKappa: registration.openingKappa || "",
                    pedersenOpeningLambda: registration.openingLambda || "",
                    simpleDealingKey: registration.simpleDealingKey || "",
                    simpleDealingKappa: registration.simpleDealingKappa || "",
                    pedersenTranscriptKey: registration.transcriptKey || "",
                    pedersenTranscriptKappa: registration.transcriptKappa || "",
                    pedersenTranscriptLambda: registration.transcriptLambda || "",
                    step3Stuff: registration.step3Crypto || "",
                };
            }
        });
    })
        .catch((error) => {
        console.error(error);
    });
    return userRegistrations;
}
export async function getPreRegisterInfos(vaultAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = getVaultContractViem(vaultAddress, client);
    const [parisEncKeyArray, megaPublicKeyArray, encMegaSecretKeyArray, dbPublicKeyArray,] = [[], [], [], []];
    const [vaultInfos, userToAdd = [], userToRemove = []] = await Promise.all([
        vaultContract.read.vaultInfos(),
        vaultContract.read.getUserToAdd().catch(() => []),
        vaultContract.read.getUserToRemove().catch(() => []),
    ]);
    let users = vaultInfos.users;
    if (userToAdd.length > 0) {
        users.push(...userToAdd);
    }
    const chainId = (await provider.getNetwork()).chainId;
    const query = gql `
  {
    vaultUserPreRegisters(
      where: {
        vaultAddress: "${vaultAddress}"
      }
        orderBy: blockNumber, orderDirection: asc
    ) {
      user
      parisEncKey
      megaPublicKey
      encSharedKey
      dbKey
    }
  }
  `;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    await fetchSubgraphData()
        .then((data) => {
        data.vaultUserPreRegisters.forEach((registration) => {
            const userIndex = users.findIndex((user) => user.toLowerCase() === registration.user.toLowerCase());
            if (userIndex !== -1) {
                parisEncKeyArray[userIndex] = registration.parisEncKey;
                megaPublicKeyArray[userIndex] = registration.megaPublicKey;
                encMegaSecretKeyArray[userIndex] = registration.encSharedKey;
                dbPublicKeyArray[userIndex] = registration.dbKey;
            }
        });
    })
        .catch((error) => {
        console.error(error);
    });
    return {
        parisEncKeyArray: parisEncKeyArray,
        megaPublicKeyArray: megaPublicKeyArray,
        encMegaSecretKeyArray: encMegaSecretKeyArray,
        dbPublicKeyArray: dbPublicKeyArray,
    };
}
export async function getRegistrationStep3InfosDB(vaultAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = getVaultContractViem(vaultAddress, client);
    const { users } = (await vaultContract.read.vaultInfos());
    const simpleKeyArray = [];
    const simpleKappaArray = [];
    const dealingKeyXLambdaArray = [];
    const dealingKappaXLambdaArray = [];
    const query = gql `
{
  vaultUserRegisteredAlls(
    where: {
      vaultAddress: "${vaultAddress}"
    }
      orderBy: blockNumber, orderDirection: asc
  ) {
    user
    step3Crypto
  }
}
`;
    const chainId = (await provider.getNetwork()).chainId;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    await fetchSubgraphData()
        .then((data) => {
        data.vaultUserRegisteredAlls.forEach((registration) => {
            const userIndex = users.findIndex((user) => user.toLowerCase() === registration.user.toLowerCase());
            if (userIndex !== -1) {
                const step3Result = JSON.parse(atob(registration.step3Crypto));
                simpleKeyArray[userIndex] = step3Result[0];
                simpleKappaArray[userIndex] = step3Result[1];
                dealingKeyXLambdaArray[userIndex] = step3Result[2];
                dealingKappaXLambdaArray[userIndex] = step3Result[3];
            }
        });
    })
        .catch((error) => {
        console.error(error);
    });
    return {
        simpleKeyArray: simpleKeyArray,
        simpleKappaArray: simpleKappaArray,
        dealingKeyXLambdaArray: dealingKeyXLambdaArray,
        dealingKappaXLambdaArray: dealingKappaXLambdaArray,
    };
}
export async function getRegistrationReshareStep3InfosDB(vaultAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = getVaultContractViem(vaultAddress, client);
    const { users } = (await vaultContract.read.vaultInfos());
    const pedersenDealingsLambdaReshareArray = [];
    const dealingsKeyXLambdaReshareArray = [];
    const dealingsKappaXLambdaReshareArray = [];
    const chainId = (await provider.getNetwork()).chainId;
    const query = gql `
  {
    vaultUserReshareRegisteredAlls(
      where: {
        vaultAddress: "${vaultAddress}"
      }
        orderBy: blockNumber, orderDirection: asc
    ) {
      user
      step3Crypto
      step1Dealings
    }
  }
  `;
    let graphqlEndpoint = getGraphEndpoint(chainId);
    const url = graphqlEndpoint;
    async function fetchSubgraphData() {
        return await request(url, query);
    }
    await fetchSubgraphData()
        .then((data) => {
        data.vaultUserRegisteredAlls.forEach((registration) => {
            const userIndex = users.findIndex((user) => user.toLowerCase() === registration.user.toLowerCase());
            if (userIndex !== -1) {
                const step3Result = JSON.parse(atob(registration[userIndex].step3Stuff));
                const step1Result = JSON.parse(atob(registration[userIndex].step1Dealings));
                pedersenDealingsLambdaReshareArray[userIndex] = step1Result[2];
                dealingsKeyXLambdaReshareArray[userIndex] = step3Result[2];
                dealingsKappaXLambdaReshareArray[userIndex] = step3Result[3];
            }
        });
    })
        .catch((error) => {
        console.error(error);
    });
    return {
        pedersenDealingsLambdaReshareArray,
        dealingsKeyXLambdaReshareArray,
        dealingsKappaXLambdaReshareArray,
    };
}
// need another function to get megapublickeys + new public key that is in the process of resharing registration
export async function getUtilsParams(vaultAddress, userAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = getVaultContractViem(vaultAddress, client);
    const { transactionThreshold, seed } = await vaultContract.read.vaultInfos();
    const index = await getUserIndex(vaultAddress, userAddress, provider);
    let megaPublicKeyArray = [];
    let encMegaSecretKey = [];
    let dbKeyArray = [];
    let result = await getPreRegisterInfos(vaultAddress, provider);
    megaPublicKeyArray = result.megaPublicKeyArray;
    encMegaSecretKey = result.encMegaSecretKeyArray;
    dbKeyArray = result.dbPublicKeyArray;
    return {
        seed: seed,
        threshold: Number(transactionThreshold),
        index: index,
        megaPkArray: megaPublicKeyArray,
        encMegaSecretKey: encMegaSecretKey,
        dbKeyArray: dbKeyArray,
    };
}
export async function getUserSignature(vaultAddress, signer) {
    const vaultContract = getVaultContract(vaultAddress, signer.provider);
    let { encryptionMessage } = await vaultContract.vaultInfos();
    const domain = {};
    const types = {
        SigningVaultEncryptionMessage: [
            { name: "to use your secret share", type: "string" },
        ],
    };
    const value = {
        "to use your secret share": encryptionMessage,
    };
    const finalSigner = signer;
    let result = await finalSigner._signTypedData(domain, types, value);
    return result;
}
/////////////////////////////////////////////////  RESHARING  //////////////////////////////////////////////////
//Steven 5/16/2024 todo --- push resharing has occured as boolean to the vault itself, not logs
// steven to delete and document
//export async function reSharingHasOccurred(
//  vaultAddress: string,
//  provider: Provider,
//  blockRange?: number
//): Promise<boolean> {
//  const vaultContract = getVaultContract(vaultAddress, provider);
//  const vaultinfo = await vaultContract.vaultInfos();
//  let createdBlock = Number(vaultinfo.createdBlock);
//
//  const filter = vaultContract.filters.VaultUserAdded();
//  const br = blockRange || 250000;
//
//  const latestBlock = await provider.getBlockNumber();
//  let vaultUserAddedEvents: any[] = [];
//  for (let i = Number(createdBlock); i <= latestBlock; i += br) {
//    let endblock = i + br;
//    if (endblock > latestBlock) {
//      endblock = latestBlock;
//    }
//    vaultUserAddedEvents = await vaultContract.queryFilter(
//      { topics: filter.topics },
//      Number(createdBlock),
//      latestBlock
//    );
//  }
//  return vaultUserAddedEvents.length > 0;
//}
/*
export async function viemGetUserRegistrationAllInfos(
  vaultAddress: string,
  userAddress: string,
  provider: Provider,
  blockRange?: number
): Promise<RegistrationAll> {
  let date1 = new Date();
  const VaultAbi = VaultJson.abi;
  type VaultAbiType = typeof VaultAbi;
  let p = provider as ethers.providers.StaticJsonRpcProvider;
  const client = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(p.connection.url),
  });
  const vaultContract = getContract({
    address: vaultAddress as `0x${string}`,
    abi: VaultAbi as VaultAbiType,
    client,
  });

  // Fetch vault info and latest block
  const [vaultInfo, latestBlock] = await Promise.all([
    (await vaultContract.read.vaultInfos()) as VaultInfos,
    client.getBlockNumber(),
  ]);

  const [
    parisEncKeyArray,
    megaPublicKeyArray,
    encMegaSecretKeyArray,
    dbPublicKeyArray,
  ]: [string[], string[], string[], string[]] = [[], [], [], []];

  const resharingOccurred = vaultInfo.resharingOccurred;
  const users = vaultInfo.users;
  const createdBlock = Number(vaultInfo.createdBlock);
  const br = Number(blockRange) || 250000;
  const VaultUserRegisteredAllArray: any[] = [];
  const VaultUserReshareRegisteredAllArray: any[] = [];
  const results: Record<string, any> = {};

  // Create event filters
  const filter1 = await client.createContractEventFilter({
    eventName: "VaultUserRegisteredAll",
    address: vaultAddress as `0x${string}`,
    abi: VaultAbi as VaultAbiType,
    args: { user: userAddress },
  });

  const filter2 = await client.createContractEventFilter({
    eventName: "VaultUserReshareRegisteredAll",
    address: vaultAddress as `0x${string}`,
    abi: VaultAbi as VaultAbiType,
    args: { user: userAddress },
  });

  const filters = [filter1, filter2];

  await Promise.all(
    filters.map(async (filter) => {
      for (let i = Number(createdBlock); i <= latestBlock; i += br) {
        const endBlock = i + br - 1 > latestBlock ? latestBlock : i + br - 1;
        const logs = await client.getLogs({
          address: vaultAddress as `0x${string}`,
          events: [
            parseAbiItem("event VaultUserRegisteredAll(address indexed user)"),
            parseAbiItem(
              "event VaultUserReshareRegisteredAll(address indexed user)"
            ),
          ],
          fromBlock: BigInt(i),
          toBlock: BigInt(endBlock),
        });

        logs.forEach((log) => {
          const { args, eventName } = decodeEventLog({
            abi: VaultAbi,
            data: log.data,
            topics: log.topics,
          }) as unknown as {
            args: VaultUserPreRegisterEventArgs;
            eventName: string;
          };

          if (eventName === "VaultUserRegisteredAll") {
            VaultUserRegisteredAllArray.push(log);
          } else if (eventName === "VaultUserReshareRegisteredAll") {
            VaultUserReshareRegisteredAllArray.push(log);
          }

          if (args) {
            const userIndex = users.findIndex((user) => user === args.user);
            if (userIndex !== -1) {
              parisEncKeyArray[userIndex] = args._parisEncKey;
              megaPublicKeyArray[userIndex] = args._megaPublicKey;
              encMegaSecretKeyArray[userIndex] = args._encSharedKey;
              dbPublicKeyArray[userIndex] = args._dbKey;
              results[args.user] = true;
            }
          }
        });
      }
    })
  );

  let date2 = new Date();
  console.log(
    "Time to getUserRegAllInfos: ",
    date2.getTime() - date1.getTime()
  );
  if (VaultUserReshareRegisteredAllArray.length > 0) {
    return {
      user: userAddress,
      registered: true,
      step1Dealings: VaultUserReshareRegisteredAllArray.step1Dealings,
      simpleOpeningKeyResharedOnce:
        VaultUserReshareRegisteredAllArray.simpleOpeningKeyResharedOnce,
      pedersenOpeningKappaReshare:
        VaultUserReshareRegisteredAllArray.pedersenOpeningKappaReshare,
      pedersenOpeningLambdaReshare:
        VaultUserReshareRegisteredAllArray.pedersenOpeningLambdaReshare,
      simpleDealingKeyReshareTwice:
        VaultUserReshareRegisteredAllArray.simpleDealingKeyReshareTwice,
      simpleDealingKappaReshareTwice:
        VaultUserReshareRegisteredAllArray.simpleDealingKappaReshareTwice,
      transcriptKeyResharedOnce:
        VaultUserReshareRegisteredAllArray.transcriptKeyResharedOnce,
      transcriptKappaResharedOnce:
        VaultUserReshareRegisteredAllArray.transcriptKappaResharedOnce,
      transcriptLambdaResharedOnce:
        VaultUserReshareRegisteredAllArray.transcriptLambdaResharedOnce,
      step3Stuff: VaultUserReshareRegisteredAllArray.step3Stuff,
    };
  } else if (VaultUserRegisteredAllArray.length > 0) {
    for (const vur of VaultUserRegisteredAllArray) {
      const logDescription = vaultContract.decodeEventLog({
        eventName: "VaultUserRegisteredAll",
        data: vur.data,
        topics: vur.topics,
      });

      return {
        user: userAddress,
        registered: true,
        step1Dealings: logDescription.args.step1Dealings,
        pedersenOpeningKey: logDescription.args.pedersenOpeningKey,
        pedersenOpeningKappa: logDescription.args.pedersenOpeningKappa,
        pedersenOpeningLambda: logDescription.args.pedersenOpeningLambda,
        simpleDealingKey: logDescription.args.simpleDealingKey,
        simpleDealingKappa: logDescription.args.simpleDealingKappa,
        pedersenTranscriptKey: logDescription.args.pedersenTranscriptKey,
        pedersenTranscriptKappa: logDescription.args.pedersenTranscriptKappa,
        pedersenTranscriptLambda: logDescription.args.pedersenTranscriptLambda,
        step3Stuff: logDescription.args.step3Stuff,
      };
    }
  }
  return {
    user: userAddress,
    registered: false,
    step1Dealings: "",
    pedersenOpeningKey: "",
    pedersenOpeningKappa: "",
    pedersenOpeningLambda: "",
    simpleDealingKey: "",
    simpleDealingKappa: "",
    pedersenTranscriptKey: "",
    pedersenTranscriptKappa: "",
    pedersenTranscriptLambda: "",
    step3Stuff: "",
  };
}
*/
