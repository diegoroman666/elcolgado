interface Props {
  result: "win" | "lose" | null;
  word: string;
  onReset: () => void;
}

export default function FinalMessage({ result, word, onReset }: Props) {
  if (!result) return null;

  const message = result === "win"
    ? "¡Felicidades, ganaste!"
    : `Perdiste. La palabra era: ${word}`;

  return (
    <div style={{ marginTop: "20px", fontSize: "1.5rem" }}>
      <p>{message}</p>
      <button onClick={onReset}>Jugar otra vez</button>
    </div>
  );
}
