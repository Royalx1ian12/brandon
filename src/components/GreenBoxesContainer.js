import { useState } from "react";
import { greenBoxesInitialState } from "../data/greenBoxes";
import { BoxInfo } from "./BoxInfo";
import GreenBox from "../assets/images/Asset 104.png";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
export const GreenBoxesContainer = () => {
  const [boxesState, setBoxesState] = useState(greenBoxesInitialState);
  const _totalLockedBalance = useSelector((state) => state.totalLock);
  const _userReward = useSelector((state) => state.userReward);

  return (
    <div className="container px-20 py-2.5 mx-auto flex flex-wrap justify-center gap-1">
      {[
        {
          title: "Total Locked",
          value: parseFloat(_totalLockedBalance).toFixed(2),
          valueType: "$FUEGO",
        },
        {
          title: "User Rewards",
          value: Math.round(ethers.utils.formatEther(_userReward)),
          valueType: "$FUEGO",
        },
        { title: "APR", value: 0, valueType: "%" },
      ].map(({ title, value, valueType }) => (
        <BoxInfo
          key={title}
          title={title}
          content={`${value} ${valueType}`}
        />
      ))}
    </div>
  );
};
