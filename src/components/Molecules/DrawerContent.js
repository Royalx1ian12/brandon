import { memo } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { TEXT_COLORS } from "../../theme/theme";

export const DrawerContent = memo(() => (
  <div className="w-full flex flex-col gap-5 items-center p-10 h-full bg-red-custom text-white text-xl font-noto-sans-bold">
    {ROUTES.map(({ path, label }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          `py-3 w-full text-center ${isActive ? TEXT_COLORS.PURPLE_LIGHT : ""}`
        }
      >
        {label}
      </NavLink>
    ))}
  </div>
));
