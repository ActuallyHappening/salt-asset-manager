import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IDIAOracleV2, IDIAOracleV2Interface } from "../../../contracts/Fee.sol/IDIAOracleV2";
export declare class IDIAOracleV2__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly name: "getValue";
        readonly outputs: readonly [{
            readonly internalType: "uint128";
            readonly name: "";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128";
            readonly name: "";
            readonly type: "uint128";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IDIAOracleV2Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IDIAOracleV2;
}
