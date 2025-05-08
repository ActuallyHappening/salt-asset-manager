import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { AggregatorV3Interface, AggregatorV3InterfaceInterface } from "../../../contracts/Fee.sol/AggregatorV3Interface";
export declare class AggregatorV3Interface__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "latestRoundData";
        readonly outputs: readonly [{
            readonly internalType: "uint80";
            readonly name: "roundId";
            readonly type: "uint80";
        }, {
            readonly internalType: "int256";
            readonly name: "answer";
            readonly type: "int256";
        }, {
            readonly internalType: "uint256";
            readonly name: "startedAt";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "updatedAt";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint80";
            readonly name: "answeredInRound";
            readonly type: "uint80";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): AggregatorV3InterfaceInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AggregatorV3Interface;
}
