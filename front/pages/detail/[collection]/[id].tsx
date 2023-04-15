import { Header } from "../../../features/Header";
import { StyleLayout } from "../../../features/StyleLayout";
import { Footer } from "../../../features/Footer";
import Image from "next/image";
import { chainToCurrencyImage } from "../../../utils/chainToCurrencyImage";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { rentNftDetailMock } from "../../../mocks/rentNftDetailMock";
import { userMock } from "../../../mocks/userMock";

const detail = () => {
  const nft = rentNftDetailMock;
  const user = userMock;
  const people = [
    { id: 1, name: "infinite", unavailable: false },
    { id: 2, name: "1 day", unavailable: false },
    { id: 3, name: "1 week", unavailable: false },
    { id: 4, name: "1 month", unavailable: false },
  ];
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <StyleLayout>
      <Header
        balance={user.balance}
        chainId={user.chainId}
        address={user.balance}
        status="noRent"
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
          {nft.status === "available" ? (
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
              <div className="bg-pink mx-4 mt-4 rounded-2xl py-4 text-center font-bold text-white">
                Rent Now
              </div>
            </>
          ) : (
            <div className="bg-brown mx-4 mt-4 rounded-2xl py-4 text-center font-bold text-white">
              Return Now
            </div>
          )}
        </div>
      </div>

      <Footer mode="rental" />
    </StyleLayout>
  );
};
export default detail;
