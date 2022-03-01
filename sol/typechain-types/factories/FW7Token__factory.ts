/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FW7Token, FW7TokenInterface } from "../FW7Token";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
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
  "0x60806040523480156200001157600080fd5b5060405162000e2238038062000e228339810160408190526200003491620002d5565b60405180604001604052806008815260200167232b9baa37b5b2b760c11b8152506040518060400160405280600381526020016246573760e81b8152508160039080519060200190620000899291906200022f565b5080516200009f9060049060208401906200022f565b505050620000bc620000b6620000f160201b60201c565b620000f5565b620000c8338262000147565b620000ea7370997970c51812dc3a010c7d01b50e0d17dc79c861012c62000147565b5062000350565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216620001a25760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620001b69190620002ee565b90915550506001600160a01b03821660009081526020819052604081208054839290620001e5908490620002ee565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b8280546200023d9062000313565b90600052602060002090601f016020900481019282620002615760008555620002ac565b82601f106200027c57805160ff1916838001178555620002ac565b82800160010185558215620002ac579182015b82811115620002ac5782518255916020019190600101906200028f565b50620002ba929150620002be565b5090565b5b80821115620002ba5760008155600101620002bf565b600060208284031215620002e7578081fd5b5051919050565b600082198211156200030e57634e487b7160e01b81526011600452602481fd5b500190565b600181811c908216806200032857607f821691505b602082108114156200034a57634e487b7160e01b600052602260045260246000fd5b50919050565b610ac280620003606000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063715018a61161008c578063a457c2d711610066578063a457c2d7146101cd578063a9059cbb146101e0578063dd62ed3e146101f3578063f2fde38b1461022c57600080fd5b8063715018a6146101a05780638da5cb5b146101aa57806395d89b41146101c557600080fd5b806323b872dd116100c857806323b872dd14610142578063313ce56714610155578063395093511461016457806370a082311461017757600080fd5b806306fdde03146100ef578063095ea7b31461010d57806318160ddd14610130575b600080fd5b6100f761023f565b60405161010491906109da565b60405180910390f35b61012061011b3660046109b1565b6102d1565b6040519015158152602001610104565b6002545b604051908152602001610104565b610120610150366004610976565b6102e9565b60405160128152602001610104565b6101206101723660046109b1565b61030d565b610134610185366004610923565b6001600160a01b031660009081526020819052604090205490565b6101a861034c565b005b6005546040516001600160a01b039091168152602001610104565b6100f76103b7565b6101206101db3660046109b1565b6103c6565b6101206101ee3660046109b1565b610458565b610134610201366004610944565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101a861023a366004610923565b610466565b60606003805461024e90610a51565b80601f016020809104026020016040519081016040528092919081815260200182805461027a90610a51565b80156102c75780601f1061029c576101008083540402835291602001916102c7565b820191906000526020600020905b8154815290600101906020018083116102aa57829003601f168201915b5050505050905090565b6000336102df818585610531565b5060019392505050565b6000336102f7858285610655565b6103028585856106e7565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091906102df9082908690610347908790610a2d565b610531565b6005546001600160a01b031633146103ab5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b6103b560006108b5565b565b60606004805461024e90610a51565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091908381101561044b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016103a2565b6103028286868403610531565b6000336102df8185856106e7565b6005546001600160a01b031633146104c05760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103a2565b6001600160a01b0381166105255760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103a2565b61052e816108b5565b50565b6001600160a01b0383166105935760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103a2565b6001600160a01b0382166105f45760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103a2565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146106e157818110156106d45760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103a2565b6106e18484848403610531565b50505050565b6001600160a01b03831661074b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103a2565b6001600160a01b0382166107ad5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103a2565b6001600160a01b038316600090815260208190526040902054818110156108255760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103a2565b6001600160a01b0380851660009081526020819052604080822085850390559185168152908120805484929061085c908490610a2d565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516108a891815260200190565b60405180910390a36106e1565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80356001600160a01b038116811461091e57600080fd5b919050565b600060208284031215610934578081fd5b61093d82610907565b9392505050565b60008060408385031215610956578081fd5b61095f83610907565b915061096d60208401610907565b90509250929050565b60008060006060848603121561098a578081fd5b61099384610907565b92506109a160208501610907565b9150604084013590509250925092565b600080604083850312156109c3578182fd5b6109cc83610907565b946020939093013593505050565b6000602080835283518082850152825b81811015610a06578581018301518582016040015282016109ea565b81811115610a175783604083870101525b50601f01601f1916929092016040019392505050565b60008219821115610a4c57634e487b7160e01b81526011600452602481fd5b500190565b600181811c90821680610a6557607f821691505b60208210811415610a8657634e487b7160e01b600052602260045260246000fd5b5091905056fea26469706673582212205d5b212635abd0f4e0be5bd6b3cd6567149ee4f0ca79517d6f8109dc07d6b7a564736f6c63430008040033";

type FW7TokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FW7TokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FW7Token__factory extends ContractFactory {
  constructor(...args: FW7TokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "FW7Token";
  }

  deploy(
    initialSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FW7Token> {
    return super.deploy(initialSupply, overrides || {}) as Promise<FW7Token>;
  }
  getDeployTransaction(
    initialSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(initialSupply, overrides || {});
  }
  attach(address: string): FW7Token {
    return super.attach(address) as FW7Token;
  }
  connect(signer: Signer): FW7Token__factory {
    return super.connect(signer) as FW7Token__factory;
  }
  static readonly contractName: "FW7Token";
  public readonly contractName: "FW7Token";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FW7TokenInterface {
    return new utils.Interface(_abi) as FW7TokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FW7Token {
    return new Contract(address, _abi, signerOrProvider) as FW7Token;
  }
}
