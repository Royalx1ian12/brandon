import { useState } from "react";
import Background from "../../../assets/images/backgrounds/Asset 116.png";
import { TEXT_COLORS } from "../../../theme/theme";
import { BackgroundOpacity } from "../../../containers/BackgroundOpacity";
import { useEffect } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
export const GeneralDepositInfo = () => {
  const pendingReward = useSelector((state) =>
    Math.round(ethers.utils.formatEther(state.userReward))
  );
  const [unlockTime /* setUnlockTime */] = useState("No lock");
  const userAddress = useSelector((state) => state.address);
  const amountDeposited = useSelector((state) => state.totalDeposited);

  return (
    <BackgroundOpacity
      backgroundSrc={Background}
      containerClasses={`h-40 lg:h-1/3 w-full border-2 border-white rounded-lg ${TEXT_COLORS.WHITE}`}
      contentClasses="flex items-center justify-between gap-1 font-noto-sans-bold text-center px-2"
    >
      <div className="h-full w-full flex flex-col justify-center text-center gap-8 py-5">
        <h3 className="flex-1 flex items-center justify-center sm:flex-none">
          Pending Reward
        </h3>
        <p className={`text-2xl sm:text-3xl ${TEXT_COLORS.PURPLE_DARK}`}>
          {pendingReward}
        </p>
      </div>
      <div className="h-full w-full flex flex-col justify-center gap-8 py-5">
        <h3 className="flex-1 flex items-center justify-center sm:flex-none">
          Amount Deposited
        </h3>
        <p className={`text-2xl sm:text-3xl ${TEXT_COLORS.PURPLE_DARK}`}>
          {amountDeposited}
        </p>
      </div>
      <div className="h-full w-full flex flex-col justify-center gap-8 py-5">
        <h3 className="flex-1 flex items-center justify-center sm:flex-none">
          Unlock Time
        </h3>
        <p className={`text-2xl sm:text-3xl ${TEXT_COLORS.PURPLE_DARK}`}>
          {unlockTime}
        </p>
      </div>
    </BackgroundOpacity>
  );
};
