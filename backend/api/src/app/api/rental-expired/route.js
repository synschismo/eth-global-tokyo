import {providers, Contract, BigNumber} from "ethers"
import abi from "../../rentalStorage.json"
export async function POST(request, res) {
    const { body } = request
    const { rentId } = body

    

    const rentalStorageAddress = "0x3D88436c1d23faabEc7B0BbEE794Ba638FF56129"

    const provider = new providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
    const rentalStorage = new Contract(rentalStorageAddress, abi, provider)
    const rentInfo = await rentalStorage.getRentInfo(rentId);
    const unixtime = Math.floor(Date.now() / 1000) - 32400
    const rentalAt = Number(rentInfo.returnAt);
    const expired = rentalAt < unixtime;

    return new Response(JSON.stringify({ expired }))
  }
  