import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const StyleLayout: FC<Props> = ({ children }) => {
  return (
    <div className=" relative mx-auto min-h-screen max-w-[390px] bg-white">
      {children}
    </div>
  );
};
