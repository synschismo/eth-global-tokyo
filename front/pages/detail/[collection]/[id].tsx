import { StyleLayout } from "../../../features/StyleLayout";
import Image from "next/image";
import { chainToCurrencyImage } from "../../../utils/chainToCurrencyImage";
import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { rentNftDetailMock } from "../../../mocks/rentNftDetailMock";
import { Button } from "../../../components/Button";
import { round } from "../../../utils/round";

const detail = () => {
  const nft = rentNftDetailMock;
  const people = [
    { id: 1, name: "infinite", unavailable: false },
    { id: 2, name: "1 day", unavailable: false },
    { id: 3, name: "1 week", unavailable: false },
    { id: 4, name: "1 month", unavailable: false },
  ];
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [nowStatus, setNowStatus] = useState<"available" | "rented">(
    "available"
  );
  const [balanceRun, setBalanceRun] = useState<number>(0.34);

  useEffect(() => {
    let interval: any = null;
    if (nowStatus === "rented" && balanceRun > 0) {
      interval = setInterval(() => {
        setBalanceRun(round(balanceRun - 0.001, 4));
      }, 1000);
    } else if (nowStatus === "available" || balanceRun === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [nowStatus, balanceRun]);

  return (
    <StyleLayout
      rentStatus={nowStatus}
      menuStatus="rental"
      balanceRun={balanceRun.toString()}
    >
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
          <div className="bg-gray text-gray mx-4 mt-4 rounded-2xl p-4">
            <div>Price</div>
            <div className="mt-2 flex items-center justify-start gap-3">
              <div className="relative h-5 w-5 rounded-full">
                <Image
                  className=""
                  src={chainToCurrencyImage(nft.chainId)}
                  fill
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                  alt=""
                />
              </div>
              <div className="text-brown text-3xl font-bold">{nft.price}</div>
              <div>/ minuets</div>
            </div>
          </div>
          {nowStatus === "available" ? (
            <>
              <div className="border-gray mx-4 mt-4 rounded-2xl border p-4 text-lg font-bold">
                <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                  <Listbox.Button className="w-full">
                    <div className="flex items-center justify-between">
                      <div>{selectedPerson.name}</div>
                      <div>
                        <IoIosArrowDown size={24} />
                      </div>
                    </div>
                  </Listbox.Button>
                  <Listbox.Options>
                    {people.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        value={person}
                        disabled={person.unavailable}
                        className="py-2"
                      >
                        {person.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
              <Button
                title="Rent Now"
                doAction={() => setNowStatus("rented")}
                color="#ed4b9e"
              />
            </>
          ) : (
            <Button
              title="Return Now"
              doAction={() => setNowStatus("available")}
              color="#463a3f"
            />
          )}
        </div>
      </div>
    </StyleLayout>
  );
};
export default detail;
