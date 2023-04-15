import { ChainToConfig } from "../config/ChainToConfig";

export const chainToCurrencyImage = (chainId: string) => {
  if (chainId === "1" || chainId === "5" || chainId === "137") {
    return ChainToConfig[chainId].image;
  } else {
    return "/coin/noimage.svg";
  }
};
