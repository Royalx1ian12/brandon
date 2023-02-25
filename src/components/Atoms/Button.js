import { BACKGROUND_COLORS } from '../../theme/theme';

export const Button = ({
  children,
  backgroundColor = BACKGROUND_COLORS.WHITE,
  className = '',
  onClick = () => {},
}) => (
  <button
    type="button"
    className={`p-3 rounded noto-sans-bold duration-300 hover:opacity-90 ${backgroundColor} ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
