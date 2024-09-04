/**
 * @param {function} mainFunction
 * @param {number} delay
 * @returns
 */

export function debounce(mainFunction, delay) {
  let timeFlag = null;

  return (...args) => {
    if (timeFlag === null) {
      timeFlag = setTimeout(() => {
        mainFunction(...args);
        timeFlag = null;
      }, delay);
    }
  };
}
