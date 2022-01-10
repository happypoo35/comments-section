import { useState, useMemo } from "react";

const useBool = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const handlers = useMemo(
    () => ({
      value: state,
      on: () => {
        setState(true);
      },
      off: () => {
        setState(false);
      },
      toggle: () => {
        setState((p) => (p = !p));
      },
      reset: () => {
        setState(initialState);
      },
    }),
    [state, initialState]
  );

  return handlers;
};

export default useBool;
