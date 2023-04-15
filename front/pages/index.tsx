import type { NextPage } from "next";
import { WalletNftCard } from "../features/WalletNftCard";
import { StyleLayout } from "../features/StyleLayout";
import { walletNftsMock } from "../mocks/walletNftsMock";
import Avatar from "boring-avatars";
import { userMock } from "../mocks/userMock";
import { useEffect, useState } from "react";
import { walletRentsMock } from "../mocks/walletRentMock";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import { UserNftType } from "../types/UserNftType";

const Home: NextPage = () => {
  const user = userMock;
  const [balanceRun, setBalanceRun] = useState(0.35);
  const [status, setStatus] = useState<"rent" | "mynfts">("rent");
  const [userNfts, setUserNfts] = useState(null);

  useEffect(() => {
    const AIRSTACK_ENDPOINT = "https://api.airstack.xyz/gql";
    const AIRSTACK_API_KEY = process.env.NEXT_PUBLIC_AIRSTACK_KEY
      ? process.env.NEXT_PUBLIC_AIRSTACK_KEY
      : "";

    const client = new ApolloClient({
      uri: AIRSTACK_ENDPOINT,
      cache: new InMemoryCache(),
      headers: { Authorization: AIRSTACK_API_KEY },
    });

    const f = async () => {
      const query = gql`
        query MyQuery($cursor: String, $owners: [Identity!], $limit: Int) {
          TokenBalances(
            input: {
              filter: {
                owner: { _in: $owners }
                tokenType: { _in: [ERC1155, ERC721] }
              }
              blockchain: polygon
              limit: $limit
              cursor: $cursor
            }
          ) {
            TokenBalance {
              amount
              chainId
              id
              lastUpdatedBlock
              lastUpdatedTimestamp
              owner {
                addresses
              }
              tokenAddress
              tokenId
              tokenType
              token {
                name
                symbol
              }
            }
            pageInfo {
              prevCursor
              nextCursor
            }
          }
        }
      `;

      const response = await client.query({
        query,
        variables: {
          owners: ["0x5eFd4B32c4ccbB09912f3Db83Bc43FD33E239f09"],
          limit: 10,
          cursor: "",
        },
      });
      // console.log(response);
      const data = response.data.TokenBalances.TokenBalance.map(
        (token: any) => {
          const tmpDate: UserNftType = {
            name: "",
            image: "",
            collectionName: token.token.name,
            status: "available",
          };
          return tmpDate;
        }
      );
      setUserNfts(data);
    };
    f();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (balanceRun > 0) {
      interval = setInterval(() => {
        setBalanceRun(balanceRun + 0.0001);
      }, 100);
    } else if (balanceRun === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [balanceRun]);

  return (
    <StyleLayout
      rentStatus="available"
      menuStatus="wallet"
      balanceRun={balanceRun.toFixed(4).toString()}
    >
      <div className="pt-32">
        <div className="flex justify-center">
          <Avatar
            size={80}
            name={user.address}
            variant="marble"
            colors={["#FF9EDC", "#A1D4FF"]}
          />
        </div>
        <div className="mt-8 flex justify-center">
          <div className="bg-pink rounded-full px-8 py-1 text-white">
            {user.address.slice(0, 4) + "..." + user.address.slice(-4)}
          </div>
        </div>
        <div className="text-brown mt-4 text-center text-3xl font-bold">
          {balanceRun.toFixed(4).toString()} ETH
        </div>
      </div>
      <div className="border-gray text-gray mb-4 mt-12 grid grid-cols-2 border-b border-t px-2 py-4 text-center font-bold">
        {status === "rent" ? (
          <>
            <div className="text-pink">Rent</div>
            <div onClick={() => setStatus("mynfts")}>MyNFTs</div>
          </>
        ) : (
          <>
            <div onClick={() => setStatus("rent")}>Rent</div>
            <div className="text-pink">MyNFTs</div>
          </>
        )}
      </div>
      <div className="mx-3 grid grid-cols-2 gap-y-4 pb-32">
        {status === "rent" &&
          walletRentsMock.map((nft, index) => {
            const collectionName = nft.collectionName;
            const name = nft.name;
            const image = nft.image;
            const status = nft.status;
            return (
              <WalletNftCard
                key={index}
                collectionName={collectionName}
                name={name}
                image={image}
                status={status}
              />
            );
          })}
        {status === "mynfts" &&
          walletNftsMock &&
          walletNftsMock.map((nft, index) => {
            const collectionName = nft.collectionName;
            const name = nft.name;
            const image = nft.image;
            const status = nft.status;
            return (
              <WalletNftCard
                key={index}
                collectionName={collectionName}
                name={name}
                image={image}
                status={status}
              />
            );
          })}
      </div>
    </StyleLayout>
  );
};

export default Home;
