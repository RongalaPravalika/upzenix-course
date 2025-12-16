import React from "react";
import { useLocation } from "react-router-dom";

export default function DetailsPage() {
  const { state } = useLocation();

  return (
    <div className="details">
      <h2>Submitted Details</h2>
      {Object.entries(state).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      ))}
    </div>
  );
}
