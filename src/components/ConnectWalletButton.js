import ButtonBackground from '../assets/images/Asset 275.png';

export const ConnectWalletButton = ({
  handleConnectWallet = () => {},
  walletAddress = 'Connect Wallet',
}) => {
  return (
    <button
      type="button"
      className="bg-cover h-16 w-48 text-white text-2xl rounded-xl transition duration-300 hover:scale-95"
      style={{
        backgroundImage: `url("${ButtonBackground}")`,
      }}
      onClick={handleConnectWallet}
    >
      {walletAddress}
    </button>
  );
};
