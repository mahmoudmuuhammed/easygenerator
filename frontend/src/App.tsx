import { Outlet } from "react-router-dom";
import loginLogo from "./assets/login.png";
import "./App.css";

function App() {
  return (
    <div id="app">
      <div className="container">
        <div className="container__form">
          <div className="container__wrapper">
            <Outlet />
          </div>
        </div>
        <div className="container__info">
          <div className="container__wrapper">
            <img src={loginLogo} alt="Login Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
