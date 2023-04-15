
import type { NextApiRequest, NextApiResponse } from "next";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { safeFetch } from "@lit-dev/utils";
import { LitContracts } from "@lit-protocol/contracts-sdk";
import abi from "../../rentalStorage.json";
import { Contract, providers, utils, Wallet } from "ethers";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {

    const { body } = req
    let { rentId, customerAddress } = body;
    
    
      // let authSig: any;
    
      // try {
      //   authSig = await LitJsSdk.checkAndSignAuthMessage({
      //     chain: "mumbai",
      //     expiration: (60 * 60 * 24 * 7).toString(),
      //   });
    
    
      //   console.log("authSig:", authSig);
      // } catch (e: any) {
      //   console.log("error:", e);
      //   return;
      // }
      const client = new LitJsSdk.LitNodeClient({ litNetwork: "serrano", debug: true });
      await client.connect();
      const provider = new providers.StaticJsonRpcProvider('https://matic-mumbai.chainstacklabs.com');
      // const provider = new providers.StaticJsonRpcProvider('https://eth.llamarpc.com');

      const NFTStreamingAddress = "0x3D88436c1d23faabEc7B0BbEE794Ba638FF56129"; // TODO: オート返却functionが入ってるコントラクト

      const NFTStreaming = new Contract(NFTStreamingAddress, abi, provider);

      const ownerAddress = "0xC3fdC8B5a2C8377910E0bFe8b2fda831F9EACdF5";

      customerAddress = "0xfc2eAB42E2E672036D411B821DD4E671c075e209"; // TODO: 顧客のアドレスにする

      
      

    const jsCode = `
    async function main() {
      console.log("started");
      const respond = (data) => {
          Lit.Actions.setResponse({
          response: JSON.stringify(data),
          });
  
          return data;
      };
    
      const url = "https://ethglobal-api-somasekimoto.vercel.app/api/rental-expired";
      let res;
      let rentalExpired;

  
      try {
          res = await fetch(url).then((response) => response.json());
          rentalExpired = res.expired;
      } catch (e) {
          console.log(e);
      }
      console.log("clear2")
  
      if (!rentalExpired) {
          return;
      }
      console.log("publicKey")
      console.log(publicKey)

      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      const wallet = new ethers.Wallet("0x"+ privKey, provider);
      const contract = new ethers.Contract(to, abi, wallet);
      const result = await contract.returnScheduledRent(rentId, {from: wallet.address});


      // const fromAddress = ethers.utils.computeAddress(publicKey);
      // const latestNonce = await LitActions.getLatestNonce({ address: fromAddress, chain });
      // console.log("latestNonce")
      // console.log(latestNonce)
      // const latestNonce = provider.getTransactionCount(fromAddress);

      // const txParams = {
      //   nonce: latestNonce,
      //   gasPrice,
      //   gasLimit,
      //   to,
      //   value,
      //   chainId,
      //   data,
      // };
      
      // Lit.Actions.setResponse({ response: JSON.stringify(txParams) });
      
      
      // const serializedTx = ethers.utils.serializeTransaction(txParams);
      // const rlpEncodedTxn = ethers.utils.arrayify(serializedTx);
      // const unsignedTxn =  ethers.utils.arrayify(ethers.utils.keccak256(rlpEncodedTxn));
      
      // const sigShare = await LitActions.signEcdsa({ toSign: unsignedTxn, publicKey, sigName });
  
      respond({
          success: true,
          message: result,
      });

      console.log("clear4")
    }
    main();
    `;

  
    let registerData: any;

    try{
        registerData = await safeFetch(
            "http://localhost:4000/api/register-lit-action",
            // @ts-ignore
            jsCode,
            (e: Error) => {
              console.log("error: in safeFetch", e);
            }
          );
    } catch (e) {
        console.log("error:", e);
    }
    
    
    console.log("registerData:", registerData);

    // console.log("process.env.NEXT_PUBLIC_PKP_PRIVATE_KEY:", process.env.NEXT_PUBLIC_SERVER_PRIVATE_KEY)

    const contract = new LitContracts({
        privateKey: process.env.NEXT_PUBLIC_SERVER_PRIVATE_KEY,
      });
    await contract.connect();

    let addPermittedActionRes;
    let pkpTokenId;
    pkpTokenId = "16171231985011569615630388585846774558848100284735363537201482221834298016593"// TODO: PKPのトークンID をフロントからもらう

    let ipfsId = registerData.data.IpfsHash
    try {
      addPermittedActionRes =
        await contract.pkpPermissionsContractUtil.write.addPermittedAction(
        //   selectedPKP.tokenId,
            pkpTokenId,
            ipfsId
        );
      console.log("addPermittedActionRes:", addPermittedActionRes);
    } catch (e: any) {
      console.error("e: in addPermittingActions", e);
      return;
    }
    
    // const rentId = 1
    if(!rentId){
      rentId = 1
    }

    const data = NFTStreaming.interface.encodeFunctionData("returnScheduledRent", [rentId.toString()]); 
    // const gas = await NFTStreaming.estimateGas.mint(customerAddress, amount, {from: ownerAddress}); 
    const gas = await NFTStreaming.estimateGas.returnScheduledRent(rentId.toString(), {from: ownerAddress});
    // server_private_keyで署名する
    let ownerWallet = new Wallet((process.env.NEXT_PUBLIC_SERVER_PRIVATE_KEY) as any, provider);
    // ownerWallet.signMessage()
    
    // const txParams = {
      
    //   gasPrice,
    //   gasLimit,
    //   to,
    //   value,
    //   chainId,
    //   data,
    // };
    // let signature = ownerWallet.signMessage(data);

    // const jsParams = { // TODO: 渡す引数を考える
    //     gasPrice: "0x2e90edd000",
    //     gasLimit: gas.toHexString(),
    //     to: NFTStreamingAddress,
    //     value: "0x",
    //     chainId: 80001,
    //     chain: "mumbai",
    //     data,
    //     // fromAddress: ownerAddress,
    //     publicKey: "0x04dacde0c36d645deb8e0dfa9028c5190c3157ace0fb8f4e08cc6d790b9e9dedb405a6f1bbe29dd798b6bc3d1cb684628015ba96b82007640f8f451477d6e3e50d", // TODO: PKP public key
    //     sigName: "auto-return",
    //     signature: signature
    // }
    const rpcUrl = "https://matic-mumbai.chainstacklabs.com"; // TODO: チェーンを変える polygon mainnet
    const chain = "mumbai";
    const jsParams = { // TODO: 渡す引数を考える
      gasPrice: "0x2e90edd000",
      gasLimit: gas.toHexString(),
      to: NFTStreamingAddress,
      value: "0x",
      chainId: 80001,
      chain,
      data,
      rpcUrl,
      fromAddress: ownerAddress,
      publicKey: "0x04dacde0c36d645deb8e0dfa9028c5190c3157ace0fb8f4e08cc6d790b9e9dedb405a6f1bbe29dd798b6bc3d1cb684628015ba96b82007640f8f451477d6e3e50d", // TODO: PKP public key
      sigName: "auto-return",
      privKey: process.env.NEXT_PUBLIC_SERVER_PRIVATE_KEY,
      abi: abi,
      customerAddress: customerAddress,
      rentId: rentId,
      // signature: signature
  }

    // const serializedTx = utils.serializeTransaction({

    // });
      
    //   const rlpEncodedTxn = utils.arrayify(serializedTx);
    //   const unsignedTxn =  utils.arrayify(utils.keccak256(rlpEncodedTxn));
    //   console.log("unsignedTxn")
    //   console.log(unsignedTxn)

    const watcingNetworkProvider = new providers.StaticJsonRpcProvider('https://eth.llamarpc.com');
    const startBlock = await watcingNetworkProvider.getBlockNumber()
    let param = {
        ownerAddress: ownerAddress,
        pkpInfo: {
            tokenId:pkpTokenId
        },
        ipfsId: ipfsId,
        jsParams: jsParams,
        eventType: "block",
        eventParams: {
            startBlock: startBlock, // TODO: 今のブロックナンバーを取得するもしくはフロントからもらう
            endBlock: startBlock + 35, // TODO: 多めにつけとけば問題ない。終了時刻からブロックナンバーを計算するもしくはフロントからもらう 
        },
    }
    let submitData: any;

    try {

        submitData = await safeFetch(
        "http://localhost:4000/api/submit-job",
        param,
        (e: Error) => {
            console.error("error: in submitData", e);
        }
      );
    } catch (e: any) {
        console.error("e: in addPermittingActions", e);
        return;
    }
  
      console.log("submitData:", submitData);

    return res.status(200).json(submitData);
}



