import Link from "next/link";
import { FC } from "react";
import { FaWallet } from "react-icons/fa";
import { SiMastercard } from "react-icons/si";

type Props = {
  mode: "wallet" | "rental";
};

export const Footer: FC<Props> = ({ mode }) => {
  return (
    <div className="fixed bottom-0 grid h-20 w-[390px] grid-cols-2 bg-white">
      <div className="flex items-center justify-center">
        {mode == "wallet" ? (
          <div>
            <div className="text-pink flex justify-center">
              <FaWallet size={20} />
            </div>
            <div className="text-pink mt-1 text-center">Wallet</div>
          </div>
        ) : (
          <Link href="/">
            <div className="text-gray flex justify-center">
              <FaWallet size={20} />
            </div>
            <div className="text-gray mt-1 text-center">Wallet</div>
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center">
        {mode == "rental" ? (
          <div>
            <div className="text-pink flex justify-center">
              <SiMastercard size={20} />
            </div>
            <div className="text-pink mt-1 text-center">Rental</div>
          </div>
        ) : (
          <Link href="/collection/test">
            <div className="text-gray flex justify-center">
              <SiMastercard size={20} />
            </div>
            <div className="text-gray mt-1 text-center">Rental</div>
          </Link>
        )}
      </div>
    </div>
  );
};
