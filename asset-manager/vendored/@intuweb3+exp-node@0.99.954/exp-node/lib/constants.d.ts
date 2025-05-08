import { ethers } from "ethers";
export declare const ARBITRUM_SEPOLIA_GRAPHQL_ENDPOINT = "https://gateway.thegraph.com/api/70bb07548b4596ddde82d039ee7aad5c/subgraphs/id/EEsWwCoxgZCM89Mmv1tq2wpEQdgmHAhm6jYSVyesjz6V";
export declare const XFI_GRAPHQL_ENDPOINT = "https://graph.intu.xyz/subgraphs/name/xfi-test/";
export declare const NOSTR_URL = "https://nostr.intu.xyz";
export declare const ARBITRUM_ONE_GRAPHQL_ENDPOINT = "https://gateway-testnet-arbitrum.network.thegraph.com/api/70bb07548b4596ddde82d039ee7aad5c/subgraphs/id/5hse1wR3m4ZJGktbF6Rvn9nAhvZSp9CjSDu2Lu9h897X";
export declare const getGraphEndpoint: (chainId: number) => string;
export declare const getProviderForChain: (chainId: string | Number) => ethers.providers.JsonRpcProvider;
export declare function chainConfig(chainId: number, transport: any): {
    chain: any;
    transport: any;
} | undefined;
