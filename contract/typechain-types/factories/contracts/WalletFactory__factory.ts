/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  WalletFactory,
  WalletFactoryInterface,
} from "../../contracts/WalletFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IRentalStorage",
        name: "_rentalStorage",
        type: "address",
      },
      {
        internalType: "contract ISuperfluid",
        name: "_hostSuperfluid",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_feeToken",
        type: "address",
      },
      {
        internalType: "contract ISuperToken",
        name: "_feeTokenX",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "createWallet",
    outputs: [
      {
        internalType: "contract Wallet",
        name: "wallet",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feeToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeTokenX",
    outputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hostSuperfluid",
    outputs: [
      {
        internalType: "contract ISuperfluid",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rentalStorage",
    outputs: [
      {
        internalType: "contract IRentalStorage",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "salt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x61010060405234801561001157600080fd5b5060405161271a38038061271a833981016040819052610030916100c3565b6100393361005b565b6001600160a01b0393841660805291831660a052821660c0521660e052610122565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146100c057600080fd5b50565b600080600080608085870312156100d957600080fd5b84516100e4816100ab565b60208601519094506100f5816100ab565b6040860151909350610106816100ab565b6060860151909250610117816100ab565b939692955090935050565b60805160a05160c05160e05161259e61017c60003960008181609d015261022501526000818160e1015261020401526000818161010801526101e301526000818161012f015281816101c201526102c6015261259e6000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063715018a611610066578063715018a6146101515780638da5cb5b1461015b578063b054a9e81461016c578063bfa0b1331461017f578063f2fde38b1461019657600080fd5b80630505a9c414610098578063647846a5146100dc57806365cc545c14610103578063674c67801461012a575b600080fd5b6100bf7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b6100bf7f000000000000000000000000000000000000000000000000000000000000000081565b6100bf7f000000000000000000000000000000000000000000000000000000000000000081565b6100bf7f000000000000000000000000000000000000000000000000000000000000000081565b6101596101a9565b005b6000546001600160a01b03166100bf565b6100bf61017a36600461045e565b6101bd565b6101886104d281565b6040519081526020016100d3565b6101596101a436600461045e565b610329565b6101b16103a7565b6101bb6000610401565b565b6000817f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060405161025090610451565b6001600160a01b0395861681529385166020850152918416604084015283166060830152909116608082015260a001604051809103906000f08015801561029b573d6000803e3d6000fd5b50604051639679372560e01b81526001600160a01b03848116600483015280831660248301529192507f000000000000000000000000000000000000000000000000000000000000000090911690639679372590604401600060405180830381600087803b15801561030c57600080fd5b505af1158015610320573d6000803e3d6000fd5b50505050919050565b6103316103a7565b6001600160a01b03811661039b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6103a481610401565b50565b6000546001600160a01b031633146101bb5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610392565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6120da8061048f83390190565b60006020828403121561047057600080fd5b81356001600160a01b038116811461048757600080fd5b939250505056fe60806040523480156200001157600080fd5b50604051620020da380380620020da833981016040819052620000349162000306565b6200003f33620001bf565b6200004a856200020f565b600180546001600160a01b03199081166001600160a01b0387811691909117909255600580548216858416179055600680549091168383161790556040805180820182529185168083529051635b69006f60e11b81527fa9214cc96615e0085d3bb077758db69497dc2dce3b2b1e97bc93c3d18d83efd3600482015260208301919063b6d200de90602401602060405180830381865afa158015620000f3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000119919062000386565b6001600160a01b039081169091528151600380549183166001600160a01b031992831617905560209092015160048054918316919093161782556040516315a722b960e31b81529085169163ad3915c8916200018091641f00000001910190815260200190565b600060405180830381600087803b1580156200019b57600080fd5b505af1158015620001b0573d6000803e3d6000fd5b505050505050505050620003ad565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6200021962000292565b6001600160a01b038116620002845760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6200028f81620001bf565b50565b6000546001600160a01b03163314620002ee5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016200027b565b565b6001600160a01b03811681146200028f57600080fd5b600080600080600060a086880312156200031f57600080fd5b85516200032c81620002f0565b60208701519095506200033f81620002f0565b60408701519094506200035281620002f0565b60608701519093506200036581620002f0565b60808701519092506200037881620002f0565b809150509295509295909350565b6000602082840312156200039957600080fd5b8151620003a681620002f0565b9392505050565b611d1d80620003bd6000396000f3fe6080604052600436106101445760003560e01c8063884d1f40116100b6578063bd544fed1161006f578063bd544fed146103b8578063d3112b2e146103d8578063d86ed3e51461041f578063ec267dbe1461043f578063f2fde38b1461045f578063fd1a16db1461047f57600080fd5b8063884d1f40146102f65780638da5cb5b146103165780639888f5ec146103345780639c4f494214610354578063a3098cb414610378578063b61d27f61461039857600080fd5b806330d9c9151161010857806330d9c915146102415780633e413bee1461026157806353c11f99146102815780635f9e7d77146102a1578063674c6780146102c1578063715018a6146102e157600080fd5b80631155e6a614610150578063150b7a021461018d5780631626ba7e146101d257806316963b78146101f2578063230dbd291461021457600080fd5b3661014b57005b600080fd5b34801561015c57600080fd5b50600654610170906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561019957600080fd5b506101b96101a83660046114db565b630a85bd0160e11b95945050505050565b6040516001600160e01b03199091168152602001610184565b3480156101de57600080fd5b506101b96101ed3660046115b9565b61049f565b3480156101fe57600080fd5b5061021261020d366004611649565b6104fb565b005b34801561022057600080fd5b5061023461022f366004611662565b61050f565b604051610184919061177d565b34801561024d57600080fd5b5061023461025c366004611797565b610576565b34801561026d57600080fd5b50600554610170906001600160a01b031681565b34801561028d57600080fd5b5061023461029c366004611662565b6105d9565b3480156102ad57600080fd5b506102346102bc366004611797565b610702565b3480156102cd57600080fd5b50600154610170906001600160a01b031681565b3480156102ed57600080fd5b50610212610769565b34801561030257600080fd5b50610234610311366004611797565b61077d565b34801561032257600080fd5b506000546001600160a01b0316610170565b34801561034057600080fd5b5061021261034f366004611649565b6107e0565b34801561036057600080fd5b5061036a60025481565b604051908152602001610184565b34801561038457600080fd5b50610212610393366004611845565b6108c4565b3480156103a457600080fd5b506102126103b3366004611887565b610970565b3480156103c457600080fd5b506102126103d33660046118e3565b610b58565b3480156103e457600080fd5b506003546004546103ff916001600160a01b03908116911682565b604080516001600160a01b03938416815292909116602083015201610184565b34801561042b57600080fd5b5061023461043a366004611662565b610c39565b34801561044b57600080fd5b5061021261045a366004611649565b610c9b565b34801561046b57600080fd5b5061021261047a366004611924565b610cc5565b34801561048b57600080fd5b5061021261049a366004611649565b610d3b565b6000806104ac8484610d74565b9050806001600160a01b03166104ca6000546001600160a01b031690565b6001600160a01b0316036104e85750630b135d3f60e11b90506104f5565b506001600160e01b031990505b92915050565b610503610d98565b61050c81610df2565b50565b60405162461bcd60e51b815260206004820152602e60248201527f556e737570706f727465642063616c6c6261636b202d2041667465722041677260448201526d19595b595b9d08155c19185d195960921b60648201526060906084015b60405180910390fd5b60405162461bcd60e51b815260206004820152602f60248201527f556e737570706f727465642063616c6c6261636b202d204265666f726520416760448201526e1c99595b595b9d0810dc99585d1959608a1b606482015260609060840161056d565b6003546060906001600160a01b031633146106365760405162461bcd60e51b815260206004820152601b60248201527f57616c6c65743a206e6f74207375706572666c75696420686f73740000000000604482015260640161056d565b600254158061065357506006546001600160a01b038b8116911614155b8061066c57506003546001600160a01b038a8116911614155b156106b05782828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509293506106f592505050565b6106bb600254610df2565b82828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509293505050505b9998505050505050505050565b60405162461bcd60e51b815260206004820152603360248201527f556e737570706f727465642063616c6c6261636b202d20204265666f7265204160448201527219dc99595b595b9d0815195c9b5a5b985d1959606a1b606482015260609060840161056d565b610771610d98565b61077b6000611077565b565b60405162461bcd60e51b815260206004820152602f60248201527f556e737570706f727465642063616c6c6261636b202d204265666f726520416760448201526e1c99595b595b9d081d5c19185d1959608a1b606482015260609060840161056d565b6107e8610d98565b60055460065460405163095ea7b360e01b81526001600160a01b0391821660048201526024810184905291169063095ea7b3906044016020604051808303816000875af115801561083d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108619190611941565b506006546040516345977d0360e01b8152600481018390526001600160a01b03909116906345977d03906024015b600060405180830381600087803b1580156108a957600080fd5b505af11580156108bd573d6000803e3d6000fd5b5050505050565b6001546001600160a01b031633146108ee5760405162461bcd60e51b815260040161056d90611963565b6002541561094e5760405162461bcd60e51b815260206004820152602760248201527f57616c6c65743a206f6e6c7920737570706f7274206f6e652072656e7420617460448201526620612074696d6560c81b606482015260840161056d565b6006546109699060039084906001600160a01b0316846110c7565b5050600255565b610978610d98565b600154604051630dd3cca560e11b81526001600160a01b0390911690631ba7994a906109ac908790869086906004016119b4565b602060405180830381865afa1580156109c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ed9190611941565b610a395760405162461bcd60e51b815260206004820152601860248201527f57616c6c65743a2064656e69656420657865637574696f6e0000000000000000604482015260640161056d565b6003546001600160a01b0390811690851603610aa85760405162461bcd60e51b815260206004820152602860248201527f57616c6c65743a2063616e6e6f742063616c6c205375706572666c756964206460448201526769726563746f727960c01b606482015260840161056d565b6000846001600160a01b0316848484604051610ac59291906119f4565b60006040518083038185875af1925050503d8060008114610b02576040519150601f19603f3d011682016040523d82523d6000602084013e610b07565b606091505b50509050806108bd5760405162461bcd60e51b815260206004820152601a60248201527f57616c6c65743a205472616e73616374696f6e206661696c6564000000000000604482015260640161056d565b6001546001600160a01b03163314610b825760405162461bcd60e51b815260040161056d90611963565b604051632142170760e11b81523060048201526001600160a01b038481166024830152604482018390528316906342842e0e90606401600060405180830381600087803b158015610bd257600080fd5b505af1925050508015610be3575060015b610c3457610bef611a04565b806308c379a003610c285750610c03611a20565b80610c0e5750610c2a565b8060405162461bcd60e51b815260040161056d919061177d565b505b3d6000803e3d6000fd5b505050565b60405162461bcd60e51b815260206004820152602e60248201527f556e737570706f727465642063616c6c6261636b202d2041667465722041677260448201526d19595b595b9d0810dc99585d195960921b606482015260609060840161056d565b6001546001600160a01b031633146105035760405162461bcd60e51b815260040161056d90611963565b610ccd610d98565b6001600160a01b038116610d325760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161056d565b61050c81611077565b610d43610d98565b6006546040516308de640f60e11b8152600481018390526001600160a01b03909116906311bcc81e9060240161088f565b6000806000610d8385856110ed565b91509150610d9081611132565b509392505050565b6000546001600160a01b0316331461077b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161056d565b8060025414610e435760405162461bcd60e51b815260206004820152601760248201527f57616c6c65743a206e6f74206163746976652072656e74000000000000000000604482015260640161056d565b6001546040516327d6051d60e01b8152600481018390526000916001600160a01b0316906327d6051d9060240160c060405180830381865afa158015610e8d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eb19190611aaa565b60608101519091506001600160a01b03163014610f055760405162461bcd60e51b81526020600482015260126024820152712bb0b63632ba1d103737ba103932b73a32b960711b604482015260640161056d565b6001548151604051632749973960e11b815260048101919091526000916001600160a01b031690634e932e7290602401608060405180830381865afa158015610f52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f769190611b33565b8051600654919250610f959160039130916001600160a01b031661127c565b602082015181516040808501519051632142170760e11b81523060048201526001600160a01b03928316602482015260448101919091529116906342842e0e90606401600060405180830381600087803b158015610ff257600080fd5b505af1925050508015611003575060015b61100f57610bef611a04565b600154604051638e24852f60e01b8152600481018590526001600160a01b0390911690638e24852f90602401600060405180830381600087803b15801561105557600080fd5b505af1158015611069573d6000803e3d6000fd5b505060006002555050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6040805160008152602081019091526110e790859085908590859061129c565b50505050565b60008082516041036111235760208301516040840151606085015160001a6111178782858561137b565b9450945050505061112b565b506000905060025b9250929050565b600081600481111561114657611146611baf565b0361114e5750565b600181600481111561116257611162611baf565b036111af5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161056d565b60028160048111156111c3576111c3611baf565b036112105760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161056d565b600381600481111561122457611224611baf565b0361050c5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b606482015260840161056d565b6040805160008152602081019091526110e790859085908590859061143f565b845460018601546040805160008152602081019091526001600160a01b03928316926339255d5b92169081906362fc305e906112e19089908b908a9060448101611bc5565b60408051808303601f1901815291815260208201805160e094851b6001600160e01b03909116179052519185901b6001600160e01b031916825261132c939250908690600401611c05565b6000604051808303816000875af115801561134b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526113739190810190611c3b565b505050505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156113b25750600090506003611436565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611406573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661142f57600060019250925050611436565b9150600090505b94509492505050565b845460018601546040805160008152602081019091526001600160a01b03928316926339255d5b921690819063b4b333c6906112e19088908b908b9060448101611cb3565b6001600160a01b038116811461050c57600080fd5b60008083601f8401126114ab57600080fd5b50813567ffffffffffffffff8111156114c357600080fd5b60208301915083602082850101111561112b57600080fd5b6000806000806000608086880312156114f357600080fd5b85356114fe81611484565b9450602086013561150e81611484565b935060408601359250606086013567ffffffffffffffff81111561153157600080fd5b61153d88828901611499565b969995985093965092949392505050565b634e487b7160e01b600052604160045260246000fd5b601f8201601f1916810167ffffffffffffffff8111828210171561158a5761158a61154e565b6040525050565b600067ffffffffffffffff8211156115ab576115ab61154e565b50601f01601f191660200190565b600080604083850312156115cc57600080fd5b82359150602083013567ffffffffffffffff8111156115ea57600080fd5b8301601f810185136115fb57600080fd5b803561160681611591565b6040516116138282611564565b82815287602084860101111561162857600080fd5b82602085016020830137600060208483010152809450505050509250929050565b60006020828403121561165b57600080fd5b5035919050565b600080600080600080600080600060c08a8c03121561168057600080fd5b893561168b81611484565b985060208a013561169b81611484565b975060408a0135965060608a013567ffffffffffffffff808211156116bf57600080fd5b6116cb8d838e01611499565b909850965060808c01359150808211156116e457600080fd5b6116f08d838e01611499565b909650945060a08c013591508082111561170957600080fd5b506117168c828d01611499565b915080935050809150509295985092959850929598565b60005b83811015611748578181015183820152602001611730565b50506000910152565b6000815180845261176981602086016020860161172d565b601f01601f19169290920160200192915050565b6020815260006117906020830184611751565b9392505050565b600080600080600080600060a0888a0312156117b257600080fd5b87356117bd81611484565b965060208801356117cd81611484565b955060408801359450606088013567ffffffffffffffff808211156117f157600080fd5b6117fd8b838c01611499565b909650945060808a013591508082111561181657600080fd5b506118238a828b01611499565b989b979a50959850939692959293505050565b80600b0b811461050c57600080fd5b60008060006060848603121561185a57600080fd5b83359250602084013561186c81611484565b9150604084013561187c81611836565b809150509250925092565b6000806000806060858703121561189d57600080fd5b84356118a881611484565b935060208501359250604085013567ffffffffffffffff8111156118cb57600080fd5b6118d787828801611499565b95989497509550505050565b6000806000606084860312156118f857600080fd5b833561190381611484565b9250602084013561191381611484565b929592945050506040919091013590565b60006020828403121561193657600080fd5b813561179081611484565b60006020828403121561195357600080fd5b8151801515811461179057600080fd5b60208082526031908201527f57616c6c65743a206f6e6c792052656e74616c53746f726167652063616e206360408201527030b636103a3434b990333ab731ba34b7b760791b606082015260800190565b6001600160a01b03841681526040602082018190528101829052818360608301376000818301606090810191909152601f909201601f1916010192915050565b8183823760009101908152919050565b600060033d1115611a1d5760046000803e5060005160e01c5b90565b600060443d1015611a2e5790565b6040516003193d81016004833e81513d67ffffffffffffffff8160248401118184111715611a5e57505050505090565b8285019150815181811115611a765750505050505090565b843d8701016020828501011115611a905750505050505090565b611a9f60208286010187611564565b509095945050505050565b600060c08284031215611abc57600080fd5b60405160c0810181811067ffffffffffffffff82111715611adf57611adf61154e565b604052825181526020830151611af481611484565b6020820152604083810151908201526060830151611b1181611484565b60608201526080838101519082015260a0928301519281019290925250919050565b600060808284031215611b4557600080fd5b6040516080810181811067ffffffffffffffff82111715611b6857611b6861154e565b6040528251611b7681611484565b81526020830151611b8681611484565b6020820152604083810151908201526060830151611ba381611836565b60608201529392505050565b634e487b7160e01b600052602160045260246000fd5b6001600160a01b03858116825284166020820152600b83900b6040820152608060608201819052600090611bfb90830184611751565b9695505050505050565b6001600160a01b0384168152606060208201819052600090611c2990830185611751565b8281036040840152611bfb8185611751565b600060208284031215611c4d57600080fd5b815167ffffffffffffffff811115611c6457600080fd5b8201601f81018413611c7557600080fd5b8051611c8081611591565b604051611c8d8282611564565b828152866020848601011115611ca257600080fd5b611bfb83602083016020870161172d565b6001600160a01b038581168252848116602083015283166040820152608060608201819052600090611bfb9083018461175156fea2646970667358221220fd7ca4c5a2140c5ae8e6117bf99a0d0d59cd7fb55aa4d543da29b3d5e435c7d864736f6c63430008120033a26469706673582212205112487806e8e5714012b4cf3a5ee77e9251d9a6de496cf03f9a0846ab6bf4ae64736f6c63430008120033";

type WalletFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WalletFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WalletFactory__factory extends ContractFactory {
  constructor(...args: WalletFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _rentalStorage: PromiseOrValue<string>,
    _hostSuperfluid: PromiseOrValue<string>,
    _feeToken: PromiseOrValue<string>,
    _feeTokenX: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<WalletFactory> {
    return super.deploy(
      _rentalStorage,
      _hostSuperfluid,
      _feeToken,
      _feeTokenX,
      overrides || {}
    ) as Promise<WalletFactory>;
  }
  override getDeployTransaction(
    _rentalStorage: PromiseOrValue<string>,
    _hostSuperfluid: PromiseOrValue<string>,
    _feeToken: PromiseOrValue<string>,
    _feeTokenX: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _rentalStorage,
      _hostSuperfluid,
      _feeToken,
      _feeTokenX,
      overrides || {}
    );
  }
  override attach(address: string): WalletFactory {
    return super.attach(address) as WalletFactory;
  }
  override connect(signer: Signer): WalletFactory__factory {
    return super.connect(signer) as WalletFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WalletFactoryInterface {
    return new utils.Interface(_abi) as WalletFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WalletFactory {
    return new Contract(address, _abi, signerOrProvider) as WalletFactory;
  }
}
