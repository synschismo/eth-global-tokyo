import type { NextPage } from "next";
import { Footer } from "../features/Footer";
import { WalletNftCard } from "../features/WalletNftCard";
import { StyleLayout } from "../features/StyleLayout";
import { walletNftsMock } from "../mocks/walletNftsMock";
import Avatar from "boring-avatars";
import { Header } from "../features/Header";
import { userMock } from "../mocks/userMock";

const Home: NextPage = () => {
  const user = userMock;
  return (
    <StyleLayout>
      <Header
        balance={user.balance}
        chainId={user.chainId}
        address={user.address}
        status="noRent"
      />
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
