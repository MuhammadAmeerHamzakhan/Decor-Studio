"use client";

import { useState } from "react";
import { apiGet } from "@/api";

export function TestBackend() {
  const [message, setMessage] = useState("");

  const testConnection = async () => {
    try {
      const res = await apiGet("/");
      console.log("Backend Response:", res);
      setMessage(JSON.stringify(res));
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg bg-gray-50">
      <button
        onClick={testConnection}
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Test Backend Connection
      </button>

      {message && (
        <p className="mt-4 text-green-700 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}
