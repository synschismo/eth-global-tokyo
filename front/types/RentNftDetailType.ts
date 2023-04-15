export type RentNftDetailType = {
  collectionName: string;
  name: string;
  image: string;
  price: string;
  chainId: string;
  status: "available" | "rented";
};
