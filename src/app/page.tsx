'use client'
import { generateRandomPhrases } from "@/services/random-phrase";
import React from "react";


export default function Home() {
  const [phrases, setPhrases] = React.useState<string[]>([]);

  React.useEffect(() => {
    generateRandomPhrases()
      .then(randomPhrases => {
        setPhrases(randomPhrases);
      })
      .catch(error => {
        console.error("Error generating random phrases:", error);
      });
  }, []);

  return (
    <>
      <main style={{ display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "gainsboro", padding: "12px" }}>
        <div>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", letterSpacing: "-0.025em", color: "black" }}>
              Phrase Generator</h1>
            <p style={{ marginTop: "0.5rem", color: "gray" }}>Generate unique phrases based on your input.</p>
          </div>
          <div style={{ gap: "1rem" }}>
            <div style={{ gap: "0.5rem" }}>
              <label htmlFor="phrase">Enter a phrase</label>
              <input style={{ width: "100%", height: "40px", borderRadius: "10px", marginTop: "10px" }} id="phrase" placeholder="Type your phrase here..." />
            </div>
            <button style={{ width: "100%", height: "40px", backgroundColor: "black", color: "white", borderRadius: "10px", marginTop: "10px" }}>Generate</button>
          </div>
          <div id="phrases" style={{ width: "100%", backgroundColor: "transparent", color: "black", borderRadius: "0.5rem", padding: "12px", marginTop: "24px" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {phrases.map((phrase, index) => (
                <li key={index} style={{ color: "white", fontSize: "1rem", marginBottom: "12px" }}>{phrase}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}