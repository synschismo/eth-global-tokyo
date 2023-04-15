import {  gql } from "@apollo/client/core"
import client  from "../../../utils/airstack"
import { TokenBalancesOutput } from "./types/generated"

interface TokenBalancesOutputWrapper {
    TokenBalances: TokenBalancesOutput
}

export async function GET(request) {
    // const { owners, limit, cursor } = request.query
    const owners = ["vitalik.eth", "dwr.eth"]
    const limit = 10
    const cursor = ""
    const tokenBalances = await GetAllNFTs(owners, limit, cursor)
    return new Response(JSON.stringify({
        status: 200,
        body: tokenBalances,
    }))
}

async function GetAllNFTs(
    owners: string[],
    limit: number,
    cursor: string
): Promise<TokenBalancesOutput> {
    const query = gql`
        query MyQuery($cursor: String, $owners: [Identity!], $limit: Int) {
            TokenBalances(
                input: {
                    filter: { owner: { _in: $owners }, tokenType: { _in: [ERC1155, ERC721] } }
                    blockchain: ethereum
                    limit: $limit
                    cursor: $cursor
                }
            ) {
                TokenBalance {
                    tokenAddress
                    amount
                    tokenType
                    tokenId
                    owner {
                        primaryDomain {
                            name
                        }
                    }
                }
                pageInfo {
                    prevCursor
                    nextCursor
                }
            }
        }
    `

    const response = await client.query<TokenBalancesOutputWrapper>({
        query,
        variables: {
            owners: owners,
            limit: limit,
            cursor: cursor,
        },
    })
    return response.data.TokenBalances
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