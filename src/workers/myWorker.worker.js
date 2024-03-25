/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-restricted-globals */
export default () => {
  const fibonacci = (n) => {
    if (n <= 1) {
      return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  // const fibonacci = (n) => {
  //   let a = 0,
  //     b = 1;
  //   for (let i = 2; i <= n; i++) {
  //     const temp = a + b;
  //     a = b;
  //     b = temp;
  //   }
  //   return b;
  // };

  self.addEventListener('message', (event) => {
    const { iterations } = event.data;
    console.log('iterations', iterations);
    const result = fibonacci(iterations);
    self.postMessage(result);
  });
};
