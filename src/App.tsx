import { useEffect, useState } from 'react';
import WordDisplay from './components/WordDisplay';
import Keyboard from './components/Keyboard';
import HangmanDrawing from './components/HangmanDrawing';
import FinalMessage from './components/FinalMessage';
import Ranking from './components/Ranking';

import correctSound from './assets/correct.mp3';
import wrongSound from './assets/wrong.mp3';
import winSound from './assets/win.mp3';
import loseSound from './assets/lose.mp3';

const PALABRAS = ["javascript", "react", "tipado", "typescript", "componentes"];

function getRandomWord() {
  return PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
}

function App() {
  const [word, setWord] = useState(getRandomWord);
  const [guessed, setGuessed] = useState<string[]>([]);
  const wrongGuesses = guessed.filter(l => !word.includes(l));
  const isLoser = wrongGuesses.length >= 6;
  const isWinner = word.split("").every(l => guessed.includes(l));
  const [gameEnded, setGameEnded] = useState(false);

  const correctAudio = new Audio(correctSound);
  const wrongAudio = new Audio(wrongSound);
  const winAudio = new Audio(winSound);
  const loseAudio = new Audio(loseSound);

  useEffect(() => {
    if (isWinner && !gameEnded) {
      winAudio.play();
      setGameEnded(true);
      const name = prompt("¡Ganaste! Ingresa tu nombre:");
      if (name) saveScore(name, "win");
    }

    if (isLoser && !gameEnded) {
      loseAudio.play();
      setGameEnded(true);
      const name = prompt(`Perdiste. La palabra era "${word}". Ingresa tu nombre:`);
      if (name) saveScore(name, "lose");
    }
  }, [isWinner, isLoser]);

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
    setGameEnded(false);
  }

  return (
    <div className="app">
      <h1>Juego del Ahorcado</h1>
      <HangmanDrawing wrongGuesses={wrongGuesses.length} />
      <div className="fade-in">
        <WordDisplay word={word} guessedLetters={guessed} />
        <Keyboard onGuess={handleGuess} guessed={guessed} disabled={isWinner || isLoser} />
        <FinalMessage result={isWinner ? "win" : isLoser ? "lose" : null} word={word} onReset={resetGame} />
        <Ranking />
      </div>
    </div>
  );
}

export default App;

// 🔁 Lógica de puntuación local:
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
