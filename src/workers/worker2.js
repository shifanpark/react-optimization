// worker.js
onmessage = function (event) {
  console.log('Second workier :', event.data);

  // Perform some computation
  const result = event.data;

  // Send the result back to the main thread
  postMessage(result);
};
