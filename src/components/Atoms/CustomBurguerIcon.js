export const CustomBurguerIcon = ({
  isDrawerOpen = false,
  onClick = () => {},
}) => (
  <button
    type="button"
    className="flex flex-start flex-col gap-1 p-1"
    onClick={onClick}
  >
    <div
      className={`h-1 duration-300 bg-black rounded-full ${
        isDrawerOpen ? 'w-5' : 'w-8'
      }`}
    />
    <div
      className={`h-1 duration-300 bg-black rounded-full ${
        isDrawerOpen ? 'w-7' : 'w-8'
      }`}
    />
    <div
      className={`h-1 duration-300 bg-black rounded-full ${
        isDrawerOpen ? 'w-6' : 'w-8'
      }`}
    />
  </button>
);
