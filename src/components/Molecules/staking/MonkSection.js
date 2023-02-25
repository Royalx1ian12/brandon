import Logo from "../../../assets/icons/Asset 54.png";
import StakingPageText from "../../../assets/images/general/Staking_Page_Text.png";
import MonkImage from "../../../assets/images/Asset 56.png";
import { BACKGROUND_COLORS } from "../../../theme/theme";

export const MonkSection = () => (
  <div className="relative h-70-percent h-90-desktop w-full lg:w-2/5 grow-0 h-full flex items-start gap-5">
    <div className="absolute bottom-0 w-full flex justify-center lg:justify-start">
      <div className="w-1/2 sm:w-1/2 lg:w-full h-full">
        <img
          alt="logo"
          src={MonkImage}
          className="object-fit bottom-0 w-full h-full"
        />
      </div>
    </div>
    <div
      className={`h-full w-1/3 sm:w-1/4 lg:w-1/3 py-10 flex justify-center items-start ${BACKGROUND_COLORS.RED_CUSTOM}`}
    >
      <img alt="logo" src={Logo} className="object-fit w-7/12 z-10" />
    </div>
    <img
      alt="logo"
      src={StakingPageText}
      className="object-fit py-10 w-40 sm:w-48 lg:w-52 z-10"
    />
  </div>
);
