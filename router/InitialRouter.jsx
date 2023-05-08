import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../src/pages/auth/Login";
import { Record } from "../src/pages/records/Record";

export const InitialRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Registros" element={<Record />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
