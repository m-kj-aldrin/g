/** @param {number} num */
export function formatSmallFloats(num) {
  return Math.abs(num) < 1e-10 ? 0 : num;
}
