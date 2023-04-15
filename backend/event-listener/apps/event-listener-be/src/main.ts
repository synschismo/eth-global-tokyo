import Queue from "bull";

import { BlockListener } from "./listeners/block-listener";
// import { mockAddBlockJobs } from "./mock/mock-add-block-jobs";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { getWalletAuthSig, Logger } from "@lit-dev/utils";
import * as dotenv from "dotenv";
import { redisConfig } from "@lit-dev/utils/src/redisConfig";

dotenv.config();

const litNodeClient = new LitJsSdk.LitNodeClient({
  litNetwork: "serrano",
  debug: true,
});

const log = new Logger("[Main]");

const bootstrap = async () => {
  const chainId = 80001; // TODO: どのチェーンで署名するかによる？ここもEthereumに変える
  log.warning(`Bootstrapping...`);

  await litNodeClient.connect();
  log.warning(`LitNodeClient connected`);
  LitJsSdk
  const serverAuthSig = await getWalletAuthSig({
    privateKey: process.env.SERVER_PRIVATE_KEY,
    chainId, // TODO: どのチェーンで署名するかによる？ここもEthereumに変える
  });
  log.warning(`Server AuthSig generated`);

  const blockListener = new BlockListener({
    waitingList: new Queue("blockEventWaitingList", { redis: redisConfig() }),
    processList: new Queue("blockEventProcessingList", {
      redis: redisConfig(),
    }),
    litNodeClient,
    serverAuthSig,
    rpcUrl: "https://matic-mumbai.chainstacklabs.com", // TODO: ethereum mainnetにする
  });


  blockListener.start({
    // beforeEnd: () => {
    //   mockAddBlockJobs(30304200, 5000, 10);
    // },
  });
};

bootstrap();
