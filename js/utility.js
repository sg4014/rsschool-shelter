export function getRandomInteger(min, max) {
  /**
   * Returns a random integer from min (included) to max (not included).
   */
  return min + Math.floor( Math.random() * (max - min));
}

export function shuffleArray(arr) {
  /**
   * Shuffles the array in place.
   */
  let lastIndex = arr.length - 1;
  while (lastIndex > 0) {
    let randomIndex = getRandomInteger(0, lastIndex);
    [arr[randomIndex], arr[lastIndex]] = [arr[lastIndex], arr[randomIndex]];
    lastIndex--;
  }
}
