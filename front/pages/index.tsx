import type { NextPage } from "next";
import { WalletNftCard } from "../features/WalletNftCard";
import { StyleLayout } from "../features/StyleLayout";
import { walletNftsMock } from "../mocks/walletNftsMock";
import Avatar from "boring-avatars";
import { userMock } from "../mocks/userMock";

const Home: NextPage = () => {
  const user = userMock;
  return (
    <StyleLayout rentStatus="available" menuStatus="wallet">
      <div className="pt-32">
        <div className="flex justify-center">
          <Avatar
            size={80}
            name={user.address}
            variant="marble"
            colors={["#FF9EDC", "#A1D4FF"]}
          />
        </div>
        <div className="mt-8 flex justify-center">
          <div className="bg-pink rounded-full px-8 py-1 text-white">
            {user.address.slice(0, 4) + "..." + user.address.slice(-4)}
          </div>
        </div>
        <div className="text-brown mt-4 text-center text-3xl font-bold">
          0.035 ETH
        </div>
      </div>
      <div className="border-gray text-gray mb-4 mt-12 border-b border-t px-2 py-4 text-center font-bold">
        My NFTs
      </div>
      <div className="mx-3 grid grid-cols-2 gap-y-4 pb-32">
        {walletNftsMock &&
          walletNftsMock.map((nft, index) => {
            const collectionName = nft.collectionName;
            const name = nft.name;
            const image = nft.image;
            return (
              <WalletNftCard
                key={index}
                collectionName={collectionName}
                name={name}
                image={image}
              />
            );
          })}
      </div>
    </StyleLayout>
  );
};

export default Home;
