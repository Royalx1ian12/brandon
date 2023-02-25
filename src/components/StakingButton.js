export const StakingButton = ({
  imageURL = "",
  onClick = () => {},
  text = "",
}) => {
  return (
    <button
      type="button"
      className="bg-cover bg-center  bg-no-repeat w-1/2 h:20 sm:w-40 text-xl text-white text-shadow rounded-xl transition duration-300 hover:scale-95"
      style={{
        backgroundImage: `url("${imageURL}")`,
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
