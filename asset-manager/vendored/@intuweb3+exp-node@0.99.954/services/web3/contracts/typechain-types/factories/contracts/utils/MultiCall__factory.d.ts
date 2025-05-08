import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { MultiCall, MultiCallInterface } from "../../../contracts/utils/MultiCall";
type MultiCallConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MultiCall__factory extends ContractFactory {
    constructor(...args: MultiCallConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<MultiCall>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): MultiCall;
    connect(signer: Signer): MultiCall__factory;
    static readonly bytecode = "0x608080604052346015576103c6908161001b8239f35b600080fdfe6080604052600436101561001257600080fd5b60003560e01c63252dba421461002757600080fd5b346102f15760203660031901126102f15760043567ffffffffffffffff81116102f157366023820112156102f157806004013561006b61006682610332565b61030c565b916024602084848152019260051b820101903682116102f15760248101925b828410610228578451856100a061006683610332565b918083526100b0601f1991610332565b0160005b81811061021757505060005b815181101561017e5760008073ffffffffffffffffffffffffffffffffffffffff6100eb8486610366565b51511660206100fa8587610366565b51015190602082519201905afa903d15610176573d9161011c6100668461034a565b9283523d6000602085013e5b1561014c5760019161013a8286610366565b526101458185610366565b50016100c0565b7f3204506f0000000000000000000000000000000000000000000000000000000060005260046000fd5b606091610128565b8260405160408101914382526040602083015280518093526060820192602060608260051b8501019201906000945b8186106101ba5784840385f35b909192605f19858203018252835180519081835260005b82811061020257505060208083836000838096600198010152601f80199101160101950192019501949190916101ad565b806020809284010151828287010152016101d1565b8060606020809387010152016100b4565b833567ffffffffffffffff81116102f157820190604060231983360301126102f157604051916040830183811067ffffffffffffffff8211176102f657604052602481013573ffffffffffffffffffffffffffffffffffffffff811681036102f1578352604481013567ffffffffffffffff81116102f15760249101019036601f830112156102f1578135926102c06100668561034a565b84815236602086860101116102f157600060208681978280980183860137830101528382015281520193019261008a565b600080fd5b634e487b7160e01b600052604160045260246000fd5b6040519190601f01601f1916820167ffffffffffffffff8111838210176102f657604052565b67ffffffffffffffff81116102f65760051b60200190565b67ffffffffffffffff81116102f657601f01601f191660200190565b805182101561037a5760209160051b010190565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220ee0a325c532c61652f854d56dd50a22d42963ff46503a34879c5b89be6e8ad5464736f6c634300081c0033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "CallFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct MultiCall.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "aggregate";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes[]";
            readonly name: "returnData";
            readonly type: "bytes[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): MultiCallInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MultiCall;
}
export {};
