import { useState } from "react";
import Drawer from "react-modern-drawer";
import { BackgroundImage } from "./BackgroundImage";
import { DrawerContent } from "./Molecules/DrawerContent";
import { BurguerIcon } from "./Atoms/BurguerIcon";
import Web3modal from "../Utils/walletInteract";
import BannerImage from "../assets/images/banner/banner.png";
import "react-modern-drawer/dist/index.css";

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <BackgroundImage url={BannerImage}>
       <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        direction="left"
      >
        <DrawerContent />
      </Drawer>

      <header className="container mx-auto flex justify-between items-center px-5 py-5 md:px-0">
        <div className="flex justify-start flex-1">
          <BurguerIcon onClick={toggleDrawer} />
        </div>
        <div />
        <div className="flex justify-end flex-1" />
        <Web3modal />
      </header>
    </BackgroundImage>
  );
};
