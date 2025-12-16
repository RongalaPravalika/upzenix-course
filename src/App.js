import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./FormPage";
import DetailsPage from "./DetailsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
