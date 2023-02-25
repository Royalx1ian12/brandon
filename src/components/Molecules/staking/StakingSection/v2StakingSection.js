/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { GeneralDepositInfo } from "../GeneralDepositInfo";
import { GeneralInfo } from "../GeneralInfo";
import { TotalLockedSection } from "../TotalLockedSection";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalLockedBalance2,
  getUserBalance,
  getUserDepositedBalance2,
  getStakingList,
} from "../../../../Utils/walletInteract";
import {
  SET_REWARD,
  SET_TOTAL_LOCK,
  SET_TOTAL_DEPOSITED,
  SET_STAKING_LIST,
} from "../../../../redux/actions";
export const V2StakingSection = () => {
  const [isDepositSection, setIsDepositSection] = useState(true);
  const userReward = useSelector((state) => state.userReward);
  const [userBalance, setUserBalance] = useState(0);
  const [userDepositedBalance, setUserDepositedBalance] = useState(0);
  ////
  const [sheebDepositAmount, setSheebDepositAmount] = useState(0);
  const [currentUserReward, setCurrentUserReward] = useState(0);
  const currentAddress = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const loadContractData = async () => {
    const _balance = await getUserBalance(currentAddress);
    setUserBalance(_balance);
    // const _userDepositedBalance = await getUserDepositedBalance2(currentAddress);
    // setUserDepositedBalance(_userDepositedBalance);
    // dispatch({ type: SET_TOTAL_DEPOSITED, payload: _userDepositedBalance });
    const _totalLockedBalance = await getTotalLockedBalance2();
    console.log("total locked", _totalLockedBalance);
    dispatch({ type: SET_TOTAL_LOCK, payload: _totalLockedBalance });
    const [_stakingList, _userReward, _depositedAmount] = await getStakingList(
      currentAddress
    );
    console.log("staking list ------", _stakingList);
    dispatch({ type: SET_STAKING_LIST, payload: _stakingList });
    console.log("_userReward---", _userReward);
    // const _userReward = await getReward2(currentAddress);
    setCurrentUserReward(_userReward);
    dispatch({ type: SET_REWARD, payload: _userReward });
    setUserDepositedBalance(_depositedAmount);
    dispatch({ type: SET_TOTAL_DEPOSITED, payload: _depositedAmount });
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
          isV2Staking={true}
          isDepositSection={isDepositSection}
          toggleDepositSection={(e) => setIsDepositSection(e)}
        />
        <GeneralDepositInfo />
      </div>
      <TotalLockedSection />
    </div>
  );
};
