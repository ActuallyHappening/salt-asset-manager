export function __wbg_set_wasm(val: any): void;
/**
 * Returns a dealing for a single user. User only needs to share the list of mega public keys.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `mega_pk_list` - list of all the megaPublicKeys generated from the register function
 * # Returns
 * dealing for a user
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} mega_pk_list
 * @returns {any}
 */
export function compute_pedersen_dealing(seed: any, threshold: any, index: any, mega_pk_list: any): any;
/**
 * Returns a opening for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_sk` - User's encrypted mega secret key
 * * `dealings_array` - List of dealers
 * # Returns
 * share commitment
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_sk
 * @param {any} dealings_array
 * @returns {any}
 */
export function compute_pedersen_opening(seed: any, threshold: any, index: any, encryption_signature: any, mega_sk: any, dealings_array: any): any;
/**
 * Generate a simple dealing for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_pk_list` - Signature of the unique vault message, retrieved from the smart contract
 * * `opening` - User's opening from compute_opening function
 * * `is_reshare` - If this function should act as reshare of unmasked
 * # Returns
 * unmasked dealing
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_pk_list
 * @param {any} opening
 * @returns {any}
 */
export function compute_simple_dealing(seed: any, threshold: any, index: any, encryption_signature: any, mega_pk_list: any, opening: any): any;
/**
 * Returns a opening for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_sk` - User's encrypted mega secret key
 * * `pedersen_dealings` - List of first-step dealings
 * * `simple_dealings` - List of newer dealings
 * # Returns
 * share commitment
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_sk
 * @param {any} simple_dealings
 * @param {any} pedersen_transcript
 * @returns {any}
 */
export function compute_simple_opening(seed: any, threshold: any, index: any, encryption_signature: any, mega_sk: any, simple_dealings: any, pedersen_transcript: any): any;
/**
 * Multiply function for a dealing
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_pk_list` - Signature of the unique vault message, retrieved from the smart contract
 * * `simple_openings` - User's opening from compute_opening function
 * * `pedersen_openings` - User's opening from compute_opening function
 * * `dealings_array` - List of dealers
 * # Returns
 * IDkgDealingInternal
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_pk_list
 * @param {any} simple_opening
 * @param {any} pedersen_opening
 * @returns {any}
 */
export function compute_multiply_dealing(seed: any, threshold: any, index: any, encryption_signature: any, mega_pk_list: any, simple_opening: any, pedersen_opening: any): any;
/**
 * Returns a multiplied opening for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_sk` - User's encrypted mega secret key
 * * `dealings_unmasked` - List of first-step dealings
 * * `dealings_lambda` - List of newer dealings
 * * `old_dealings_unmasked` - List of newer dealings
 * # Returns
 * share commitment
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_sk
 * @param {any} list_multiply_dealer
 * @param {any} transcript_key_or_kappa
 * @param {any} transcript_lambda
 * @returns {any}
 */
export function compute_multiply_opening(seed: any, threshold: any, index: any, encryption_signature: any, mega_sk: any, list_multiply_dealer: any, transcript_key_or_kappa: any, transcript_lambda: any): any;
/**
 * Generate a reshared single dealing for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `opening` - User's opening from compute_opening function
 * # Returns
 * masked dealing
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_pk_list
 * @param {any} opening
 * @returns {any}
 */
export function compute_simple_dealing_reshare(seed: any, threshold: any, index: any, encryption_signature: any, mega_pk_list: any, opening: any): any;
/**
 * Returns a opening for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `old_threshold` - Signing threshold value retrieved from the previous DKG
 * * `new_threshold` - Signing threshold value retrieved from the newly proposed DKG
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_sk` - User's encrypted mega secret key
 * * `masked` - True is this is masked dealing. False if not.
 * * `certificate_list` - list of the certificates posted by the dealers, from the BLS signing
 * # Returns
 * share commitment
 * @param {any} seed
 * @param {any} threshold_reshare
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_sk
 * @param {any} simple_dealings_key_reshared_once_or_twice
 * @param {any} transcript_key_simple_or_reshared_once
 * @returns {any}
 */
export function compute_simple_opening_reshare_once_or_twice(seed: any, threshold_reshare: any, index: any, encryption_signature: any, mega_sk: any, simple_dealings_key_reshared_once_or_twice: any, transcript_key_simple_or_reshared_once: any): any;
/**
 * Generate a multiply single dealing for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_pk_list` - Signature of the unique vault message, retrieved from the smart contract
 * * `opening` - User's opening from compute_opening function
 * * `is_reshare` - If this function should act as reshare of unmasked
 * # Returns
 * masked dealing
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_pk_list
 * @param {any} opening
 * @returns {any}
 */
export function compute_multiply_dealing_reshare(seed: any, threshold: any, index: any, encryption_signature: any, mega_pk_list: any, opening: any): any;
/**
 * Returns a multiplied opening for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_sk` - User's encrypted mega secret key
 * * `dealings_unmasked` - List of first-step dealings
 * * `dealings_lambda` - List of newer dealings
 * * `old_dealings_unmasked` - List of newer dealings
 * # Returns
 * share commitment
 * @param {any} seed
 * @param {any} threshold_reshare
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_sk
 * @param {any} list_multiply_dealer
 * @param {any} dealings_lambda
 * @param {any} simple_transcript
 * @returns {any}
 */
export function compute_multiply_opening_reshare(seed: any, threshold_reshare: any, index: any, encryption_signature: any, mega_sk: any, list_multiply_dealer: any, dealings_lambda: any, simple_transcript: any): any;
/**
 * Once someone has posted his dealing on-chain, he should wait for other to post their dealing on-chain.
 * Once a dealing is posted on-chain, receiver decrypts it, and sign it if the decryption is valid
 * # Arguments
 * * `ecdsa_dealing_to_verify` - Dealing that a particular receiver is going to verify, retrieved from the smart contract.
 * * `dealer_index` - Index of `dealing_to_verify` . Maybe this can be extracted from `dealing_to_verify` directly?
 * * `receiver_index` - Index of the receiver
 * * `seed` - Seed value retrieved from the vault data
 * * `mega_sk` - receiver's encrypted mega secret key
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * Returns a boolean according to the result of the verification
 * Signature (if needed)
 * @param {any} ecdsa_dealing_to_verify
 * @param {any} dealer_index
 * @param {any} receiver_index
 * @param {any} seed
 * @param {any} mega_sk
 * @param {any} encryption_signature
 * @returns {boolean}
 */
export function private_ecdsa_verify_dealing(ecdsa_dealing_to_verify: any, dealer_index: any, receiver_index: any, seed: any, mega_sk: any, encryption_signature: any): boolean;
/**
 * User sign a message or transaction with their share, needs to pass the transation string, as well as their secret share, and their signature to decrypt their secret share.
 * # Arguments
 * * `openings_kappa_times_lambda` -
 * * `openings_key_times_lambda` -
 * * `openings_lambda` -
 * * `simple_dealings_key` -
 * * `pedersen_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed share
 * @param {any} openings_kappa_times_lambda
 * @param {any} openings_key_times_lambda
 * @param {any} openings_lambda
 * @param {any} message
 * @param {any} seed
 * @param {any} key_transcript
 * @param {any} kappa_transcript
 * @returns {any}
 */
export function user_sign_message(openings_kappa_times_lambda: any, openings_key_times_lambda: any, openings_lambda: any, message: any, seed: any, key_transcript: any, kappa_transcript: any): any;
/**
 * User sign a message or transaction with their share, needs to pass the transation string, as well as their secret share, and their signature to decrypt their secret share.
 * # Arguments
 * * `openings_kappa_times_lambda` -
 * * `openings_key_times_lambda` -
 * * `openings_lambda` -
 * * `simple_dealings_key` -
 * * `pedersen_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed share
 * @param {any} openings_kappa_times_lambda
 * @param {any} openings_key_times_lambda
 * @param {any} openings_lambda
 * @param {any} message
 * @param {any} seed
 * @param {any} key_transcript
 * @param {any} kappa_transcript
 * @returns {any}
 */
export function user_sign_msg(openings_kappa_times_lambda: any, openings_key_times_lambda: any, openings_lambda: any, message: any, seed: any, key_transcript: any, kappa_transcript: any): any;
/**
 * User sign a message or transaction with their share, needs to pass the transation string, as well as their secret share, and their signature to decrypt their secret share.
 * # Arguments
 * * `openings_kappa` -
 * * `openings_key` -
 * * `simple_dealings_key` -
 * * `pedersen_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed share
 * @param {any} openings_kappa
 * @param {any} openings_key
 * @param {any} message
 * @param {any} seed
 * @param {any} key_transcript
 * @param {any} kappa_transcript
 * @returns {any}
 */
export function user_sign_message_without_lambda(openings_kappa: any, openings_key: any, message: any, seed: any, key_transcript: any, kappa_transcript: any): any;
/**
 * # Arguments
 * * `openings_kappa_times_lambda` -
 * * `openings_key_times_lambda` -
 * * `openings_lambda` -
 * * `transcript_key_reshared_twice` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * @param {any} openings_kappa_times_lambda
 * @param {any} openings_key_times_lambda
 * @param {any} openings_lambda
 * @param {any} transcript_key_reshared_twice
 * @param {any} kappa_transcript
 * @param {any} message
 * @param {any} seed
 * @returns {any}
 */
export function user_sign_message_reshare(openings_kappa_times_lambda: any, openings_key_times_lambda: any, openings_lambda: any, transcript_key_reshared_twice: any, kappa_transcript: any, message: any, seed: any): any;
/**
 * # Arguments
 * * `openings_kappa` -
 * * `openings_key` -
 * * `transcript_key_reshared_twice` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * @param {any} openings_kappa
 * @param {any} openings_key
 * @param {any} transcript_key_reshared_twice
 * @param {any} kappa_transcript
 * @param {any} message
 * @param {any} seed
 * @returns {any}
 */
export function user_sign_message_reshare_without_lambda(openings_kappa: any, openings_key: any, transcript_key_reshared_twice: any, kappa_transcript: any, message: any, seed: any): any;
/**
 * Combine signed shares from each participant.
 *
 * Will fail if threshold is not met (threshold defined in the original keygen/DKG process and can be referenced in the smart contract) The result of this function is a signed hash that can be broadcast on the network.
 * First, a number of participants who equal the account’s transaction threshold will need to run the sign_transaction function and store the result with the transaction they are signing.
 * When the ‘combineSignatures’ function is called from the SDK, we aggregate all of the signatures and pass them to this function.
 * Returns a signature struct which contains r and s values of the ECDSA scalars.
 *
 * # Arguments
 * * `dealings_key` -
 * * `old_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed transaction, ready to send!
 * @param {any} threshold
 * @param {any} seed
 * @param {any} message
 * @param {any} signed_shares
 * @param {any} key_transcript_js
 * @param {any} kappa_transcript_js
 * @returns {any}
 */
export function combine_signed_shares(threshold: any, seed: any, message: any, signed_shares: any, key_transcript_js: any, kappa_transcript_js: any): any;
/**
 * Combine signed shares from each participant.
 *
 * Will fail if threshold is not met (threshold defined in the original keygen/DKG process and can be referenced in the smart contract) The result of this function is a signed hash that can be broadcast on the network.
 * First, a number of participants who equal the account’s transaction threshold will need to run the sign_transaction function and store the result with the transaction they are signing.
 * When the ‘combineSignatures’ function is called from the SDK, we aggregate all of the signatures and pass them to this function.
 * Returns a signature struct which contains r and s values of the ECDSA scalars.
 *
 * # Arguments
 * * `dealings_key` -
 * * `old_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed transaction, ready to send!
 * @param {any} threshold
 * @param {any} seed
 * @param {any} message
 * @param {any} signed_shares
 * @param {any} key_transcript_js
 * @param {any} kappa_transcript_js
 * @returns {any}
 */
export function combine_signed_shares_without_lambda(threshold: any, seed: any, message: any, signed_shares: any, key_transcript_js: any, kappa_transcript_js: any): any;
/**
 * Combine signed shares from each participant.
 *
 * Will fail if threshold is not met (threshold defined in the original keygen/DKG process and can be referenced in the smart contract) The result of this function is a signed hash that can be broadcast on the network.
 * First, a number of participants who equal the account’s transaction threshold will need to run the sign_transaction function and store the result with the transaction they are signing.
 * When the ‘combineSignatures’ function is called from the SDK, we aggregate all of the signatures and pass them to this function.
 * Returns a signature struct which contains r and s values of the ECDSA scalars.
 *
 * # Arguments
 * * `simple_dealings_kappa_reshare` -
 * * `pedersen_dealings_kappa_reshare` -
 * * `transcript_key_reshared_twice` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `seed` - Seed value retrieved from the vault data
 * * `message` - message to sign
 * * `signed_shares` - message to sign
 * * `dealings_key` - message to sign
 * * `old_dealings_key` - message to sign
 * #
 * Returns signed transaction, ready to send!
 * @param {any} kappa_transcript_js
 * @param {any} transcript_key_reshared_twice_js
 * @param {any} threshold
 * @param {any} seed
 * @param {any} message
 * @param {any} signed_shares
 * @returns {any}
 */
export function combine_signed_shares_reshare(kappa_transcript_js: any, transcript_key_reshared_twice_js: any, threshold: any, seed: any, message: any, signed_shares: any): any;
/**
 * Combine signed shares from each participant.
 *
 * Will fail if threshold is not met (threshold defined in the original keygen/DKG process and can be referenced in the smart contract) The result of this function is a signed hash that can be broadcast on the network.
 * First, a number of participants who equal the account’s transaction threshold will need to run the sign_transaction function and store the result with the transaction they are signing.
 * When the ‘combineSignatures’ function is called from the SDK, we aggregate all of the signatures and pass them to this function.
 * Returns a signature struct which contains r and s values of the ECDSA scalars.
 *
 * # Arguments
 * * `simple_dealings_kappa_reshare` -
 * * `pedersen_dealings_kappa_reshare` -
 * * `transcript_key_reshared_twice` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `seed` - Seed value retrieved from the vault data
 * * `message` - message to sign
 * * `signed_shares` - message to sign
 * * `dealings_key` - message to sign
 * * `old_dealings_key` - message to sign
 * #
 * Returns signed transaction, ready to send!
 * @param {any} kappa_transcript_js
 * @param {any} transcript_key_reshared_twice_js
 * @param {any} threshold
 * @param {any} seed
 * @param {any} message
 * @param {any} signed_shares
 * @returns {any}
 */
export function combine_signed_shares_reshare_without_lambda(kappa_transcript_js: any, transcript_key_reshared_twice_js: any, threshold: any, seed: any, message: any, signed_shares: any): any;
/**
 * Combine signed shares from each participant.
 *
 * Will fail if threshold is not met (threshold defined in the original keygen/DKG process and can be referenced in the smart contract) The result of this function is a signed hash that can be broadcast on the network.
 * First, a number of participants who equal the account’s transaction threshold will need to run the sign_transaction function and store the result with the transaction they are signing.
 * When the ‘combineSignatures’ function is called from the SDK, we aggregate all of the signatures and pass them to this function.
 * Returns a signature struct which contains r and s values of the ECDSA scalars.
 *
 * # Arguments
 * * `dealings_key` -
 * * `old_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed transaction, ready to send!
 * @param {any} threshold
 * @param {any} seed
 * @param {any} message
 * @param {any} signed_shares
 * @param {any} key_transcript_js
 * @param {any} kappa_transcript_js
 * @returns {any}
 */
export function combine_signed_shares_message(threshold: any, seed: any, message: any, signed_shares: any, key_transcript_js: any, kappa_transcript_js: any): any;
/**
 * Creates an seed (for rng/ad) that can be stored in the vault proposal
 * Returns serialized, encoded string of the seed.
 * # Returns
 * seed in string format for vault storage
 * @returns {any}
 */
export function create_js_seed(): any;
/**
 * Creates a random string / message that will be used by all the participants for signing to create their paris key.
 * step 0
 * # Returns
 * random string
 * @returns {any}
 */
export function create_random_message(): any;
/**
 * Generate master public key after all registration process is complete
 * # Returns
 * random master public key
 * @param {any} simple_transcript
 * @returns {Array<any>}
 */
export function generate_master_public_key_and_address(simple_transcript: any): Array<any>;
/**
 * User pre-register function, each user needs to do this before 'first steps' for DKG can be performed.
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * # Returns
 * users public encryption key, public key for storage in known public key vault for all users, encrypted secret key
 * @param {any} signature
 * @returns {Array<any>}
 */
export function pre_register(signature: any): Array<any>;
/**
 * Create a hardened child key from specific derivation index to be used for encrypting data
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `index` - Index of the key being used, default 0
 * # Returns
 * users public encryption key
 * @param {any} signature
 * @param {number} index
 * @returns {any}
 */
export function get_paris_encryption_key(signature: any, index: number): any;
/**
 * Create a hardened child key from specific derivation index to be used for encrypting data
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `index` - Index of the key being used, default 0
 * # Returns
 * users public encryption key
 * @param {any} signature
 * @param {number} index
 * @returns {any}
 */
export function get_unique_hash(signature: any, index: number): any;
/**
 * Create a hardened child key from specific derivation index to be used for encrypting data
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `index` - Index of the key being used, default 0
 * # Returns
 * users public encryption key
 * @param {any} signature
 * @param {number} index
 * @returns {any}
 */
export function get_aptos_key(signature: any, index: number): any;
/**
 * Create a hardened child key from specific derivation index to be used for encrypting data
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `index` - Index of the key being used, default 0
 * # Returns
 * users public encryption key
 * Create a hardened child key from specific derivation index to be used for encrypting data
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `index` - Index of the key being used, default 0
 * # Returns
 * users public encryption key
 * @param {any} signature
 * @returns {any}
 */
export function get_polybase_key(signature: any): any;
/**
 * Encrypt data using derived BIP32 public key at specified child derivation index
 * # Arguments
 * * `paris_public` - The paris public key derived from pre_register/get_paris_encryption_key
 * * `plaintext` - Message to encrypt
 * # Returns
 * encrypted message
 * @param {any} paris_public
 * @param {any} plaintext
 * @returns {any}
 */
export function encrypt_data(paris_public: any, plaintext: any): any;
/**
 * Decrypt data using derived BIP32 private key at specified child derivation index
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `message` - Encrypted message
 * * `index` - Index of key to use
 * # Returns
 * decrypted message
 * @param {any} signature
 * @param {any} message
 * @param {number} index
 * @returns {any}
 */
export function decrypt_data(signature: any, message: any, index: number): any;
/**
 * Form a transaction for users to sign with their secret share.
 * # Arguments
 * * `to` - public address / EOA of the recipient
 * * `value` - Value/amount of token you want to send
 * * `chain_id` - Chain id of the network the transaction should be sent on
 * * `nonce` - The nonce should be the nonce of the master public key of the intu account dEOA.
 * * `data` - Encoded data to be used in the transaction
 * * `gas_price` - Amount you pay per unit of gas
 * * `gas` - Total gas you are willing to pay for a transaction
 * # Returns [ transaction string for storage, for others to reference and sign]
 * @param {any} to
 * @param {any} value
 * @param {any} chain_id
 * @param {any} nonce
 * @param {any} data
 * @param {any} gas_price
 * @param {any} gas
 * @param {any} decimal
 * @returns {any}
 */
export function form_transaction(to: any, value: any, chain_id: any, nonce: any, data: any, gas_price: any, gas: any, decimal: any): any;
/**
 * Form a transaction for users to sign with their secret share.
 * # Arguments
 * * `to` - public address / EOA of the recipient
 * * `value` - Value/amount of token you want to send
 * * `chain_id` - Chain id of the network the transaction should be sent on
 * * `nonce` - The nonce should be the nonce of the master public key of the intu account dEOA.
 * * `data` - Encoded data to be used in the transaction
 * * `gas_price` - Amount you pay per unit of gas
 * * `gas` - Total gas you are willing to pay for a transaction
 * # Returns [ transaction string for storage, for others to reference and sign]
 * @param {any} message
 * @returns {any}
 */
export function message(message: any): any;
/**
 * Parse a transaction string stored in an Intu vault so that a participant can review the transaction before signing it.
 * # Arguments
 * * `transaction` - string of the transaction, retrieved from the vault
 * # Returns [array of transaction data]
 * @param {any} transaction
 * @returns {Array<any>}
 */
export function parse_transaction(transaction: any): Array<any>;
export function __wbg_buffer_609cc3eee51ed158(arg0: any): number;
export function __wbg_call_672a4d21634d4a24(...args: any[]): any;
export function __wbg_call_7cccdd69e0791ae2(...args: any[]): any;
export function __wbg_crypto_dd1b8f71596b161a(arg0: any): number;
export function __wbg_done_769e5ede4b31c67b(arg0: any): any;
export function __wbg_entries_3265d4158b33e5dc(arg0: any): number;
export function __wbg_getRandomValues_760c8e927227643e(...args: any[]): any;
export function __wbg_get_67b2ba62fc30de12(...args: any[]): any;
export function __wbg_get_b9b93047fe3cf45b(arg0: any, arg1: any): number;
export function __wbg_instanceof_ArrayBuffer_e14585432e3737fc(arg0: any): boolean;
export function __wbg_instanceof_Uint8Array_17156bcf118086a9(arg0: any): boolean;
export function __wbg_isArray_a1eab7e0d067391b(arg0: any): boolean;
export function __wbg_isSafeInteger_343e2beeeece1bb0(arg0: any): boolean;
export function __wbg_iterator_9a24c88df860dc65(): number;
export function __wbg_length_a446193dc22c12f8(arg0: any): any;
export function __wbg_length_e2d2a49132c1b256(arg0: any): any;
export function __wbg_log_c222819a41e063d3(arg0: any): void;
export function __wbg_msCrypto_60a4979188f6b80b(arg0: any): number;
export function __wbg_new_78feb108b6472713(): number;
export function __wbg_new_a12002a7f91c75be(arg0: any): number;
export function __wbg_newnoargs_105ed471475aaf50(arg0: any, arg1: any): number;
export function __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a(arg0: any, arg1: any, arg2: any): number;
export function __wbg_newwithlength_a381634e90c276d4(arg0: any): number;
export function __wbg_next_25feadfc0913fea9(arg0: any): number;
export function __wbg_next_6574e1a8a62d1055(...args: any[]): any;
export function __wbg_node_0deadde112ce24bb(arg0: any): number;
export function __wbg_process_0caa4f154b97e834(arg0: any): number;
export function __wbg_push_737cfc8c1432c2c6(arg0: any, arg1: any): any;
export function __wbg_randomFillSync_82e8b56b81896e30(...args: any[]): any;
export function __wbg_require_1a22b236558b5786(...args: any[]): any;
export function __wbg_set_37837023f3d740e8(arg0: any, arg1: any, arg2: any): void;
export function __wbg_set_65595bdd868b3009(arg0: any, arg1: any, arg2: any): void;
export function __wbg_static_accessor_GLOBAL_88a902d13a557d07(): number;
export function __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0(): number;
export function __wbg_static_accessor_SELF_37c5d418e4bf5819(): number;
export function __wbg_static_accessor_WINDOW_5de37043a91a9c40(): number;
export function __wbg_subarray_aa9065fa9dc5df96(arg0: any, arg1: any, arg2: any): number;
export function __wbg_value_cd1ffa7b1ab794f1(arg0: any): number;
export function __wbg_versions_134d8f3c6de79566(arg0: any): number;
export function __wbindgen_bigint_from_i64(arg0: any): number;
export function __wbindgen_bigint_from_u64(arg0: any): number;
export function __wbindgen_bigint_get_as_i64(arg0: any, arg1: any): void;
export function __wbindgen_boolean_get(arg0: any): 0 | 1 | 2;
export function __wbindgen_debug_string(arg0: any, arg1: any): void;
export function __wbindgen_error_new(arg0: any, arg1: any): number;
export function __wbindgen_in(arg0: any, arg1: any): boolean;
export function __wbindgen_is_bigint(arg0: any): boolean;
export function __wbindgen_is_function(arg0: any): boolean;
export function __wbindgen_is_object(arg0: any): boolean;
export function __wbindgen_is_string(arg0: any): boolean;
export function __wbindgen_is_undefined(arg0: any): boolean;
export function __wbindgen_jsval_eq(arg0: any, arg1: any): boolean;
export function __wbindgen_jsval_loose_eq(arg0: any, arg1: any): boolean;
export function __wbindgen_memory(): number;
export function __wbindgen_number_get(arg0: any, arg1: any): void;
export function __wbindgen_object_clone_ref(arg0: any): number;
export function __wbindgen_object_drop_ref(arg0: any): void;
export function __wbindgen_string_get(arg0: any, arg1: any): void;
export function __wbindgen_string_new(arg0: any, arg1: any): number;
export function __wbindgen_throw(arg0: any, arg1: any): void;
