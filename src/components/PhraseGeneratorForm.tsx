'use client'
import React, { useState, useEffect } from "react";
import { generateVariations } from "@/services/openai-service";

interface UserInputElement extends HTMLElement {
  value: string;
}

function PhraseGeneratorForm() {
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<string[]>([]);
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simular la obtención de la entrada del usuario
        const inputElement = document.getElementById("userInput") as UserInputElement;
        if (inputElement) {
          const userInput = inputElement.value;
          setPhrase(userInput);
          const newVariations = await generateVariations(userInput);
          setVariations(newVariations);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la entrada del usuario:", error);
        setError("Error al obtener la entrada del usuario.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhrase(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedVariation = event.target.value;
    const isChecked = event.target.checked;

    setSelectedVariations((prevSelectedVariations) => {
      if (isChecked) {
        return [...prevSelectedVariations, checkedVariation];
      } else {
        return prevSelectedVariations.filter(
          (variation) => variation !== checkedVariation
        );
      }
    });
  };

  const handleGenerateVariations = async () => {
    try {
      if (loading) {
        setError("Ya se está generando una variación. Espere hasta que finalice.");
        return;
      }
      setLoading(true);
      const newVariations = await generateVariations(phrase);
      setVariations(newVariations);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error("Error al generar variaciones:", error);
      setError("Error al generar variaciones.");
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "gainsboro", padding: "12px" }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", letterSpacing: "-0.025em", color: "black" }}>
        Phrase Generator
      </h1>
      <label>
        Original Phrase:
      </label>
      <input
        style={{ height: "25px", marginTop: "10px", borderRadius: "10px" }}
        type="text"
        id="userInput"
        value={phrase}
        onChange={handleInputChange}
        placeholder="Put your phrase here..."
      />
      <button
        style={{
          height: "40px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "10px",
          marginTop: "10px",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.5 : 1,
        }}
        type="button"
        disabled={loading}
        onClick={handleGenerateVariations}
      >
        {loading ? "Generating..." : "Generate variations"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h4>Variations:</h4>
        <ul>
          {variations.map((variation) => (
            <li key={variation}>
              <input
                type="checkbox"
                value={variation}
                onChange={handleCheckboxChange}
              />
              {variation}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Selected variations:</h4>
        <ul>
          {selectedVariations.map((variation) => (
            <li key={variation}>{variation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PhraseGeneratorForm;