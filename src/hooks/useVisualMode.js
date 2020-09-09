import { useState } from "react";

// Controls flow of state and transitions
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    !replace ? setHistory((prev) => [...prev, mode]) : setHistory([...history]);
    return setMode(mode);
  }

  function back() {
    const newHistory = [...history].slice(0, history.length - 1);

    if (newHistory.length >= 1) {
      setHistory(newHistory);
      setMode(history[history.length - 2]);
    }
  }

  return { mode, transition, back };
}
