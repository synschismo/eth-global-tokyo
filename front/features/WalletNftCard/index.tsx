import { FC } from "react";

type Props = {};

export const WalletNftCard: FC<Props> = ({}) => {
  return (
    <div className="border-gray mx-auto h-[216px] w-[164px] rounded-2xl border text-gray-600">
      <div className="mx-auto mt-2 h-[148px] w-[148px] rounded-xl bg-gray-300"></div>
      <div className="mx-2 mt-2">
        <div className="text-gray text-[10px]">Genuine Undead</div>
        <div className="text-brown text-sm font-bold">VeryLongAnimals #1</div>
      </div>
    </div>
  );
};
