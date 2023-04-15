import { FC } from "react";
import { Modal } from "../../components/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalRentReturn: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-brown text-center font-bold">Thank You Return</div>
      <div className="mt-4 text-center text-3xl">🥳</div>
      <div className="mt-6 flex justify-center">
        <div
          onClick={onClose}
          className="bg-pink cursor-pointer rounded-xl px-8 py-2 font-bold text-white"
        >
          close
        </div>
      </div>
    </Modal>
  );
};
