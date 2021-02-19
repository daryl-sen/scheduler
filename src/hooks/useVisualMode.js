import React, { useState} from 'react';

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
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}