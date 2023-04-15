import { Listbox } from "@headlessui/react";
import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  list: {
    id: number;
    name: string;
    unavailable: boolean;
  }[];
  selectItem: {
    id: number;
    name: string;
    unavailable: boolean;
  };
  setSelectItem: any;
};

export const SelectRangeToggle: FC<Props> = ({
  list,
  selectItem,
  setSelectItem,
}) => {
  return (
    <div className="border-gray text-brown mx-4 mt-4 rounded-2xl border p-4 text-lg font-bold">
      <Listbox value={selectItem} onChange={setSelectItem}>
        <Listbox.Button className="w-full">
          <div className="flex items-center justify-between">
            <div>{selectItem.name}</div>
            <div>
              <IoIosArrowDown size={24} />
            </div>
          </div>
        </Listbox.Button>
        <Listbox.Options>
          {list.map((item) => (
            <Listbox.Option
              key={item.id}
              value={item}
              disabled={item.unavailable}
              className="py-2"
            >
              {item.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};
