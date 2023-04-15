import Image from "next/image";
import { FC } from "react";

type Props = {
  collectionName: string;
  coverImage: string;
  logoImage: string;
  description: string;
};

export const CollectionCard: FC<Props> = ({
  collectionName,
  coverImage,
  logoImage,
  description,
}) => {
  return (
    <div className="bg-gray h-[242px] w-[343px] rounded-lg">
      <div className="relative h-[94px] w-[343] rounded-t-lg bg-gray-300">
        <Image
          className="rounded-t-lg"
          src={coverImage}
          fill
          style={{ objectFit: "cover" }}
          alt=""
        />
      </div>
      <div className="-translate-y-8">
        <div className="relative ml-4 h-16  w-16 rounded-lg border-2 border-white bg-gray-200">
          <Image
            className="rounded-lg"
            src={logoImage}
            fill
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
        <div className="text-brown mt-6 px-3">
          <div className="text-xl font-bold">{collectionName}</div>
          <div className=" mt-2 text-sm">{description}</div>
        </div>
      </div>
    </div>
  );
};
