import { StyleLayout } from "../../../features/StyleLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { rentNftDetailMock } from "../../../mocks/rentNftDetailMock";
import { Button } from "../../../components/Button";
import { SelectRangeToggle } from "../../../features/SelectRangeToggle";
import { ModalRentReturn } from "../../../features/ModalRentReturn";
import { ModalRentSuccess } from "../../../features/ModalRentSuccess";
import { RentPriceCard } from "../../../features/RentPriceCard";

const detail = () => {
  const nft = rentNftDetailMock;
  const list = [
    { id: 1, name: "infinite", unavailable: false },
    { id: 2, name: "1 day", unavailable: false },
    { id: 3, name: "1 week", unavailable: false },
    { id: 4, name: "1 month", unavailable: false },
  ];
  const [selectItem, setSelectItem] = useState(list[0]);
  const [nowStatus, setNowStatus] = useState<"available" | "rented">(
    "available"
  );
  const [balanceRun, setBalanceRun] = useState<number>(0.34);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [isReturnModal, setIsReturnModal] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (nowStatus === "rented" && balanceRun > 0) {
      interval = setInterval(() => {
        setBalanceRun(balanceRun - 0.0001);
      }, 100);
    } else if (nowStatus === "available" || balanceRun === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [nowStatus, balanceRun]);

  return (
    <StyleLayout
      rentStatus={nowStatus}
      menuStatus="rental"
      balanceRun={balanceRun.toFixed(4).toString()}
    >
      <ModalRentSuccess
        isOpen={isSuccessModal}
        onClose={() => {
          setIsSuccessModal(false);
        }}
      />
      <ModalRentReturn
        isOpen={isReturnModal}
        onClose={() => {
          setIsReturnModal(false);
        }}
      />
      <div className="mx-4">
        <div className="relative aspect-square w-full rounded-2xl bg-slate-300">
          <Image
            className=""
            src={nft.image}
            fill
            style={{ objectFit: "cover", borderRadius: "16px" }}
            alt=""
          />
        </div>
      </div>
      <div className="mx-4 mt-4">
        <div className="text-blue-400">{nft.collectionName}</div>
        <div className="text-brown text-2xl font-bold">{nft.name}</div>
      </div>
      <div className="mx-4 mt-4 pb-32">
        <div className="border-gray w-full rounded-2xl border pb-4">
          <div></div>
          <RentPriceCard chainId={nft.chainId} price={nft.price} />
          {nowStatus === "available" ? (
            <>
              <SelectRangeToggle
                list={list}
                selectItem={selectItem}
                setSelectItem={setSelectItem}
              />
              <Button
                title="Rent Now"
                doAction={() => {
                  setNowStatus("rented");
                  setIsSuccessModal(true);
                }}
                color="#ed4b9e"
              />
            </>
          ) : (
            <Button
              title="Return Now"
              doAction={() => {
                setNowStatus("available");
                setIsReturnModal(true);
              }}
              color="#463a3f"
            />
          )}
        </div>
      </div>
    </StyleLayout>
  );
};
export default detail;
