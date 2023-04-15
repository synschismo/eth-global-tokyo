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
      <div className="flex justify-center">
        <CollectionCard />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-y-4">
        <RentNftCard />
        <RentNftCard />
      </div>
      <Footer mode="rental" />
    </StyleLayout>
  );
};
export default detail;
