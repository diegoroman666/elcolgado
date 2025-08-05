interface Props {
  wrongGuesses: number;
}

export default function HangmanDrawing({ wrongGuesses }: Props) {
  const parts = [
    <circle key="head" cx="140" cy="50" r="10" stroke="black" fill="none" />,
    <line key="body" x1="140" y1="60" x2="140" y2="100" stroke="black" />,
    <line key="armL" x1="140" y1="70" x2="120" y2="90" stroke="black" />,
    <line key="armR" x1="140" y1="70" x2="160" y2="90" stroke="black" />,
    <line key="legL" x1="140" y1="100" x2="120" y2="130" stroke="black" />,
    <line key="legR" x1="140" y1="100" x2="160" y2="130" stroke="black" />,
  ];

  return (
    <svg width="200" height="200" style={{ border: "1px solid gray" }}>
      <line x1="20" y1="180" x2="180" y2="180" stroke="black" />
      <line x1="60" y1="180" x2="60" y2="20" stroke="black" />
      <line x1="60" y1="20" x2="140" y2="20" stroke="black" />
      <line x1="140" y1="20" x2="140" y2="40" stroke="black" />
      {parts.slice(0, wrongGuesses)}
    </svg>
  );
}
