export const BackgroundImage = ({ url = "", className = "", children }) => {
  return (
    <div
      className={`${className} bg-center  bg-no-repeat bg-cover`}
      style={{
        backgroundImage: `url("${url}")`,
      }}
    >
      {children}
    </div>
  );
};
