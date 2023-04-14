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
          <div className="bg-pink rounded-full px-8 py-1">0x00...0x00</div>
        </div>
        <div className="mt-4 text-center text-3xl text-black">0.035 ETH</div>
      </div>
      <div className="mt-12 border-t border-gray-500 px-2 pt-4">
        <div className="grid grid-cols-2 gap-y-4">
          <WalletNftCard />
          <WalletNftCard />
          <WalletNftCard />
          <WalletNftCard />
        </div>
      </div>
      <Footer mode="wallet" />
    </StyleLayout>
  );
};

export default Home;
