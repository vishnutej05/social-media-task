import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSubmission from "./components/UserSubmission/UserForm"; // Ensure this import points to the correct file
import AdminDashboard from "./components/AdminDashboard/AdminDashboard"; // Ensure this import points to the correct file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSubmission />} />{" "}
        <Route path="/admin" element={<AdminDashboard />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
