import { Provider } from "@ethersproject/abstract-provider";
declare global {
    interface Window {
        ethereum: any;
    }
}
import { PublicClient } from "viem";
import FactoryContractType from "../contracts/FactoryContractType";
import FeeContractType from "../contracts/FeeContractType";
import VaultContractType from "../contracts/VaultContractType";
export declare function createViemClient(provider: any): Promise<PublicClient>;
export declare function getVaultContractViem(address: string, client: PublicClient): any;
export declare function getVaultFactoryContractViem(provider: Provider): Promise<any>;
export declare function getVaultFactoryContract(provider: Provider): Promise<FactoryContractType>;
export declare function getFeeContract(provider: Provider): Promise<FeeContractType>;
export declare function getVaultContract(vaultAddress: string, provider: Provider): VaultContractType;
