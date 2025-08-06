// src/components/HangmanDrawing.tsx
import { useMemo } from "react";

interface Props {
  wrongGuesses: number;
  isLoser: boolean;
  image?: string;
}

const IMAGES = [
  "/public/imagenes/dragon.png",
  "/public/imagenes/dragon2.png",
  "/assets/imagenes/dragon3.png",
  "/assets/imagenes/dragon4.png",
  "/assets/imagenes/dragon5.png",
  "/assets/imagenes/dragon6.png",
  "/assets/imagenes/dragon7.png",
  "/assets/imagenes/dragon8.png",
  "/assets/imagenes/dragon9.png",
];

export default function HangmanDrawing({
  wrongGuesses,
  isLoser,
  image,
}: Props) {
  const selectedImage = useMemo(() => {
    if (image) return image;
    const randomIndex = Math.floor(Math.random() * IMAGES.length);
    return IMAGES[randomIndex];
  }, [image]);

  const rows = 3;
  const cols = 3;
  const totalParts = rows * cols;

  const allParts = [] as React.ReactElement[];

  for (let i = 0; i < totalParts; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const showPiece = isLoser || i < wrongGuesses;

    allParts.push(
      <div
        key={i}
        style={{
          position: "absolute",
          top: `${(row * 100) / rows}%`,
          left: `${(col * 100) / cols}%`,
          width: `${100 / cols}%`,
          height: `${100 / rows}%`,
          backgroundImage: `url(${selectedImage})`,
          backgroundSize: `${cols * 100}% ${rows * 100}%`,
          backgroundPosition: `${(col * 100) / (cols - 1)}% ${(row * 100) / (rows - 1)}%`,
          backgroundRepeat: "no-repeat",
          opacity: showPiece ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    );
  }

  return (
    <div
      className="position-relative mb-4 fire-container"
      style={{
        width: "min(90vw, 400px)",
        height: "min(90vw, 400px)",
        backgroundColor: "#111",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 25px #222",
        marginInline: "auto",
      }}
    >
      {allParts}

      {isLoser && (
        <div className="fire-overlay">
          <img
            src="/src/assets/imagenes/fire_overlay.gif"
            alt="fuego"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          />
        </div>
      )}
    </div>
  );
}
