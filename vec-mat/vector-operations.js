/**
 * @param {Float32Array} elements
 * @param {number} scalar
 */
function multiply_by_scalar(elements, scalar) {
  return elements.map((e) => e * scalar);
}

/**
 *
 * @param {Float32Array} a_elements
 * @param {Float32Array} b_elements
 */
function multiply_by_vector(a_elements, b_elements) {
  return a_elements.map((a, i) => a * b_elements[i]);
}

/**
 *
 * @param {Float32Array} v
 * @param {Float32Array} m column-major
 * @param {boolean} homogenus set to true if a vector should be consider in homogenus coordinates - for example 3d vector = (x,y,z,1)
 *
 */
function multiply_by_matrix(v, m, homogenus = false) {
  let _v = v;
  let _s = _v.length;

  if (homogenus) _v = new Float32Array([...v, 1]);

  let s = _v.length;

  return _v.slice(0, _s).map((_, i) => {
    return _v.reduce((sum, e, j) => {
      return sum + e * m[s * j + i];
    }, 0);
  });
}

/**
 *
 * @param {Float32Array} v
 * @param {string} type_name
 */
function vector_repr(v, type_name = "") {
  let repr_string = v.join("  ");
  return `${type_name}(  ${repr_string}  )`;
}

export { multiply_by_matrix, multiply_by_scalar, multiply_by_vector, vector_repr };
