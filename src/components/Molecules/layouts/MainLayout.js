import { Outlet } from 'react-router-dom';
import { Header } from '../molecules/Header';

import StakingScreenBackground from '../../assets/images/backgrounds/staking-screen.png';
import { BackgroundImage } from '../containers/BackgroundImage';

export const MainLayout = () => (
  <BackgroundImage
    src={StakingScreenBackground}
    shouldBackgroundContain={false}
  >
    <Header />
    <Outlet />
  </BackgroundImage>
);
