// src/App.tsx
import { useEffect, useState, useMemo } from 'react';
import WordDisplay from './components/WordDisplay';
import Keyboard from './components/Keyboard';
import HangmanDrawing from './components/HangmanDrawing';
import FinalMessage from './components/FinalMessage';
import Ranking from './components/Ranking';

import correctSound from './assets/correct.mp3';
import wrongSound from './assets/wrong.mp3';
import winSound from './assets/win.mp3';
import loseSound from './assets/lose.mp3';
import './App.css';


const PALABRAS = [
  // Geología
  "roca", "mineral", "cristal", "magma", "lava", "volcan", "terremoto", "placa",
  "tectonica", "sedimento", "erosion", "meteorizacion", "glaciar", "falla",
  "cuarzo", "granito", "basalto", "caliza", "arenisca", "marmol", "estrato",
  "fosil", "geologia", "sismologia", "paleontologia", "orogenia", "manto",
  "nucleo", "corteza", "gema", "diamante", "esmeralda", "zafiro", "rubi",
  "obsidiana", "pumita", "estalactita", "estatagmia", "caverna", "geiser",
  "desierto", "valle", "montaña", "cordillera", "meseta", "canyon", "duna",
  "subduccion", "rift", "metamorfica", "ignea", "sedimentaria", "carbon",
  "petroleo", "gas", "mineralogia", "geofisica", "hidrogeologia", "geomorfologia",

  // Astronomía
  "estrella", "planeta", "galaxia", "universo", "cosmos", "nebulosa", "cometa",
  "asteroide", "luna", "sol", "orbita", "gravedad", "telescopio", "espacio",
  "astronauta", "cohete", "satelite", "constelacion", "zodiaco", "viaje",
  "interestelar", "agujero", "negro", "supernova", "quasar", "pulsar", "bigbang",
  "meteoro", "via", "lactea", "andromeda", "jupiter", "marte", "venus", "tierra",
  "saturno", "urano", "neptuno", "pluton", "mercurio", "eclipse", "aurora",
  "boreal", "extraterrestre", "ovni", "cosmologia", "astrofisica", "exoplaneta",
  "cinturon", "cinturon-de-asteroides", "cinturon-de-kuiper", "nube-de-oort", "sistemasolar", "observatorio", "estrellafugaz",

  // Mitología Griega
  "zeus", "hera", "poseidon", "hades", "atenea", "apolo", "artemisa", "afrodita",
  "ares", "hefesto", "hermes", "demeter", "dionisio", "perseo", "heracles",
  "medusa", "minotauro", "sirena", "centauro", "quimera", "hidra", "cerbero",
  "olimpo", "tartaro", "elysium", "troya", "odisea", "iliada", "esparta",
  "atenas", "mito", "leyenda", "oraculo", "troyano", "aquiles", "hector",
  "helenademil", "ulises", "ciclope", "pegaso", "grifo", "esfinge", "titanes",
  "cronos", "gaia", "urano", "prometeo", "pandora", "narciso", "eco", "icaros",
  "ariadna", "teseo", "laberinto", "caronte", "estigia", "percefone", "demigod",
  "hero", "tragedia", "comedia", "teatro", "filosofia", "socrates", "platon",
  "aristoteles", "grecia", "antigua", "orfeo", "euridice", "satyro", "ninfa",

  // Dragones e Historias de Dragones
  "dragon", "draco", "serpiente", "alado", "escamas", "fuego", "hielo", "garra",
  "cola", "vuelo", "tesoro", "cueva", "montaña", "guerrero", "caballero",
  "princesa", "reino", "leyenda", "mito", "bestia", "guardian", "ancestro",
  "sabio", "antiguo", "magia", "hechizo", "aliento", "ruina", "desolacion",
  "protector", "destructor", "nido", "huevo", "caza", "matadragones", "smaug",
  "falkor", "saphira", "drogon", "viserion", "rhaegal", "tiamat", "bahamut",
  "wyrm", "wyvern", "lindwurm", "cocatriz", "basilisco", "draconiano", "escamado",
  "rugido", "alas", "cuernos", "espada", "armadura", "aventura", "epico",
  "fantasia", "reino-fantasia", "castillo", "bosque", "mistico", "criatura",
  "mito-dragon", "cultura", "oriental", "occidental", "simbolo", "poder",
  "sabiduria", "codicia", "despertar", "dormido", "desafio", "profecia",
  "dragon-chino", "dragon-europeo", "dragon-japones", "dragon-coreano", "dragon-vietnamita"
];


const images = [
  "dragon.png",
  "dragon2.png",
  "dragon3.png",
  "dragon4.png",
  "dragon5.png",
  "dragon6.png",
  "dragon7.png",
  "dragon8.png",
  "dragon9.png",
  "dragon10.png",
  "dragon11.png",
  "dragon12.png",
  "dragon13.png",
  "dragon14.png",
  "dragon15.png",
  "dragonmar16.png",
  "dragonmar17.png",
  "dragonegipto18.png",
  "dragonegipto19.png",
  "dragonchino20.png",
  "dragonchino21.png",
  "dragonwar22.png",
  "dragontormenta23.png",
  "dragonlava24.png",
  "dragonlava25.png",
  "dragonlava26.png",
  "dragonwar27.png",
  "dragonwar28.png",
];

function getRandomImage() {
  const file = images[Math.floor(Math.random() * images.length)];
  return `/imagenes/${file}`;
}


// Reemplaza la función getRandomWord() así en App.tsx
function getRandomWord() {
  const filtered = PALABRAS.filter(p => /^[a-z]+$/.test(p)); // Solo letras minúsculas sin símbolos
  return filtered[Math.floor(Math.random() * filtered.length)];
}


function App() {
  const [word, setWord] = useState(getRandomWord);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [image, setImage] = useState(getRandomImage);
  const [gameEnded, setGameEnded] = useState(false);

  const wrongGuesses = guessed.filter(l => !word.includes(l));
  const isLoser = wrongGuesses.length >= 9;
  const isWinner = word.split("").every(l => guessed.includes(l));

  // ✅ Audios optimizados
  const correctAudio = useMemo(() => new Audio(correctSound), []);
  const wrongAudio = useMemo(() => new Audio(wrongSound), []);
  const winAudio = useMemo(() => new Audio(winSound), []);
  const loseAudio = useMemo(() => new Audio(loseSound), []);

  useEffect(() => {
    if ((isWinner || isLoser) && !gameEnded) {
      setGameEnded(true);
      if (isWinner) {
        winAudio.play();
        const name = prompt("¡Ganaste! Ingresa tu nombre:");
        if (name) saveScore(name, "win");
      } else {
        loseAudio.play();
        const name = prompt(`Perdiste. La palabra era "${word}". Ingresa tu nombre:`);
        if (name) saveScore(name, "lose");
      }
    }
  }, [isWinner, isLoser, gameEnded, winAudio, loseAudio, word]);

  function handleGuess(letter: string) {
    if (guessed.includes(letter) || isWinner || isLoser) return;
    setGuessed([...guessed, letter]);

    if (word.includes(letter)) {
      correctAudio.play();
    } else {
      wrongAudio.play();
    }
  }

  function resetGame() {
    setGuessed([]);
    setWord(getRandomWord());
    setImage(getRandomImage());
    setGameEnded(false);
  }

  return (
    <div className="app text-center text-white bg-dark min-vh-100 p-4">
      <h1 className="mb-4">🐉 EL DRAGÓN EN LLAMAS  🔥</h1>
      <HangmanDrawing wrongGuesses={wrongGuesses.length} isLoser={isLoser} image={image} />
      <WordDisplay word={word} guessedLetters={guessed} />
      <Keyboard onGuess={handleGuess} guessed={guessed} disabled={isWinner || isLoser} />
      <FinalMessage result={isWinner ? "win" : isLoser ? "lose" : null} word={word} onReset={resetGame} />
      <Ranking />
    </div>
  );
}



interface Score {
  name: string;
  date: string;
  result: "win" | "lose";
}

function saveScore(name: string, result: "win" | "lose") {
  const score: Score = { name, result, date: new Date().toLocaleString() };
  const prev = JSON.parse(localStorage.getItem("ranking") || "[]");
  localStorage.setItem("ranking", JSON.stringify([...prev, score]));
}



export default App;