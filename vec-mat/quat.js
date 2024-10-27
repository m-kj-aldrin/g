import Mat3 from "./mat3.js";
import {
  validateQuat,
  validateNonZero,
  validateNumber,
  validateRange,
  validateVector3,
} from "./validation.js";
import Vec3 from "./vec3.js";

/**
 * Represents a quaternion for handling rotations in a right-handed coordinate system.
 *
 * Quaternions are used to represent rotations without suffering from gimbal lock
 * and provide smooth interpolation between rotations.
 *
 * @class
 */
class Quat {
  /**
   * The scalar (real) component of the quaternion.
   * @type {number}
   */
  #w = 1;

  /**
   * The i component (x-axis) of the quaternion.
   * @type {number}
   */
  #i = 0;

  /**
   * The j component (y-axis) of the quaternion.
   * @type {number}
   */
  #j = 0;

  /**
   * The k component (z-axis) of the quaternion.
   * @type {number}
   */
  #k = 0;

  /**
   * Constructs a new Quat instance.
   *
   * @param {number} [w=1] - The scalar component.
   * @param {number} [i=0] - The i component.
   * @param {number} [j=0] - The j component.
   * @param {number} [k=0] - The k component.
   * @throws {TypeError} If any of the provided components are not numbers.
   */
  constructor(w = 1, i = 0, j = 0, k = 0) {
    this.w = w;
    this.i = i;
    this.j = j;
    this.k = k;
  }

  /**
   * Gets the scalar component of the quaternion.
   *
   * @type {number}
   * @readonly
   */
  get w() {
    return this.#w;
  }

  /**
   * Sets the scalar component of the quaternion.
   *
   * @param {number} value - The new scalar component value.
   * @throws {TypeError} If the provided value is not a number.
   */
  set w(value) {
    validateNumber(value, "w component of the quaternion");
    this.#w = value;
  }

  /**
   * Gets the i component of the quaternion.
   *
   * @type {number}
   * @readonly
   */
  get i() {
    return this.#i;
  }

  /**
   * Sets the i component of the quaternion.
   *
   * @param {number} value - The new i component value.
   * @throws {TypeError} If the provided value is not a number.
   */
  set i(value) {
    validateNumber(value, "i component of the quaternion");
    this.#i = value;
  }

  /**
   * Gets the j component of the quaternion.
   *
   * @type {number}
   * @readonly
   */
  get j() {
    return this.#j;
  }

  /**
   * Sets the j component of the quaternion.
   *
   * @param {number} value - The new j component value.
   * @throws {TypeError} If the provided value is not a number.
   */
  set j(value) {
    validateNumber(value, "j component of the quaternion");
    this.#j = value;
  }

  /**
   * Gets the k component of the quaternion.
   *
   * @type {number}
   * @readonly
   */
  get k() {
    return this.#k;
  }

  /**
   * Sets the k component of the quaternion.
   *
   * @param {number} value - The new k component value.
   * @throws {TypeError} If the provided value is not a number.
   */
  set k(value) {
    validateNumber(value, "k component of the quaternion");
    this.#k = value;
  }

  /**
   * Calculates the length (magnitude) of the quaternion.
   *
   * @type {number}
   * @readonly
   */
  get length() {
    return Math.sqrt(this.#w * this.#w + this.#i * this.#i + this.#j * this.#j + this.#k * this.#k);
  }

  /**
   * Normalizes the quaternion to have a length of 1.
   *
   * If the quaternion is a zero quaternion (length of 0), an error is thrown.
   *
   * @returns {Quat} The normalized quaternion (this instance).
   * @throws {Error} If attempting to normalize a zero-length quaternion.
   */
  normalize() {
    const len = this.length;
    validateNonZero(len, "Cannot normalize a zero length quaternion");

    this.#w /= len;
    this.#i /= len;
    this.#j /= len;
    this.#k /= len;
    return this;
  }

  /**
   * Conjugates the quaternion.
   *
   * The conjugate of a quaternion q = w + xi + yj + zk is q* = w - xi - yj - zk.
   *
   * @returns {Quat} This quaternion after conjugation (this instance).
   */
  conjugate() {
    this.#i *= -1;
    this.#j *= -1;
    this.#k *= -1;
    return this;
  }

  /**
   * Inverts the quaternion.
   *
   * The inverse of a quaternion q is q* / |q|², where q* is the conjugate of q.
   *
   * @returns {Quat} This quaternion after inversion (this instance).
   * @throws {Error} If the quaternion has zero length.
   */
  inverse() {
    const lenSq = this.length ** 2;
    validateNonZero(lenSq, "Cannot invert a zero length quaternion");

    this.conjugate();

    this.#w /= lenSq;
    this.#i /= lenSq;
    this.#j /= lenSq;
    this.#k /= lenSq;

    return this;
  }

  /**
   * Multiplies this quaternion by another quaternion.
   *
   * Quaternion multiplication is not commutative; the order matters.
   *
   * @param {Quat} other - The quaternion to multiply with.
   * @returns {Quat} This quaternion after multiplication (this instance).
   * @throws {TypeError} If the provided quaternion is not an instance of Quat.
   */
  multiply(other) {
    validateQuat(other, "other quaternion");

    const a = this.#w;
    const b = this.#i;
    const c = this.#j;
    const d = this.#k;

    const e = other.w;
    const f = other.i;
    const g = other.j;
    const h = other.k;

    this.#w = a * e - b * f - c * g - d * h;
    this.#i = a * f + b * e + c * h - d * g;
    this.#j = a * g - b * h + c * e + d * f;
    this.#k = a * h + b * g - c * f + d * e;

    return this;
  }

  /**
   * Calculates the dot product of this quaternion with another quaternion.
   *
   * The dot product is a measure of the similarity between two quaternions.
   *
   * @param {Quat} quat - The other quaternion.
   * @returns {number} The dot product of the two quaternions.
   * @throws {TypeError} If the provided quaternion is not an instance of Quat.
   */
  dot(quat) {
    validateQuat(quat, "quaternion");
    return this.#w * quat.w + this.#i * quat.i + this.#j * quat.j + this.#k * quat.k;
  }

  /**
   * Spherically interpolates between this quaternion and another quaternion by a factor t.
   *
   * Slerp provides smooth interpolation between two rotations.
   *
   * @param {Quat} quat - The target quaternion to interpolate towards.
   * @param {number} t - The interpolation factor (0 <= t <= 1).
   * @returns {Quat} This quaternion after interpolation (this instance).
   * @throws {TypeError} If quat is not an instance of Quat or if t is not a number.
   * @throws {RangeError} If t is not between 0 and 1.
   */
  slerp(quat, t) {
    validateQuat(quat, "quaternion");
    validateNumber(t, "interpolation factor");
    validateRange(t, { msg: "Interpolation factor t", min: 0, max: 1 });

    let cosHalfTheta = this.dot(quat);

    let targetQuat = quat;
    if (cosHalfTheta < 0) {
      targetQuat = new Quat(-quat.w, -quat.i, -quat.j, -quat.k);
      cosHalfTheta = -cosHalfTheta;
    }

    if (cosHalfTheta >= 1.0) {
      return this.clone();
    }

    const halfTheta = Math.acos(cosHalfTheta);
    const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    if (sinHalfTheta < 0.001) {
      this.#w = this.#w * 0.5 + targetQuat.#w * 0.5;
      this.#i = this.#i * 0.5 + targetQuat.#i * 0.5;
      this.#j = this.#j * 0.5 + targetQuat.#j * 0.5;
      this.#k = this.#k * 0.5 + targetQuat.#k * 0.5;
      this.normalize();

      return this;
    }

    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    this.#w = this.#w * ratioA + targetQuat.#w * ratioB;
    this.#i = this.#i * ratioA + targetQuat.#i * ratioB;
    this.#j = this.#j * ratioA + targetQuat.#j * ratioB;
    this.#k = this.#k * ratioA + targetQuat.#k * ratioB;

    return this;
  }

  /**
   * Converts the quaternion to a 3x3 rotation matrix.
   *
   * @returns {Mat3} A new Mat3 instance representing the rotation.
   */
  toMat3() {
    const { w, i, j, k } = this;
    const wx = w * i;
    const wy = w * j;
    const wz = w * k;
    const xx = i * i;
    const xy = i * j;
    const xz = i * k;
    const yy = j * j;
    const yz = j * k;
    const zz = k * k;

    return new Mat3(
      1 - 2 * (yy + zz),
      2 * (xy - wz),
      2 * (xz + wy),
      2 * (xy + wz),
      1 - 2 * (xx + zz),
      2 * (yz - wx),
      2 * (xz - wy),
      2 * (yz + wx),
      1 - 2 * (xx + yy)
    );
  }

  /**
   * Creates a clone of this quaternion.
   *
   * @returns {Quat} A new Quat instance with the same components as this quaternion.
   */
  clone() {
    return new Quat(this.#w, this.#i, this.#j, this.#k);
  }

  /**
   * Checks if this quaternion is equal to another quaternion.
   *
   * @param {Quat} quat - The other quaternion to compare with.
   * @returns {boolean} True if all components are equal, otherwise false.
   * @throws {TypeError} If the provided quaternion is not an instance of Quat.
   */
  equals(quat) {
    validateQuat(quat, "quaternion");
    return this.#w === quat.w && this.#i === quat.i && this.#j === quat.j && this.#k === quat.k;
  }

  /**
   * Returns a string representation of the quaternion.
   *
   * @returns {string} A string in the format "Quat(w, i, j, k)".
   */
  toString() {
    return `Quat(${this.#w}, ${this.#i}, ${this.#j}, ${this.#k})`;
  }

  /**
   * Creates a quaternion from an axis-angle representation.
   *
   * @param {Vec3} axis - The axis of rotation (should be a normalized vector).
   * @param {number} angle - The angle of rotation in radians.
   * @returns {Quat} A new quaternion representing the rotation.
   * @throws {TypeError} If axis is not a Vec3 instance or angle is not a number.
   * @throws {Error} If the axis vector is zero-length.
   */
  static fromAxisAngle(axis, angle) {
    validateVector3(axis, "axis");
    validateNumber(angle, "angle");

    const halfAngle = angle / 2;
    const sinHalfAngle = Math.sin(halfAngle);

    const normalizedAxis = axis.clone().normalize();

    return new Quat(
      Math.cos(halfAngle),
      normalizedAxis.x * sinHalfAngle,
      normalizedAxis.y * sinHalfAngle,
      normalizedAxis.z * sinHalfAngle
    ).normalize();
  }

  /**
   * Creates a quaternion from a 3x3 rotation matrix.
   *
   * @param {Mat3} mat - The rotation matrix.
   * @returns {Quat} A new quaternion representing the rotation.
   * @throws {TypeError} If the provided matrix is not an instance of Mat3.
   */
  static fromMat3(mat) {
    validateMat3(mat, "matrix");

    const m = mat.elements;
    const trace = m[0] + m[4] + m[8];
    let w, x, y, z;

    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1.0);
      w = 0.25 / s;
      x = (m[7] - m[5]) * s;
      y = (m[2] - m[6]) * s;
      z = (m[3] - m[1]) * s;
    } else {
      if (m[0] > m[4] && m[0] > m[8]) {
        const s = 2.0 * Math.sqrt(1.0 + m[0] - m[4] - m[8]);
        w = (m[7] - m[5]) / s;
        x = 0.25 * s;
        y = (m[1] + m[3]) / s;
        z = (m[2] + m[6]) / s;
      } else if (m[4] > m[8]) {
        const s = 2.0 * Math.sqrt(1.0 + m[4] - m[0] - m[8]);
        w = (m[2] - m[6]) / s;
        x = (m[1] + m[3]) / s;
        y = 0.25 * s;
        z = (m[5] + m[7]) / s;
      } else {
        const s = 2.0 * Math.sqrt(1.0 + m[8] - m[0] - m[4]);
        w = (m[3] - m[1]) / s;
        x = (m[2] + m[6]) / s;
        y = (m[5] + m[7]) / s;
        z = 0.25 * s;
      }
    }

    return new Quat(w, x, y, z).normalize();
  }
}

export default Quat;
