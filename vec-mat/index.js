import { formatSmallFloats } from "../util/numbers.js";
import { matrixToString } from "../util/string.js";

class Vec2 {
    #x = 0;
    #y = 0;

    constructor(x = 0, y = 0) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }
    get y() {
        return this.#y;
    }

    /**
     * Adds another Vec2 to this vector component-wise.
     * @param {Vec2} vector
     * @returns {Vec2} This vector after addition.
     */
    add(vector) {
        if (!(vector instanceof Vec2)) {
            throw new TypeError("Argument must be an instance of Vec2");
        }
        let x = this.#x + vector.#x;
        let y = this.#y + vector.#y;
        return new Vec2(x, y);
    }

    /**
     * Subtracts another Vec2 from this vector component-wise.
     * @param {Vec2} vector
     * @returns {Vec2} This vector after subtraction.
     */
    subtract(vector) {
        if (!(vector instanceof Vec2)) {
            throw new TypeError("Argument must be an instance of Vec2");
        }
        let x = this.#x - vector.#x;
        let y = this.#y - vector.#y;
        return new Vec2(x, y);
    }

    /**
     * Computes the dot product with another Vec2.
     * @param {Vec2} vector
     * @returns {number} The dot product.
     */
    dot(vector) {
        if (!(vector instanceof Vec2)) {
            throw new TypeError("Argument must be an instance of Vec2");
        }
        return this.#x * vector.#x + this.#y * vector.#y;
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar
     * @returns {Vec2} This vector after multiplication.
     */
    scalarMultiply(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError("Scalar must be a number");
        }
        let x = this.#x * scalar;
        let y = this.#y * scalar;
        return new Vec2(x, y);
    }

    /**
     * Divides this vector by a scalar.
     * @param {number} scalar
     * @returns {Vec2} This vector after division.
     */
    scalarDivide(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError("Scalar must be a number");
        }
        if (scalar === 0) {
            throw new Error("Division by zero");
        }
        let x = this.#x / scalar;
        let y = this.#y / scalar;
        return new Vec2(x, y);
    }

    /**
     * Computes the Euclidean distance to another Vec2.
     * @param {Vec2} vector
     * @returns {number} The distance between the two vectors.
     */
    distanceTo(vector) {
        if (!(vector instanceof Vec2)) {
            throw new TypeError("Argument must be an instance of Vec2");
        }
        const dx = this.#x - vector.#x;
        const dy = this.#y - vector.#y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Multiplies the vector either by a vector component-wise or with a matrix.
     * @param {Vec2 | Mat3} vectorOrMatrix
     * @returns {Vec2} This vector after multiplication.
     */
    multiply(vectorOrMatrix) {
        if (vectorOrMatrix instanceof Vec2) {
            let _x = this.#x * vectorOrMatrix.#x;
            let _y = this.#y * vectorOrMatrix.#y;
            return new Vec2(_x, _y);
        }

        if (vectorOrMatrix instanceof Mat3) {
            let e = vectorOrMatrix.elements;

            let _x = this.#x * e[0] + this.#y * e[3] + e[6];
            let _y = this.#x * e[1] + this.#y * e[4] + e[7];
            // let _w = this.#x * e[2] + this.#y * e[5] + e[8];

            return new Vec2(_x, _y);
        }

        throw new TypeError("vectorOrMatrix needs to be of type Vec2 | Mat3");
    }

    get length() {
        return Math.sqrt(this.#x ** 2 + this.#y ** 2);
    }

    normalize() {
        let length = this.length;
        if (length === 0) {
            throw new Error("Cannot normalize a zero-length vector");
        }
        return this.scalarDivide(length);
    }

    clone() {
        return new Vec2(this.#x, this.#y);
    }

    toString() {
        return `Vec2( ${formatSmallFloats(this.#x)} , ${formatSmallFloats(
            this.#y
        )} )`;
    }
}

class Vec3 {
    #x = 0;
    #y = 0;
    #z = 0;

    constructor(x = 0, y = 0, z = 0) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get z() {
        return this.#z;
    }

    /**
     * Adds another Vec3 to this vector component-wise.
     * @param {Vec3} vector
     * @returns {Vec3} A new Vec3 instance after addition.
     */
    add(vector) {
        if (!(vector instanceof Vec3)) {
            throw new TypeError("Argument must be an instance of Vec3");
        }
        return new Vec3(
            this.#x + vector.#x,
            this.#y + vector.#y,
            this.#z + vector.#z
        );
    }

    /**
     * Subtracts another Vec3 from this vector component-wise.
     * @param {Vec3} vector
     * @returns {Vec3} A new Vec3 instance after subtraction.
     */
    subtract(vector) {
        if (!(vector instanceof Vec3)) {
            throw new TypeError("Argument must be an instance of Vec3");
        }
        return new Vec3(
            this.#x - vector.#x,
            this.#y - vector.#y,
            this.#z - vector.#z
        );
    }

    /**
     * Computes the dot product with another Vec3.
     * @param {Vec3} vector
     * @returns {number} The dot product.
     */
    dot(vector) {
        if (!(vector instanceof Vec3)) {
            throw new TypeError("Argument must be an instance of Vec3");
        }
        return this.#x * vector.#x + this.#y * vector.#y + this.#z * vector.#z;
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar
     * @returns {Vec3} A new Vec3 instance after multiplication.
     */
    scalarMultiply(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError("Scalar must be a number");
        }
        return new Vec3(this.#x * scalar, this.#y * scalar, this.#z * scalar);
    }

    /**
     * Divides this vector by a scalar.
     * @param {number} scalar
     * @returns {Vec3} A new Vec3 instance after division.
     */
    scalarDivide(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError("Scalar must be a number");
        }
        if (scalar === 0) {
            throw new Error("Division by zero");
        }
        return new Vec3(this.#x / scalar, this.#y / scalar, this.#z / scalar);
    }

    /**
     * Computes the cross product with another Vec3.
     * @param {Vec3} vector
     * @returns {Vec3} A new Vec3 instance representing the cross product.
     */
    cross(vector) {
        if (!(vector instanceof Vec3)) {
            throw new TypeError("Argument must be an instance of Vec3");
        }
        const crossX = this.#y * vector.#z - this.#z * vector.#y;
        const crossY = this.#z * vector.#x - this.#x * vector.#z;
        const crossZ = this.#x * vector.#y - this.#y * vector.#x;

        return new Vec3(crossX, crossY, crossZ);
    }

    /**
     * Computes the Euclidean distance to another Vec3.
     * @param {Vec3} vector
     * @returns {number} The distance between the two vectors.
     */
    distanceTo(vector) {
        if (!(vector instanceof Vec3)) {
            throw new TypeError("Argument must be an instance of Vec3");
        }
        const dx = this.#x - vector.#x;
        const dy = this.#y - vector.#y;
        const dz = this.#z - vector.#z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    /**
     * Multiplies the vector either by a vector component-wise or with a matrix.
     * @param {Vec3 | Mat4} vectorOrMatrix
     * @returns {Vec3} A new Vec3 instance after multiplication.
     */
    multiply(vectorOrMatrix) {
        if (vectorOrMatrix instanceof Vec3) {
            return new Vec3(
                this.#x * vectorOrMatrix.#x,
                this.#y * vectorOrMatrix.#y,
                this.#z * vectorOrMatrix.#z
            );
        }

        if (vectorOrMatrix instanceof Mat4) {
            const e = vectorOrMatrix.elements;

            let _x = this.#x * e[0] + this.#y * e[4] + this.#z * e[8] + e[12];
            let _y = this.#x * e[1] + this.#y * e[5] + this.#z * e[9] + e[13];
            let _z = this.#x * e[2] + this.#y * e[6] + this.#z * e[10] + e[14];
            let _w = this.#x * e[3] + this.#y * e[7] + this.#z * e[11] + e[15];

            if (_w !== 0) {
                _x /= _w;
                _y /= _w;
                _z /= _w;
            }

            return new Vec3(_x, _y, _z);
        }

        throw new TypeError("vectorOrMatrix needs to be of type Vec3 | Mat4");
    }

    get length() {
        return Math.sqrt(this.#x ** 2 + this.#y ** 2 + this.#z ** 2);
    }

    /**
     * Normalizes the vector to have a length of 1.
     * @returns {Vec3} A new Vec3 instance that is the normalized vector.
     */
    normalize() {
        const length = this.length;
        if (length === 0) {
            throw new Error("Cannot normalize a zero-length vector");
        }
        return this.scalarDivide(length);
    }

    /**
     * Creates a copy of this Vec3 instance.
     * @returns {Vec3} A new Vec3 instance with the same components.
     */
    clone() {
        return new Vec3(this.#x, this.#y, this.#z);
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string} The string representation.
     */
    toString() {
        return `Vec3( ${formatSmallFloats(this.#x)} , ${formatSmallFloats(
            this.#y
        )} , ${formatSmallFloats(this.#z)} )`;
    }
}

class Mat3 {
    /**
     * Matrix elements in column-major
     */
    #elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

    /**
     *
     * @param  {...number} elements
     */
    constructor(...elements) {
        if (elements.length) {
            if (elements.length === 9) {
                this.#elements.set(elements);
            } else {
                throw new Error(
                    "Mat3 needs to be set with excatly 9 elements in column-major"
                );
            }
        }
    }

    get elements() {
        return this.#elements;
    }

    /**
     *
     * @param { Mat3 } matrix
     */
    multiply(matrix) {
        let a = this.#elements;
        let b = matrix.#elements;

        let result = new Float32Array(9);

        // First Column
        result[0] = a[0] * b[0] + a[3] * b[1] + a[6] * b[2];
        result[1] = a[1] * b[0] + a[4] * b[1] + a[7] * b[2];
        result[2] = a[2] * b[0] + a[5] * b[1] + a[8] * b[2];

        // Second Column
        result[3] = a[0] * b[3] + a[3] * b[4] + a[6] * b[5];
        result[4] = a[1] * b[3] + a[4] * b[4] + a[7] * b[5];
        result[5] = a[2] * b[3] + a[5] * b[4] + a[8] * b[5];

        // Third Column
        result[6] = a[0] * b[6] + a[3] * b[7] + a[6] * b[8];
        result[7] = a[1] * b[6] + a[4] * b[7] + a[7] * b[8];
        result[8] = a[2] * b[6] + a[5] * b[7] + a[8] * b[8];

        this.#elements.set(result);

        return this;
    }

    clone() {
        return new Mat3(...this.#elements);
    }

    toString() {
        return matrixToString(this.#elements, 3, 3, 2, "Mat3");
    }

    /**
     *
     * @param  {...Mat3} matrix
     */
    static multiply(...matrix) {
        return matrix.reduce((r, m) => r.multiply(m), new Mat3());
    }

    /**
     *
     * @param {Vec2} vector
     */
    static fromScaling(vector) {
        let { x, y } = vector;
        return new Mat3(x, 0, 0, 0, y, 0, 0, 0, 1);
    }

    /**
     *
     * @param {number} angle
     */
    static fromRotation(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return new Mat3(cos, sin, 0, -sin, cos, 0, 0, 0, 1);
    }

    /**
     * @param {Vec2} vector
     */
    static fromTranslation(vector) {
        let { x, y } = vector;
        return new Mat3(1, 0, 0, 0, 1, 0, x, y, 1);
    }
}

class Mat4 {
    /**
     * Matrix elements in column-major
     */
    #elements = new Float32Array([
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    ]);

    /**
     *
     * @param  {...number} elements
     */
    constructor(...elements) {
        if (elements.length) {
            if (elements.length === 16) {
                this.#elements.set(elements);
            } else {
                throw new Error(
                    "Mat4 needs to be set with excatly 16 elements in column-major"
                );
            }
        }
    }

    get elements() {
        return this.#elements;
    }

    /**
     * @param {Mat4} matrix
     */
    multiply(matrix) {
        let a = this.#elements;
        let b = matrix.#elements;

        let result = new Float32Array(16);

        // Column 0
        result[0] = a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3];
        result[1] = a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3];
        result[2] = a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3];
        result[3] = a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3];

        // Column 1
        result[4] = a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7];
        result[5] = a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7];
        result[6] = a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7];
        result[7] = a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7];

        // Column 2
        result[8] = a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11];
        result[9] = a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11];
        result[10] = a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11];
        result[11] = a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11];

        // Column 3
        result[12] = a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15];
        result[13] = a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15];
        result[14] =
            a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15];
        result[15] =
            a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15];

        this.#elements.set(result);

        return this;
    }

    clone() {
        return new Mat4(...this.#elements);
    }

    toString() {
        return matrixToString(this.#elements, 4, 4, 2, "Mat4");
    }

    /**
     *
     * @param {...Mat4} matrix
     */
    static multiply(...matrix) {
        return matrix.reduce((r, m) => r.multiply(m), new Mat4());
    }

    /**
     * @param {Vec3} vector
     */
    static fromScaling(vector) {
        let { x, y, z } = vector;
        return new Mat4(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    }

    /**
     * @param {Vec3} axis
     * @param {number} angle
     */
    static fromAxisRotation(axis, angle) {
        let v = axis.clone().normalize();

        let { x, y, z } = v;

        let c = Math.cos(angle);
        let s = Math.sin(angle);
        let t = 1 - c;

        let R11 = t * x * x + c;
        let R12 = t * x * y - s * z;
        let R13 = t * x * z + s * y;

        let R21 = t * x * y + s * z;
        let R22 = t * y * y + c;
        let R23 = t * y * z - s * x;

        let R31 = t * x * z - s * y;
        let R32 = t * y * z + s * x;
        let R33 = t * z * z + c;

        return new Mat4(
            R11,
            R21,
            R31,
            0,
            R12,
            R22,
            R32,
            0,
            R13,
            R23,
            R33,
            0,
            0,
            0,
            0,
            1
        );
    }

    /**
     *
     * @param {Vec3} vector
     */
    static fromTranslation(vector) {
        let { x, y, z } = vector;
        return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1);
    }
}

/**
 * Class representing a Quaternion for 3D rotations.
 */
class Quat {
    #x = 0;
    #y = 0;
    #z = 0;
    #w = 1;

    /**
     * Creates a new Quaternion.
     * @param {number} x - The x component.
     * @param {number} y - The y component.
     * @param {number} z - The z component.
     * @param {number} w - The w component.
     */
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
        this.#w = w;
    }

    // Getters for the quaternion components
    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get z() {
        return this.#z;
    }

    get w() {
        return this.#w;
    }

    /**
     * Creates a quaternion from an axis and angle.
     * @param {Vec3} axis - The rotation axis.
     * @param {number} angle - The rotation angle in radians.
     * @returns {Quat} The resulting quaternion.
     */
    static fromAxisRotation(axis, angle) {
        if (!(axis instanceof Vec3)) {
            throw new TypeError("Axis must be an instance of Vec3");
        }

        const halfAngle = angle / 2;
        const sinHalfAngle = Math.sin(halfAngle);
        const cosHalfAngle = Math.cos(halfAngle);

        const normalizedAxis = axis.normalize();

        const x = normalizedAxis.x * sinHalfAngle;
        const y = normalizedAxis.y * sinHalfAngle;
        const z = normalizedAxis.z * sinHalfAngle;
        const w = cosHalfAngle;

        return new Quat(x, y, z, w).normalize();
    }

    /**
     * Normalizes the quaternion to unit length.
     * @returns {Quat} The normalized quaternion.
     */
    normalize() {
        const length = Math.sqrt(
            this.#x ** 2 + this.#y ** 2 + this.#z ** 2 + this.#w ** 2
        );
        if (length === 0) {
            throw new Error("Cannot normalize a zero-length quaternion");
        }
        return new Quat(
            this.#x / length,
            this.#y / length,
            this.#z / length,
            this.#w / length
        );
    }

    /**
     * Converts the quaternion to a 4x4 rotation matrix.
     * @returns {Mat4} The rotation matrix.
     */
    toRotationMatrix() {
        const { x, y, z, w } = this.normalize();

        const xx = x * x;
        const yy = y * y;
        const zz = z * z;
        const xy = x * y;
        const xz = x * z;
        const yz = y * z;
        const wx = w * x;
        const wy = w * y;
        const wz = w * z;

        return new Mat4(
            1 - 2 * (yy + zz),
            2 * (xy - wz),
            2 * (xz + wy),
            0,
            2 * (xy + wz),
            1 - 2 * (xx + zz),
            2 * (yz - wx),
            0,
            2 * (xz - wy),
            2 * (yz + wx),
            1 - 2 * (xx + yy),
            0,
            0,
            0,
            0,
            1
        );
    }

    /**
     * Multiplies this quaternion by another quaternion.
     * @param {Quat} q - The quaternion to multiply with.
     * @returns {Quat} The resulting quaternion.
     */
    multiply(q) {
        if (!(q instanceof Quat)) {
            throw new TypeError("Argument must be an instance of Quat");
        }

        const x = this.#w * q.x + this.#x * q.w + this.#y * q.z - this.#z * q.y;
        const y = this.#w * q.y - this.#x * q.z + this.#y * q.w + this.#z * q.x;
        const z = this.#w * q.z + this.#x * q.y - this.#y * q.x + this.#z * q.w;
        const w = this.#w * q.w - this.#x * q.x - this.#y * q.y - this.#z * q.z;

        return new Quat(x, y, z, w).normalize();
    }

    /**
     * Returns the conjugate of the quaternion.
     * @returns {Quat} The conjugate quaternion.
     */
    conjugate() {
        return new Quat(-this.#x, -this.#y, -this.#z, this.#w);
    }

    /**
     * Returns a copy of the quaternion.
     * @returns {Quat} A new quaternion with the same components.
     */
    clone() {
        return new Quat(this.#x, this.#y, this.#z, this.#w);
    }

    /**
     * Returns a string representation of the quaternion.
     * @returns {string} The string representation.
     */
    toString() {
        return `Quat( ${formatSmallFloats(this.#x)}, ${formatSmallFloats(
            this.#y
        )}, ${formatSmallFloats(this.#z)}, ${formatSmallFloats(this.#w)} )`;
    }
}

export { Vec2, Vec3, Mat3, Mat4 };
