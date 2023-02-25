import { MonkSection } from "../components/Molecules/staking/MonkSection";
import { StakingSection } from "../components/Molecules/staking/StakingSection/StakingSection";

export const StakingPage = () => (
  <div className="relative mx-auto flex justify-between flex-col lg:flex-row items-stretch w-11/12 gap-5 h-90-screen">
    <MonkSection />
    <StakingSection />
  </div>
);
