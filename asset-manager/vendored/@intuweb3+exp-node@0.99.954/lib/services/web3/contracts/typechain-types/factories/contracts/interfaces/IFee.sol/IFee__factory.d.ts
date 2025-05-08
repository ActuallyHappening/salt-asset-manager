import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IFee, IFeeInterface } from "../../../../contracts/interfaces/IFee.sol/IFee";
export declare class IFee__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "getCreationFeeARB";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCreationFeeETH";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCreationFeeUSDC";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getFeeCollectorAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IFeeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IFee;
}
