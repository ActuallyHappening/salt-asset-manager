import { Provider } from "@ethersproject/abstract-provider";
import { PreRegistrationStep, RegistrationAll } from "./models/vault";
import { Signer } from "ethers";
export declare function getUserIndex(vaultAddress: string, userAddress: string, provider: Provider): Promise<number>;
export declare function getUserPreRegisterInfos(vaultAddress: string, userAddress: string, provider: Provider): Promise<PreRegistrationStep>;
export declare function getUserRegistrationAllInfos(vaultAddress: string, provider: Provider): Promise<RegistrationAll[]>;
export declare function getPreRegisterInfos(vaultAddress: string, provider: Provider): Promise<{
    parisEncKeyArray: string[];
    megaPublicKeyArray: string[];
    encMegaSecretKeyArray: string[];
    dbPublicKeyArray: string[];
}>;
export declare function getRegistrationStep3InfosDB(vaultAddress: string, provider: Provider): Promise<{
    simpleKeyArray: string[];
    simpleKappaArray: string[];
    dealingKeyXLambdaArray: string[];
    dealingKappaXLambdaArray: string[];
}>;
export declare function getRegistrationReshareStep3InfosDB(vaultAddress: string, provider: Provider): Promise<{
    pedersenDealingsLambdaReshareArray: string[];
    dealingsKeyXLambdaReshareArray: string[];
    dealingsKappaXLambdaReshareArray: string[];
}>;
export declare function getUtilsParams(vaultAddress: string, userAddress: string, provider: Provider): Promise<{
    seed: string;
    threshold: number;
    index: number;
    megaPkArray: string[];
    encMegaSecretKey: string[];
    dbKeyArray: string[];
}>;
export declare function getUserSignature(vaultAddress: string, signer: Signer): Promise<string>;
