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
    const isMetaMaskMobile = (provider?.provider?.namespace === "eip155" &&
        provider?.provider?.name?.includes("MetaMask")) ||
        (provider?.namespace === "eip155" &&
            provider?.name?.includes("MetaMask")) ||
        provider?.provider?.namespace === "eip155" ||
        provider?.namespace === "eip155";
    const isBrowserExtension = typeof window !== "undefined" && window.ethereum;
    if (isMetaMaskMobile) {
        try {
            if (provider?.provider) {
                accounts = await provider.provider.request({ method: "eth_accounts" });
            }
            else {
                accounts = await provider.request({ method: "eth_accounts" });
            }
        }
        catch (error) {
            console.error("Error getting accounts from MetaMask Mobile:", error);
        }
    }
    else if (isBrowserExtension) {
        try {
            accounts = await window.ethereum.request({ method: "eth_accounts" });
        }
        catch (error) { }
    }
    if (accounts > 0 &&
        (isMetaMaskMobile || isBrowserExtension) &&
        (!/^(https?|wss?):/.test(provider.connection?.url) ||
            !/^(https?|wss?):/.test(provider.provider?.connection?.url))) {
        console.log("extension provider");
        if (provider?.provider) {
            transport = custom(provider.provider);
        }
        else if (isBrowserExtension &&
            (window.ethereum?.isMetaMask ||
                window.ethereum?.isRainbow ||
                window.ethereum?.isCoinbaseWallet ||
                window.ethereum?.isTrust)) {
            transport = custom(window.ethereum);
        }
        else {
            transport = custom(provider);
        }
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
export async function createViemClientForTransaction(provider) {
    let transport = http(provider.connection.url);
    const chainId = await provider
        .getNetwork()
        .then((network) => network.chainId);
    const chainResult = chainConfig(chainId, transport);
    return createPublicClient(chainResult || {
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
