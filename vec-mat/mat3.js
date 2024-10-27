import {
  validateNumber,
  validateVector3,
  validateMat3,
  validateArray,
  validateVector2,
} from "./validation.js";
import Vec2 from "./vec2.js";

import Vec3 from "./vec3.js";

class Mat3 {
  #elements = new Float32Array(9);

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
    validateArray(elements, 9, "elements");

    for (let i = 0; i < 9; i++) {
      validateNumber(elements[i], `Element at index ${i}`);

      const col = i % 3;
      const row = Math.floor(i / 3);
      this.#elements[i] = elements[col * 3 + row];
    }
  }

  /**
   * Initializes the matrix to the identity matrix.
   */
  #identity() {
    this.#elements.fill(0);
    this.#elements[0] = 1;
    this.#elements[4] = 1;
    this.#elements[8] = 1;
  }

  /**
   * Multiplies this matrix by another Mat3.
   * @param {Mat3} other - The matrix to multiply with.
   * @returns {Mat3} This instance for chaining.
   */
  multiply(other) {
    validateMat3(other, "other matrix");

    const a = this.#elements;
    const b = other.#elements;
    const result = new Float32Array(9);

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        result[col * 3 + row] =
          a[0 * 3 + row] * b[col * 3 + 0] +
          a[1 * 3 + row] * b[col * 3 + 1] +
          a[2 * 3 + row] * b[col * 3 + 2];
      }
    }

    this.#elements = result;
    return this;
  }

  /**
   * Returns a string representation of the matrix.
   * @returns {string} String representation of the matrix.
   */
  toString() {
    let str = "";
    for (let row = 0; row < 3; row++) {
      str += "| ";
      for (let col = 0; col < 3; col++) {
        str += this.#elements[col * 3 + row].toFixed(2) + " ";
      }
      str += "|\n";
    }
    return str;
  }

  /* Static methods */

  /**
   * Multiplies multiple matrices and returns a new Mat3.
   * @param  {...Mat3} matrices - Matrices to multiply.
   * @returns {Mat3} The resulting matrix.
   */
  static multiply(...matrices) {
    if (matrices.length === 0) {
      throw new Error("At least one matrix must be provided for multiplication.");
    }

    const result = matrices.reduce((r, m) => r.multiply(m), new Mat3());
    return result;
  }

  /**
   * Creates a scaling matrix based on a 3D vector.
   * @param {Vec3} vector - 3D vector.
   * @returns {Mat3} A new scaling matrix.
   */
  static fromScaling(vector) {
    validateVector3(vector);

    const { x, y, z } = vector;

    return new Mat3(x, 0, 0, 0, y, 0, 0, 0, z);
  }

  /**
   * Creates a rotation matrix based on an axis and an angle.
   * @param {Vec3} vector - 3D vector representing the rotation axis.
   * @param {number} angle - Angle in radians.
   * @returns {Mat3} A new rotation matrix.
   */
  static fromAxisAngle(vector, angle) {
    validateNumber(angle, "angle");
    validateVector3(vector);

    const { x, y, z } = vector;

    const len = Math.hypot(x, y, z);

    if (len === 0) {
      throw new Error("Cannot rotate around a zero-length axis.");
    }

    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const t = 1 - c;

    const nx = x / len;
    const ny = y / len;
    const nz = z / len;

    return new Mat3(
      t * nx * nx + c,
      t * nx * ny - s * nz,
      t * nx * nz + s * ny,
      t * nx * ny + s * nz,
      t * ny * ny + c,
      t * ny * nz - s * nx,
      t * nx * nz - s * ny,
      t * ny * nz + s * nx,
      t * nz * nz + c
    );
  }

  /**
   * Returns a translation matrix based on a 3D vector
   * @param {Vec2} vector - 3D vector representing the translation
   * @returns {Mat3} A new translation matrix
   */
  static fromTranslation(vector) {
    validateVector2(vector);
    const { x, y } = vector;

    return new Mat3(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1);
  }
}

export default Mat3;
