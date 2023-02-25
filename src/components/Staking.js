import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import StakingImage from "../assets/images/Asset 110.png";
import { WoodBoxes } from "./woodBoxes";
import { useDispatch, useSelector } from "react-redux";
import {
  approve,
  getReward,
  getTotalLockedBalance,
  getUserBalance,
  getUserDepositedBalance,
  isApproved,
  stake,
  withdraw,
  harvest,
} from "../Utils/walletInteract";
import { SET_REWARD, SET_TOTAL_LOCK } from "../redux/actions";
import { BackgroundButton } from "./BackgroundButton/BackgroundButton";
import { CARD_TYPES } from "../constants/card";

export const Staking = () => {
  const DEPOSIT = "deposit";
  const WITHDRAW = "withdraw";
  const HARVEST = "harvest";
  const dispatch = useDispatch();

  const [buttonStatus, setButtonStatus] = useState(DEPOSIT);

  const currentAddress = useSelector((state) => state.address);
  const userReward = useSelector((state) => state.userReward);
  const [userBalance, setUserBalance] = useState(0);
  const [userDepositedBalance, setUserDepositedBalance] = useState(0);
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [sheebDepositAmount, setSheebDepositAmount] = useState(0);
  const [currentUserReward, setCurrentUserReward] = useState(0);

  const handleButtonClick = (buttonAction) => {
    setButtonStatus(buttonAction);
  };

  const handleDepositClick = () => {
    if (approvalStatus) {
      if (sheebDepositAmount === 0) return;
      const transaction = toast.loading("Transaction pending");
      stake(currentAddress, sheebDepositAmount)
        .then((res) => {
          loadContractData();
          toast.update(transaction, {
            render: "Successfully staked",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          if (error.code === 4001) {
            toast.update(transaction, {
              render:
                "MetaMask Tx Signature: User denied transaction signature.",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          } else {
            toast.update(transaction, {
              render: error.message || "Error",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          }
        });
    } else {
      const transaction = toast.loading("Transaction pending");
      approve(currentAddress)
        .then((res) => {
          toast.update(transaction, {
            render: "Successfully approved",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          if (error.code === 4001) {
            toast.update(transaction, {
              render:
                "MetaMask Tx Signature: User denied transaction signature.",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          } else {
            toast.update(transaction, {
              render: error.message || "Error",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          }
        });
    }
  };

  const handleDepositAllClick = () => {
    if (userBalance === 0) return;
    const transaction = toast.loading("Transaction pending");
    stake(currentAddress, userBalance)
      .then((res) => {
        loadContractData();
        toast.update(transaction, {
          render: "Successfully staked all",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        if (error.code === 4001) {
          toast.update(transaction, {
            render: "MetaMask Tx Signature: User denied transaction signature.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(transaction, {
            render: error.message || "Error",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      });
  };

  const handleWithdrawClick = () => {
    console.log(userDepositedBalance);
    if (sheebDepositAmount === 0 || userDepositedBalance == 0) return;

    const transaction = toast.loading("Transaction pending");
    withdraw(currentAddress, sheebDepositAmount)
      .then((res) => {
        loadContractData();
        toast.update(transaction, {
          render: "Successfully withdrawed",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        if (error.code === 4001) {
          toast.update(transaction, {
            render: "MetaMask Tx Signature: User denied transaction signature.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(transaction, {
            render: error.message || "Error",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      });
  };

  const handleWithdrawAllClick = () => {
    if (userDepositedBalance == 0) return;
    const transaction = toast.loading("Transaction pending");
    withdraw(currentAddress, userDepositedBalance)
      .then((res) => {
        loadContractData();
        toast.update(transaction, {
          render: "Successfully withdrawed all",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        if (error.code === 4001) {
          toast.update(transaction, {
            render: "MetaMask Tx Signature: User denied transaction signature.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(transaction, {
            render: error.message || "Error",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      });
  };
  const handleHarvestClick = () => {
    if (currentUserReward == 0) return;
    const transaction = toast.loading("Transaction pending");
    harvest(currentAddress)
      .then((res) => {
        loadContractData();
        toast.update(transaction, {
          render: "Successfully harvested all",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        if (error.code === 4001) {
          toast.update(transaction, {
            render: "MetaMask Tx Signature: User denied transaction signature.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(transaction, {
            render: error.message || "Error",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      });
  };

  const loadContractData = async () => {
    const _balance = await getUserBalance(currentAddress);
    setUserBalance(_balance);
    const _isApproved = await isApproved(currentAddress);
    setApprovalStatus(_isApproved);
    const _userDepositedBalance = await getUserDepositedBalance(currentAddress);
    setUserDepositedBalance(_userDepositedBalance);
    const _totalLockedBalance = await getTotalLockedBalance();
    dispatch({ type: SET_TOTAL_LOCK, payload: _totalLockedBalance });
    const _userReward = await getReward(currentAddress);
    setCurrentUserReward(_userReward);
    dispatch({ type: SET_REWARD, payload: _userReward });
  };

  useEffect(() => {
    if (currentAddress !== "") {
      loadContractData();
    }
  }, [currentAddress]);

  return (
    <div className="container relative p-2.5 pb-10 w-full mx-auto rounded-t-3xl rounded-b text-white text-shadow text-center">
      <img src={StakingImage} alt="staking" className="mx-auto w-44" />
      <div
        className="mx-auto flex items-center text-xl w-full sm:w-80 mt-5 border-2 border-gray-400 rounded-full"
      >
        <BackgroundButton
          className="flex-1 text-sm text-black"
          text="Deposit"
          shouldHaveGradient={buttonStatus === DEPOSIT}
          onClick={() => handleButtonClick(DEPOSIT)}
        />
        <BackgroundButton
          className="flex-1 text-sm text-black"
          text="Withdraw"
          shouldHaveGradient={buttonStatus === WITHDRAW}
          onClick={() => handleButtonClick(WITHDRAW)}
        />
      </div>
      <input
        type="number"
        className="mt-5 w-full italic sm:w-3/5 text-center outline-none border-2 border-orange p-2 bg-transparent rounded-full"
        placeholder="FUEGO deposit amount"
        value={sheebDepositAmount}
        onChange={(v) => setSheebDepositAmount(v.target.value)}
      />
      <h2 className="my-5 text-2xl font-sans">Your <span className="text-orange">$FUEGO</span> Balance: <span className="font-anybody-light">{userBalance}</span></h2>
      {buttonStatus === DEPOSIT && (
        <div className="mx-auto mb-5 flex flex-wrap gap-10 items-center justify-center">
          <BackgroundButton
            className="w-40"
            text={approvalStatus ? "Deposit" : "Approve"}
            onClick={handleDepositClick}
          />
          {approvalStatus && (
            <BackgroundButton
              className="w-40"
              text="Deposit All"
              onClick={handleDepositAllClick}
            />
          )}
        </div>
      )}
       {buttonStatus === WITHDRAW && (
        <div className="mx-auto mb-5 flex flex-wrap gap-10 items-center justify-center">
          <BackgroundButton
            className="w-40"
            text="Withdraw"
            onClick={handleWithdrawClick}
          />
          <BackgroundButton
            className="w-40"
            text="Withdraw All"
            onClick={handleWithdrawAllClick}
          />
          <BackgroundButton
            className="w-40"
            text="harvest"
            onClick={handleHarvestClick}
          />
        </div>
      )} 
      <WoodBoxes
        boxesState={[
          {
            title: "Pending Reward",
            value: Math.round(ethers.utils.formatEther(userReward)),
            toFixed: 2,
            cardType: CARD_TYPES.AWARD,
          },
          {
            title: "Amount deposited",
            value: userDepositedBalance,
            toFixed: 1,
            cardType: CARD_TYPES.AMOUNT,
          },
          { 
            title: "Unlock time", 
            value: 0, 
            toFixed: 0,
            cardType: CARD_TYPES.TIMER,
          },
        ]}
      />
      <ToastContainer
        className="text-white"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
