import { FC, useContext, useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Header } from "../Header";
import { userMock } from "../../mocks/userMock";
import { Footer } from "../Footer";
import { GlobalContext } from "../../contexts/Global";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { usePKPConnectionContext } from "../../hooks/usePKPcConnectionContext";
import { toast } from "react-hot-toast";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import { TokenInfo } from "../../types/Lit";
import { StateReducer } from "../../utils/stateReducer";
import { fetchPKPs } from "../../components/PKPSelection";

type Props = {
  children: React.ReactNode;
  rentStatus: "available" | "rented";
  menuStatus: "wallet" | "rental";
  balanceRun?: string;
};

export const StyleLayout: FC<Props> = ({
  children,
  rentStatus,
  menuStatus,
  balanceRun,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { loginFlg, setLoginFlg }: any = useContext(GlobalContext);
  const { address, isConnected } = useAccount();
  const [hasLocalPkps, setHasLocalPkps] = useState(false);
  const [_isConnected, setIsConnected] = useState(false);
  const user = userMock;

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const onMint = async () => {
    try {
      const litContracts = new LitContracts({
        debug: false,
      });
      await litContracts.connect();

      const tx = await litContracts.pkpNftContractUtil.write.mint();
      console.log("Tx: ", tx);
      toast.success("Successfully minted PKP!", {
        duration: 1000,
      });

      if (!address) {
        console.log('No address');
        return
      }

      const result = await fetchPKPs(
        address,
        (tokens: Array<TokenInfo>, tokenInfo: TokenInfo, progress: number) => {
        }
      );

      setHasLocalPkps(true);
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Error minting", {
        duration: 1000,
      });
    }
  };

  useEffect(() => {
    setIsConnected(isConnected);
    // handle if click outside of menu, set 'lit-mini-menu' to 'none'
    const handleClickOutside = (e: any) => {
      const menu: any = document.querySelector(".lit-mini-menu");
      if (!menu) return;
      // allow list of elements to be clicked
      if (
        e.target.id === "lit-connect-menu" ||
        e.target.classList.contains("lit-button-icon") ||
        e.target.classList.contains("click-allowed")
      ) {
        menu.style.display = "flex";
        return;
      }
      menu.style.display = "none";
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isConnected]);

  useEffect(() => {
    const pkps = localStorage.getItem("lit-cached-pkps");
    if (pkps != null) setHasLocalPkps(true);
  }, [])

  const renderConnected = () => {
    return (
      <button onClick={onMint}>Mint</button>
    );
  }

  const renderDisconnected = () => {
    return (
      <button onClick={() => connect()}>Connect</button>
    );
  };

  const showModal = () => {
    if (hasLocalPkps && _isConnected) return true; 
    return false;
  }
  return (
    <div className="flex justify-center">
      <div className="min-h-screen w-[390px] bg-white">
        {showModal() || (
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="text-brown text-center font-bold">
              {!_isConnected ? renderDisconnected() : renderConnected()}
            </div>
          </Modal>
        )}
        <Header
          balance={user.balance}
          chainId={user.chainId}
          address={user.address}
          balanceRun={balanceRun}
          status={rentStatus}
        />
        {children}
        <Footer mode={menuStatus} />
      </div>
    </div>
  );
};
