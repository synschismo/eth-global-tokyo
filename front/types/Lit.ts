export type TokenInfo = {
  tokenId: string;
  publicKey: string;
  publicKeyBuffer: Buffer;
  ethAddress: string;
  btcAddress: string;
  cosmosAddress: string;
  isNewPKP: boolean;
};