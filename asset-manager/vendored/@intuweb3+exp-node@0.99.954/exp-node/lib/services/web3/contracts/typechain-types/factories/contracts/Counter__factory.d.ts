import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Counter, CounterInterface } from "../../contracts/Counter";
type CounterConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Counter__factory extends ContractFactory {
    constructor(...args: CounterConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Counter>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Counter;
    connect(signer: Signer): Counter__factory;
    static readonly bytecode = "0x6080806040523460145760f8908161001a8239f35b600080fdfe6080806040526004361015601257600080fd5b60003560e01c9081633fb5c1cb1460ab5781638381f58a146092575063d09de08a14603c57600080fd5b34608d576000366003190112608d576000546000198114605e57600101600055005b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600080fd5b34608d576000366003190112608d576020906000548152f35b34608d576020366003190112608d5760043560005500fea26469706673582212209801e94b3249a99fc8083725c27ca81779ea705e0291372530e5b3044b4f46ec64736f6c634300081a0033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "increment";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "number";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "newNumber";
            readonly type: "uint256";
        }];
        readonly name: "setNumber";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): CounterInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Counter;
}
export {};
