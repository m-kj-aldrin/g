/** @param {number} num */
export function formatSmallFloats(num, fixed = 5) {
    return (Math.abs(num) < 1e-10 ? 0 : num).toFixed(fixed);
}
