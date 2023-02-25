import BackgroundImage from '../assets/images/Asset 6.png'

export const BoxInfo = ({ title = '', content = '' }) => {
  return (
    <div
      className="bg-contain bg-center bg-no-repeat h-32 w-56 rounded-xl flex flex-col flex-wrap items-center justify-center gap-1"
      style={{
        backgroundImage: `url("${BackgroundImage}")`,
      }}
    >
      <h1 className="text-black">{title}</h1>
      <h2 className="font-anybody-light text-orange">{content}</h2>
    </div>
  );
};
