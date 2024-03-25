// MyComponent.js
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [result, setResult] = useState(null);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    // Create a new web worker
    const myWorker = new window.Worker('../../workers/index.js');

    // Set up event listener for messages from the worker
    myWorker.onmessage = function (event) {
      console.log('Received result from worker:', event.data);
      setResult(event.data);
    };

    // Save the worker instance to state
    setWorker(myWorker);

    // Clean up the worker when the component unmounts
    return () => {
      myWorker.terminate();
    };
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    // Create a new web worker
    const myWorker2 = new window.Worker('../../workers/worker2.js');

    // Set up event listener for messages from the worker
    myWorker2.onmessage = function (event) {
      console.log('Received result from worker:', event.data);
      setResult(event.data);
    };

    // Save the worker instance to state
    setWorker(myWorker2);

    // Clean up the worker when the component unmounts
    return () => {
      myWorker2.terminate();
    };
  }, []);

  const handleClick = () => {
    // Send a message to the worker
    if (worker) {
      worker.postMessage(5); // Send the number 5 to the worker
    }
  };

  return (
    <div>
      <p>Result from the worker: {result}</p>
      <button onClick={handleClick}>Calculate in Web Worker</button>
    </div>
  );
};

export default MyComponent;
