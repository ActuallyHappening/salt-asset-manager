import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Message, MessageInterface } from "../../contracts/Message";
export declare class Message__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "AlreadySignedMsg";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidAdminThreshold";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidRotateThreshold";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTransactionThreshold";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "MsgNotFound";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "TooManyUsers";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "isRegistered";
            readonly type: "bool";
        }];
        readonly name: "UserAlreadyInVault";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UserAlreadyRegistered";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UserNotInVault";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "UserNotRegistered";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "VaultAlreadyComplete";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "VaultNotComplete";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "messId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "signer";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "signedMessage";
            readonly type: "string";
        }];
        readonly name: "MessageSigned";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "messId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "message";
            readonly type: "string";
        }];
        readonly name: "MessageToSignProposed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "txId";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "transactionInfo";
            readonly type: "string";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "notes";
            readonly type: "string";
        }];
        readonly name: "TransactionProposed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "txId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "signedTransaction";
            readonly type: "string";
        }];
        readonly name: "TransactionUserConfirmed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "address[]";
            readonly name: "users";
            readonly type: "address[]";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "_masterPubKey";
            readonly type: "address";
        }];
        readonly name: "VaultCompleted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }];
        readonly name: "VaultNewName";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }];
        readonly name: "VaultUserInitialized";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "VAULT_USER_COUNT_LIMIT";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "messageCount";
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
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "messages";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "votesNeeded";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "votesFor";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "messagesSigned";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "transactionVotes";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "transactions";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "votesNeeded";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "votesFor";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }];
        readonly name: "userInfos";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "isPartOfVault";
            readonly type: "bool";
        }, {
            readonly internalType: "bool";
            readonly name: "isRegistered";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "usersMapping";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "userAddress";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "isRegistered";
            readonly type: "bool";
        }, {
            readonly internalType: "uint8";
            readonly name: "index";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "vault";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "registeredUsersCount";
            readonly type: "uint8";
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
            readonly internalType: "uint8";
            readonly name: "usersCount";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "createdDate";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "createdBlock";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "transactionCount";
            readonly type: "uint256";
        }, {
            readonly internalType: "bool";
            readonly name: "completed";
            readonly type: "bool";
        }, {
            readonly internalType: "bool";
            readonly name: "resharingOccurred";
            readonly type: "bool";
        }, {
            readonly internalType: "bytes32";
            readonly name: "encryptionMessage";
            readonly type: "bytes32";
        }, {
            readonly internalType: "string";
            readonly name: "seed";
            readonly type: "string";
        }, {
            readonly internalType: "bytes32";
            readonly name: "name";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "masterPublicKey";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "vaultInfos";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint8";
                readonly name: "registeredUsersCount";
                readonly type: "uint8";
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
                readonly internalType: "uint8";
                readonly name: "usersCount";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "createdDate";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "createdBlock";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "transactionCount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bool";
                readonly name: "completed";
                readonly type: "bool";
            }, {
                readonly internalType: "bool";
                readonly name: "resharingOccurred";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes32";
                readonly name: "encryptionMessage";
                readonly type: "bytes32";
            }, {
                readonly internalType: "string";
                readonly name: "seed";
                readonly type: "string";
            }, {
                readonly internalType: "bytes32";
                readonly name: "name";
                readonly type: "bytes32";
            }, {
                readonly internalType: "address[]";
                readonly name: "users";
                readonly type: "address[]";
            }, {
                readonly internalType: "address";
                readonly name: "masterPublicKey";
                readonly type: "address";
            }];
            readonly internalType: "struct VaultManager.Vault";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): MessageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Message;
}
