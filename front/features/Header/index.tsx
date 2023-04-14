import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  balance: string;
};

export const Header: FC<Props> = ({ balance }) => {
  return (
    <div className="mx-4 flex h-16 items-center justify-between">
      <div className="text-brown">StreamWallet</div>
      <div className="flex items-center justify-end gap-4">
        <div className="border-gray flex h-8 items-center justify-center gap-2 rounded-full border px-2">
          <div className="h-6 w-6 rounded-full bg-gray-400"></div>
          <div className="text-gray">
            <IoIosArrowDown />
          </div>
        </div>
        <div className="text-brown border-gray flex h-8 items-center justify-center rounded-full border px-4">
          {balance}ETH
        </div>
        <div className="h-8 w-8 rounded-full bg-gray-400"></div>
      </div>
    </div>
  );
};
