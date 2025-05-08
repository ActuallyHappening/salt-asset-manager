import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type { Clones, ClonesInterface } from "../../../../@openzeppelin/contracts/proxy/Clones";
type ClonesConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Clones__factory extends ContractFactory {
    constructor(...args: ClonesConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Clones>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Clones;
    connect(signer: Signer): Clones__factory;
    static readonly bytecode = "0x60808060405234601757603a9081601d823930815050f35b600080fdfe600080fdfea264697066735822122002320dc25d6fc901b4a87f8f5eabc6c488083287cfb1eec35cab400200acde9864736f6c634300081c0033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "CloneArgumentsTooLong";
        readonly type: "error";
    }];
    static createInterface(): ClonesInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Clones;
}
export {};
