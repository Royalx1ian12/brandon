import { BackgroundOpacity } from "../../../containers/BackgroundOpacity";
import Background from "../../../assets/images/backgrounds/Asset 114-Gray-bg.png";
import GreenBackground from "../../../assets/images/backgrounds/Asset 114-Section.png";
import { DepositWithdrawSection } from "./DepositWithdrawSection";
import { DepositWithdrawSection2 } from "./DepositWithdrawSection2";
import { RecentActions } from "./RecentActions";

export const GeneralInfo = ({
  isV2Staking = false,
  isDepositSection = true,
  toggleDepositSection = () => {},
}) => (
  <div className="h-40 min-h-400 lg:h-2/3 w-full border-2 border-white flex rounded-lg">
    <img
      src={GreenBackground}
      alt="green-background"
      className="h-full w-1/4 hidden md:block"
    />
    <BackgroundOpacity
      backgroundSrc={Background}
      containerClasses="flex-1"
      contentClasses="flex flex-col p-5"
    >
        { !isV2Staking ?
            <DepositWithdrawSection
                isV2Staking={isV2Staking}
                isDepositSection={isDepositSection}
                toggleDepositSection={toggleDepositSection}
            /> :
            <DepositWithdrawSection2
                isV2Staking={isV2Staking}
                isDepositSection={isDepositSection}
                toggleDepositSection={toggleDepositSection}
            />
        }

    </BackgroundOpacity>
  </div>
);
