import Image from "next/image";
import { Header } from "../../features/Header";
import { StyleLayout } from "../../features/StyleLayout";
import { IoIosArrowDown } from "react-icons/io";
import { Footer } from "../../features/Footer";
import { CollectionCard } from "../../features/CollectionCard";
import { RentNftCard } from "../../features/RentNftCard";

const detail = () => {
  return (
    <StyleLayout>
      <Header balance="0.03" />
      <div className="mx-4">
        <div className="aspect-square w-full rounded-2xl bg-slate-300"></div>
      </div>
      <div className="mx-4 mt-4">
        <div className="text-blue-400">VeryLongAnimlas</div>
        <div className="text-brown text-2xl font-bold">VeryLongAnimlas #72</div>
      </div>
      <div className="mx-4 mt-4">
        <div className="border-gray w-full rounded-2xl border pb-4">
          <div></div>
          <div className="bg-gray text-gray mx-4 mt-4 rounded-2xl p-4">
            <div>Price</div>
            <div className="flex items-end justify-start gap-4">
              <div>logo</div>
              <div className="text-2xl font-bold">5.3</div>
              <div>/ minuets</div>
            </div>
          </div>
          <div className=""></div>
          <div className="bg-pink mx-4 mt-4 rounded-2xl py-4 text-center font-bold text-white">
            Rent Now
          </div>
        </div>
      </div>

      <Footer mode="rental" />
    </StyleLayout>
  );
};
export default detail;
