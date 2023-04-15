import type { NextPage } from "next";
import { Footer } from "../features/Footer";
import { WalletNftCard } from "../features/WalletNftCard";
import { StyleLayout } from "../features/StyleLayout";
import { walletNftsMock } from "../mocks/walletNftsMock";

const Home: NextPage = () => {
  return (
    <StyleLayout>
      <div className="pt-32">
        <div className="mx-auto h-20 w-20 rounded-full bg-gray-400"></div>
        <div className="mt-8 flex justify-center">
          <div className="bg-pink rounded-full px-8 py-1 text-white">
            0x00...0x00
          </div>
        </div>
        <div className="text-brown mt-4 text-center text-3xl font-bold">
          0.035 ETH
        </div>
      </div>
      <div className="border-gray text-gray mb-4 mt-12 border-b border-t px-2 py-4 text-center font-bold">
        My NFTs
      </div>
      <div className="mx-3 mb-32 grid grid-cols-2 gap-y-4">
        {walletNftsMock &&
          walletNftsMock.map((nft) => {
            const collectionName = nft.collectionName;
            const name = nft.name;
            const image = nft.image;
            return (
              <WalletNftCard
                collectionName={collectionName}
                name={name}
                image={image}
              />
            );
          })}
      </div>
      <Footer mode="wallet" />
    </StyleLayout>
  );
};

export default Home;
