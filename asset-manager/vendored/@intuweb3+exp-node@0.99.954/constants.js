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
import { arbitrumSepolia, arbitrum } from "viem/chains";
import { defineChain } from "viem";
export const chainConfig = (chainId, transport) => {
    switch (chainId) {
        case 421614:
            return {
                chain: arbitrumSepolia,
                transport,
            };
        case 42161:
            return {
                chain: arbitrum,
                transport,
            };
        case 4157:
            return {
                chain: defineChain({
                    name: "chain",
                    id: 4157,
                    rpcUrls: {
                        default: {
                            http: [],
                        },
                    },
                    nativeCurrency: {
                        name: "XFI",
                        symbol: "XFI",
                        decimals: 18,
                    },
                }),
                transport,
            };
    }
};
