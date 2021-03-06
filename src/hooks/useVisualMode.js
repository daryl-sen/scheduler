import { useState} from 'react';

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    if (replace) {
      setMode((prev) => {
        return newMode;
      })
      return;
    }
    setHistory([...history, newMode]);
    setMode(newMode);
  };

  const back = function() {
    const newHistory = [...history]
    if (newHistory.length > 1) {
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}