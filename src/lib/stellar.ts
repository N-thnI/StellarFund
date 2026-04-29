import albedo from '@albedo-link/intent';
import * as StellarSdk from '@stellar/stellar-sdk';

export const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

export const handleStellarError = (error: any) => {
  console.error("Stellar Error:", error);
  if (error.message?.includes("closed") || error.code === -1) {
    return "Connection closed by user.";
  }
  if (error.message?.includes("invalid")) {
    return "Invalid transaction data.";
  }
  return "Account not found or network error. Please fund your Testnet account.";
};

export const connectWallet = async () => {
  try {
    const res = await albedo.publicKey({});
    return { address: res.pubkey, error: null };
  } catch (err: any) {
    return { address: null, error: handleStellarError(err) };
  }
};
