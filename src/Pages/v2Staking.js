import { MonkSection } from "../components/Molecules/staking/MonkSection";
import { StakingSection } from "../components/Molecules/staking/StakingSection/StakingSection";
import { V2StakingSection } from "../components/Molecules/staking/StakingSection/v2StakingSection";

export const V2staking = () => (
  <div className="relative mx-auto flex justify-between flex-col lg:flex-row items-stretch w-11/12 gap-5 h-90-screen">
    <MonkSection />
    <V2StakingSection />
  </div>
);
