import { validateNumber, validateVector2, validateMat2, validateArray } from "./validation.js";

import Vec2 from "./vec2.js";

class Mat2 {
  #elements = new Float32Array(4);

  /**
   * @param {...number} elements
   */
  constructor(...elements) {
    if (elements.length) {
      this.elements = elements;
    } else {
      this.#identity();
    }
  }

  get elements() {
    return this.#elements;
  }

  /**
   * Sets the elements of the matrix. Elements should be provided in row-major order.
   * @param {Float32Array | number[]} elements - Matrix elements in row-major order.
   */
  set elements(elements) {
    validateArray(elements, 4, "elements");

    for (let i = 0; i < 4; i++) {
      validateNumber(elements[i], `Element at index ${i}`);

      const col = i % 2;
      const row = Math.floor(i / 2);
      this.#elements[i] = elements[col * 2 + row];
    }
  }

  /**
   * Initializes the matrix to the identity matrix.
   */
  #identity() {
    this.#elements.fill(0);
    this.#elements[0] = 1;
    this.#elements[3] = 1;
  }

  /**
   * Multiplies this matrix by another Mat2.
   * @param {Mat2} other - The matrix to multiply with.
   * @returns {Mat2} This instance for chaining.
   */
  multiply(other) {
    validateMat2(other, "other matrix");

    const a = this.#elements;
    const b = other.#elements;
    const result = new Float32Array(4);

    // Perform matrix multiplication
    // Row 0
    result[0] = a[0] * b[0] + a[2] * b[1];
    result[1] = a[1] * b[0] + a[3] * b[1];
    // Row 1
    result[2] = a[0] * b[2] + a[2] * b[3];
    result[3] = a[1] * b[2] + a[3] * b[3];

    this.#elements = result;
    return this;
  }

  /**
   * Returns a string representation of the matrix.
   * @returns {string} String representation of the matrix.
   */
  toString() {
    let str = "";
    for (let row = 0; row < 2; row++) {
      str += "| ";
      for (let col = 0; col < 2; col++) {
        str += this.#elements[col * 2 + row].toFixed(2) + " ";
      }
      str += "|\n";
    }
    return str;
  }

  /* Static methods */

  /**
   * Multiplies multiple matrices and returns a new Mat2.
   * @param  {...Mat2} matrices - Matrices to multiply.
   * @returns {Mat2} The resulting matrix.
   */
  static multiply(...matrices) {
    if (matrices.length === 0) {
      throw new Error("At least one matrix must be provided for multiplication.");
    }

    const result = matrices.reduce((r, m) => r.multiply(m), new Mat2());
    return result;
  }

  /**
   * Creates a scaling matrix based on a 2D vector.
   * @param {Vec2} vector - 2D vector.
   * @returns {Mat2} A new scaling matrix.
   */
  static fromScaling(vector) {
    validateVector2(vector);

    const { x, y } = vector;

    return new Mat2(x, 0, 0, y);
  }

  /**
   * Creates a rotation matrix based on an angle.
   * @param {number} angle - Angle in radians.
   * @returns {Mat2} A new rotation matrix.
   */
  static fromRotation(angle) {
    validateNumber(angle, "angle");

    const c = Math.cos(angle);
    const s = Math.sin(angle);

    // return new Mat2(c, s, -s, c);
    return new Mat2(c, -s, s, c);
  }

  /* Additional utility methods can be added here as needed */
}

export default Mat2;
