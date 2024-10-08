import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Login from "./modules/auth/containers/login/Login.tsx";
import Signup from "./modules/auth/containers/signup/Signup.tsx";
import Dashboard from "./modules/dashboard/containers/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/app/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);
