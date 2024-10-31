/**
 * Multiplies equal sized square matrices
 *
 * @param {Float32Array} a matrix a
 * @param {Float32Array} b matrix b
 * @param {number} size
 */
function multiply_by_matrix(a, b, size) {
  let result = new Float32Array(size ** 2);

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      let sum = 0;

      for (let k = 0; k < size; k++) {
        let aval = a[row + size * k];
        let bval = b[col * size + k];

        sum += aval * bval;
      }

      result[col * size + row] = sum;
    }
  }

  return result;
}

export { multiply_by_matrix };
