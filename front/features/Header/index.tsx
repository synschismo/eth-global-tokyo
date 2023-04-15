import Image from "next/image";
import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { chainToCurrencyImage } from "../../utils/chainToCurrencyImage";
import Avatar from "boring-avatars";

type Props = {
  address: string;
  balance: string;
  chainId: string;
  balanceRun?: string;
  status: "available" | "rented";
};

export const Header: FC<Props> = ({
  balance,
  chainId,
  balanceRun,
  address,
  status,
}) => {
  return (
    <div className="mx-4 flex h-16 items-center justify-between">
      {status === "available" ? (
        <div className="text-brown font-bold">StreamNFT</div>
      ) : (
        <div className="text-brown font-bold">Stream</div>
      )}
      <div className="flex items-center justify-end gap-2">
        <div className="border-gray flex h-8 items-center justify-center gap-2 rounded-full border px-2">
          <div className="relative h-5 w-5 rounded-full bg-gray-400">
            <Image
              className=""
              src={chainToCurrencyImage(chainId)}
              fill
              style={{ objectFit: "cover", borderRadius: "50%" }}
              alt=""
            />
          </div>
          <div className="text-gray">
            <IoIosArrowDown />
          </div>
        </div>
        {status === "available" ? (
          <div className="text-brown border-gray flex h-8 items-center justify-center rounded-full border px-4 font-bold">
            {balanceRun ? balanceRun : balance}ETH
          </div>
        ) : (
          <div className="bg-pink flex h-8 items-center justify-center rounded-full">
            <div className="px-4 font-bold text-white">Rent</div>
            <div className="text-brown border-pink flex h-8 items-center justify-center rounded-full border bg-white px-4 font-bold">
              {balanceRun ? balanceRun : balance}ETH
            </div>
          </div>
        )}
        <Avatar
          size={32}
          name={address}
          variant="marble"
          colors={["#FF9EDC", "#A1D4FF"]}
        />
      </div>
    </div>
  );
};
