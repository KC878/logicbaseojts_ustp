'use client'

import { useRef } from "react";

const MyComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputRef.current) {
      alert(`Input Value: ${inputRef.current.value}`);
    }
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyComponent;
