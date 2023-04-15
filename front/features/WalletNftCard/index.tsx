import Image from "next/image";
import { FC } from "react";

type Props = {
  collectionName: string;
  name: string;
  image: string;
};

export const WalletNftCard: FC<Props> = ({ collectionName, name, image }) => {
  return (
    <div className="border-gray mx-auto h-[216px] w-[164px] rounded-2xl border text-gray-600">
      <div className="relative mx-auto mt-2 h-[148px] w-[148px] rounded-xl bg-gray-300">
        <Image
          className=""
          src={image}
          fill
          style={{ objectFit: "cover", borderRadius: "12px" }}
          alt=""
        />
      </div>
      <div className="mx-2 mt-2">
        <div className="text-gray text-[10px]">{collectionName}</div>
        <div className="text-brown text-sm font-bold">{name}</div>
      </div>
    </div>
  );
};
