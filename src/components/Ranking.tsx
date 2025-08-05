import { useEffect, useState } from "react";

interface Score {
  name: string;
  date: string;
  result: "win" | "lose";
}

export default function Ranking() {
  const [ranking, setRanking] = useState<Score[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ranking") || "[]");
    setRanking(data.reverse().slice(0, 10));
  }, []);

  if (ranking.length === 0) return null;

  return (
    <div style={{ marginTop: "40px", textAlign: "left" }}>
      <h2>🏆 Ranking</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {ranking.map((r, i) => (
          <li key={i}>
            <strong>{r.name}</strong> - {r.result.toUpperCase()} - <em>{r.date}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
