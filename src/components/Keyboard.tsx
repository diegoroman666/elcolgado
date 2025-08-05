interface Props {
  onGuess: (letter: string) => void;
  guessed: string[];
  disabled: boolean;
}

export default function Keyboard({ onGuess, guessed, disabled }: Props) {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div style={{ marginTop: '20px' }}>
      {letters.map(letter => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessed.includes(letter) || disabled}
          style={{
            margin: '5px',
            padding: '10px',
            fontSize: '1rem',
            backgroundColor: guessed.includes(letter) ? "#ccc" : "#eee",
            cursor: guessed.includes(letter) || disabled ? "not-allowed" : "pointer"
          }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
