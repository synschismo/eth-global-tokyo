import { useState, createContext, useMemo } from "react";

const GlobalContext = createContext(null);

function GlobalProvider({ children }: any) {
  const [loginFlg, setLoginFlg] = useState(false);

  const contextValue: any = useMemo(
    () => ({
      loginFlg,
      setLoginFlg,
    }),
    [loginFlg, setLoginFlg]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
