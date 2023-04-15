export type RentNftType = {
  collectionName: string;
  collectionAddress: string;
  name: string;
  tokenId: string;
  image: string;
  price: string;
  chainId: string;
  status: "available" | "rented";
};
