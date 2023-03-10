/* eslint-disable no-unused-vars */
import Web3 from "web3";
import tokenABI from "../ABI/tokenABI.json";
import stakeAbi from "../ABI/stakeAbi.json";
import stake2Abi from "../ABI/stake2Abi.json";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import { useCallback, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { providers } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
import { BackgroundButton } from "../components/BackgroundButton/BackgroundButton";
import { Button } from "../components/Atoms/Button";

const web3 = new Web3(Web3.givenProvider);
const tokenContractAddress = "0xC4EE0aA2d993ca7C9263eCFa26c6f7e13009d2b6";
// const tokenContractAddress = "0xBF96DbA5B1aFD95544b28Eff5f7770CF776044B8";
const stakingContractAddress = "0x476461CCD16478e48528964C2D1661b99FB49443";
const staking2ContractAddress = "0x55663543414426c909A57B434c461591D9599254";

const supportedChains = [
  {
    name: "Ethereum Mainnet",
    short_name: "eth",
    chain: "ETH",
    network: "mainnet",
    chain_id: 1,
    network_id: 1,
    rpc_url: "https://mainnet.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Ropsten",
    short_name: "rop",
    chain: "ETH",
    network: "ropsten",
    chain_id: 3,
    network_id: 3,
    rpc_url: "https://ropsten.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Rinkeby",
    short_name: "rin",
    chain: "ETH",
    network: "rinkeby",
    chain_id: 4,
    network_id: 4,
    rpc_url: "https://rinkeby.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum G??rli",
    short_name: "gor",
    chain: "ETH",
    network: "goerli",
    chain_id: 5,
    network_id: 5,
    rpc_url: "https://goerli.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "RSK Mainnet",
    short_name: "rsk",
    chain: "RSK",
    network: "mainnet",
    chain_id: 30,
    network_id: 30,
    rpc_url: "https://public-node.rsk.co",
    native_currency: {
      symbol: "RSK",
      name: "RSK",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Kovan",
    short_name: "kov",
    chain: "ETH",
    network: "kovan",
    chain_id: 42,
    network_id: 42,
    rpc_url: "https://kovan.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Classic Mainnet",
    short_name: "etc",
    chain: "ETC",
    network: "mainnet",
    chain_id: 61,
    network_id: 1,
    rpc_url: "https://ethereumclassic.network",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "POA Network Sokol",
    short_name: "poa",
    chain: "POA",
    network: "sokol",
    chain_id: 77,
    network_id: 77,
    rpc_url: "https://sokol.poa.network",
    native_currency: {
      symbol: "POA",
      name: "POA",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "POA Network Core",
    short_name: "skl",
    chain: "POA",
    network: "core",
    chain_id: 99,
    network_id: 99,
    rpc_url: "https://core.poa.network",
    native_currency: {
      symbol: "POA",
      name: "POA",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "xDAI Chain",
    short_name: "xdai",
    chain: "POA",
    network: "dai",
    chain_id: 100,
    network_id: 100,
    rpc_url: "https://dai.poa.network",
    native_currency: {
      symbol: "xDAI",
      name: "xDAI",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Callisto Mainnet",
    short_name: "clo",
    chain: "callisto",
    network: "mainnet",
    chain_id: 820,
    network_id: 1,
    rpc_url: "https://clo-geth.0xinfra.com/",
    native_currency: {
      symbol: "CLO",
      name: "CLO",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Binance Smart Chain",
    short_name: "bsc",
    chain: "smartchain",
    network: "mainnet",
    chain_id: 56,
    network_id: 56,
    rpc_url: "https://bsc-dataseed1.defibit.io/",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "BSC TestNet",
    short_name: "bsc",
    chain: "smartchain",
    network: "mainnet",
    chain_id: 97,
    network_id: 97,
    rpc_url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
];

function getChainData(chainId) {
  if (!chainId) {
    return null;
  }
  const chainData = supportedChains.filter(
    (chain) => chain.chain_id === chainId
  )[0];

  console.log("chainId = ", chainId);
  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = "460f40a260564ac4a4f4b3fffb032dad";

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}
function ellipseAddress(address = "", width = 10) {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}
const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};
let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    //network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
    theme: "dark",
  });
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
}
export const Web3Modals = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;

  const dispatcher = useDispatch();

  const connect = useCallback(
    async function () {
      // This is the initial `provider` that is returned when
      // using web3Modal to connect. Can be MetaMask or WalletConnect.
      const provider = await web3Modal.connect();

      // We plug the initial `provider` into ethers.js and get back
      // a Web3Provider. This will add on methods from ethers.js and
      // event listeners such as `.on()` will be different.
      const web3Provider = new providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      const network = await web3Provider.getNetwork();

      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      });

      dispatcher({
        type: "SET_WALLET",
        payload: provider,
      });

      dispatcher({
        type: "SET_ADDRESS",
        payload: address,
      });
    },
    [dispatcher]
  );

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );

  // Auto connect to the cached provider
  /*
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);
  */

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  const chainData = getChainData(chainId);

  return (
    <div className="flex flex-col">
      <div className="w-full">
        {web3Provider ? (
          <Button
            className="bg-red-600 h-35 rounded-xl text-white text-18 px-5"
            type="button"
            onClick={disconnect}
          >
            DISCONNECT
          </Button>
        ) : (
          <Button className="text-ellipsis" onClick={connect}>
            Connect Wallet
          </Button>
        )}
      </div>
      <div className="w-full">
        {address && (
          <div className="grid">
            <div>
              <p className="mb-1 text-white">Network:</p>
              <p className="text-white">{chainData?.name}</p>
            </div>
            <div>
              <p className="mb-1 text-white">Address:</p>
              <p className="text-white">{ellipseAddress(address)}</p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full"></div>
    </div>
  );
};

export default Web3Modals;

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "???????? Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "???? " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            ????{" "}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
        };
      } else {
        return {
          address: "",
        };
      }
    } catch (err) {
      return {
        address: "",
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            ????{" "}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

const stakingContractInstance = new web3.eth.Contract(
  stakeAbi,
  stakingContractAddress
);
const tokenContractInstance = new web3.eth.Contract(
  tokenABI,
  tokenContractAddress
);

const staking2ContractInstance = new web3.eth.Contract(
  stake2Abi,
  staking2ContractAddress
);

export const getUserBalance = async (address) => {
  const _balance = await tokenContractInstance.methods
    .balanceOf(address)
    .call();
  return web3.utils.fromWei(_balance, "ether");
};

export const approve = async (address) => {
  return tokenContractInstance.methods
    .approve(stakingContractAddress, MaxUint256)
    .send({ from: address });
};

export const isApproved = async (address) => {
  const _allowance = await tokenContractInstance.methods
    .allowance(address, stakingContractAddress)
    .call();
  return _allowance - MaxUint256 === 0;
};

export const stake = (address, amount) => {
  return stakingContractInstance.methods
    .stake(web3.utils.toWei(amount))
    .send({ from: address });
};
export const harvest = (address) => {
  return stakingContractInstance.methods.getReward().send({ from: address });
};

export const withdraw = (address, amount) => {
  return stakingContractInstance.methods
    .withdraw(web3.utils.toWei(amount))
    .send({ from: address });
};

export const getReward = (address) => {
  return stakingContractInstance.methods.earned(address).call();
};

export const getUserDepositedBalance = async (address) => {
  const _balance = await stakingContractInstance.methods
    .balanceOf(address)
    .call();
  return web3.utils.fromWei(_balance, "ether");
};

export const getTotalLockedBalance = async () => {
  const _balance = await tokenContractInstance.methods
    .balanceOf(stakingContractAddress)
    .call();
  return web3.utils.fromWei(_balance, "ether");
};

export const getTotalLockedBalance2 = async () => {
  const _balance = await staking2ContractInstance.methods
    .getTotalLockedAmount()
    .call();
  return web3.utils.fromWei(_balance, "ether");
};

export const getUserDepositedBalance2 = async (address) => {
  const _balance = await staking2ContractInstance.methods
    .balanceOf(address)
    .call();
  return _balance;
};

export const approve2 = async (address) => {
  return tokenContractInstance.methods
    .approve(staking2ContractAddress, MaxUint256)
    .send({ from: address });
};

export const isApproved2 = async (address) => {
  const _allowance = await tokenContractInstance.methods
    .allowance(address, staking2ContractAddress)
    .call();
  return _allowance - MaxUint256 === 0;
};

export const stake2 = (address, amount, apr) => {
  return staking2ContractInstance.methods
    .stake(web3.utils.toWei(amount), apr)
    .send({ from: address });
};
export const harvest2 = (address, stakingId) => {
  return staking2ContractInstance.methods
    .getReward(stakingId)
    .send({ from: address });
};

export const withdraw2 = (address, stakingId) => {
  return staking2ContractInstance.methods
    .unstake(stakingId)
    .send({ from: address });
};

export const getReward2 = (stakingId) => {
  return staking2ContractInstance.methods.getReward(stakingId).call();
};

export const getStakingList = async (account) => {
  const _balance = await staking2ContractInstance.methods
    .balanceOf(account)
    .call({ from: account });
  let list = [],
    _userReward = 0,
    _depositedAmount = 0;
  for (let i = 0; i < _balance; i++) {
    const stakingId = await staking2ContractInstance.methods
      .stakingOfOwnerByIndex(account, i)
      .call({ from: account });
    const stakingInfo = await staking2ContractInstance.methods
      .stakingById(stakingId)
      .call({ from: account });

    const claimableAmount = await staking2ContractInstance.methods
      .claimableAmount(stakingId)
      .call({ from: account });

    _userReward += parseFloat(claimableAmount);
    console.log("stakingInfo.amounnt", stakingInfo.amount);
    _depositedAmount += parseFloat(
      web3.utils.fromWei(stakingInfo.amount, "ether")
    );
    list.push({
      ...stakingInfo,
      amount: web3.utils.fromWei(stakingInfo.amount, "ether"),
      claimableAmount: parseFloat(
        web3.utils.fromWei(claimableAmount, "ether")
      ).toFixed(3),
    });
  }
  console.log("deposited amounts---", _depositedAmount);
  return [list, _userReward, _depositedAmount];
};
