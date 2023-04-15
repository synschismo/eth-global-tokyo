import { FC, useContext, useState } from "react";
import { Modal } from "../../components/Modal";
import { Header } from "../Header";
import { userMock } from "../../mocks/userMock";
import { Footer } from "../Footer";
import { GlobalContext } from "../../contexts/Global";

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
  const { loginFlg, setLoginFlg }: any = useContext(GlobalContext);
  const user = userMock;
  return (
    <div className="flex justify-center">
      <div className="min-h-screen w-[390px] bg-white">
        <Modal isOpen={!loginFlg} onClose={() => setIsOpen(true)}>
          <div className="text-brown text-center font-bold">
            Lit Protocol Login
          </div>
          <div className="mt-6 flex justify-center">
            <div
              onClick={() => setLoginFlg(true)}
              className="bg-brown cursor-pointer rounded-xl px-8 py-2 font-bold text-white"
            >
              Login
            </div>
          </div>
        </Modal>
        <div className="pt-14">
          <Header
            balance={user.balance}
            chainId={user.chainId}
            address={user.address}
            balanceRun={balanceRun}
            status={rentStatus}
          />
        </div>
        {children}
        <Footer mode={menuStatus} />
      </div>
    </div>
  );
};
