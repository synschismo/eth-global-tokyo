import { StyleLayout } from "../../features/StyleLayout";
import { CollectionCard } from "../../features/CollectionCard";
import { RentNftCard } from "../../features/RentNftCard";
import { rentNftsMock } from "../../mocks/rentNftsMock";
import Link from "next/link";

const detail = () => {
  return (
    <StyleLayout rentStatus="available" menuStatus="rental">
      <div className="mt-8 flex justify-center">
        <CollectionCard
          collectionName="VeryLogAnimals"
          coverImage="/sample.png"
          logoImage="/sample.png"
          description="GBC is a generative 10,000 Blueberries NFT collection on Arbitrum dedicated to GMX..."
        />
      </div>
      <div className="mx-3 mb-32 mt-8 grid grid-cols-2 gap-y-4">
        {rentNftsMock &&
          rentNftsMock.map((rentNft, index) => {
            const collectionName = rentNft.collectionName;
            const collectionAddress = rentNft.collectionAddress;
            const name = rentNft.name;
            const tokenId = rentNft.tokenId;
            const image = rentNft.image;
            const price = rentNft.price;
            const chainId = rentNft.chainId;
            const status: "available" | "rented" = rentNft.status;
            return (
              <Link
                href={"/detail/" + collectionAddress + "/" + tokenId}
                key={index}
              >
                <RentNftCard
                  collectionName={collectionName}
                  name={name}
                  image={image}
                  price={price}
                  chainId={chainId}
                  status={status}
                />
              </Link>
            );
          })}
      </div>
    </StyleLayout>
  );
};
export default detail;
