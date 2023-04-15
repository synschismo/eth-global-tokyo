import type { NextPage } from "next";
import { Footer } from "../features/Footer";
import { WalletNftCard } from "../features/WalletNftCard";
import { StyleLayout } from "../features/StyleLayout";

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
        <div className="mt-4 text-center text-3xl text-black">0.035 ETH</div>
      </div>
      <div className="border-gray my-12 border-b border-t px-2 py-4 text-center">
        My NFTs
      </div>
      <div className="mx-3 grid grid-cols-2 gap-y-4">
        <WalletNftCard />
        <WalletNftCard />
        <WalletNftCard />
        <WalletNftCard />
      </div>
      <Footer mode="wallet" />
    </StyleLayout>
  );
};

export default Home;
