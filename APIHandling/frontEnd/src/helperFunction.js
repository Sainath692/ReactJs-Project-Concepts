/**
 * @param {function} func
 * @param {number} delay
 * @returns
 */

export function debounce(mainFunction, delay) {
  let timeFlag;

  return (...args) => {
    if (timeFlag) {
      clearTimeout(timeFlag);
    }
    timeFlag = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
}
