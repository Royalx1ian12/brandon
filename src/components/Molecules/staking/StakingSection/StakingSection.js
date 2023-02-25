/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { GeneralDepositInfo } from "../GeneralDepositInfo";
import { GeneralInfo } from "../GeneralInfo";
import { TotalLockedSection } from "../TotalLockedSection";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
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
} from "../../../../Utils/walletInteract";
import {
  SET_REWARD,
  SET_TOTAL_LOCK,
  SET_TOTAL_DEPOSITED,
} from "../../../../redux/actions";
export const StakingSection = () => {
  const [isDepositSection, setIsDepositSection] = useState(true);
  const userReward = useSelector((state) => state.userReward);
  const [userBalance, setUserBalance] = useState(0);
  const [userDepositedBalance, setUserDepositedBalance] = useState(0);

  const [sheebDepositAmount, setSheebDepositAmount] = useState(0);
  const [currentUserReward, setCurrentUserReward] = useState(0);
  const currentAddress = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const loadContractData = async () => {
    const _balance = await getUserBalance(currentAddress);
    setUserBalance(_balance);
    const _userDepositedBalance = await getUserDepositedBalance(currentAddress);
    setUserDepositedBalance(_userDepositedBalance);
    dispatch({ type: SET_TOTAL_DEPOSITED, payload: _userDepositedBalance });
    const _totalLockedBalance = await getTotalLockedBalance();
    dispatch({ type: SET_TOTAL_LOCK, payload: _totalLockedBalance });
    const _userReward = await getReward(currentAddress);
    setCurrentUserReward(_userReward);
    dispatch({ type: SET_REWARD, payload: _userReward });
  };
  useEffect(() => {
    if (currentAddress !== "") {
      loadContractData();
      console.log(`hi, ${currentAddress}`);
      console.log(`hi, ${userBalance}`);
      console.log(userDepositedBalance);
    }
  }, [currentAddress]);

  return (
    <div className="w-full lg:w-3/5 mb-10 lg:mb-20 flex flex-col lg:flex-row items-center justify-center gap-5 h-full w-full">
      <div className="flex-1 w-full h-5/6 flex flex-col gap-5">
        <GeneralInfo
          isDepositSection={isDepositSection}
          toggleDepositSection={(e) => setIsDepositSection(e)}
        />
        <GeneralDepositInfo />
      </div>
      <TotalLockedSection />
    </div>
  );
};
