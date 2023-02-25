const DEFAULT_VALUE = '-';

export const RecentActionRow = ({
  amount = DEFAULT_VALUE,
  operation = DEFAULT_VALUE,
  unlockTime = DEFAULT_VALUE,
}) => (
  <div className="flex font-light justify-between items-center font-noto-sans-light text-sm text-white">
    <p className="w-1/3 text-center">{operation}</p>
    <p className="w-1/3 text-center">{amount}</p>
    <p className="w-1/3 text-center">{unlockTime}</p>
  </div>
);
