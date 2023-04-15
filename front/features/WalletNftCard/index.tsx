import Image from "next/image";
import { FC } from "react";

type Props = {
  collectionName: string;
  name: string;
  image: string;
  status: "available" | "lended";
};

export const WalletNftCard: FC<Props> = ({
  collectionName,
  name,
  image,
  status,
}) => {
  return (
    <>
      {status === "lended" ? (
        <div className="relative z-0 mx-auto flex h-[216px] w-[164px] items-center justify-center overflow-hidden rounded-[16px] text-gray-600">
          <div className="bg-pink absolute z-0 h-[300px] w-[100px] animate-spin"></div>
          <div className="z-10 h-[210px] w-[158px] rounded-[14px] bg-white">
            <div className="relative mx-auto mt-2 h-[148px] w-[148px] rounded-2xl bg-gray-300">
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
        </div>
      ) : (
        <div className="border-gray relative mx-auto flex h-[216px] w-[164px] items-center justify-center overflow-hidden rounded-2xl border text-gray-600">
          <div className="z-10 h-[212px] w-[160px] rounded-[14px] bg-white">
            <div className="relative mx-auto mt-2 h-[148px] w-[148px] rounded-2xl bg-gray-300">
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
        </div>
      )}
    </>
  );
};
