import "../App.css";

interface Props {
  result: "win" | "lose" | null;
  word: string;
  onReset: () => void;
}

export default function FinalMessage({ result, word, onReset }: Props) {
  if (!result) return null;

  const message =
    result === "win"
      ? "¡Felicidades! ¡Has ganado!"
      : `¡Oh no! La palabra era: ${word}`;

  return (
    <div className="final-message fade-in">
      <p>{message}</p>
      <button
        onClick={onReset}
        style={{
          marginTop: "1rem",
          padding: "1rem 2rem",
          fontSize: "1rem",
          fontWeight: "bold",
          border: "2px solid #00ffff",
          borderRadius: "8px",
          backgroundColor: "#111",
          color: "#00ffff",
          textShadow: "0 0 4px #00ffff",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          const btn = e.target as HTMLButtonElement;
          btn.style.backgroundColor = "#00ffff";
          btn.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          const btn = e.target as HTMLButtonElement;
          btn.style.backgroundColor = "#111";
          btn.style.color = "#00ffff";
        }}
      >
        Jugar otra vez
      </button>
    </div>
  );
}
