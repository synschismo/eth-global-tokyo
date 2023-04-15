import Image from "next/image";
import { FC } from "react";
import { chainToCurrencyImage } from "../../utils/chainToCurrencyImage";

type Props = {
  collectionName: string;
  name: string;
  image: string;
  price: string;
  chainId: string;
  status: "available" | "rented";
};

export const RentNftCard: FC<Props> = ({
  collectionName,
  name,
  image,
  price,
  chainId,
  status,
}) => {
  return (
    <div className="border-gray mx-auto h-[240px] w-[164px] rounded-2xl border text-gray-600">
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
        <div className="text-brown text-xs font-bold">{name}</div>
      </div>
      {status === "available" ? (
        <div className="border-gray mx-2 mt-2 flex items-center justify-between border-t pt-1">
          <div className="text-[10px]">Daily rental fee:</div>
          <div className=" flex items-center justify-end gap-1">
            <div className="relative h-[14px] w-[14px] rounded-full bg-gray-400">
              <Image
                className=""
                src={chainToCurrencyImage(chainId)}
                fill
                style={{ objectFit: "cover", borderRadius: "50%" }}
                alt=""
              />
            </div>
            <div className="font-bold">{price}</div>
          </div>
        </div>
      ) : (
        <div className="border-gray mx-2 mt-2 flex items-center justify-between border-t pt-1">
          <div className="text-[10px]">Status:</div>
          <div className="text-pink text-sm font-bold">Rented Now</div>
        </div>
      )}
    </div>
  );
};
