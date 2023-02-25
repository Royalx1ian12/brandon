/* eslint-disable no-unused-expressions */
import { useState, useEffect } from "react";
import { BackgroundButton } from "../../BackgroundButton/BackgroundButton";
import { TEXT_COLORS } from "../../../theme/theme";
import { Input } from "../../Atoms/Input";
import { getUserBalance } from "../../../Utils/walletInteract";
import { useDispatch, useSelector } from "react-redux";
import {
  isApproved,
  stake,
  withdraw,
  harvest,
  approve,
  getUserDepositedBalance,
  getReward,
} from "../../../Utils/walletInteract";
import { ToastContainer, toast } from "react-toastify";
import { DEFAULT_STAKING_OPTION, StakingTime } from "./StakingTime";
const GO_TO_DEPOSIT = true;
const GO_TO_WITHDRAW = false;

export const DepositWithdrawSection = ({
  isV2Staking = false,
  isDepositSection = true,
  toggleDepositSection = () => { },
}) => {
  const [userBalance, setUserBalance] = useState(100);
  const text = isDepositSection ? "Deposit" : "Withdraw";
  //const approveText = _isApproved ? "Approve" : "Deposit";
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [stakingTime, setStakingTime] = useState(DEFAULT_STAKING_OPTION);
  const [inputAmout, setInputAmount] = useState(0);
  const currentAddress = useSelector((state) => state.address);
  const userDepositedBalance = useSelector((state) => state.totalDeposited);
  const userReward = useSelector((state) => state.userReward);
  const dispatch = useDispatch();

  const handleDepositClick = () => {
    if (approvalStatus) {
      if (inputAmout === 0) return;
      const transaction = toast.loading("Tx pending");
      stake(currentAddress, inputAmout)
        .then((res) => {
          toast.update(transaction, {
            render: "Succesfully staked",
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
          loadUserData();
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
    if (approvalStatus) {
      if (userBalance === 0) return;
      const transaction = toast.loading("Transaction pending");
      stake(currentAddress, userBalance)
        .then((res) => {
          loadUserData();
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
  const handleWithdrawClick = () => {
    console.log(`hi${userDepositedBalance}`);
    if (inputAmout === 0 || userDepositedBalance == 0) return;
    const transaction = toast.loading("Transaction pending");
    withdraw(currentAddress, inputAmout)
      .then((res) => {
        loadUserData();
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
    console.log(`hi ${userDepositedBalance}`);
    if (userDepositedBalance == 0) return;
    const transaction = toast.loading("Transaction pending");
    withdraw(currentAddress, userDepositedBalance)
      .then((res) => {
        loadUserData();
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
    if (userReward == 0) return;
    const transaction = toast.loading("Transaction pending");
    harvest(currentAddress)
      .then((res) => {
        loadUserData();
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

  const loadUserData = async () => {
    const _isApproved = await isApproved(currentAddress);
    setApprovalStatus(_isApproved);
    console.log(_isApproved);
    const _balance = await getUserBalance(currentAddress);
    setUserBalance(_balance);
  };
  useEffect(() => {
    if (currentAddress !== "") {
      loadUserData();
      console.log(`hi, ${currentAddress}`);
      console.log(`hi, ${userBalance}`);
    }
  }, [currentAddress]);
  return (
    <div className="flex-1">
      <div className="w-full h-full flex flex-col gap-3">
        <div className="flex gap-3">
          <BackgroundButton
            isGray={!isDepositSection}
            onClick={() => toggleDepositSection(GO_TO_DEPOSIT)}
          >
            Deposit
          </BackgroundButton>
          <BackgroundButton
            isGray={isDepositSection}
            onClick={() => toggleDepositSection(GO_TO_WITHDRAW)}
          >
            Withdraw
          </BackgroundButton>
        </div>
        <p className={`font-noto-sans-regular ${TEXT_COLORS.WHITE}`}>
          Balance:{" "}
          <span className={`font-noto-sans-bold ${TEXT_COLORS.PURPLE_DARK}`}>
            {userBalance} $ HOICHI
          </span>
        </p>
        <Input
          type="number"
          value={inputAmout}
          placeholder={`HOICHI ${text} Amount...`}
          onChange={setInputAmount}
        />
        <div className="flex justify-between gap-3">
          <BackgroundButton
            isGray={false}
            className="flex-1"
            onClick={() => {
              if (isDepositSection) {
                handleDepositClick();
              } else {
                handleWithdrawClick();
              }
            }}
          >
            {text}
          </BackgroundButton>
          <BackgroundButton
            isGray={false}
            className="flex-1"
            onClick={() => {
              if (isDepositSection) {
                handleDepositAllClick();
              } else {
                handleWithdrawAllClick();
              }
            }}
          >
            {`${text} All`}
          </BackgroundButton>
          <BackgroundButton
            isGray={false}
            className="flex-1"
            onClick={handleHarvestClick}
          >
            Harvest
          </BackgroundButton>
        </div>
        {
          isDepositSection && isV2Staking && (
            <StakingTime selected={stakingTime}  onSelect={setStakingTime}/>
          )
        }
      </div>
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
