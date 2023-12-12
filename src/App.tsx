import routes, { history } from "./routes";
import "./index.css";
import { Switch } from "react-history-switch";
import { LoadingScreen } from "./components/LoadingScreen";

function App() {
  return (
    <>
      <Switch history={history} items={routes} Loader={LoadingScreen}></Switch>
      <button
        style={{ display: "none" }}
        id="btn"
        onClick={() => {
          interface routeMethods extends Window {
            openAdminPanel: () => void;
          }
          const customWindow: routeMethods = window as unknown as routeMethods;
          customWindow.openAdminPanel();
        }}
      >
        Display
      </button>
    </>
  );
}

export default App;
