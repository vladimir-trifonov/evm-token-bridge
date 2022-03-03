/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { XFW7Bridge, XFW7BridgeInterface } from "../XFW7Bridge";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
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
        name: "_sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "ClaimTokens",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "DepositTokens",
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
        name: "_sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "ReturnTokens",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_otherChainTransactionHash",
        type: "bytes32",
      },
    ],
    name: "TokensBridged",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "bridged",
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
    name: "claimTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "depositTokens",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "processedHashes",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "returnTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IToken",
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
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_otherChainTransactionHash",
        type: "bytes32",
      },
    ],
    name: "tokensBridged",
    outputs: [],
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
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610a0a380380610a0a83398101604081905261002f916100af565b806100393361005f565b600180546001600160a01b0319166001600160a01b0392909216919091179055506100dd565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100c0578081fd5b81516001600160a01b03811681146100d6578182fd5b9392505050565b61091e806100ec6000396000f3fe6080604052600436106100955760003560e01c80638da5cb5b116100595780638da5cb5b146101d25780639ba3277a14610204578063d3ef77401461023f578063f2fde38b1461025f578063fc0c546a1461027f576100e0565b806307d9c53414610121578063147e78b41461016657806348c54b9d1461018857806366168bd71461019d578063715018a6146101bd576100e0565b366100e05760405162461bcd60e51b81526020600482015260166024820152752237b713ba1030b1b1b2b83a1030b73c9022ba3432b960511b60448201526064015b60405180910390fd5b60405162461bcd60e51b81526020600482015260166024820152752237b713ba1030b1b1b2b83a1030b73c9022ba3432b960511b60448201526064016100d7565b34801561012d57600080fd5b5061015161013c366004610877565b60036020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b34801561017257600080fd5b50610186610181366004610845565b61029f565b005b34801561019457600080fd5b5061018661045c565b3480156101a957600080fd5b506101866101b836600461081c565b610568565b3480156101c957600080fd5b50610186610611565b3480156101de57600080fd5b506000546001600160a01b03165b6040516001600160a01b03909116815260200161015d565b34801561021057600080fd5b5061023161021f3660046107fb565b60026020526000908152604090205481565b60405190815260200161015d565b34801561024b57600080fd5b5061018661025a3660046107fb565b610647565b34801561026b57600080fd5b5061018661027a3660046107fb565b6106f4565b34801561028b57600080fd5b506001546101ec906001600160a01b031681565b6000546001600160a01b031633146102c95760405162461bcd60e51b81526004016100d79061088f565b6000821161030f5760405162461bcd60e51b8152602060048201526013602482015272496e73756666696369656e7420746f6b656e7360681b60448201526064016100d7565b60008181526003602052604090205460ff161561036e5760405162461bcd60e51b815260206004820152601a60248201527f5472616e7366657220616c72656164792070726f63657373656400000000000060448201526064016100d7565b6000818152600360209081526040808320805460ff191660011790556001600160a01b03861683526002909152812080548492906103ad9084906108c4565b90915550506001600160a01b0383166000908152600260205260409020548211156104135760405162461bcd60e51b8152602060048201526016602482015275546f74616c2062726964676564206f766572666c6f7760501b60448201526064016100d7565b60408051838152602081018390526001600160a01b038516917f2f9a6098d4503a127779ba975f5f6b04f842362b1809f346989e9abc0b4dedb6910160405180910390a2505050565b33600090815260026020526040902054806104b95760405162461bcd60e51b815260206004820152601b60248201527f496e73756666696369656e74206272696467656420746f6b656e73000000000060448201526064016100d7565b336000818152600260205260408082209190915560015490516308934a5f60e31b81526004810192909252602482018390526001600160a01b03169063449a52f890604401600060405180830381600087803b15801561051857600080fd5b505af115801561052c573d6000803e3d6000fd5b50506040518381523392507f4d7f917f6b905f28ba5297e6c224a6cfec20ac6a3698a55b412d30b95ad25d2f915060200160405180910390a250565b60015460405163079cc67960e41b8152336004820152602481018390526001600160a01b03909116906379cc679090604401600060405180830381600087803b1580156105b457600080fd5b505af11580156105c8573d6000803e3d6000fd5b50506040518381526001600160a01b03851692503391507f5b2c363c4205d12f22a6dc6a35136117f80f8cd6897d7a05e7e2987883b05004906020015b60405180910390a35050565b6000546001600160a01b0316331461063b5760405162461bcd60e51b81526004016100d79061088f565b610645600061078f565b565b33600090815260026020526040902054806106a45760405162461bcd60e51b815260206004820152601b60248201527f496e73756666696369656e74206272696467656420746f6b656e73000000000060448201526064016100d7565b3360008181526002602052604080822091909155516001600160a01b03841691907fc1486b07ce125926333063fe38ab9b2673834c6959031ebbb9c5a405e278315d906106059085815260200190565b6000546001600160a01b0316331461071e5760405162461bcd60e51b81526004016100d79061088f565b6001600160a01b0381166107835760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016100d7565b61078c8161078f565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80356001600160a01b03811681146107f657600080fd5b919050565b60006020828403121561080c578081fd5b610815826107df565b9392505050565b6000806040838503121561082e578081fd5b610837836107df565b946020939093013593505050565b600080600060608486031215610859578081fd5b610862846107df565b95602085013595506040909401359392505050565b600060208284031215610888578081fd5b5035919050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600082198211156108e357634e487b7160e01b81526011600452602481fd5b50019056fea264697066735822122068bae81fa73f2240a7334fce3021903935ee655881e82087027887e21bd6741664736f6c63430008040033";

type XFW7BridgeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: XFW7BridgeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class XFW7Bridge__factory extends ContractFactory {
  constructor(...args: XFW7BridgeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "XFW7Bridge";
  }

  deploy(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<XFW7Bridge> {
    return super.deploy(_token, overrides || {}) as Promise<XFW7Bridge>;
  }
  getDeployTransaction(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_token, overrides || {});
  }
  attach(address: string): XFW7Bridge {
    return super.attach(address) as XFW7Bridge;
  }
  connect(signer: Signer): XFW7Bridge__factory {
    return super.connect(signer) as XFW7Bridge__factory;
  }
  static readonly contractName: "XFW7Bridge";
  public readonly contractName: "XFW7Bridge";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): XFW7BridgeInterface {
    return new utils.Interface(_abi) as XFW7BridgeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XFW7Bridge {
    return new Contract(address, _abi, signerOrProvider) as XFW7Bridge;
  }
}
