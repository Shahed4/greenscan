"use client"
import React from "react";
import { uniqueDisplayNames } from "../../../../utils/render-predictions";

export default function genAi() {
  return (
    <div>
      <h1>These are:</h1>
      <ul>
        {uniqueDisplayNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
