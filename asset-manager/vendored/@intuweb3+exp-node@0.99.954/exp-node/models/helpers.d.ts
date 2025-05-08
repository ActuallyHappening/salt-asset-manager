import { Vault } from "../services/web3/models/vault";
import { Proposal } from "../services/web3/models/proposal";
import { Transaction } from "./models";
export interface VaultAllInfo extends Vault {
    proposals: Proposal[];
    transactions: Transaction[];
}
