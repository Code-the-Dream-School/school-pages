// This is an example where you can use react to define components

import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="flex justify-center">
      <div className="prose border-black border rounded p-4">
        <p className="text-lg">A Little React</p>
        <p className="text-sm">
          As a Snack! This is a demo of dynamic client-side React should we
          encounter occasions that call for it.
        </p>
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
