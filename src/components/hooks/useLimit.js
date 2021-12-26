import { useState } from 'react';

export const useLimit = (initialState) => {
  const [count, setCount] = useState(initialState);

  const increase = () => {
    setCount(count + 10);
  };

  const decrease = () => {
    if (count > 10) {
      setCount(count - 10);
    }
  };

  return [count, increase, decrease];
};
