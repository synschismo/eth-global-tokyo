import { StyleLayout } from "../../../features/StyleLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { rentNftDetailMock } from "../../../mocks/rentNftDetailMock";
import { Button } from "../../../components/Button";
import { SelectRangeToggle } from "../../../features/SelectRangeToggle";
import { ModalRentReturn } from "../../../features/ModalRentReturn";
import { ModalRentSuccess } from "../../../features/ModalRentSuccess";
import { RentPriceCard } from "../../../features/RentPriceCard";
import {
  RentalStorage__factory,
  Wallet__factory,
} from "../../../typechain-types";

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
                doAction={async () => {
                  let signer: any;
                  const rentalStorageAddr =
                    "0x3D88436c1d23faabEc7B0BbEE794Ba638FF56129";
                  const rentalStorage = RentalStorage__factory.connect(
                    rentalStorageAddr,
                    signer
                  );
                  const lendId = rentalStorage.lendIds(
                    nft.collectionAddress,
                    nft.tokenId
                  );
                  const returnAt = 0; // 0: 無期限, < 0: block.timestamp
                  const rentCallData =
                    rentalStorage.interface.encodeFunctionData("rent", [
                      lendId,
                      returnAt,
                    ]);

                  const renterWalletAddr = await rentalStorage.walletByOwner(
                    "owner のアドレス"
                  );
                  const renterWallet = Wallet__factory.connect(
                    renterWalletAddr,
                    signer
                  );
                  const result = await renterWallet.execute(
                    rentalStorageAddr,
                    0,
                    rentCallData
                  );

                  setNowStatus("rented");
                  setIsSuccessModal(true);
                }}
                color="#ed4b9e"
              />
            </>
          ) : (
            <Button
              title="Return Now"
              doAction={async () => {
                let signer: any;
                const rentalStorageAddr =
                  "0x3D88436c1d23faabEc7B0BbEE794Ba638FF56129";
                const rentalStorage = RentalStorage__factory.connect(
                  rentalStorageAddr,
                  signer
                );
                const renterWalletAddr = await rentalStorage.walletByOwner(
                  "owner のアドレス"
                );
                const renterWallet = Wallet__factory.connect(
                  renterWalletAddr,
                  signer
                );
                const rentId = await rentalStorage.rentIds(
                  nft.collectionAddress,
                  nft.tokenId
                );
                const result = await renterWallet.returnRentItem(rentId);

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
