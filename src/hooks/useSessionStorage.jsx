import { useState, useEffect } from 'react';

const useSessionStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const savedValue = sessionStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;