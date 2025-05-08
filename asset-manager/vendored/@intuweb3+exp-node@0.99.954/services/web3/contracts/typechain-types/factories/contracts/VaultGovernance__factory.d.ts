import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { VaultGovernance, VaultGovernanceInterface } from "../../contracts/VaultGovernance";
export declare class VaultGovernance__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "AlreadyVoted";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ExecuteProposalReverted";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OnlyCreatorCanCancel";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ProposalAlreadyExecuted";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ProposalCancelled";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ProposalExpired";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ProposalInProcess";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "VoteRequirementNotReached";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "enum VaultGovernance.PropositionType";
            readonly name: "_type";
            readonly type: "uint8";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "ProposalCreated";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "PROPOSAL_IN_PROCESS";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "PROPOSAL_VOTE_DURATION";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getProposalCounter";
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
            readonly name: "proposalId";
            readonly type: "uint256";
        }];
        readonly name: "proposalInfos";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "id";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint8";
                readonly name: "voteForNeeded";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint8";
                readonly name: "voteForCount";
                readonly type: "uint8";
            }, {
                readonly internalType: "bool";
                readonly name: "executed";
                readonly type: "bool";
            }, {
                readonly internalType: "bool";
                readonly name: "cancelled";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "_calldata";
                readonly type: "bytes";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "feeValue";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "creator";
                readonly type: "address";
            }];
            readonly internalType: "struct VaultGovernance.Proposal";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "proposalId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }];
        readonly name: "proposalVoteUserInfos";
        readonly outputs: readonly [{
            readonly internalType: "enum VaultGovernance.VoteState";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): VaultGovernanceInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): VaultGovernance;
}
