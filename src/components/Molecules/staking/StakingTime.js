import { useState } from "react";

export const DEFAULT_STAKING_OPTION = 0;

const STAKING_OPTIONS = [
  {
    name: "7 days",
    value: DEFAULT_STAKING_OPTION,
  },
  {
    name: "15 days",
    value: 1,
  },
  {
    name: "1 month",
    value: 2,
  },
  {
    name: "12 months",
    value: 3,
  },
];

export const StakingTime = ({
  selected = DEFAULT_STAKING_OPTION,
  onSelect = () => {},
}) => {
  const [selectedOptionName, setSelectedOptionName] = useState(
    STAKING_OPTIONS.find(({ value }) => value === selected)?.name || ""
  );

  const handleOnSelect = (name, value) => {
    setSelectedOptionName(name);
    onSelect(value);
  };

  return (
    <div className="flex-1 mt-5 text-white">
      <h2>Stake Time: {selectedOptionName}</h2>
      <div className="flex mt-2 flex-wrap gap-1.5 text-sm">
        {STAKING_OPTIONS.map(({ name, value }) => (
          <button
            key={value}
            type="button"
            className={`text-purple-dark rounded-full h-16 w-16 border-2 duration-300 font-bold 
              ${
                selected === value
                  ? "bg-purple-dark text-white-custom border-white-custom"
                  : "bg-white-custom text-purple-dark"
              }`}
            onClick={() => handleOnSelect(name, value)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
