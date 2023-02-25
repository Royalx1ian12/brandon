/* eslint-disable no-unused-expressions */
import { useState, useEffect } from "react";
import { BackgroundButton } from "../../BackgroundButton/BackgroundButton";
import { TEXT_COLORS } from "../../../theme/theme";
import { Input } from "../../Atoms/Input";
import { getUserBalance } from "../../../Utils/walletInteract";
import { useDispatch, useSelector } from "react-redux";
import {
  isApproved2,
  stake2,
  withdraw2,
  harvest2,
  approve2,
} from "../../../Utils/walletInteract";
import { ToastContainer, toast } from "react-toastify";
import { DEFAULT_STAKING_OPTION, StakingTime } from "./StakingTime";
const GO_TO_DEPOSIT = true;
const GO_TO_WITHDRAW = false;
const lockTimes = ["7 days", "15 days", "1 month", "12 months"];

export const DepositWithdrawSection2 = ({
  isV2Staking = false,
  isDepositSection = true,
  toggleDepositSection = () => {},
}) => {
  const [userBalance, setUserBalance] = useState(100);
  // const [stakintList, setStakingList] = useState([]);
  const text = isDepositSection ? "Deposit" : "Withdraw";
  //const approveText = _isApproved ? "Approve" : "Deposit";
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [stakingTime, setStakingTime] = useState(DEFAULT_STAKING_OPTION);
  const [inputAmout, setInputAmount] = useState(0);
  const currentAddress = useSelector((state) => state.address);
  const userDepositedBalance = useSelector((state) => state.totalDeposited);
  const stakingList = useSelector((state) => [...state.stakingList]);
  const dispatch = useDispatch();

  const handleDepositClick = () => {
    if (approvalStatus) {
      if (inputAmout === 0) return;
      const transaction = toast.loading("Tx pending");
      stake2(currentAddress, inputAmout, stakingTime)
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
      approve2(currentAddress)
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
      stake2(currentAddress, userBalance)
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
      approve2(currentAddress)
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
  const handleWithdrawClick = (stakingId) => {
    console.log(`hi${userDepositedBalance}`);
    // if (inputAmout === 0 || userDepositedBalance == 0) return;
    const transaction = toast.loading("Transaction pending");
    withdraw2(currentAddress, stakingId)
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
    withdraw2(currentAddress, userDepositedBalance)
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
  const handleHarvestClick = (stakingId) => {
    // if (userReward == 0) return;
    const transaction = toast.loading("Transaction pending");
    harvest2(currentAddress, stakingId)
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
    console.log("load user data");
    const _isApproved = await isApproved2(currentAddress);
    setApprovalStatus(_isApproved);
    console.log(_isApproved);
    const _balance = await getUserBalance(currentAddress);
    setUserBalance(_balance);
    // const _stakingList = await getStakingList(currentAddress);
    // console.log('stakingList', _stakingList)
    // setStakingList([..._stakingList])
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
        {isDepositSection && (
          <>
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
                    // handleWithdrawClick();
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
                    // handleWithdrawAllClick();
                  }
                }}
              >
                {`${text} All`}
              </BackgroundButton>
              <BackgroundButton
                isGray={false}
                className="flex-1"
                // onClick={handleHarvestClick}
              >
                Harvest
              </BackgroundButton>
            </div>
          </>
        )}

        {isDepositSection && isV2Staking && (
          <StakingTime selected={stakingTime} onSelect={setStakingTime} />
        )}
        {!isDepositSection &&
          stakingList &&
          stakingList.map((staking) => {
            return (
              <div
                key={staking.stakingId}
                className="flex justify-between gap-3"
              >
                <p>{staking.amount}</p>
                <p>{staking.claimableAmount}</p>
                <p>{lockTimes[staking.stakingtype]}</p>
                <BackgroundButton
                  isGray={false}
                  className="flex-1"
                  onClick={() => handleWithdrawClick(staking.stakingId)}
                >
                  Unstake
                </BackgroundButton>
                <BackgroundButton
                  isGray={false}
                  className="flex-1"
                  onClick={() => handleHarvestClick(staking.stakingId)}
                >
                  Harvest
                </BackgroundButton>
              </div>
            );
          })}
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
