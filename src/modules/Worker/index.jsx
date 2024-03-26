// MyComponent.js
import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

import WorkerFactory from '../../workers/WorkerFactory';
import myWorker from '../../workers/myWorker.worker';

const MyComponent = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [normalResult, setNormalResult] = useState(null);
  const [fibonacciCount, setFibonacciCount] = useState(0);

  useEffect(() => {
    // Create a new web worker
    // const myWorker = new WebWorker(worker);
    if (isLoading) {
      const workerInstance = new WorkerFactory(myWorker);

      workerInstance.postMessage({ iterations: 42 }); // Send the number 5 to the worker

      // Set up event listener for messages from the worker

      workerInstance.onmessage = function (event) {
        console.log('Received result from worker:', event.data);
        setResult(event.data);
        workerInstance.terminate();
        setIsLoading(false);
      };

      return () => {
        workerInstance.terminate();
      };
    }

    // Clean up the worker when the component unmounts
  }, [isLoading]); // Run this effect only once when the component mounts

  const handleClick = () => {
    // Send a message to the worker

    setIsLoading(true);
  };

  const fibonacci = (n) => {
    if (n <= 1) {
      return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  const handleNormally = () => {
    const result = fibonacci(45);
    setNormalResult(result);
  };

  const setCount = debounce((e) => {
    console.log(e);
    console.log(e.target.value);
    setFibonacciCount(e.target.value);
  }, 400);

  // Handle multiple workers

  // const workerPool = [];
  // let nextWorkerIndex = 0;

  // function initializeWorkerPool(size) {
  //   for (let i = 0; i < size; i++) {
  //     const worker = new Worker('worker-task.js');
  //     workerPool.push(worker);
  //     worker.onmessage = handleWorkerMessage;
  //   }
  // }

  // // Handle incoming task
  // function handleTask(taskData) {
  //   const workerIndex = nextWorkerIndex % workerPool.length;
  //   const worker = workerPool[workerIndex];
  //   worker.postMessage(taskData);
  //   nextWorkerIndex++;
  // }

  // function handleWorkerMessage(event) {
  //   console.log('Received result:', event.data);
  // }

  // initializeWorkerPool(4);

  // const taskData = { fibonancyCount: 20 };
  // handleTask(taskData);

  return (
    <div>
      <input onChange={setCount} />
      <p>Result from the worker: {!isLoading ? result : 'Loading...'}</p>
      <p>Result from normal: {normalResult}</p>
      <button onClick={handleClick}>Calculate in Web Worker</button>
      <button onClick={handleNormally}>Calculate normally</button>
    </div>
  );
};

export default MyComponent;
