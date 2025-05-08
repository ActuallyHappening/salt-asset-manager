import { ParseTransactionResponse, SeedResponse, PreRegisterResponse, DecryptResponse, EncryptResponse, RegisterStepTwoResponse, RegisterStepThreeResponse, SignTransactionResponse, CombineTransactionsResponse, RandomMessageResponse, PolybaseKeyResponse } from "./types/models";
export declare function createSeed(): Promise<SeedResponse>;
export declare function createRandomMessage(): Promise<RandomMessageResponse>;
export declare function getPolybaseKey(signature: string): Promise<PolybaseKeyResponse>;
export declare function getUniqueHashFromSignature(signature: string): Promise<PolybaseKeyResponse>;
export declare function preRegister(signature: string): Promise<PreRegisterResponse>;
export declare function encryptData(encryptionKey: string, dataToEncrypt: string): Promise<EncryptResponse>;
export declare function decryptData(encryptionSignature: string, dataToDecrypt: string): Promise<DecryptResponse>;
export declare function formTransaction(to: string, value: string, chainId: string, nonce: string, data: string, gasPrice: string, gas: string, decimal: string): Promise<string>;
export declare function parseTransaction(txdata: string): Promise<ParseTransactionResponse>;
export declare function registerStepOne(seed: string, threshold: number, index: number, megaPkArray: string[]): Promise<{
    pedersenDealingArray: string[];
}>;
export declare function registerStepTwo(seed: string, threshold: number, index: number, megaPkArray: string[], encryptionSignature: string, encryptedMegaSecret: string, dealingsKeyArray: string[], dealingsKappaArray: string[], dealingsLambdaArray: string[]): Promise<RegisterStepTwoResponse>;
export declare function registerStepThree(seed: string, threshold: number, index: number, megaPkArray: string[], encryptionSignature: string, encryptedMegaSecret: string, dealingsKeyArray: string[], // step1
dealingsKappaArray: string[], // step1
transcriptKeySingle: string, // step 2
transcriptKappaSingle: string, // step 2
pedersenOpeningLambda: string): Promise<RegisterStepThreeResponse>;
export declare function getMasterPublicKey(transcript_key: string): Promise<any>;
export declare function signTransaction(seed: string, threshold: number, index: number, message: string, encryptionSignature: string, encryptedMegaSecret: string, dealingKeyXLambdaArray: string[], dealingKappaXLambdaArray: string[], pedersenOpeningsLambda: string, simpleTranscriptKey: string, simpleTranscriptKappa: string, transcriptLambda: string): Promise<SignTransactionResponse>;
export declare function signTransactionWithoutLambda(seed: string, message: string, encryptionSignature: string, openingSimpleKey: string, openingSimpleKappa: string, simpleTranscriptKey: string, simpleTranscriptKappa: string): Promise<SignTransactionResponse>;
export declare function combineSignedTransactions(seed: string, threshold: number, message: string, signatureArray: string[], transcript_key: string, transcript_kappa: string): Promise<CombineTransactionsResponse>;
export declare function combineSignedTransactionsWithoutLambda(seed: string, threshold: number, message: string, signatureArray: string[], transcript_key: string, transcript_kappa: string): Promise<CombineTransactionsResponse>;
export declare function reshareStepByOriginalGroup(seed: string, threshold: number, index: number, encryptionSignature: string, simpleOpeningKey: string, newMegaPkArray: string[]): Promise<any>;
export declare function reshareStepOneByNewUser(seed: string, threshold: number, index: number, newMegaPkArray: string[]): Promise<any>;
export declare function reshareStepTwo(seed: string, threshold_reshare: number, index: number, megaPkArray: string[], encryptionSignature: string, encryptedMegaSecret: string, simple_dealings_key_reshared_once: string[], simpleTranscriptKey: string, pedersenDealingsKappaReshare: string[], pedersenDealingsLambdaReshare: string[]): Promise<any>;
export declare function reshareStepThree(seed: string, threshold_reshare: number, index: number, megaPkArray: string[], encryptionSignature: string, encryptedMegaSecret: string, simpleDealingsKappaReshare: string[], pedersenOpeningLambdaReshareArray: string[], simple_dealings_key_reshared_once_or_twice: string[], transcript_key_simple_or_reshared_once: string, transcriptKappaReshare: string): Promise<{
    reshareOpenings: string[];
    reshareDealings: string[];
    reshareTranscripts: string[];
}>;
export declare function reshareSignTransaction(seed: string, threshold_reshare: number, index: number, message: string, encryptionSignature: string, encryptedMegaSecret: string, pedersenDealingsLambdaReshare: string[], dealingsKeyXlambdaReshare: string[], // from previous
dealingsKappaXlambdaReshare: string[], // from previous
pedersenOpeningLambdaReshare: string, transcriptKeyResharedTwice: string, simpleTranscriptKappaReshare: string): Promise<SignTransactionResponse>;
export declare function reshareCombineSignedTransactions(simpleTranscriptKappaReshare: string, transcriptKeyResharedTwice: string, threshold: number, seed: string, message: string, signatureArray: string[]): Promise<CombineTransactionsResponse>;
