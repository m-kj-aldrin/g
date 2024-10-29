import { formatSmallFloats } from "../util/numbers.js";
import Mat3 from "./mat3.js";
import Mat4 from "./mat4.js";

import { validateNonZero, validateNumber, validateRange, validateVector3 } from "./validation.js";

/**
 * Represents a three-dimensional vector.
 *
 * @class
 */
class Vec3 {
  /**
   * The x-component of the vector.
   * @type {number}
   */
  #x = 0;

  /**
   * The y-component of the vector.
   * @type {number}
   */
  #y = 0;

  /**
   * The z-component of the vector.
   * @type {number}
   */
  #z = 0;

  /**
   * Creates a new Vec3 instance.
   *
   * @constructor
   * @param {number} [x=0] - The x-component of the vector.
   * @param {number} [y=0] - The y-component of the vector.
   * @param {number} [z=0] - The z-component of the vector.
   * @throws {TypeError} If any of the provided components are not numbers.
   */
  constructor(x = 0, y = 0, z = 0) {
    if (x !== undefined) this.x = x;
    if (y !== undefined) this.y = y;
    if (z !== undefined) this.z = z;
  }

  /**
   * Gets the x-component of the vector.
   *
   * @type {number}
   * @readonly
   */
  get x() {
    return this.#x;
  }

  /**
   * Sets the x-component of the vector.
   *
   * @param {number} value - The new x-component value.
   * @throws {TypeError} If the provided value is not a number.
   */
  set x(value) {
    validateNumber(value, "x component");
    this.#x = value;
  }

  /**
   * Gets the y-component of the vector.
   *
   * @type {number}
   * @readonly
   */
  get y() {
    return this.#y;
  }

  /**
   * Sets the y-component of the vector.
   *
   * @param {number} value - The new y-component value.
   * @throws {TypeError} If the provided value is not a number.
   */
  set y(value) {
    validateNumber(value, "y component");
    this.#y = value;
  }

  /**
   * Gets the z-component of the vector.
   *
   * @type {number}
   * @readonly
   */
  get z() {
    return this.#z;
  }

  /**
   * Sets the z-component of the vector.
   *
   * @param {number} value - The new z-component value.
   * @throws {TypeError} If the provided value is not a number.
   */
  set z(value) {
    validateNumber(value, "z component");
    this.#z = value;
  }

  /**
   * Adds another vector to this vector.
   *
   * @param {Vec3} vector - The vector to add.
   * @returns {Vec3} The updated vector instance.
   * @throws {TypeError} If the provided vector is not an instance of Vec3.
   */
  add(vector) {
    validateVector3(vector);
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    return this;
  }

  /**
   * Subtracts another vector from this vector.
   *
   * @param {Vec3} vector - The vector to subtract.
   * @returns {Vec3} The updated vector instance.
   * @throws {TypeError} If the provided vector is not an instance of Vec3.
   */
  subtract(vector) {
    validateVector3(vector);
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    return this;
  }

  /**
   * Multiplies this vector by a scalar.
   *
   * @param {number} scalar - The scalar to multiply by.
   * @returns {Vec3} The updated vector instance.
   * @throws {TypeError} If the provided scalar is not a number.
   */
  multiplyScalar(scalar) {
    validateNumber(scalar, "scalar");
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  /**
   * Divides this vector by a scalar.
   *
   * @param {number} scalar - The scalar to divide by.
   * @returns {Vec3} The updated vector instance.
   * @throws {TypeError} If the provided scalar is not a number.
   * @throws {Error} If attempting to divide by zero.
   */
  divideScalar(scalar) {
    validateNumber(scalar, "scalar");
    if (scalar === 0) {
      throw new Error("Cannot divide by zero");
    }
    this.x /= scalar;
    this.y /= scalar;
    this.z /= scalar;
    return this;
  }

  /**
   * Clamps each component of the vector within the specified minimum and maximum values.
   *
   * @param {Vec3} min - The minimum bounds for each component.
   * @param {Vec3} max - The maximum bounds for each component.
   * @returns {Vec3} The clamped vector instance.
   * @throws {TypeError} If either `min` or `max` is not an instance of `Vec3`.
   */
  clamp(min, max) {
    validateVector3(min);
    validateVector3(max);
    this.x = Math.min(Math.max(this.x, min.x), max.x);
    this.y = Math.min(Math.max(this.y, min.y), max.y);
    this.z = Math.min(Math.max(this.z, min.z), max.z);
    return this;
  }

  /**
   * Computes the component-wise minimum of this vector and another vector.
   *
   * @param {Vec3} vector - The vector to compare with.
   * @returns {Vec3} The vector with the minimum components.
   * @throws {TypeError} If the provided vector is not an instance of Vec3.
   */
  min(vector) {
    validateVector3(vector);
    this.x = Math.min(this.x, vector.x);
    this.y = Math.min(this.y, vector.y);
    this.z = Math.min(this.z, vector.z);
    return this;
  }

  /**
   * Computes the component-wise maximum of this vector and another vector.
   *
   * @param {Vec3} vector - The vector to compare with.
   * @returns {Vec3} The vector with the maximum components.
   * @throws {TypeError} If the provided vector is not an instance of Vec3.
   */
  max(vector) {
    validateVector3(vector);
    this.x = Math.max(this.x, vector.x);
    this.y = Math.max(this.y, vector.y);
    this.z = Math.max(this.z, vector.z);
    return this;
  }

  /**
   * Linearly interpolates between this vector and another vector by a factor t.
   *
   * @param {Vec3} vector - The target vector to interpolate towards.
   * @param {number} t - The interpolation factor (0 ≤ t ≤ 1).
   * @returns {Vec3} The interpolated vector instance.
   * @throws {TypeError} If the provided vector is not an instance of Vec3 or if t is not a number.
   * @throws {RangeError} If t is not between 0 and 1.
   */
  lerp(vector, t) {
    validateVector3(vector);
    validateNumber(t, "interpolation factor");
    validateRange(t, { msg: "Interpolation factor t" });

    this.x += (vector.x - this.x) * t;
    this.y += (vector.y - this.y) * t;
    this.z += (vector.z - this.z) * t;
    return this;
  }

  /**
   * Determines whether this vector is equal to another vector.
   *
   * @param {Vec3} vector - The vector to compare with.
   * @returns {boolean} True if all components are equal; otherwise, false.
   * @throws {TypeError} If the provided vector is not an instance of Vec3.
   */
  equals(vector) {
    validateVector3(vector);
    return this.x === vector.x && this.y === vector.y && this.z === vector.z;
  }

  /**
   * Transforms this vector using a 3x3 or 4x4 matrix.
   *
   * - If a `Mat3` is provided, the vector is treated as a direction vector (w=0).
   * - If a `Mat4` is provided, the vector is treated as a point vector (w=1).
   *
   * @param {Mat3|Mat4} matrix - The matrix to apply the transformation.
   * @returns {Vec3} The transformed vector instance.
   * @throws {TypeError} If the provided matrix is not an instance of `Mat3` or `Mat4`.
   */
  transform(matrix) {
    if (matrix instanceof Mat3) {
      const e = matrix.elements;

      const tX = e[0] * this.x + e[3] * this.y + e[6] * this.z;
      const tY = e[1] * this.x + e[4] * this.y + e[7] * this.z;
      const tZ = e[2] * this.x + e[5] * this.y + e[8] * this.z;

      this.x = tX;
      this.y = tY;
      this.z = tZ;
    } else if (matrix instanceof Mat4) {
      const e = matrix.elements;

      const tX = e[0] * this.x + e[4] * this.y + e[8] * this.z + e[12] * 1;
      const tY = e[1] * this.x + e[5] * this.y + e[9] * this.z + e[13] * 1;
      const tZ = e[2] * this.x + e[6] * this.y + e[10] * this.z + e[14] * 1;
      const tW = e[3] * this.x + e[7] * this.y + e[11] * this.z + e[15] * 1;

      if (tW !== 1 && tW !== 0) {
        this.x = tX / tW;
        this.y = tY / tW;
        this.z = tZ / tW;
      } else {
        this.x = tX;
        this.y = tY;
        this.z = tZ;
      }
    } else {
      throw new TypeError("Matrix must be an instance of Mat3 or Mat4");
    }

    return this;
  }

  /**
   * Creates a duplicate of this vector.
   *
   * @returns {Vec3} A new `Vec3` instance with identical components.
   */
  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  /**
   * Returns a string representation of the vector.
   *
   * @returns {string} A string formatted as "Vec3(x, y, z)".
   */
  toString() {
    return `Vec3(${formatSmallFloats(this.x)}, ${formatSmallFloats(this.y)}, ${formatSmallFloats(
      this.z
    )})`;
  }

  /**
   * Computes the dot product of this vector with another vector.
   *
   * The dot product is a scalar representing the product of the vectors' magnitudes
   * and the cosine of the angle between them.
   *
   * @param {Vec3} vector - The vector to compute the dot product with.
   * @returns {number} The dot product of the two vectors.
   * @throws {TypeError} If the provided vector is not an instance of Vec3.
   */
  dot(vector) {
    validateVector3(vector);
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  /**
   * Computes the cross product of this vector with another vector.
   *
   * The cross product results in a vector that is perpendicular to both original vectors,
   * following the right-hand rule.
   *
   * @param {Vec3} vector - The vector to compute the cross product with.
   * @returns {Vec3} The updated vector instance after the cross product.
   * @throws {TypeError} If the provided vector is not an instance of Vec3.
   */
  cross(vector) {
    validateVector3(vector);
    const crossX = this.y * vector.z - this.z * vector.y;
    const crossY = this.z * vector.x - this.x * vector.z;
    const crossZ = this.x * vector.y - this.y * vector.x;
    this.x = crossX;
    this.y = crossY;
    this.z = crossZ;
    return this;
  }

  /**
   * Normalizes the vector to have a length of 1.
   *
   * @returns {Vec3} The normalized vector instance.
   * @throws {Error} If attempting to normalize a vector with zero length.
   */
  normalize() {
    const len = this.length;
    validateNonZero(len, "Cannot normalize a zero length vector");

    this.x /= len;
    this.y /= len;
    this.z /= len;
    return this;
  }

  /**
   * Calculates the Euclidean distance between this vector and another vector.
   *
   * @param {Vec3} vector - The vector to calculate the distance to.
   * @returns {number} The Euclidean distance between the two vectors.
   * @throws {TypeError} If the provided vector is not an instance of Vec3.
   */
  distanceTo(vector) {
    validateVector3(vector);
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    const dz = this.z - vector.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Gets the length (magnitude) of the vector.
   *
   * @type {number}
   * @readonly
   */
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * Sets the length (magnitude) of the vector.
   *
   * @param {number} newLength - The desired length of the vector.
   * @throws {Error} If attempting to set the length of a vector with zero length.
   */
  set length(newLength) {
    const currentLength = this.length;

    validateNonZero(currentLength, "Cannot set length of a zero vector");

    const scale = newLength / currentLength;

    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
  }

  // Static methods

  /**
   * Adds two vectors and returns a new vector without modifying the originals.
   *
   * @param {Vec3} a - The first vector.
   * @param {Vec3} b - The second vector.
   * @returns {Vec3} A new `Vec3` instance representing the sum.
   * @throws {TypeError} If either `a` or `b` is not an instance of `Vec3`.
   */
  static add(a, b) {
    validateVector3(a);
    validateVector3(b);
    return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  /**
   * Subtracts the second vector from the first and returns a new vector without modifying the originals.
   *
   * @param {Vec3} a - The vector to subtract from.
   * @param {Vec3} b - The vector to subtract.
   * @returns {Vec3} A new `Vec3` instance representing the difference.
   * @throws {TypeError} If either `a` or `b` is not an instance of `Vec3`.
   */
  static subtract(a, b) {
    validateVector3(a);
    validateVector3(b);
    return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  /**
   * Multiplies a vector by a scalar and returns a new vector without modifying the original.
   *
   * @param {Vec3} vector - The vector to multiply.
   * @param {number} scalar - The scalar to multiply by.
   * @returns {Vec3} A new `Vec3` instance representing the scaled vector.
   * @throws {TypeError} If the provided vector is not an instance of `Vec3` or if the scalar is not a number.
   */
  static multiplyScalar(vector, scalar) {
    validateVector3(vector);
    validateNumber(scalar, "scalar");

    return new Vec3(vector.x * scalar, vector.y * scalar, vector.z * scalar);
  }

  /**
   * Computes the dot product of two vectors.
   *
   * @param {Vec3} a - The first vector.
   * @param {Vec3} b - The second vector.
   * @returns {number} The dot product of vectors `a` and `b`.
   * @throws {TypeError} If either `a` or `b` is not an instance of `Vec3`.
   */
  static dot(a, b) {
    validateVector3(a);
    validateVector3(b);
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  /**
   * Computes the cross product of two vectors and returns a new vector.
   *
   * The cross product results in a vector that is perpendicular to both original vectors,
   * following the right-hand rule.
   *
   * @param {Vec3} a - The first vector.
   * @param {Vec3} b - The second vector.
   * @returns {Vec3} A new `Vec3` instance representing the cross product.
   * @throws {TypeError} If either `a` or `b` is not an instance of `Vec3`.
   */
  static cross(a, b) {
    validateVector3(a);
    validateVector3(b);
    const crossX = a.y * b.z - a.z * b.y;
    const crossY = a.z * b.x - a.x * b.z;
    const crossZ = a.x * b.y - a.y * b.x;
    return new Vec3(crossX, crossY, crossZ);
  }

  /**
   * Linearly interpolates between two vectors by a factor t and returns a new vector.
   *
   * @param {Vec3} a - The starting vector.
   * @param {Vec3} b - The ending vector.
   * @param {number} t - The interpolation factor (0 ≤ t ≤ 1).
   * @returns {Vec3} A new `Vec3` instance representing the interpolated vector.
   * @throws {TypeError} If either `a` or `b` is not an instance of `Vec3` or if `t` is not a number.
   * @throws {RangeError} If `t` is not between 0 and 1.
   */
  static lerp(a, b, t) {
    validateVector3(a);
    validateVector3(b);
    validateNumber(t, "interpolation factor");
    validateRange(t, { msg: "Interpolation factor t" });

    return new Vec3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
  }

  /**
   * Creates a new vector by applying a transformation matrix to an existing vector.
   *
   * - If a `Mat3` is provided, the vector is treated as a direction vector (w=0).
   * - If a `Mat4` is provided, the vector is treated as a point vector (w=1).
   *
   * @param {Vec3} vector - The vector to transform. Must be an instance of `Vec3`.
   * @param {Mat3|Mat4} matrix - The matrix to apply the transformation.
   * @returns {Vec3} A new `Vec3` instance representing the transformed vector.
   * @throws {TypeError} If the provided vector is not an instance of `Vec3` or if the matrix is not an instance of `Mat3` or `Mat4`.
   */
  static fromTransform(vector, matrix) {
    validateVector3(vector);
    return vector.clone().transform(matrix);
  }
}

export default Vec3;
