import { useState } from "react";
import { BackgroundOpacity } from "../../../containers/BackgroundOpacity";
import TotalLockedSecionBackground from "../../../assets/images/backgrounds/Asset 115.png";
import { TEXT_COLORS } from "../../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import {
  getReward,
  getTotalLockedBalance,
} from "../../../Utils/walletInteract";
export const TotalLockedSection = () => {
  const totalLocked = useSelector((state) => state.totalLock);
  const totalUserReward = useSelector((state) =>
    ethers.utils.formatEther(state.userReward)
  );
  const [tokenPrices /* setTokenPrices */] = useState(0.0000000012);
  const [apr /* setApr */] = useState(62);
  const currentAddress = useSelector((state) => state.address);

  return (
    <BackgroundOpacity
      backgroundSrc={TotalLockedSecionBackground}
      containerClasses="h-40 w-full lg:w-1/3 lg:h-5/6 border-2 border-white rounded-lg min-h-400"
      contentClasses="text-white flex flex-col items-center h-full justify-between gap-1 font-noto-sans-bold text-xl text-center"
    >
      <div className="h-full w-full flex flex-col items-center justify-center">
        <h3>Total Locked</h3>
        <p className={TEXT_COLORS.PURPLE_DARK}>
          {Math.round(totalLocked)} HOICHI
        </p>
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <h3>Token Prices</h3>
        <p className={TEXT_COLORS.PURPLE_DARK}>${tokenPrices}</p>
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <h3>Total User Reward</h3>
        <p className={TEXT_COLORS.PURPLE_DARK}>
          {Math.round(totalUserReward)} HOICHI
        </p>
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center"></div>
    </BackgroundOpacity>
  );
};
