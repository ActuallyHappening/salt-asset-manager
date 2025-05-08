import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { VaultFactory, VaultFactoryInterface } from "../../contracts/VaultFactory";
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
    static readonly bytecode = "0x60e0346100c757601f61069038819003918201601f19168301916001600160401b038311848410176100cc578084926060946040528339810103126100c757610047816100e2565b906100606040610059602084016100e2565b92016100e2565b916001600160a01b038316156100b65760805260a05260c05260405161059990816100f782396080518181816101090152610213015260a051818181607e01526102fc015260c05181818160c5015261049a0152f35b6378a4adb560e01b60005260046000fd5b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b03821682036100c75756fe6080604052600436101561001257600080fd5b6000803560e01c806316c38b3c146104715780635c975abb1461044f5780636b5caa741461012d5780638abf6077146100e9578063cf73a1bc146100a55763dba2df9d1461005f57600080fd5b346100a257806003193601126100a25760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b80fd5b50346100a257806003193601126100a25760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b50346100a257806003193601126100a25760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b5060e03660031901126100a25760043567ffffffffffffffff811161044b573660238201121561044b5780600401359067ffffffffffffffff82116103e3576024810190602436918460051b0101116103e357602435906044359260ff8416809403610447576064359260ff84168094036104435760843560ff811680910361043f5760a4359560c4359067ffffffffffffffff821161043b573660238301121561043b5781600401359267ffffffffffffffff841161043757602483019260248536920101116104375760ff8a541661040f576e5af43d82803e903d91602b57fd5bf37f0000000000000000000000000000000000000000000000000000000000000000763d602d80600a3d3981f3363d3d373d3d3d363d7300000062ffffff8260881c16178c5260781b176020526001600160a01b03603760098cf0169788156103e757908a91893b156103e3576102ec60405194859384937f1a8747c700000000000000000000000000000000000000000000000000000000855261010060048601526102c38d8d6101048801916104f7565b926024860152604485015260648401528c60848401526003198382030160a48401528787610542565b8760c48301526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001660e48301520381838b5af180156103d857610391575b509061038b92917fd27ad4ba94ac8fe54f50eb81e03050b565d0bbf80eaadbe392d3cbb51ec970da96976103736040519788976080895260808901916104f7565b93602087015260408601528483036060860152610542565b0390a280f35b67ffffffffffffffff81116103ab5760405261038b610332565b6024897f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b6040513d8b823e3d90fd5b8280fd5b60048b7fb06ebf3d000000000000000000000000000000000000000000000000000000008152fd5b60048a7fab35696f000000000000000000000000000000000000000000000000000000008152fd5b8980fd5b8880fd5b8680fd5b8580fd5b8480fd5b5080fd5b50346100a257806003193601126100a25760ff60209154166040519015158152f35b50346100a25760203660031901126100a25760043580151580910361044b576001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001632036104cf5760ff8019835416911617815580f35b6004827f30cd7471000000000000000000000000000000000000000000000000000000008152fd5b916020908281520191906000905b8082106105125750505090565b9091928335906001600160a01b03821680920361053d57602081600193829352019401920190610505565b600080fd5b908060209392818452848401376000828201840152601f01601f191601019056fea264697066735822122007943a5a0efd1e93349396603b5c928553f6c8ed67662f6ad06571c4fe39ba7864736f6c634300081c0033";
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
        readonly name: "FailedDeployment";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "balance";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "needed";
            readonly type: "uint256";
        }];
        readonly name: "InsufficientBalance";
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
        readonly inputs: readonly [];
        readonly name: "TransferFailed";
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
            readonly internalType: "bytes32";
            readonly name: "name";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "_encryptionMessage";
            readonly type: "bytes32";
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
            readonly name: "_proposedAddresses";
            readonly type: "address[]";
        }, {
            readonly internalType: "bytes32";
            readonly name: "vaultName";
            readonly type: "bytes32";
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
            readonly internalType: "bytes32";
            readonly name: "_encryptionMessage";
            readonly type: "bytes32";
        }, {
            readonly internalType: "string";
            readonly name: "_seed";
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
