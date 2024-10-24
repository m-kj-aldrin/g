import Mat4 from "./mat4.js";

import {
    getVectorComponents4,
    validateMat4,
    validateNumber,
    validateVector4,
} from "./validation.js";

class Vec4 {
    #x = 0;
    #y = 0;
    #z = 0;
    #w = 1;

    /**
     * Constructs a 4D vector
     * @param {number} [x] x component defaults to 0
     * @param {number} [y] y component defaults to 0
     * @param {number} [z] z component defaults to 0
     * @param {number} [w] w component defaults to 1
     */
    constructor(x, y, z, w) {
        x !== undefined && (this.x = x);
        y !== undefined && (this.y = y);
        z !== undefined && (this.z = z);
        w !== undefined && (this.w = w);
    }

    get x() {
        return this.#x;
    }
    set x(number) {
        validateNumber(number, "x component");
        this.#x = number;
    }

    get y() {
        return this.#y;
    }
    set y(number) {
        validateNumber(number, "y component");
        this.#y = number;
    }

    get z() {
        return this.#z;
    }
    set z(number) {
        validateNumber(number, "z component");
        this.#z = number;
    }

    get w() {
        return this.#w;
    }
    set w(number) {
        validateNumber(number, "w component");
        this.#w = number;
    }

    /**
     * Multiplies this vector with the provided matrix
     * @param {Mat4} matrix 4x4 matrix
     * @returns this vector
     */
    transform(matrix) {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;

        const e = matrix.elements;

        this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
        this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;

        return this;
    }

    /**
     * Clones the vector returning a vector with equal components
     * @returns new vector with components equal this
     */
    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string} String in the format "Vec4(x, y, z, w)".
     */
    toString() {
        return `Vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    /**
     * Computes the dot product with another vector
     * @param {Vec4} vector - The other vector to dot with
     * @returns {number} The dot product
     * @throws {TypeError} If the input is not a Vec4 instance
     */
    dot(vector) {
        validateVector4(vector);
        return (
            this.x * vector.x +
            this.y * vector.y +
            this.z * vector.z +
            this.w * vector.w
        );
    }

    /**
     * Computes the cross product with another vector.
     * Note: The cross product is traditionally defined for 3D vectors. This implementation
     * ignores the w component and sets it to 0 in the resulting vector.
     *
     * @param {Vec4} vector - The other vector to cross with
     * @returns {Vec4} The cross product vector
     * @throws {TypeError} If the input is not a Vec4 instance
     */
    cross(vector) {
        validateVector4(vector);
        const crossX = this.y * vector.z - this.z * vector.y;
        const crossY = this.z * vector.x - this.x * vector.z;
        const crossZ = this.x * vector.y - this.y * vector.x;
        // Set w to 0 as it's not defined in the traditional cross product
        return new Vec4(crossX, crossY, crossZ, 0);
    }

    /**
     * Normalizes the vector to have a length of 1.
     * If the vector is a zero vector, it throws an error.
     *
     * @returns {Vec4} The normalized vector (this instance)
     * @throws {Error} If attempting to normalize a zero-length vector
     */
    normalize() {
        const len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector");
        }
        this.x /= len;
        this.y /= len;
        this.z /= len;
        this.w /= len;
        return this;
    }

    /**
     * Computes the Euclidean distance to another vector.
     *
     * @param {Vec4} vector - The other vector to compute distance to
     * @returns {number} The distance between the two vectors
     * @throws {TypeError} If the input is not a Vec4 instance
     */
    distanceTo(vector) {
        validateVector4(vector);
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        const dz = this.z - vector.z;
        const dw = this.w - vector.w;
        return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
    }

    /**
     * Computes the length (magnitude) of the vector.
     *
     * @returns {number} The length of the vector
     */
    length() {
        return Math.sqrt(
            this.x * this.x +
                this.y * this.y +
                this.z * this.z +
                this.w * this.w
        );
    }

    // static methods

    /**
     * Returns a new vector based on a vector and a transformation matrix
     * @param {Vec4 | [number,number,number,number]} vector
     * @param {Mat4} matrix
     * @returns A new vector
     */
    static fromTransform(vector, matrix) {
        validateVector4(vector);
        validateMat4(matrix);

        /**@type {Vec4} */
        let result;
        if (vector instanceof Vec4) {
            result = vector.clone();
        } else {
            let { x, y, z, w } = getVectorComponents4(vector);
            result = new Vec4(x, y, z, w);
        }

        return result.transform(matrix);
    }
}

export default Vec4;
