
import type { NextApiRequest, NextApiResponse } from "next";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { safeFetch } from "@lit-dev/utils";
import { LitContracts } from "@lit-protocol/contracts-sdk";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const jsonCode = {
        "toSign": [
          1,
          2,
          3,
          4,
          5
        ],
        "publicKey": "0495123f3feeb7a5c7cb9b20595b511ad4348fc5f47b261b6f2cbadb161e72b3de1734951660261316725ea51920bc3905d4ddf8e755567b5122decd2795eb0c76",
        "sigName": "test-run-sig",
        "minSellPrice": 1680,
        "tokenSymbol": "ETH"
      }
    
      let authSig: any;
    
      try {
        authSig = await LitJsSdk.checkAndSignAuthMessage({
          chain: "mumbai",
          expiration: (60 * 60 * 24 * 7).toString(),
        });
    
    
        console.log("authSig:", authSig);
      } catch (e: any) {
        console.log("error:", e);
        return;
      }

    const jsCode = `
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
            rentalExpired = rep.expired;
        } catch (e) {
            console.log(e);
        }
    
        if (!rentalExpired) {
            return;
        }
    
        respond({
            success: true,
            message: "Rental expired",
        });
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
    pkpTokenId = "16171231985011569615630388585846774558848100284735363537201482221834298016593"

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
    let address = "0xC3fdC8B5a2C8377910E0bFe8b2fda831F9EACdF5" // wallet address
    let param = {
        ownerAddress: address,
        pkpInfo: {
            tokenId:pkpTokenId
        },
        ipfsId: ipfsId,
        jsParams: jsonCode,
        eventType: "block",
        eventParams: {
            startBlock: "34408009",
            endBlock: "36409009",
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



