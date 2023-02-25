export const BurguerIcon = ({ onClick = () => {} }) => (
  <button
    type="button"
    className="flex flex-start flex-col gap-1 p-1 bg-white h-fit outline-none"
    onClick={onClick}
  >
    <div className="h-1 duration-300 bg-black rounded-full w-8" />
    <div className="h-1 duration-300 bg-black rounded-full w-8" />
    <div className="h-1 duration-300 bg-black rounded-full w-8" />
  </button>
);
