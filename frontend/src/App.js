import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import RegisterMedicine from "./components/RegisterMedicine";
import VerifyMedicine from "./components/VerifyMedicine";
import ViewLogs from "./components/ViewLogs";
import HomePage from "./components/HomePage.jsx"; // Import the new HomePage component

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Set HomePage as the root */}
        <Route path="/" element={<HomePage />} />
        
        {/* Move AuthPage to /login */}
        <Route path="/login" element={<AuthPage />} />

        {/* Keep other routes */}
        <Route path="/register-medicine" element={<RegisterMedicine />} />
        <Route path="/verify-medicine" element={<VerifyMedicine />} />
        <Route path="/view-logs" element={<ViewLogs />} />
      </Routes>
    </Router>
  );
}
