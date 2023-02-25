import { BACKGROUND_COLORS, TEXT_COLORS } from '../../theme/theme';

export const BackgroundButton = ({
  children,
  className = '',
  isGray = true,
  onClick = () => {},
}) => {
  const { textColor, bgColor } = isGray
    ? {
        textColor: TEXT_COLORS.PURPLE_DARK,
        bgColor: BACKGROUND_COLORS.WHITE_CUSTOM,
      }
    : {
        textColor: TEXT_COLORS.WHITE,
        bgColor: BACKGROUND_COLORS.GREEN_LIGHT,
      };

  return (
    <button
      type="button"
      className={`rounded p-2 w-24 font-noto-sans-bold text-sm whitespace-nowrap ${bgColor} ${textColor} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
