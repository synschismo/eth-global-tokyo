import { LitContracts } from "@lit-protocol/contracts-sdk";
import { useEffect, useReducer, useState } from "react";
import { toast } from "react-hot-toast";
import { StateReducer } from "../utils/stateReducer";
import { watchSigner } from "@wagmi/core";
import { TokenInfo } from "../types/Lit";
import { ECDSAAddresses } from "../utils/ECDSAAddress";
import { LitIcon } from "./Icon/LitIcon";
import { usePKPConnectionContext } from "../hooks/usePKPcConnectionContext";
import Router from "next/router";

const getShortAddress = (
  address: string | undefined,
  start = 6,
  end = 4
) => {
  if (!address) {
    return `address is undefined`;
  }

  return address.slice(0, start) + "..." + address.slice(-end);
};

export const fetchPKPs = async (
  walletAddress: string,
  onProgress: (
    tokens: Array<TokenInfo>,
    tokenInfo: TokenInfo,
    progress: number
  ) => void
) => {
  const litContracts = new LitContracts({
    debug: false,
  });
  await litContracts.connect();

  const tokenIds =
    await litContracts.pkpNftContractUtil.read.getTokensByAddress(
      walletAddress
    );

  const tokens = [];

  // async for each
  for (let i = 0; i < tokenIds.length; i++) {
    let tokenInfo: TokenInfo;
    try {
      tokenInfo = await ECDSAAddresses({
        pkpTokenId: tokenIds[i],
        options: {
          cacheContractCall: true,
        },
      });

      tokens.push(tokenInfo);

      if (onProgress) {
        const progress = parseInt(
          (((i + 1) / tokenIds.length) * 100).toFixed(2)
        );
        onProgress(tokens, tokenInfo, progress);
      }
    } catch (e) {
      console.error(e);
      continue;
    }
  }

  return tokens;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLElement>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
type LitButtonProp = AnchorProps | ButtonProps | any;
const LitButton = (props: LitButtonProp) => {
  const handleMouseOver = (e: any) => {
    const span = e.target.querySelector("span");

    if (!span) return;

    span.style.display = "block";
  };

  const isRedirect = (props: any) => {
    return (props as any).redirect !== undefined;
  };

  const isIcon = (props: any) => {
    return (props as any).icon !== undefined;
  };

  const isAnchor = (props: LitButtonProp): props is AnchorProps => {
    return (props as AnchorProps).href !== undefined;
  };

  const handleMouseLeave = (e: any) => {
    const span = e.target.querySelector("span");

    if (!span) return;

    span.style.display = "none";
  };

  if (isRedirect(props)) {
    const redirect = (e: any) => {
      // console.log(e);
      e.preventDefault();
      Router.push(props.redirect);
    };

    return (
      <a className="alink" onClick={redirect} href={props.redirect} {...props}>
        {props.children}
      </a>
    );
  }
  if (isAnchor(props)) {
    return <a className="lit-button" {...props} />;
  }
  if (isIcon(props)) {
    const defaultClass = "lit-button-icon";

    const newProp = props.className
      ? {
          ...props,
          className: [...props.className, ` ${defaultClass}`].join(""),
        }
      : { ...props, className: defaultClass };

    return (
      <button
        type="button"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        {...newProp}
      >
        <LitIcon className="no-pointer" icon={props.icon} />
        <span className="">{props.hovertext}</span>
      </button>
    );
  }
  return <button type="button" className="lit-button" {...props} />;
};


export const PKPSelection = ({
  address,
  onDone,
}: {
  address: string;
  onDone: any;
}) => {
  const { pkpConnected, selectedPKP, setSelected } = usePKPConnectionContext();

  const [state, dispatch] = useReducer(StateReducer, {
    data: [],
    loading: false,
  });

  watchSigner(
    {
      chainId: 1,
    },
    async (provider) => {
      dispatch({
        type: "LOADING",
        loadingMessage: "Fetching PKPs...",
      });

      const addr = (await provider?.getAddress()) as string;

      const result = await fetchPKPs(
        addr,
        (tokens: Array<TokenInfo>, tokenInfo: TokenInfo, progress: number) => {
          dispatch({
            type: "LOADING",
            loadingMessage: `Loading ${progress}%..`,
          });
        }
      );

      dispatch({ type: "SET_DATA", payload: { pkps: result } });
    }
  );

  useEffect(() => {
    async function loadData() {
      dispatch({
        type: "LOADING",
        loadingMessage: "Fetching PKPs...",
      });

      const result = await fetchPKPs(
        address,
        (tokens: Array<TokenInfo>, tokenInfo: TokenInfo, progress: number) => {
          dispatch({
            type: "LOADING",
            loadingMessage: `Loading ${progress}%..`,
          });
        }
      );

      dispatch({ type: "SET_DATA", payload: { pkps: result } });

      // check if localstorage has a selected pkp
      const selectedPKP = localStorage.getItem("lit-selected-pkp");
      if (selectedPKP) {
        const pkp = JSON.parse(selectedPKP);
        dispatch({ type: "SET_DATA", payload: { selectedPKP: pkp } });

        // scroll to the selected pkp
        const pkpCard = document.getElementById(`pkp-card-${pkp.tokenId}`);
        if (pkpCard) {
          pkpCard.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }
      }

      // callback done
      if (onDone) {
        onDone();
      }
    }
    loadData();
  }, []);

  const onSelectToken = (e: any, pkp: TokenInfo) => {
    if (![...e.target.classList]?.includes("pkp-card-focus")) return;

    // save the selected pkp to localstorage
    try {
      localStorage.setItem("lit-selected-pkp", JSON.stringify(pkp));
      dispatch({ type: "SET_DATA", payload: { selectedPKP: pkp } });

      // update PKPConnectedProvider
      setSelected(pkp);
    } catch (e) {
      toast.error("Error saving selected PKP to localstorage", {
        duration: 1000,
      });
    }
  };
};
