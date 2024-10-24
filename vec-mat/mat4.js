import {
  validateNumber,
  validateVector3,
  validateMat4,
  validateArray,
  getVectorComponents3,
} from "./validation.js";

import Vec3 from "./vec3.js";

class Mat4 {
  #elements = new Float32Array(16);

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
   * Sets the elements of the matrix, elements should be written in row-major
   * @param {Float32Array | number[]} elements matrix elements in row-major
   */
  set elements(elements) {
    validateArray(elements, "elements");

    for (let i = 0; i < 16; i++) {
      validateNumber(elements[i], `Element at index ${i}`);

      let cri = (i % 4) * 4 + Math.floor(i / 4);
      this.#elements[i] = elements[cri];
    }
  }

  #identity() {
    this.#elements.fill(0);
    this.#elements[0] = 1;
    this.#elements[5] = 1;
    this.#elements[10] = 1;
    this.#elements[15] = 1;
  }

  /**
   * Multiplies this matrix by another Mat4.
   * @param {Mat4} other - The matrix to multiply with.
   * @returns {Mat4} This instance for chaining.
   */
  multiply(other) {
    validateMat4(other, "other matrix");

    const a = this.#elements;
    const b = other.#elements;
    const result = new Float32Array(16);

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        result[col * 4 + row] =
          a[0 * 4 + row] * b[col * 4 + 0] +
          a[1 * 4 + row] * b[col * 4 + 1] +
          a[2 * 4 + row] * b[col * 4 + 2] +
          a[3 * 4 + row] * b[col * 4 + 3];
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
    for (let row = 0; row < 4; row++) {
      str += "| ";
      for (let col = 0; col < 4; col++) {
        str += this.#elements[col * 4 + row].toFixed(2) + " ";
      }
      str += "|\n";
    }
    return str;
  }

  /* static methods */

  /**
   * Multiplies matries returning a new matrix
   * @param  {...Mat4} matrices
   * @returns matrix result
   */
  static multiply(...matrices) {
    const result = matrices.reduce((r, m) => r.multiply(m), new Mat4());
    return result;
  }

  /* - - scaling, rotation & translation matrices - - */

  /**
   * Returns a scaling matrix based on a 3d vector
   * @param {Vec3 | [number,number,number]} vector 3d vector
   * @returns A new matrix
   */
  static fromScaling(vector) {
    validateVector3(vector);

    let { x, y, z } = getVectorComponents3(vector);

    return new Mat4(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
  }

  /**
   * Returns a rotation matrix based on a 3d vector and a angle
   * @param {Vec3 | [number,number,number]} vector 3d vector
   * @param {number} angle angle in radians
   * @returns A new matrix
   */
  static fromAxisAngle(vector, angle) {
    validateNumber(angle, "angle");
    validateVector3(vector);

    let { x, y, z } = getVectorComponents3(vector);

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

    const rot = new Mat4(
      t * nx * nx + c,
      t * nx * ny - s * nz,
      t * nx * nz + s * ny,
      0,
      t * nx * ny + s * nz,
      t * ny * ny + c,
      t * ny * nz - s * nx,
      0,
      t * nx * nz - s * ny,
      t * ny * nz + s * nx,
      t * nz * nz + c,
      0,
      0,
      0,
      0,
      1
    );
    return rot;
  }

  /**
   * Returns a translation matrix based on a 3d vector
   * @param {Vec3 | [number,number,number]} vector 3d vector
   * @returns A new matrix
   */
  static fromTranslation(vector) {
    validateVector3(vector);
    let { x, y, z } = getVectorComponents3(vector);

    return new Mat4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
  }

  /* - - scaling, rotation & translation matrices - - */
}

export default Mat4;
