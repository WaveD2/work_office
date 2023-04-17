export const debounce = (fn: Function, delay: number) => {
  delay = delay || 0;
  let timerId: any;
  return () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    timerId = setTimeout(() => {
      fn();
    }, delay);
  };
};
