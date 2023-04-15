import * as LitJsSdk from "@lit-protocol/lit-node-client";

export const runLitAction = async(address: any) => {  
  console.log('address', address);
  const litActionCode = `
    const fetchExpireApiResponse = async () => {
      const url = "https://ethglobal-api-somasekimoto.vercel.app/api/rental-expired";
      let toSign;
      try {
        const response = await fetch(url).then((res) => res.json());
        const isExpire = response.body;
        if (!isExpire) return;
        toSign = { isExpire: isExpire };
        const sigShare = await LitActions.signEcdsa({ toSign, publicKey, sigName });
      } catch(e) {
        console.log(e);
      }
      LitActions.setResponse({ response: JSON.stringify(toSign) });
    };

    fetchExpireApiResponse();
  `;

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });
  const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "serrano" });
  await litNodeClient.connect();
  const { response } = await litNodeClient.executeJs({
    code: litActionCode,
    authSig,
    jsParams: {
      publicKey: address,
      sigName: "sig1",
    },
  });
  console.log('LitExecuteRes', response);
}