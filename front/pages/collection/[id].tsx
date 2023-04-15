import { Header } from "../../features/Header";
import { StyleLayout } from "../../features/StyleLayout";
import { Footer } from "../../features/Footer";
import { CollectionCard } from "../../features/CollectionCard";
import { RentNftCard } from "../../features/RentNftCard";
import { rentNftsMock } from "../../mocks/rentNftsMock";

const detail = () => {
  return (
    <StyleLayout>
      <Header balance="0.03" />
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
          rentNftsMock.map((rentNft) => {
            const collectionName = rentNft.collectionName;
            const name = rentNft.name;
            const image = rentNft.image;
            const price = rentNft.price;
            const chainId = rentNft.chainId;
            const status: "available" | "rented" = rentNft.status;
            return (
              <RentNftCard
                collectionName={collectionName}
                name={name}
                image={image}
                price={price}
                chainId={chainId}
                status={status}
              />
            );
          })}
      </div>
      <Footer mode="rental" />
    </StyleLayout>
  );
};
export default detail;
