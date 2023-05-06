// This is an example where you can use react to define components

import { useState } from "react";

// Test type-checking in CI
const foo:null=`ouch`;

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="flex justify-center w-screen">
      <div className="prose border-black border rounded p-4">
        <p className="text-lg">A Little React</p>
        <p className="text-sm">As a Snack</p>
        <p>Count: {count}</p>
        <button
          className="bg-blue-200 p-2 rounded shadow"
          onClick={() => setCount(count + 1)}
        >
          Increment Count
        </button>
      </div>
    </div>
  );
};
