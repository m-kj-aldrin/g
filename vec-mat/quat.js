// import Mat3 from "./mat3.js";
// import Mat4 from "./_mat4.js";
// import Vec3 from "./vec3.js";

// /**
//  * Represents a quaternion for handling rotations in a right-handed coordinate system.
//  */
// class Quat {
//     /**
//      * Creates a new Quat instance.
//      * @param {number} [x=0] - X-component.
//      * @param {number} [y=0] - Y-component.
//      * @param {number} [z=0] - Z-component.
//      * @param {number} [w=1] - W-component.
//      */
//     constructor(x = 0, y = 0, z = 0, w = 1) {
//         this._x = x;
//         this._y = y;
//         this._z = z;
//         this._w = w;
//     }

//     /**
//      * X-component of the quaternion (imaginary part).
//      * @type {number}
//      */
//     get x() {
//         return this._x;
//     }

//     set x(value) {
//         if (typeof value !== "number") {
//             throw new TypeError('Property "x" must be a number.');
//         }
//         this._x = value;
//     }

//     /**
//      * Y-component of the quaternion (imaginary part).
//      * @type {number}
//      */
//     get y() {
//         return this._y;
//     }

//     set y(value) {
//         if (typeof value !== "number") {
//             throw new TypeError('Property "y" must be a number.');
//         }
//         this._y = value;
//     }

//     /**
//      * Z-component of the quaternion (imaginary part).
//      * @type {number}
//      */
//     get z() {
//         return this._z;
//     }

//     set z(value) {
//         if (typeof value !== "number") {
//             throw new TypeError('Property "z" must be a number.');
//         }
//         this._z = value;
//     }

//     /**
//      * W-component of the quaternion (real part).
//      * @type {number}
//      */
//     get w() {
//         return this._w;
//     }

//     set w(value) {
//         if (typeof value !== "number") {
//             throw new TypeError('Property "w" must be a number.');
//         }
//         this._w = value;
//     }

//     /**
//      * Adds another quaternion to this quaternion.
//      * @param {Quat} other - Quaternion to add.
//      * @returns {Quat} This instance for chaining.
//      */
//     add(other) {
//         if (!(other instanceof Quat)) {
//             throw new TypeError(
//                 'Parameter "other" must be an instance of Quat.'
//             );
//         }
//         this._x += other.x;
//         this._y += other.y;
//         this._z += other.z;
//         this._w += other.w;
//         return this;
//     }

//     /**
//      * Multiplies this quaternion by another quaternion.
//      * @param {Quat} other - Quaternion to multiply with.
//      * @returns {Quat} This instance for chaining.
//      */
//     multiply(other) {
//         if (!(other instanceof Quat)) {
//             throw new TypeError(
//                 'Parameter "other" must be an instance of Quat.'
//             );
//         }
//         const x =
//             this.w * other.x +
//             this.x * other.w +
//             this.y * other.z -
//             this.z * other.y;
//         const y =
//             this.w * other.y -
//             this.x * other.z +
//             this.y * other.w +
//             this.z * other.x;
//         const z =
//             this.w * other.z +
//             this.x * other.y -
//             this.y * other.x +
//             this.z * other.w;
//         const w =
//             this.w * other.w -
//             this.x * other.x -
//             this.y * other.y -
//             this.z * other.z;
//         this._x = x;
//         this._y = y;
//         this._z = z;
//         this._w = w;
//         return this;
//     }

//     /**
//      * Multiplies this quaternion by a scalar.
//      * @param {number} scalar - Scalar value to multiply with.
//      * @returns {Quat} This instance for chaining.
//      */
//     multiplyScalar(scalar) {
//         if (typeof scalar !== "number") {
//             throw new TypeError('Parameter "scalar" must be a number.');
//         }
//         this._x *= scalar;
//         this._y *= scalar;
//         this._z *= scalar;
//         this._w *= scalar;
//         return this;
//     }

//     /**
//      * Normalizes this quaternion. If the quaternion length is zero, throws an error.
//      * @returns {Quat} This instance for chaining.
//      */
//     normalize() {
//         const len = this.length();
//         if (len === 0) {
//             throw new Error("Cannot normalize a quaternion with length zero.");
//         }
//         this.multiplyScalar(1 / len);
//         return this;
//     }

//     /**
//      * Inverts this quaternion.
//      * @returns {Quat} This instance for chaining.
//      */
//     invert() {
//         const lenSq = this.lengthSquared();
//         if (lenSq === 0) {
//             throw new Error("Cannot invert a quaternion with length zero.");
//         }
//         this.conjugate();
//         this.multiplyScalar(1 / lenSq);
//         return this;
//     }

//     /**
//      * Conjugates this quaternion.
//      * @returns {Quat} This instance for chaining.
//      */
//     conjugate() {
//         this._x = -this._x;
//         this._y = -this._y;
//         this._z = -this._z;
//         return this;
//     }

//     /**
//      * Calculates the dot product with another quaternion.
//      * @param {Quat} other - Quaternion to calculate the dot product with.
//      * @returns {number} The dot product.
//      */
//     dot(other) {
//         if (!(other instanceof Quat)) {
//             throw new TypeError(
//                 'Parameter "other" must be an instance of Quat.'
//             );
//         }
//         return (
//             this._x * other.x +
//             this._y * other.y +
//             this._z * other.z +
//             this._w * other.w
//         );
//     }

//     /**
//      * Returns the magnitude of the quaternion.
//      * @returns {number} The magnitude.
//      */
//     length() {
//         return Math.sqrt(this.lengthSquared());
//     }

//     /**
//      * Returns the squared magnitude of the quaternion.
//      * @returns {number} The squared magnitude.
//      */
//     lengthSquared() {
//         return (
//             this._x * this._x +
//             this._y * this._y +
//             this._z * this._z +
//             this._w * this._w
//         );
//     }

//     /**
//      * Performs spherical linear interpolation towards another quaternion by factor t.
//      * @param {Quat} other - Target quaternion.
//      * @param {number} t - Interpolation factor between 0 and 1.
//      * @returns {Quat} This instance for chaining.
//      */
//     slerp(other, t) {
//         if (!(other instanceof Quat)) {
//             throw new TypeError(
//                 'Parameter "other" must be an instance of Quat.'
//             );
//         }
//         if (typeof t !== "number") {
//             throw new TypeError('Parameter "t" must be a number.');
//         }

//         let cosHalfTheta = this.dot(other);

//         if (cosHalfTheta < 0) {
//             other = new Quat(-other.x, -other.y, -other.z, -other.w);
//             cosHalfTheta = -cosHalfTheta;
//         }

//         if (cosHalfTheta >= 1.0) {
//             return this;
//         }

//         const HALF_PI = Math.PI / 2;
//         if (cosHalfTheta > 0.995) {
//             // Linear interpolation
//             this._x += t * (other.x - this.x);
//             this._y += t * (other.y - this.y);
//             this._z += t * (other.z - this.z);
//             this._w += t * (other.w - this.w);
//             this.normalize();
//             return this;
//         }

//         const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
//         const halfTheta = Math.acos(cosHalfTheta);
//         const a = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
//         const b = Math.sin(t * halfTheta) / sinHalfTheta;

//         this._x = this._x * a + other.x * b;
//         this._y = this._y * a + other.y * b;
//         this._z = this._z * a + other.z * b;
//         this._w = this._w * a + other.w * b;

//         return this;
//     }

//     /**
//      * Applies another quaternion rotation to this quaternion.
//      * @param {Quat} quaternion - Quaternion to rotate by.
//      * @returns {Quat} This instance for chaining.
//      */
//     rotateBy(quaternion) {
//         if (!(quaternion instanceof Quat)) {
//             throw new TypeError(
//                 'Parameter "quaternion" must be an instance of Quat.'
//             );
//         }
//         return this.multiply(quaternion);
//     }

//     /**
//      * Sets this quaternion from an axis-angle representation.
//      * @param {Vec3} axis - Axis of rotation.
//      * @param {number} angle - Angle of rotation in radians.
//      * @returns {Quat} This instance for chaining.
//      */
//     setFromAxisAngle(axis, angle) {
//         if (!(axis instanceof Vec3)) {
//             throw new TypeError(
//                 'Parameter "axis" must be an instance of Vec3.'
//             );
//         }
//         if (typeof angle !== "number") {
//             throw new TypeError('Parameter "angle" must be a number.');
//         }

//         const halfAngle = angle / 2;
//         const sinHalfAngle = Math.sin(halfAngle);

//         axis = axis.clone().normalize();

//         this._x = axis.x * sinHalfAngle;
//         this._y = axis.y * sinHalfAngle;
//         this._z = axis.z * sinHalfAngle;
//         this._w = Math.cos(halfAngle);

//         return this;
//     }

//     /**
//      * Sets this quaternion from Euler angles.
//      * @param {Euler} euler - Euler angles.
//      * @returns {Quat} This instance for chaining.
//      */
//     setFromEuler(euler) {
//         if (
//             typeof euler !== "object" ||
//             !("x" in euler) ||
//             !("y" in euler) ||
//             !("z" in euler)
//         ) {
//             throw new TypeError(
//                 'Parameter "euler" must be an object with properties x, y, z.'
//             );
//         }

//         const cy = Math.cos(euler.z * 0.5);
//         const sy = Math.sin(euler.z * 0.5);
//         const cp = Math.cos(euler.y * 0.5);
//         const sp = Math.sin(euler.y * 0.5);
//         const cr = Math.cos(euler.x * 0.5);
//         const sr = Math.sin(euler.x * 0.5);

//         this._x = sr * cp * cy - cr * sp * sy;
//         this._y = cr * sp * cy + sr * cp * sy;
//         this._z = cr * cp * sy - sr * sp * cy;
//         this._w = cr * cp * cy + sr * sp * sy;

//         return this;
//     }

//     /**
//      * Sets this quaternion from a rotation matrix.
//      * @param {Mat3|Mat4} matrix - Rotation matrix.
//      * @returns {Quat} This instance for chaining.
//      */
//     setFromRotationMatrix(matrix) {
//         if (!(matrix instanceof Mat3) && !(matrix instanceof Mat4)) {
//             throw new TypeError(
//                 'Parameter "matrix" must be an instance of Mat3 or Mat4.'
//             );
//         }

//         let m;
//         if (matrix instanceof Mat4) {
//             // Extract the upper-left 3x3 matrix from Mat4
//             m = new Mat3([
//                 matrix.elements[0],
//                 matrix.elements[4],
//                 matrix.elements[8],
//                 matrix.elements[1],
//                 matrix.elements[5],
//                 matrix.elements[9],
//                 matrix.elements[2],
//                 matrix.elements[6],
//                 matrix.elements[10],
//             ]);
//         } else {
//             m = matrix;
//         }

//         const trace = m.elements[0] + m.elements[4] + m.elements[8];
//         let S;

//         if (trace > 0) {
//             S = Math.sqrt(trace + 1.0) * 2;
//             this._w = 0.25 * S;
//             this._x = (m.elements[7] - m.elements[5]) / S;
//             this._y = (m.elements[2] - m.elements[6]) / S;
//             this._z = (m.elements[3] - m.elements[1]) / S;
//         } else if (
//             m.elements[0] > m.elements[4] &&
//             m.elements[0] > m.elements[8]
//         ) {
//             S =
//                 Math.sqrt(1.0 + m.elements[0] - m.elements[4] - m.elements[8]) *
//                 2;
//             this._w = (m.elements[7] - m.elements[5]) / S;
//             this._x = 0.25 * S;
//             this._y = (m.elements[1] + m.elements[3]) / S;
//             this._z = (m.elements[2] + m.elements[6]) / S;
//         } else if (m.elements[4] > m.elements[8]) {
//             S =
//                 Math.sqrt(1.0 + m.elements[4] - m.elements[0] - m.elements[8]) *
//                 2;
//             this._w = (m.elements[2] - m.elements[6]) / S;
//             this._x = (m.elements[1] + m.elements[3]) / S;
//             this._y = 0.25 * S;
//             this._z = (m.elements[5] + m.elements[7]) / S;
//         } else {
//             S =
//                 Math.sqrt(1.0 + m.elements[8] - m.elements[0] - m.elements[4]) *
//                 2;
//             this._w = (m.elements[3] - m.elements[1]) / S;
//             this._x = (m.elements[2] + m.elements[6]) / S;
//             this._y = (m.elements[5] + m.elements[7]) / S;
//             this._z = 0.25 * S;
//         }

//         return this;
//     }

//     /**
//      * Converts this quaternion to a rotation matrix.
//      * @param {Mat3|Mat4} [matrixType=Mat3] - The type of rotation matrix to return.
//      * @returns {Mat3|Mat4} The rotation matrix.
//      */
//     toRotationMatrix(matrixType = Mat3) {
//         let m;
//         if (matrixType === Mat4) {
//             m = new Mat4();
//             // Initialize to identity
//             m.identity();
//         } else {
//             m = new Mat3();
//         }

//         const x = this._x;
//         const y = this._y;
//         const z = this._z;
//         const w = this._w;

//         const xx = x * x;
//         const yy = y * y;
//         const zz = z * z;
//         const xy = x * y;
//         const xz = x * z;
//         const yz = y * z;
//         const wx = w * x;
//         const wy = w * y;
//         const wz = w * z;

//         if (matrixType === Mat4) {
//             m.elements[0] = 1 - 2 * (yy + zz);
//             m.elements[1] = 2 * (xy + wz);
//             m.elements[2] = 2 * (xz - wy);
//             m.elements[3] = 0;

//             m.elements[4] = 2 * (xy - wz);
//             m.elements[5] = 1 - 2 * (xx + zz);
//             m.elements[6] = 2 * (yz + wx);
//             m.elements[7] = 0;

//             m.elements[8] = 2 * (xz + wy);
//             m.elements[9] = 2 * (yz - wx);
//             m.elements[10] = 1 - 2 * (xx + yy);
//             m.elements[11] = 0;

//             m.elements[12] = 0;
//             m.elements[13] = 0;
//             m.elements[14] = 0;
//             m.elements[15] = 1;
//         } else {
//             m.elements[0] = 1 - 2 * (yy + zz);
//             m.elements[1] = 2 * (xy + wz);
//             m.elements[2] = 2 * (xz - wy);

//             m.elements[3] = 2 * (xy - wz);
//             m.elements[4] = 1 - 2 * (xx + zz);
//             m.elements[5] = 2 * (yz + wx);

//             m.elements[6] = 2 * (xz + wy);
//             m.elements[7] = 2 * (yz - wx);
//             m.elements[8] = 1 - 2 * (xx + yy);
//         }

//         return m;
//     }

//     /**
//      * Converts this quaternion to Euler angles.
//      * @returns {Object} Euler angles with properties x, y, z in radians.
//      */
//     toEuler() {
//         const euler = {};

//         // Roll (x-axis rotation)
//         const sinr_cosp = 2 * (this._w * this._x + this._y * this._z);
//         const cosr_cosp = 1 - 2 * (this._x * this._x + this._y * this._y);
//         euler.x = Math.atan2(sinr_cosp, cosr_cosp);

//         // Pitch (y-axis rotation)
//         const sinp = 2 * (this._w * this._y - this._z * this._x);
//         if (Math.abs(sinp) >= 1) {
//             euler.y = Math.sign(sinp) * (Math.PI / 2);
//         } else {
//             euler.y = Math.asin(sinp);
//         }

//         // Yaw (z-axis rotation)
//         const siny_cosp = 2 * (this._w * this._z + this._x * this._y);
//         const cosy_cosp = 1 - 2 * (this._y * this._y + this._z * this._z);
//         euler.z = Math.atan2(siny_cosp, cosy_cosp);

//         return euler;
//     }

//     /**
//      * Checks if this quaternion equals another quaternion.
//      * @param {Quat} other - Quaternion to compare with.
//      * @returns {boolean} True if equal, false otherwise.
//      */
//     equals(other) {
//         if (!(other instanceof Quat)) {
//             return false;
//         }
//         return (
//             this._x === other.x &&
//             this._y === other.y &&
//             this._z === other.z &&
//             this._w === other.w
//         );
//     }

//     /**
//      * Creates a clone of this quaternion.
//      * @returns {Quat} A new cloned quaternion.
//      */
//     clone() {
//         return new Quat(this._x, this._y, this._z, this._w);
//     }

//     /**
//      * Converts this quaternion to an array.
//      * @returns {number[]} Array containing [x, y, z, w].
//      */
//     toArray() {
//         return [this._x, this._y, this._z, this._w];
//     }

//     /**
//      * Sets the components of this quaternion from an array.
//      * @param {number[]} array - Array containing [x, y, z, w].
//      * @returns {Quat} This instance for chaining.
//      */
//     fromArray(array) {
//         if (!Array.isArray(array) || array.length < 4) {
//             throw new TypeError(
//                 'Parameter "array" must be an array with at least four elements.'
//             );
//         }
//         const [x, y, z, w] = array;
//         if ([x, y, z, w].some((component) => typeof component !== "number")) {
//             throw new TypeError("All elements in the array must be numbers.");
//         }
//         this._x = x;
//         this._y = y;
//         this._z = z;
//         this._w = w;
//         return this;
//     }

//     /**
//      * Returns a string representation of the quaternion.
//      * @returns {string} String in the format "Quat(x, y, z, w)".
//      */
//     toString() {
//         return `Quat(${this._x}, ${this._y}, ${this._z}, ${this._w})`;
//     }

//     /**
//      * Adds two quaternions and returns a new quaternion.
//      * @param {Quat} q1 - First quaternion.
//      * @param {Quat} q2 - Second quaternion.
//      * @returns {Quat} New quaternion instance.
//      */
//     static add(q1, q2) {
//         if (!(q1 instanceof Quat)) {
//             throw new TypeError('Parameter "q1" must be an instance of Quat.');
//         }
//         if (!(q2 instanceof Quat)) {
//             throw new TypeError('Parameter "q2" must be an instance of Quat.');
//         }
//         return new Quat(q1.x + q2.x, q1.y + q2.y, q1.z + q2.z, q1.w + q2.w);
//     }

//     /**
//      * Multiplies two quaternions and returns a new quaternion.
//      * @param {Quat} q1 - First quaternion.
//      * @param {Quat} q2 - Second quaternion.
//      * @returns {Quat} New quaternion instance.
//      */
//     static multiply(q1, q2) {
//         if (!(q1 instanceof Quat)) {
//             throw new TypeError('Parameter "q1" must be an instance of Quat.');
//         }
//         if (!(q2 instanceof Quat)) {
//             throw new TypeError('Parameter "q2" must be an instance of Quat.');
//         }
//         const x = q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y;
//         const y = q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x;
//         const z = q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w;
//         const w = q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z;
//         return new Quat(x, y, z, w);
//     }

//     /**
//      * Multiplies a quaternion by a scalar and returns a new quaternion.
//      * @param {Quat} q - Quaternion to multiply.
//      * @param {number} scalar - Scalar value to multiply with.
//      * @returns {Quat} New quaternion instance.
//      */
//     static multiplyScalar(q, scalar) {
//         if (!(q instanceof Quat)) {
//             throw new TypeError('Parameter "q" must be an instance of Quat.');
//         }
//         if (typeof scalar !== "number") {
//             throw new TypeError('Parameter "scalar" must be a number.');
//         }
//         return new Quat(q.x * scalar, q.y * scalar, q.z * scalar, q.w * scalar);
//     }

//     /**
//      * Normalizes a quaternion and returns a new quaternion. Throws an error if the quaternion length is zero.
//      * @param {Quat} q - Quaternion to normalize.
//      * @returns {Quat} New normalized quaternion.
//      */
//     static normalize(q) {
//         if (!(q instanceof Quat)) {
//             throw new TypeError('Parameter "q" must be an instance of Quat.');
//         }
//         const len = q.length();
//         if (len === 0) {
//             throw new Error("Cannot normalize a quaternion with length zero.");
//         }
//         return Quat.multiplyScalar(q, 1 / len);
//     }

//     /**
//      * Inverts a quaternion and returns a new quaternion.
//      * @param {Quat} q - Quaternion to invert.
//      * @returns {Quat} New inverted quaternion.
//      */
//     static invert(q) {
//         if (!(q instanceof Quat)) {
//             throw new TypeError('Parameter "q" must be an instance of Quat.');
//         }
//         const lenSq = q.lengthSquared();
//         if (lenSq === 0) {
//             throw new Error("Cannot invert a quaternion with length zero.");
//         }
//         return new Quat(-q.x / lenSq, -q.y / lenSq, -q.z / lenSq, q.w / lenSq);
//     }

//     /**
//      * Conjugates a quaternion and returns a new quaternion.
//      * @param {Quat} q - Quaternion to conjugate.
//      * @returns {Quat} New conjugated quaternion.
//      */
//     static conjugate(q) {
//         if (!(q instanceof Quat)) {
//             throw new TypeError('Parameter "q" must be an instance of Quat.');
//         }
//         return new Quat(-q.x, -q.y, -q.z, q.w);
//     }

//     /**
//      * Calculates the dot product of two quaternions.
//      * @param {Quat} q1 - First quaternion.
//      * @param {Quat} q2 - Second quaternion.
//      * @returns {number} The dot product.
//      */
//     static dot(q1, q2) {
//         if (!(q1 instanceof Quat)) {
//             throw new TypeError('Parameter "q1" must be an instance of Quat.');
//         }
//         if (!(q2 instanceof Quat)) {
//             throw new TypeError('Parameter "q2" must be an instance of Quat.');
//         }
//         return q1.dot(q2);
//     }

//     /**
//      * Returns the magnitude of a quaternion.
//      * @param {Quat} q - Quaternion.
//      * @returns {number} The magnitude.
//      */
//     static length(q) {
//         if (!(q instanceof Quat)) {
//             throw new TypeError('Parameter "q" must be an instance of Quat.');
//         }
//         return q.length();
//     }

//     /**
//      * Returns the squared magnitude of a quaternion.
//      * @param {Quat} q - Quaternion.
//      * @returns {number} The squared magnitude.
//      */
//     static lengthSquared(q) {
//         if (!(q instanceof Quat)) {
//             throw new TypeError('Parameter "q" must be an instance of Quat.');
//         }
//         return q.lengthSquared();
//     }

//     /**
//      * Performs spherical linear interpolation between two quaternions by factor t.
//      * @param {Quat} q1 - Starting quaternion.
//      * @param {Quat} q2 - Ending quaternion.
//      * @param {number} t - Interpolation factor between 0 and 1.
//      * @returns {Quat} New interpolated quaternion.
//      */
//     static slerp(q1, q2, t) {
//         if (!(q1 instanceof Quat)) {
//             throw new TypeError('Parameter "q1" must be an instance of Quat.');
//         }
//         if (!(q2 instanceof Quat)) {
//             throw new TypeError('Parameter "q2" must be an instance of Quat.');
//         }
//         if (typeof t !== "number") {
//             throw new TypeError('Parameter "t" must be a number.');
//         }

//         const cosHalfTheta = Quat.dot(q1, q2);

//         let q2Copy = q2.clone();
//         if (cosHalfTheta < 0) {
//             q2Copy = Quat.multiplyScalar(q2, -1);
//         }

//         const dot = Quat.dot(q1, q2Copy);
//         if (dot > 0.995) {
//             // Linear interpolation
//             const result = Quat.add(
//                 q1,
//                 Quat.multiplyScalar(q2Copy, t)
//             ).normalize();
//             return result;
//         }

//         const halfTheta = Math.acos(dot);
//         const sinHalfTheta = Math.sqrt(1.0 - dot * dot);
//         if (sinHalfTheta === 0) {
//             return q1.clone();
//         }

//         const a = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
//         const b = Math.sin(t * halfTheta) / sinHalfTheta;

//         const x = q1.x * a + q2Copy.x * b;
//         const y = q1.y * a + q2Copy.y * b;
//         const z = q1.z * a + q2Copy.z * b;
//         const w = q1.w * a + q2Copy.w * b;

//         return new Quat(x, y, z, w);
//     }

//     /**
//      * Creates a quaternion from an axis-angle representation.
//      * @param {Vec3} axis - Axis of rotation.
//      * @param {number} angle - Angle of rotation in radians.
//      * @returns {Quat} New quaternion instance.
//      */
//     static fromAxisAngle(axis, angle) {
//         if (!(axis instanceof Vec3)) {
//             throw new TypeError(
//                 'Parameter "axis" must be an instance of Vec3.'
//             );
//         }
//         if (typeof angle !== "number") {
//             throw new TypeError('Parameter "angle" must be a number.');
//         }
//         return new Quat().setFromAxisAngle(axis, angle);
//     }

//     /**
//      * Creates a quaternion from Euler angles.
//      * @param {Euler} euler - Euler angles.
//      * @returns {Quat} New quaternion instance.
//      */
//     static fromEuler(euler) {
//         if (
//             typeof euler !== "object" ||
//             !("x" in euler) ||
//             !("y" in euler) ||
//             !("z" in euler)
//         ) {
//             throw new TypeError(
//                 'Parameter "euler" must be an object with properties x, y, z.'
//             );
//         }
//         return new Quat().setFromEuler(euler);
//     }

//     /**
//      * Creates a quaternion from a rotation matrix.
//      * @param {Mat3|Mat4} matrix - Rotation matrix.
//      * @returns {Quat} New quaternion instance.
//      */
//     static fromRotationMatrix(matrix) {
//         if (!(matrix instanceof Mat3) && !(matrix instanceof Mat4)) {
//             throw new TypeError(
//                 'Parameter "matrix" must be an instance of Mat3 or Mat4.'
//             );
//         }
//         return new Quat().setFromRotationMatrix(matrix);
//     }

//     /**
//      * Converts a quaternion to a rotation matrix.
//      * @param {Quat} q - Quaternion to convert.
//      * @param {Mat3|Mat4} [matrixType=Mat3] - The type of rotation matrix to return.
//      * @returns {Mat3|Mat4} The rotation matrix.
//      */
//     static toRotationMatrix(q, matrixType = Mat3) {
//         if (!(q instanceof Quat)) {
//             throw new TypeError('Parameter "q" must be an instance of Quat.');
//         }
//         return q.toRotationMatrix(matrixType);
//     }

//     /**
//      * Converts a quaternion to Euler angles.
//      * @param {Quat} q - Quaternion to convert.
//      * @returns {Object} Euler angles with properties x, y, z in radians.
//      */
//     static toEuler(q) {
//         if (!(q instanceof Quat)) {
//             throw new TypeError('Parameter "q" must be an instance of Quat.');
//         }
//         return q.toEuler();
//     }

//     /**
//      * Checks if two quaternions are equal.
//      * @param {Quat} q1 - First quaternion.
//      * @param {Quat} q2 - Second quaternion.
//      * @returns {boolean} True if equal, false otherwise.
//      */
//     static equals(q1, q2) {
//         if (!(q1 instanceof Quat) || !(q2 instanceof Quat)) {
//             return false;
//         }
//         return q1.equals(q2);
//     }

//     /**
//      * Creates a quaternion from an array.
//      * @param {number[]} array - Array containing [x, y, z, w].
//      * @returns {Quat} New quaternion instance.
//      */
//     static fromArray(array) {
//         if (!Array.isArray(array) || array.length < 4) {
//             throw new TypeError(
//                 'Parameter "array" must be an array with at least four elements.'
//             );
//         }
//         const [x, y, z, w] = array;
//         if ([x, y, z, w].some((component) => typeof component !== "number")) {
//             throw new TypeError("All elements in the array must be numbers.");
//         }
//         return new Quat(x, y, z, w);
//     }
// }

// export default Quat;
