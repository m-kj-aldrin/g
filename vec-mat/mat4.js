import Vec3 from "./vec3.js";

class Mat4 {
  #elements = new Float32Array(16);

  /**
   * @param {...number} elements
   */
  constructor(...elements) {
    if (elements.length) {
      this.fromArray(elements);
    } else {
      this.#identity();
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
   * @param {Float32Array | number[]} [array]
   */
  fromArray(array) {
    if (!Array.isArray(array) && !(array instanceof Float32Array)) {
      throw new TypeError('Parameter "array" must be an array of numbers.');
    }

    if (array.length !== 16) {
      throw new Error('Parameter "array" must have exactly 16 elements.');
    }

    for (let i = 0; i < 16; i++) {
      if (typeof array[i] !== "number") {
        throw new TypeError(`Element at index ${i} is not a number.`);
      }
      this.#elements[i] = array[i];
    }
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

  // static

  /**
   * @param {Vec3 | [number,number,number]} vector
   */
  static fromScaling(vector) {
    if (vector instanceof Vec3) {
      return new Mat4(vector.x, 0, 0, 0, 0, vector.y, 0, 0, 0, 0, vector.z, 0, 0, 0, 0, 1);
    }
    return new Mat4(vector[0], 0, 0, 0, 0, vector[1], 0, 0, 0, 0, vector[2], 0, 0, 0, 0, 1);
  }
  /**
   * @param {Vec3 | [number,number,number]} axis
   * @param {number} angle
   */
  static fromRotation(axis, angle) {
    if (typeof angle !== "number") {
      throw new TypeError('Parameter "angle" must be a number.');
    }
    if (!(axis instanceof Vec3) || !Array.isArray(axis)) {
      throw new TypeError('Parameter "axis" must be an instance of Vec3 or number[].');
    }

    const x = axis.x ?? axis[0] ?? 0;
    const y = axis.y ?? axis[1] ?? 0;
    const z = axis.z ?? axis[2] ?? 0;
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
   * @param {Vec3 | number} vecOrX
   * @param {number} Y
   * @param {number} Z
   */
  static fromTranslation(vecOrX, Y, Z) {
    if (vecOrX instanceof Vec3) {
      return new Mat4(1, 0, 0, vecOrX.x, 0, 1, 0, vecOrX.y, 0, 0, 1, vecOrX.z, 0, 0, 0, 1);
    }
    return new Mat4(1, 0, 0, vecOrX, 0, 1, 0, Y, 0, 0, 1, Z, 0, 0, 0, 1);
  }
}

export default Mat4;
