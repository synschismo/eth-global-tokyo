import { FC } from "react";

type Props = {};

export const RentNftCard: FC<Props> = ({}) => {
  return (
    <div className="border-gray mx-auto h-[248px] w-[164px] rounded-2xl border text-gray-600">
      <div className="mx-auto mt-2 h-[148px] w-[148px] rounded-xl bg-gray-300"></div>
      <div className="mx-2 mt-2">
        <div className="text-gray text-[10px]">Genuine Undead</div>
        <div className="text-brown text-sm font-bold">VeryLongAnimals #1</div>
      </div>
      <div className="border-gray mx-2 mt-2 flex items-center justify-between border-t pt-1">
        <div className="text-[10px]">Daily rental fee:</div>
        <div className=" flex items-center justify-end gap-1">
          <div className="h-3 w-3 rounded-full bg-gray-400"></div>
          <div className="font-bold">0.03</div>
        </div>
      </div>
    </div>
  );
};
