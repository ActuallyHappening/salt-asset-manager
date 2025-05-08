import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type { Create2, Create2Interface } from "../../../../@openzeppelin/contracts/utils/Create2";
type Create2ConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Create2__factory extends ContractFactory {
    constructor(...args: Create2ConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Create2>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Create2;
    connect(signer: Signer): Create2__factory;
    static readonly bytecode = "0x60808060405234601757603a9081601d823930815050f35b600080fdfe600080fdfea26469706673582212203d50decfdd63d9889164ebf707b76a0d0454f2e9a6cc13f4efcae32a6d7e194964736f6c634300081c0033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "Create2EmptyBytecode";
        readonly type: "error";
    }];
    static createInterface(): Create2Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): Create2;
}
export {};
