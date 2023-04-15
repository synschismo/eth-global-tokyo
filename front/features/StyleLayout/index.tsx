import { FC, useState } from "react";
import { Modal } from "../../components/Modal";

type Props = {
  children: React.ReactNode;
};

export const StyleLayout: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
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
      {children}
    </div>
  );
};
