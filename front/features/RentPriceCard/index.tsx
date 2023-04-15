import Image from "next/image";
import { FC } from "react";
import { chainToCurrencyImage } from "../../utils/chainToCurrencyImage";

type Props = {
  chainId: string;
  price: string;
};

export const RentPriceCard: FC<Props> = ({ chainId, price }) => {
  return (
    <div className="bg-gray text-gray mx-4 mt-4 rounded-2xl p-4">
      <div>Price</div>
      <div className="mt-2 flex items-center justify-start gap-3">
        <div className="relative h-5 w-5 rounded-full">
          <Image
            className=""
            src={chainToCurrencyImage(chainId)}
            fill
            style={{ objectFit: "cover", borderRadius: "50%" }}
            alt=""
          />
        </div>
        <div className="text-brown text-3xl font-bold">{price}</div>
        <div>/ minuets</div>
      </div>
    </div>
  );
};
