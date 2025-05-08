import { createPublicClient, http, getContract, custom, defineChain, } from "viem";
import { ethers } from "ethers";
import VaultJson from "../contracts/abi/Vault.json";
import VaultFactoryJson from "../contracts/abi/VaultFactory.json";
import FeeFactoryJson from "../contracts/abi/Fee.json";
import getContractsDetails from "../contracts/contractInfos";
import { chainConfig } from "../../../constants";
export async function createViemClient(provider) {
    let transport;
    let finalClient;
    let accounts;
    if (typeof window !== "undefined" && window.ethereum) {
        accounts = await window.ethereum.request({ method: "eth_accounts" });
    }
    if (accounts > 0 &&
        (window.ethereum.isMetaMask || window.ethereum.isRainbow) &&
        ((provider.connection &&
            !/^(https?|wss?):/.test(provider.connection.url)) ||
            !provider.connection)) {
        console.log("extension provider");
        transport = custom(window.ethereum);
        const chainId = await provider
            .getNetwork()
            .then((network) => network.chainId);
        const chainResult = chainConfig(chainId, transport);
        finalClient = createPublicClient(chainResult || {
            chain: defineChain({
                name: "Unknown Chain",
                id: chainId,
                rpcUrls: {
                    default: {
                        http: [],
                    },
                },
                nativeCurrency: {
                    name: "Unknown",
                    symbol: "UNK",
                    decimals: 18,
                },
            }),
            transport,
        });
    }
    else {
        let p = provider;
        transport = http(p.connection.url);
        const chainId = await provider
            .getNetwork()
            .then((network) => network.chainId);
        const chainResult = chainConfig(chainId, transport);
        finalClient = createPublicClient(chainResult || {
            chain: defineChain({
                name: "Unknown Chain",
                id: chainId,
                rpcUrls: {
                    default: {
                        http: [],
                    },
                },
                nativeCurrency: {
                    name: "Unknown",
                    symbol: "UNK",
                    decimals: 18,
                },
            }),
            transport,
        });
    }
    return finalClient;
}
export function getVaultContractViem(address, client) {
    return getContract({
        address: address,
        abi: VaultJson.abi,
        client,
    });
}
export async function getVaultFactoryContractViem(provider) {
    const client = await createViemClient(provider);
    const FACTORY_ADDRESS = getContractsDetails((await provider.getNetwork()).chainId)?.VaultFactory.address;
    return getContract({
        address: FACTORY_ADDRESS,
        abi: VaultJson.abi,
        client,
    });
}
export async function getVaultFactoryContract(provider) {
    const FACTORY_ADDRESS = getContractsDetails((await provider.getNetwork()).chainId)?.VaultFactory.address;
    return new ethers.Contract(FACTORY_ADDRESS, VaultFactoryJson.abi, provider);
}
export async function getFeeContract(provider) {
    const vaultFactoryContract = await getVaultFactoryContract(provider);
    const FEE_ADDRESS = await vaultFactoryContract.feeContractAddress();
    return new ethers.Contract(FEE_ADDRESS, FeeFactoryJson.abi, provider);
}
export function getVaultContract(vaultAddress, provider) {
    return new ethers.Contract(vaultAddress, VaultJson.abi, provider);
}
