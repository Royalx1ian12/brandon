import { Provider } from "react-redux";
import store from "../src/redux/store";
import { BackgroundImage as BackgroundComponent } from "./components/BackgroundImage";
import { Header } from "./components/Header";
import { StakingPage } from "./Pages/stakingPage";
import { AppRouter } from "./containers/AppRouter";
import BackgroundImage from "./assets/images/backgrounds/staking-screen.png";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BackgroundComponent
        url={BackgroundImage}
        className="min-h-screen font-bold"
      >
        <AppRouter />
      </BackgroundComponent>
    </Provider>
  );
}

export default App;
