import Image from "next/image";
import { Header } from "../../features/Header";
import { StyleLayout } from "../../features/StyleLayout";
import { IoIosArrowDown } from "react-icons/io";
import { Footer } from "../../features/Footer";
import { CollectionCard } from "../../features/CollectionCard";

const detail = () => {
  return (
    <StyleLayout>
      <Header balance="0.03" />
      <div className="flex justify-center">
        <CollectionCard />
      </div>
      <Footer mode="rental" />
    </StyleLayout>
  );
};
export default detail;
