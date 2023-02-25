import { TEXT_COLORS } from '../../theme/theme';

export const Input = ({
  value,
  className = '',
  placeholder = '',
  type = 'text',
  onChange = () => {},
}) => (
  <input
    className={`rounded font-noto-sans-light text-xs text-center py-2 outline-none placeholder:text-purple-dark placeholder:italic ${TEXT_COLORS.PURPLE_DARK} ${className}`}
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={({ target }) => onChange(target.value)}
  />
);
