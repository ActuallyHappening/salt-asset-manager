import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { VaultFactory, VaultFactoryInterface } from "../../../contracts/VaultFactory.sol/VaultFactory";
type VaultFactoryConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class VaultFactory__factory extends ContractFactory {
    constructor(...args: VaultFactoryConstructorParams);
    deploy(vaultAddress: PromiseOrValue<string>, feeContractAddress_: PromiseOrValue<string>, _managerAddress: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<VaultFactory>;
    getDeployTransaction(vaultAddress: PromiseOrValue<string>, feeContractAddress_: PromiseOrValue<string>, _managerAddress: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): VaultFactory;
    connect(signer: Signer): VaultFactory__factory;
    static readonly bytecode = "0x60e0346100c757601f61099438819003918201601f19168301916001600160401b038311848410176100cc578084926060946040528339810103126100c757610047816100e2565b906100606040610059602084016100e2565b92016100e2565b916001600160a01b038316156100b65760805260a05260c05260405161089d90816100f782396080518181816102f7015261067d015260a051818181607e01526101fa015260c05181818160c501526106ec0152f35b6378a4adb560e01b60005260046000fd5b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b03821682036100c75756fe6080604052600436101561001257600080fd5b6000803560e01c806316c38b3c146106c35780635c975abb146106a15780638abf60771461065d5780638d7c86f7146100e9578063cf73a1bc146100a55763dba2df9d1461005f57600080fd5b346100a257806003193601126100a25760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b80fd5b50346100a257806003193601126100a25760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b5060e03660031901126100a25760043567ffffffffffffffff811161059557366023820112156105955780600401359067ffffffffffffffff8211610649578160051b906040519261013e6020840185610749565b8352602460208401928201019036821161062157602401915b8183106106295750505060243567ffffffffffffffff81116106255761018190369060040161079d565b906044359160ff83168093036104d75760643560ff8116809103610621576084359160ff831680930361061d5760a43567ffffffffffffffff8111610619576101ce90369060040161079d565b9160c43567ffffffffffffffff8111610615576101ef90369060040161079d565b936001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016966040517fab35c79e0000000000000000000000000000000000000000000000000000000081526020816004818c5afa90811561060a578a916105d4575b5034036105ac57886040517fbf2d75fb0000000000000000000000000000000000000000000000000000000081526020816004818d5afa80156105a15782918291610558575b508180916001600160a01b033491165af13d15610553573d6102bf81610781565b906102cd6040519283610749565b81528a60203d92013e5b1561052b5760ff895416610503576e5af43d82803e903d91602b57fd5bf37f0000000000000000000000000000000000000000000000000000000000000000763d602d80600a3d3981f3363d3d373d3d3d363d7300000062ffffff8260881c16178b5260781b176020526001600160a01b03603760098bf0169788156104db5790899291893b156104d7576103f56103e36103d18b946103af96604051998a9889987f3365da16000000000000000000000000000000000000000000000000000000008a5261010060048b01526101048a01906107e9565b926024890152604488015260648701526003198682030160848701528a610826565b8481036003190160a48601528a610826565b8381036003190160c485015287610826565b9060e48301520381838a5af180156104cc57610482575b506104529261046e7f887d58d88706c3ab17144c8eec80645bc5d57a7afa0eabca5de856088267ac59959361046061047c946040519788976080895260808901906107e9565b908782036020890152610826565b908582036040870152610826565b908382036060850152610826565b0390a280f35b9261046e7f887d58d88706c3ab17144c8eec80645bc5d57a7afa0eabca5de856088267ac599593610460896104be61047c969b61045299610749565b99945050939550509261040c565b6040513d89823e3d90fd5b8380fd5b60048a7fc2f868f4000000000000000000000000000000000000000000000000000000008152fd5b6004897fab35696f000000000000000000000000000000000000000000000000000000008152fd5b6004897f6747a288000000000000000000000000000000000000000000000000000000008152fd5b6102d7565b9150506020813d602011610599575b8161057460209383610749565b8101031261059557516001600160a01b03811681036105955781908161029e565b5080fd5b3d9150610567565b6040513d84823e3d90fd5b6004897f025dbdd4000000000000000000000000000000000000000000000000000000008152fd5b90506020813d602011610602575b816105ef60209383610749565b810103126105fe575138610258565b8980fd5b3d91506105e2565b6040513d8c823e3d90fd5b8780fd5b8680fd5b8580fd5b8480fd5b8280fd5b82356001600160a01b038116810361061d57815260209283019201610157565b602483634e487b7160e01b81526041600452fd5b50346100a257806003193601126100a25760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b50346100a257806003193601126100a25760ff60209154166040519015158152f35b50346100a25760203660031901126100a257600435801515809103610595576001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001633036107215760ff8019835416911617815580f35b6004827f30cd7471000000000000000000000000000000000000000000000000000000008152fd5b90601f8019910116810190811067ffffffffffffffff82111761076b57604052565b634e487b7160e01b600052604160045260246000fd5b67ffffffffffffffff811161076b57601f01601f191660200190565b81601f820112156107e4578035906107b482610781565b926107c26040519485610749565b828452602083830101116107e457816000926020809301838601378301015290565b600080fd5b906020808351928381520192019060005b8181106108075750505090565b82516001600160a01b03168452602093840193909201916001016107fa565b919082519283825260005b848110610852575050826000602080949584010152601f8019910116010190565b8060208092840101518282860101520161083156fea26469706673582212208e3397b1a1236121f4d1e34db97a5faef0c2d2d4c77d0660db785971a2afacf264736f6c634300081a0033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "vaultAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "feeContractAddress_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_managerAddress";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "AddressNotDefined";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ContractPaused";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ERC1167FailedCreateClone";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "EtherTransferFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InsufficientFee";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotOwner";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "vaultAddress";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "address[]";
            readonly name: "_proposedAddresses";
            readonly type: "address[]";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "_encryptionMessage";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "_seed";
            readonly type: "string";
        }];
        readonly name: "VaultCreated";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "proposedAddresses";
            readonly type: "address[]";
        }, {
            readonly internalType: "string";
            readonly name: "vaultName";
            readonly type: "string";
        }, {
            readonly internalType: "uint8";
            readonly name: "rotateThreshold";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "transactionThreshold";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "adminThreshold";
            readonly type: "uint8";
        }, {
            readonly internalType: "string";
            readonly name: "encryptionMessage";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "seed";
            readonly type: "string";
        }];
        readonly name: "createVault";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "feeContractAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "impl";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "managerAddress";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "paused";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "_paused";
            readonly type: "bool";
        }];
        readonly name: "setPaused";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): VaultFactoryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): VaultFactory;
}
export {};
