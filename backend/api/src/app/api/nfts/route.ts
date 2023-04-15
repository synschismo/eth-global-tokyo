import {  gql } from "@apollo/client/core"
import client  from "../../../utils/airstack"
import { TokenBalancesOutput } from "./types/generated"

interface TokenBalancesOutputWrapper {
    TokenBalances: TokenBalancesOutput
}

export async function GET(request) {
    let url = new URL(request.url)
    const owner = url.searchParams.get("owner")
    const limit = Number(url.searchParams.get("limit"))
    const cursor = url.searchParams.get("cursor")
    const tokenBalances = await GetAllNFTs(owner, limit, cursor)
    return new Response(JSON.stringify({
        status: 200,
        body: tokenBalances,
    }))
}

async function GetAllNFTs(
    owner: string,
    limit: number,
    cursor: string
): Promise<TokenBalancesOutput> {
    console.log("owner")
    console.log(owner)
    const query = gql`
    query MyQuery($owner: Identity!) {
        Wallet(
          input: {blockchain: polygon, identity: $owner}
        ) {
          blockchain
          tokenBalances {
            tokenNfts {
              address
              metaData {
                image
                imageData
              }
              contentValue {
                image {
                  large
                  medium
                  original
                }
              }
              token {
                id
                name
              }
            }
            amount
          }
        }
      }
    `

    const response = await client.query({
        query,
        variables: {
            owner: owner,
            // limit: limit,
            // cursor: cursor,
        },
    })
    return response.data
}

// const main = async () => {
//     let owners = ["vitalik.eth", "dwr.eth"]

//     let limit = 10
//     let cursor = ""
//     let tokenBalances = await GetAllNFTs(owners, limit, cursor)
//     tokenBalances.TokenBalance!.forEach((tokenBalance) => {
//         console.log(
//             `${tokenBalance.owner.primaryDomain!.name} owns address:${
//                 tokenBalance.tokenAddress
//             } id: ${tokenBalance.tokenId} amount ${tokenBalance.amount} type: ${
//                 tokenBalance.tokenType
//             } \n`
//         )
//     })
//     // pagination
//     console.log(
//         `prevCursor: ${tokenBalances.pageInfo?.prevCursor} \nnextCursor: ${tokenBalances.pageInfo?.nextCursor}`
//     )
// }
// main()