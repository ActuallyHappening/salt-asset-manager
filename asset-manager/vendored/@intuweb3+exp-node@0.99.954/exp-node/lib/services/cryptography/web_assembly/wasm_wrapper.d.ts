import { SeedResponse, PreRegisterResponse, DecryptResponse, EncryptResponse, RegisterStepTwoResponse, RegisterStepThreeResponse, SignTransactionResponse, CombineTransactionsResponse, RandomMessageResponse, PolybaseKeyResponse } from "../types/models";
export declare function _createSeed(): Promise<SeedResponse>;
export declare function _createRandomMessage(): Promise<RandomMessageResponse>;
export declare function _getPolybaseKey(signature: string): Promise<PolybaseKeyResponse>;
export declare function _getUniqueHash(signature: string): Promise<PolybaseKeyResponse>;
export declare function _preRegister(signature: string): Promise<PreRegisterResponse>;
export declare function _encryptData(encryptionKey: string, dataToEncrypt: string): Promise<EncryptResponse>;
export declare function _decryptData(encryptionSignature: string, dataToDecrypt: string): Promise<DecryptResponse>;
export declare function _formTransaction(to: string, value: string, chainId: string, nonce: string, data: string, gasPrice: string, gas: string, decimal: string): Promise<any>;
export declare function _parseTransaction(txdata: string): Promise<any>;
export declare function _registerStepOne(seed: string, threshold: number, index: number, megaPkArray: string[]): Promise<{
    pedersenDealingArray: string[];
}>;
export declare function _registerStepTwo(seed: string, threshold: number, index: number, megaPkArray: string[], encryptionSignature: string, encryptedMegaSecret: string, dealingsKeyArray: string[], dealingsKappaArray: string[], dealingsLambdaArray: string[]): Promise<RegisterStepTwoResponse>;
export declare function _registerStepThree(seed: string, threshold: number, index: number, megaPkArray: string[], encryptionSignature: string, encryptedMegaSecret: string, simpleDealingKeyArray: string[], // step1
simpleDealingKappaArray: string[], // step1
pedersenTranscriptKey: string, // step 2
pedersenTranscriptKappa: string, // step 2
pedersenOpeningLambda: string): Promise<RegisterStepThreeResponse>;
export declare function _getMasterPublicKey(transcript_key: string): Promise<any>;
export declare function _signTransaction(seed: string, threshold: number, index: number, message: string, encryptionSignature: string, encryptedMegaSecret: string, dealingKeyXLambdaArray: string[], dealingKappaXLambdaArray: string[], pedersenOpeningLambda: string, simpleTranscriptKey: string, simpleTranscriptKappa: string, pedersenTranscriptLambda: string): Promise<SignTransactionResponse>;
export declare function _signTransactionWithoutLambda(seed: string, message: string, encryptionSignature: string, openingSimpleKey: string, openingSimpleKappa: string, simpleTranscriptKey: string, simpleTranscriptKappa: string): Promise<SignTransactionResponse>;
export declare function _combineSignedTransactions(seed: string, threshold: number, message: string, signatureArray: string[], transcript_key: string, transcript_kappa: string): Promise<CombineTransactionsResponse>;
export declare function _combineSignedTransactionsWithoutLambda(seed: string, threshold: number, message: string, signatureArray: string[], transcript_key: string, transcript_kappa: string): Promise<CombineTransactionsResponse>;
export declare function _reshareStepByOriginalGroup(seed: string, threshold: number, index: number, encryptionSignature: string, simpleOpeningKey: string, newMegaPkArray: string[]): Promise<any>;
export declare function _reshareStepOneByNewUser(seed: string, threshold: number, index: number, newMegaPkArray: string[]): Promise<any>;
export declare function _reshareStepTwo(seed: string, threshold_reshare: number, index: number, megaPkArray: string[], encryptionSignature: string, encryptedMegaSecret: string, simple_dealings_key_reshared_once_or_twice: string[], simpleTranscriptKey: string, pedersenDealingsKappaReshare: string[], pedersenDealingsLambdaReshare: string[]): Promise<any>;
export declare function _reshareStepThree(seed: string, threshold_reshare: number, index: number, megaPkArray: string[], encryptionSignature: string, encryptedMegaSecret: string, simpleDealingsKappaReshare: string[], pedersenOpeningLambdaReshareArray: string[], simple_dealings_key_reshared_once_or_twice: string[], transcript_key_simple_or_reshared_once: string, transcriptKappaReshare: string): Promise<{
    reshareOpenings: string[];
    reshareDealings: string[];
    reshareTranscripts: string[];
}>;
export declare function _reshareSignTransaction(seed: string, threshold_reshare: number, index: number, message: string, encryptionSignature: string, encryptedMegaSecret: string, pedersenDealingsLambdaReshare: string[], dealingsKeyXlambdaReshare: string[], // from previous
dealingsKappaXlambdaReshare: string[], // from previous
pedersenOpeningLambdaReshare: string, transcriptKeyResharedTwice: string, simpleTranscriptsKappaReshare: string): Promise<SignTransactionResponse>;
export declare function _reshareCombineSignedTransactions(simpleTranscriptKappaReshare: string, transcriptKeyResharedTwice: string, threshold: number, seed: string, message: string, signatureArray: string[]): Promise<CombineTransactionsResponse>;
