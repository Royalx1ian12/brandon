import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  HOME_ROUTE,
  MINT_ROUTE,
  STAKE_ROUTE,
  V2_STAKE,
} from "../constants/routes";
import { Header } from "../components/Header";
import { StakingPage } from "../Pages/stakingPage";
import { V2staking } from "../Pages/v2Staking";

export const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Switch>

        <Route exact path={HOME_ROUTE} component={StakingPage} />
        <Route exact path={STAKE_ROUTE} component={StakingPage} />
        <Route exact path={MINT_ROUTE} component={StakingPage} />
        <Route exact path={V2_STAKE} component={V2staking} />
    </Switch>
  </BrowserRouter>
);
