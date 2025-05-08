import { arbitrumSepolia, arbitrum, sepolia, optimismSepolia, } from "viem/chains";
import { defineChain } from "viem";
import { ethers } from "ethers";
export const ARBITRUM_SEPOLIA_GRAPHQL_ENDPOINT = "https://gateway.thegraph.com/api/70bb07548b4596ddde82d039ee7aad5c/subgraphs/id/EEsWwCoxgZCM89Mmv1tq2wpEQdgmHAhm6jYSVyesjz6V";
//"https://api.studio.thegraph.com/query/97402/intu-arbsepolia/v0.1.2";
export const XFI_GRAPHQL_ENDPOINT = "https://graph.intu.xyz/subgraphs/name/xfi-test/";
export const NOSTR_URL = "https://nostr.intu.xyz";
export const ARBITRUM_ONE_GRAPHQL_ENDPOINT = "https://gateway-testnet-arbitrum.network.thegraph.com/api/70bb07548b4596ddde82d039ee7aad5c/subgraphs/id/5hse1wR3m4ZJGktbF6Rvn9nAhvZSp9CjSDu2Lu9h897X";
export const getGraphEndpoint = (chainId) => {
    if (chainId === 4157) {
        return XFI_GRAPHQL_ENDPOINT;
    }
    else if (chainId === 421614) {
        return ARBITRUM_SEPOLIA_GRAPHQL_ENDPOINT;
    }
    else
        return ARBITRUM_ONE_GRAPHQL_ENDPOINT;
};
export const getProviderForChain = (chainId) => {
    const rpcEndpoints = {
        "97": "https://data-seed-prebsc-1-s1.binance.org:8545/",
        "80002": "https://rpc-amoy.polygon.technology/",
        "43113": "https://avalanche-fuji-c-chain-rpc.publicnode.com",
        "4002": "https://fantom.api.onfinality.io/public",
        "11155420": "https://endpoints.omniatech.io/v1/op/sepolia/public",
        "11155111": "https://1rpc.io/sepolia",
        "421614": "https://arbitrum-sepolia.rpc.thirdweb.com",
        "42161": "https://endpoints.omniatech.io/v1/arbitrum/one/public",
        "1287": "https://moonbase-alpha.public.blastapi.io",
        "84532": "https://base-sepolia.gateway.tenderly.co",
        "2000": "https://rpc.dogechain.dog",
        "4157": "https://crossfi-testnet.public.blastapi.io/",
    };
    const endpoint = rpcEndpoints[chainId.toString()];
    if (!endpoint) {
        throw new Error(`Unsupported chainId: ${chainId}`);
    }
    return new ethers.providers.JsonRpcProvider(endpoint);
};
const BNB_TESTNET = defineChain({
    id: 97,
    name: "BNB Chain Testnet",
    nativeCurrency: { name: "tBNB", symbol: "tBNB", decimals: 18 },
    rpcUrls: { default: { http: [] } },
});
const POLYGON_AMOY = defineChain({
    id: 80002,
    name: "Polygon Amoy",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: { default: { http: [] } },
});
const AVALANCHE_FUJI = defineChain({
    id: 43113,
    name: "Avalanche Fuji",
    nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
    rpcUrls: { default: { http: [] } },
});
const FANTOM_TESTNET = defineChain({
    id: 4002,
    name: "Fantom Testnet",
    nativeCurrency: { name: "FTM", symbol: "FTM", decimals: 18 },
    rpcUrls: { default: { http: [] } },
});
const MOONBASE_ALPHA = defineChain({
    id: 1287,
    name: "Moonbase Alpha",
    nativeCurrency: { name: "DEV", symbol: "DEV", decimals: 18 },
    rpcUrls: { default: { http: [] } },
});
const BASE_SEPOLIA = defineChain({
    id: 84532,
    name: "Base Sepolia",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: { default: { http: [] } },
});
const DOGECHAIN = defineChain({
    id: 2000,
    name: "Dogechain",
    nativeCurrency: { name: "DOGE", symbol: "DOGE", decimals: 18 },
    rpcUrls: { default: { http: [] } },
});
const CROSSFI_TESTNET = defineChain({
    id: 4157,
    name: "CrossFi Testnet",
    nativeCurrency: { name: "XFI", symbol: "XFI", decimals: 18 },
    rpcUrls: { default: { http: [] } },
});
export function chainConfig(chainId, transport) {
    switch (chainId) {
        case 421614: // Arbitrum Sepolia
            return { chain: arbitrumSepolia, transport };
        case 42161: // Arbitrum One
            return { chain: arbitrum, transport };
        case 11155111: // Ethereum Sepolia
            return { chain: sepolia, transport };
        case 11155420: // Optimism Sepolia
            return { chain: optimismSepolia, transport };
        case 97: // BNB Chain Testnet
            return { chain: BNB_TESTNET, transport };
        case 80002: // Polygon Amoy
            return { chain: POLYGON_AMOY, transport };
        case 43113: // Avalanche Fuji
            return { chain: AVALANCHE_FUJI, transport };
        case 4002: // Fantom Testnet
            return { chain: FANTOM_TESTNET, transport };
        case 1287: // Moonbase Alpha
            return { chain: MOONBASE_ALPHA, transport };
        case 84532: // Base Sepolia
            return { chain: BASE_SEPOLIA, transport };
        case 2000: // Dogechain
            return { chain: DOGECHAIN, transport };
        case 4157: // CrossFi Testnet
            return { chain: CROSSFI_TESTNET, transport };
        default:
            console.warn(`Chain ID ${chainId} not found in predefined configurations.`);
            return undefined;
    }
}
