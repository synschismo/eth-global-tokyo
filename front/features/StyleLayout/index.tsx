import { FC, useState } from "react";
import { Modal } from "../../components/Modal";
import { Header } from "../Header";
import { userMock } from "../../mocks/userMock";
import { Footer } from "../Footer";

type Props = {
  children: React.ReactNode;
  rentStatus: "available" | "rented";
  menuStatus: "wallet" | "rental";
  balanceRun?: string;
};

export const StyleLayout: FC<Props> = ({
  children,
  rentStatus,
  menuStatus,
  balanceRun,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const user = userMock;
  return (
    <div className=" mx-auto min-h-screen max-w-[390px] bg-white">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-center font-bold">Lit Protocol Login</div>
        <div className="mt-6 flex justify-center">
          <div className="bg-brown rounded-xl px-8 py-2 font-bold text-white">
            Login
          </div>
        </div>
      </Modal>
      <Header
        balance={user.balance}
        chainId={user.chainId}
        address={user.address}
        balanceRun={balanceRun}
        status={rentStatus}
      />
      {children}
      <Footer mode={menuStatus} />
    </div>
  );
};
