"use client";
import React, { useState } from "react";
import styles from "./gen-ai.module.css";
import Link from "next/link";

export default function GenAi() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    uniqueDisplayNames,
  } = require("../../../../utils/render-predictions");

  const handleGenerateResponse = async () => {
    setIsLoading(true);
    const prompt = `You are a creative sustainability assistant focused on providing eco-friendly solutions to help users reduce their carbon footprint and minimize waste. Suggest practical, innovative, and resourceful ways to sustainably reuse common household items, encouraging habits that promote environmental consciousness. Your responses should prioritize simplicity and cost-effectiveness, making sustainable practices accessible for people at all levels of experience.

Please respond in strict JSON format without any additional text, comments, or code blocks. Use this exact structure:

{
  "items": [
    {
      "name": "Item Name",
      "suggestions": [
        { "title": "Suggestion Title 1", "description": "Detailed description of suggestion 1" },
        { "title": "Suggestion Title 2", "description": "Detailed description of suggestion 2" }
      ]
    }
  ]
}

Order each list with biodegradable items at the top, followed by other items ranked by sustainable impact and environmental benefit. Respond in this exact JSON format for each item in the following list: ${uniqueDisplayNames.join(
      ", "
    )}`;

    try {
      const res = await fetch("/api/openai-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(JSON.parse(data.text));
    } catch (error) {
      console.error("Error fetching or parsing response:", error);
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.topnav}>
        <Link href="/" className={styles.logoContainer}>
          <img className={styles.img} src="/logo.png" alt="Logo" />
          <div className={styles.brand}>
            <h2 className={styles.firstbrand}>Green</h2>
            <h2 className={styles.secondbrand}>Scan</h2>
          </div>
        </Link>
        <div className={styles.navLinks}>
          <Link
            href="/image-processing"
            className={`${styles.link} ${styles.processing}`}
          >
            Processing
          </Link>
          <Link
            href="/api/auth/logout"
            className={`${styles.link} ${styles.signin}`}
          >
            Logout
          </Link>
        </div>
      </nav>
      <h1 className={styles.heading}>Unique Items</h1>
      <ul className={styles.itemList}>
        {uniqueDisplayNames.map((name, index) => (
          <li key={index} className={styles.item}>
            {name}
          </li>
        ))}
      </ul>
      <button
        className={styles.button}
        onClick={handleGenerateResponse}
        disabled={isLoading}
      >
        Generate AI Response
      </button>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {response && (
        <div className={styles.responseContainer}>
          <h2 className={styles.responseHeading}>AI Response</h2>
          <div className={styles.responseBody}>
            {response.items.map((item, index) => (
              <div key={index} className={styles.responseItem}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <ul className={styles.suggestionList}>
                  {item.suggestions.map((suggestion, idx) => (
                    <li key={idx} className={styles.suggestion}>
                      <strong className={styles.suggestionTitle}>
                        {suggestion.title}:
                      </strong>{" "}
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
