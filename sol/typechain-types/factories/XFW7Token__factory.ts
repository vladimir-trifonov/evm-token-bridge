/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { XFW7Token, XFW7TokenInterface } from "../XFW7Token";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gateway",
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
    inputs: [
      {
        internalType: "address",
        name: "_gateway",
        type: "address",
      },
    ],
    name: "gatewayUpdate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060408051808201825260098152682c232b9baa37b5b2b760b91b6020808301918252835180850190945260048452635846573760e01b9084015281519192916200005f91600391620000ee565b50805162000075906004906020840190620000ee565b505050620000926200008c6200009860201b60201c565b6200009c565b620001d1565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620000fc9062000194565b90600052602060002090601f0160209004810192826200012057600085556200016b565b82601f106200013b57805160ff19168380011785556200016b565b828001600101855582156200016b579182015b828111156200016b5782518255916020019190600101906200014e565b50620001799291506200017d565b5090565b5b808211156200017957600081556001016200017e565b600181811c90821680620001a957607f821691505b60208210811415620001cb57634e487b7160e01b600052602260045260246000fd5b50919050565b610ec780620001e16000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c8063449a52f8116100ad57806395d89b411161007157806395d89b4114610269578063a457c2d714610271578063a9059cbb14610284578063dd62ed3e14610297578063f2fde38b146102d057600080fd5b8063449a52f81461020157806370a0823114610214578063715018a61461023d57806379cc6790146102455780638da5cb5b1461025857600080fd5b806318160ddd116100f457806318160ddd146101a757806323b872dd146101b9578063313ce567146101cc57806339509351146101db57806342966c68146101ee57600080fd5b806306fdde0314610126578063095ea7b3146101445780630a0f4def14610167578063116191b61461017c575b600080fd5b61012e6102e3565b60405161013b9190610d89565b60405180910390f35b610157610152366004610d48565b610375565b604051901515815260200161013b565b61017a610175366004610cba565b61038d565b005b60065461018f906001600160a01b031681565b6040516001600160a01b03909116815260200161013b565b6002545b60405190815260200161013b565b6101576101c7366004610d0d565b610438565b6040516012815260200161013b565b6101576101e9366004610d48565b61045c565b61017a6101fc366004610d71565b61049b565b61017a61020f366004610d48565b6104a8565b6101ab610222366004610cba565b6001600160a01b031660009081526020819052604090205490565b61017a610510565b61017a610253366004610d48565b610546565b6005546001600160a01b031661018f565b61012e61055b565b61015761027f366004610d48565b61056a565b610157610292366004610d48565b6105fc565b6101ab6102a5366004610cdb565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b61017a6102de366004610cba565b61060a565b6060600380546102f290610e40565b80601f016020809104026020016040519081016040528092919081815260200182805461031e90610e40565b801561036b5780601f106103405761010080835404028352916020019161036b565b820191906000526020600020905b81548152906001019060200180831161034e57829003601f168201915b5050505050905090565b6000336103838185856106a2565b5060019392505050565b6005546001600160a01b031633146103c05760405162461bcd60e51b81526004016103b790610ddc565b60405180910390fd5b6001600160a01b0381166104165760405162461bcd60e51b815260206004820152601860248201527f446f6e2774206162616e646f6e2074686520627269646765000000000000000060448201526064016103b7565b600680546001600160a01b0319166001600160a01b0392909216919091179055565b6000336104468582856107c7565b610451858585610859565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091906103839082908690610496908790610e11565b6106a2565b6104a53382610a27565b50565b6006546001600160a01b031633146105025760405162461bcd60e51b815260206004820152601760248201527f4f6e6c79206272696467652063616e206578656375746500000000000000000060448201526064016103b7565b61050c8282610b6d565b5050565b6005546001600160a01b0316331461053a5760405162461bcd60e51b81526004016103b790610ddc565b6105446000610c4c565b565b6105518233836107c7565b61050c8282610a27565b6060600480546102f290610e40565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156105ef5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016103b7565b61045182868684036106a2565b600033610383818585610859565b6005546001600160a01b031633146106345760405162461bcd60e51b81526004016103b790610ddc565b6001600160a01b0381166106995760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103b7565b6104a581610c4c565b6001600160a01b0383166107045760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103b7565b6001600160a01b0382166107655760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103b7565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461085357818110156108465760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103b7565b61085384848484036106a2565b50505050565b6001600160a01b0383166108bd5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103b7565b6001600160a01b03821661091f5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103b7565b6001600160a01b038316600090815260208190526040902054818110156109975760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103b7565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906109ce908490610e11565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610a1a91815260200190565b60405180910390a3610853565b6001600160a01b038216610a875760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016103b7565b6001600160a01b03821660009081526020819052604090205481811015610afb5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016103b7565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610b2a908490610e29565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020016107ba565b6001600160a01b038216610bc35760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103b7565b8060026000828254610bd59190610e11565b90915550506001600160a01b03821660009081526020819052604081208054839290610c02908490610e11565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80356001600160a01b0381168114610cb557600080fd5b919050565b600060208284031215610ccb578081fd5b610cd482610c9e565b9392505050565b60008060408385031215610ced578081fd5b610cf683610c9e565b9150610d0460208401610c9e565b90509250929050565b600080600060608486031215610d21578081fd5b610d2a84610c9e565b9250610d3860208501610c9e565b9150604084013590509250925092565b60008060408385031215610d5a578182fd5b610d6383610c9e565b946020939093013593505050565b600060208284031215610d82578081fd5b5035919050565b6000602080835283518082850152825b81811015610db557858101830151858201604001528201610d99565b81811115610dc65783604083870101525b50601f01601f1916929092016040019392505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115610e2457610e24610e7b565b500190565b600082821015610e3b57610e3b610e7b565b500390565b600181811c90821680610e5457607f821691505b60208210811415610e7557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220e7b5248feb1eed414c1b0a18bea3b8127019112c9b0827ff0c5881d721dfabf164736f6c63430008040033";

type XFW7TokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: XFW7TokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class XFW7Token__factory extends ContractFactory {
  constructor(...args: XFW7TokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "XFW7Token";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<XFW7Token> {
    return super.deploy(overrides || {}) as Promise<XFW7Token>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): XFW7Token {
    return super.attach(address) as XFW7Token;
  }
  connect(signer: Signer): XFW7Token__factory {
    return super.connect(signer) as XFW7Token__factory;
  }
  static readonly contractName: "XFW7Token";
  public readonly contractName: "XFW7Token";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): XFW7TokenInterface {
    return new utils.Interface(_abi) as XFW7TokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XFW7Token {
    return new Contract(address, _abi, signerOrProvider) as XFW7Token;
  }
}
