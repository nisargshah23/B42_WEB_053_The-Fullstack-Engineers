import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "../Auth";
import Dashboard from "../Dashboard";
// import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}
