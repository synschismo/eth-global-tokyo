import Image from "next/image";
import { FC } from "react";

type Props = {};

export const CollectionCard: FC<Props> = ({}) => {
  return (
    <div className="bg-gray h-[242px] w-[343px] rounded-lg">
      <div className="h-[94px] w-[343] rounded-lg bg-gray-300">
        <Image
          className=""
          src={"/images/1.png"}
          fill
          style={{ objectFit: "cover", borderRadius: "50%" }}
          alt=""
        />
      </div>
      <div className="-translate-y-8">
        <div className="ml-4 h-16 w-16  bg-gray-200"></div>
        <div className="text-brown mt-6 px-3">
          <div className="text-xl font-bold">Very Long Animals</div>
          <div className=" mt-2 text-sm">
            GBC is a generative 10,000 Blueberries NFT collection on Arbitrum
            dedicated to GMX...
          </div>
        </div>
      </div>
    </div>
  );
};
