"use client";
import React, { useState } from "react";

export default function GenAi() {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Replace `uniqueDisplayNames` with your imported value
  const { uniqueDisplayNames } = require("../../../../utils/render-predictions");

  const handleGenerateResponse = async () => {
    setIsLoading(true);
    const prompt = `What are some sustainable ways to use the following items: ${uniqueDisplayNames.join(", ")}`;

    try {
      const res = await fetch("/api/openai-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.text);
      console.log("Passed");
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>These are:</h1>
      <ul>
        {uniqueDisplayNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <button onClick={handleGenerateResponse} disabled={isLoading}>
        Generate AI Response
      </button>
      {isLoading && <p>Loading...</p>}
      {response && <p>AI Response: {response}</p>}
    </div>
  );
}
