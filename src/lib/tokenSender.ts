import {
  AbstractProvider,
  Contract,
  JsonRpcSigner,
  ethers,
  isError,
  parseUnits,
} from "ethers";
const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org");

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
// export const ConcordiaAbi = [
//   "function show_project_info(string calldata _project_name) view",
//   "function create_project(string calldata project_name, string calldata project_image, string[] calldata project_detail_images, tuple(bool reseacher ,bool designer ,bool developer, bool investor) calldata wanted_jobs, string calldata description, uint8[] calldata fields)",
//   "function editProject(string calldata project_name,string calldata project_image,string[] memory project_detail_images,tuple(bool reseacher ,bool designer ,bool developer, bool investor) calldata wanted_jobs,string calldata description,uint8[] memory fields)",
//   "function create_account(string calldata nickname,string calldata image_url,tuple(string name,string url)[] calldata links,string calldata bio,uint8 job)",
//   "function show_project_info(string calldata _project_name) view returns (tuple(string,address,string,string[],address[],address[],tuple(bool,bool,bool,bool),string,tuple(uint8,string),uint8[]) projects)",
//   "function closeProject(string calldata _project_name, uint8 reason, string calldata description)",
//   "function projects(uint256) view",
// ];

export const ERC20ABI = `[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]`;

// const concordiaContract = new Contract(
//   process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
//   ERC20ABI,
//   provider,
// );

// export async function show_project_info(project_name: String) {
//   try {
//     let result = await concordiaContract.show_project_info(project_name);
//     return result;
//   } catch (err) {
//     return err;
//   }
// }

export async function approve(
  signer: JsonRpcSigner,
  tokenContract: string,
  receiver: String,
  amount: Number,
) {
  try {
    const amountParsed = parseUnits(amount.toString(), 18);
    const erc20Contract = new Contract(tokenContract, ERC20ABI, signer);
    let tx = await erc20Contract.approve(receiver, amountParsed);
    return await tx.wait();
  } catch (err) {
    return err;
  }
}

export async function transfer(
  signer: JsonRpcSigner,
  tokenContract: string,
  receiver: String,
  amount: Number,
) {
  try {
    const amountParsed = parseUnits(amount.toString(), 18);
    const erc20Contract = new Contract(tokenContract, ERC20ABI, signer);
    let tx = await erc20Contract.transfer(receiver, amountParsed);
    console.log(tx);

    console.log("sending");
    return await tx.wait();
  } catch (err) {
    return err;
  }
}
