import { FC } from "react";

type Props = {
  title: string;
  doAction: () => void;
  color: string;
};

export const Button: FC<Props> = ({ title, doAction, color }) => {
  return (
    <div
      onClick={doAction}
      className="mx-4 mt-4 cursor-pointer rounded-2xl py-4 text-center font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {title}
    </div>
  );
};
