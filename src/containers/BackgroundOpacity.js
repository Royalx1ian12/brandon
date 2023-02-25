import { BackgroundImage } from "../components/BackgroundImage";

export const BackgroundOpacity = ({
  children,
  backgroundSrc = "",
  containerClasses = "",
  contentClasses = "",
}) => (
  <div className={`relative ${containerClasses}`}>
    <BackgroundImage
      url={backgroundSrc}
      className="absolute h-full w-full opacity-50 brightness-200"
    />
    <div className={`absolute h-full w-full ${contentClasses}`}>{children}</div>
  </div>
);
