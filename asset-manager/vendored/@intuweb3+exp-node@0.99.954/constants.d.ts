export declare const ARBITRUM_SEPOLIA_GRAPHQL_ENDPOINT = "https://gateway.thegraph.com/api/70bb07548b4596ddde82d039ee7aad5c/subgraphs/id/EEsWwCoxgZCM89Mmv1tq2wpEQdgmHAhm6jYSVyesjz6V";
export declare const XFI_GRAPHQL_ENDPOINT = "https://graph.intu.xyz/subgraphs/name/xfi-test/";
export declare const NOSTR_URL = "https://nostr.intu.xyz";
export declare const ARBITRUM_ONE_GRAPHQL_ENDPOINT = "https://gateway-testnet-arbitrum.network.thegraph.com/api/70bb07548b4596ddde82d039ee7aad5c/subgraphs/id/5hse1wR3m4ZJGktbF6Rvn9nAhvZSp9CjSDu2Lu9h897X";
export declare const getGraphEndpoint: (chainId: number) => string;
export declare const chainConfig: (chainId: number, transport: any) => {
    chain: {
        blockExplorers: {
            readonly default: {
                readonly name: "Arbiscan";
                readonly url: "https://sepolia.arbiscan.io";
                readonly apiUrl: "https://api-sepolia.arbiscan.io/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 81930;
            };
        };
        id: 421614;
        name: "Arbitrum Sepolia";
        nativeCurrency: {
            readonly name: "Arbitrum Sepolia Ether";
            readonly symbol: "ETH";
            readonly decimals: 18;
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://sepolia-rollup.arbitrum.io/rpc"];
            };
        };
        sourceId?: number | undefined;
        testnet: true;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    };
    transport: any;
} | {
    chain: {
        blockExplorers: {
            readonly default: {
                readonly name: "Arbiscan";
                readonly url: "https://arbiscan.io";
                readonly apiUrl: "https://api.arbiscan.io/api";
            };
        };
        contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 7654707;
            };
        };
        id: 42161;
        name: "Arbitrum One";
        nativeCurrency: {
            readonly name: "Ether";
            readonly symbol: "ETH";
            readonly decimals: 18;
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://arb1.arbitrum.io/rpc"];
            };
        };
        sourceId?: number | undefined;
        testnet?: boolean | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    };
    transport: any;
} | {
    chain: {
        blockExplorers?: {
            [key: string]: {
                name: string;
                url: string;
                apiUrl?: string | undefined;
            };
            default: {
                name: string;
                url: string;
                apiUrl?: string | undefined;
            };
        } | undefined | undefined;
        contracts?: {
            [x: string]: import("viem").ChainContract | {
                [sourceId: number]: import("viem").ChainContract | undefined;
            } | undefined;
            ensRegistry?: import("viem").ChainContract | undefined;
            ensUniversalResolver?: import("viem").ChainContract | undefined;
            multicall3?: import("viem").ChainContract | undefined;
            universalSignatureVerifier?: import("viem").ChainContract | undefined;
        } | undefined;
        id: 4157;
        name: "chain";
        nativeCurrency: {
            readonly name: "XFI";
            readonly symbol: "XFI";
            readonly decimals: 18;
        };
        rpcUrls: {
            readonly default: {
                readonly http: readonly [];
            };
        };
        sourceId?: number | undefined | undefined;
        testnet?: boolean | undefined | undefined;
        custom?: Record<string, unknown> | undefined;
        fees?: import("viem").ChainFees<undefined> | undefined;
        formatters?: undefined;
        serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    };
    transport: any;
} | undefined;
