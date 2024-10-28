import Mat2 from "./mat2.js";
import Mat3 from "./mat3.js";

import {
    validateNonZero,
    validateNumber,
    validateRange,
    validateVector2,
} from "./validation.js";

/**
 * Represents a two-dimensional vector.
 *
 * @class
 */
class Vec2 {
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
     * Constructs a new Vec2 instance.
     *
     * @param {number} [x=0] - The x-component of the vector.
     * @param {number} [y=0] - The y-component of the vector.
     */
    constructor(x = 0, y = 0) {
        if (x !== undefined) this.x = x;
        if (y !== undefined) this.y = y;
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
     * Adds another vector to this vector.
     *
     * @param {Vec2} vector - The vector to add.
     * @returns {Vec2} The updated vector (this instance).
     * @throws {TypeError} If the provided vector is not an instance of Vec2.
     */
    add(vector) {
        validateVector2(vector);
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    /**
     * Subtracts another vector from this vector.
     *
     * @param {Vec2} vector - The vector to subtract.
     * @returns {Vec2} The updated vector (this instance).
     * @throws {TypeError} If the provided vector is not an instance of Vec2.
     */
    subtract(vector) {
        validateVector2(vector);
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    /**
     * Multiplies this vector by a scalar.
     *
     * @param {number} scalar - The scalar to multiply by.
     * @returns {Vec2} The updated vector (this instance).
     * @throws {TypeError} If the provided scalar is not a number.
     */
    multiplyScalar(scalar) {
        validateNumber(scalar, "scalar");
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divides this vector by a scalar.
     *
     * @param {number} scalar - The scalar to divide by.
     * @returns {Vec2} The updated vector (this instance).
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
        return this;
    }

    /**
     * Clamps each component of the vector within the specified minimum and maximum values.
     *
     * @param {Vec2} min - The minimum bounds for each component.
     * @param {Vec2} max - The maximum bounds for each component.
     * @returns {Vec2} The clamped vector (this instance).
     * @throws {TypeError} If either min or max is not an instance of Vec2.
     */
    clamp(min, max) {
        validateVector2(min);
        validateVector2(max);
        this.x = Math.min(Math.max(this.x, min.x), max.x);
        this.y = Math.min(Math.max(this.y, min.y), max.y);
        return this;
    }

    /**
     * Returns the component-wise minimum of this vector and another vector.
     *
     * @param {Vec2} vector - The other vector to compare with.
     * @returns {Vec2} The vector with the minimum components (this instance).
     * @throws {TypeError} If the provided vector is not an instance of Vec2.
     */
    min(vector) {
        validateVector2(vector);
        this.x = Math.min(this.x, vector.x);
        this.y = Math.min(this.y, vector.y);
        return this;
    }

    /**
     * Returns the component-wise maximum of this vector and another vector.
     *
     * @param {Vec2} vector - The other vector to compare with.
     * @returns {Vec2} The vector with the maximum components (this instance).
     * @throws {TypeError} If the provided vector is not an instance of Vec2.
     */
    max(vector) {
        validateVector2(vector);
        this.x = Math.max(this.x, vector.x);
        this.y = Math.max(this.y, vector.y);
        return this;
    }

    /**
     * Linearly interpolates between this vector and another vector by a factor t.
     *
     * @param {Vec2} vector - The target vector to interpolate towards.
     * @param {number} t - The interpolation factor (0 <= t <= 1).
     * @returns {Vec2} The interpolated vector (this instance).
     * @throws {TypeError} If the provided vector is not an instance of Vec2 or if t is not a number.
     * @throws {RangeError} If t is not between 0 and 1.
     */
    lerp(vector, t) {
        validateVector2(vector);
        validateNumber(t, "interpolation factor");
        validateRange(t, { msg: "Interpolation factor t" });

        this.x += (vector.x - this.x) * t;
        this.y += (vector.y - this.y) * t;
        return this;
    }

    /**
     * Checks if this vector is equal to another vector.
     *
     * @param {Vec2} vector - The other vector to compare with.
     * @returns {boolean} True if all components are equal, otherwise false.
     * @throws {TypeError} If the provided vector is not an instance of Vec2.
     */
    equals(vector) {
        validateVector2(vector);
        return this.x === vector.x && this.y === vector.y;
    }

    /**
     * Multiplies this vector by a 2x2 or 3x3 matrix.
     *
     * - If a Mat2 is provided, the vector is treated as a direction vector.
     * - If a Mat3 is provided, the vector is treated as a point vector with homogeneous coordinate w=1.
     *
     * @param {Mat2|Mat3} matrix - The matrix to transform the vector with.
     * @returns {Vec2} The transformed vector (this instance).
     * @throws {TypeError} If the provided matrix is not a Mat2 or Mat3 instance.
     */
    transform(matrix) {
        if (matrix instanceof Mat2) {
            const e = matrix.elements;

            const tX = e[0] * this.x + e[2] * this.y;
            const tY = e[1] * this.x + e[3] * this.y;

            this.x = tX;
            this.y = tY;
        } else if (matrix instanceof Mat3) {
            const e = matrix.elements;

            const tX = e[0] * this.x + e[3] * this.y + e[6] * 1;
            const tY = e[1] * this.x + e[4] * this.y + e[7] * 1;

            this.x = tX;
            this.y = tY;
        } else {
            throw new TypeError("Matrix must be an instance of Mat2 or Mat3");
        }

        return this;
    }

    /**
     * Creates a clone of this vector.
     *
     * @returns {Vec2} A new Vec2 instance with the same components as this vector.
     */
    clone() {
        return new Vec2(this.x, this.y);
    }

    /**
     * Returns a string representation of the vector.
     *
     * @returns {string} A string in the format "Vec2(x, y)".
     */
    toString() {
        return `Vec2(${this.x}, ${this.y})`;
    }

    /**
     * Calculates the dot product of this vector with another vector.
     *
     * The dot product is a scalar value that is a measure of the vectors'
     * magnitude and the cosine of the angle between them.
     *
     * @param {Vec2} vector - The other vector to compute the dot product with.
     * @returns {number} The dot product of the two vectors.
     * @throws {TypeError} If the provided vector is not an instance of Vec2.
     */
    dot(vector) {
        validateVector2(vector);
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * Calculates the perpendicular (2D cross product) of this vector with another vector.
     *
     * In 2D, the cross product results in a scalar representing the magnitude
     * of the vector perpendicular to the plane.
     *
     * @param {Vec2} vector - The other vector to compute the perpendicular product with.
     * @returns {number} The scalar perpendicular product of the two vectors.
     * @throws {TypeError} If the provided vector is not an instance of Vec2.
     */
    cross(vector) {
        validateVector2(vector);
        return this.x * vector.y - this.y * vector.x;
    }

    /**
     * Normalizes the vector to have a length of 1.
     *
     * If the vector is a zero vector (length of 0), an error is thrown.
     *
     * @returns {Vec2} The normalized vector (this instance).
     * @throws {Error} If attempting to normalize a zero-length vector.
     */
    normalize() {
        const len = this.length;
        validateNonZero(len, "Cannot normalize a zero length vector");

        this.x /= len;
        this.y /= len;
        return this;
    }

    /**
     * Calculates the Euclidean distance between this vector and another vector.
     *
     * @param {Vec2} vector - The other vector to calculate the distance to.
     * @returns {number} The Euclidean distance between the two vectors.
     * @throws {TypeError} If the provided vector is not an instance of Vec2.
     */
    distanceTo(vector) {
        validateVector2(vector);
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Calculates the length (magnitude) of the vector.
     *
     * @returns {number} The length of the vector.
     * @readonly
     */
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Sets the length (magnitude) of the vector.
     *
     * @param {number} newLength - The desired length of the vector.
     * @throws {Error} If attempting to set length on a zero vector.
     */
    set length(newLength) {
        const currentLength = this.length;

        validateNonZero(currentLength, "Cannot set length of a zero vector");

        const scale = newLength / currentLength;

        this.x *= scale;
        this.y *= scale;
    }

    // Static methods

    /**
     * Adds two vectors and returns a new vector without modifying the originals.
     *
     * @param {Vec2} a - The first vector.
     * @param {Vec2} b - The second vector.
     * @returns {Vec2} A new Vec2 instance representing the sum.
     * @throws {TypeError} If either a or b is not an instance of Vec2.
     */
    static add(a, b) {
        validateVector2(a);
        validateVector2(b);
        return new Vec2(a.x + b.x, a.y + b.y);
    }

    /**
     * Subtracts the second vector from the first and returns a new vector without modifying the originals.
     *
     * @param {Vec2} a - The vector to subtract from.
     * @param {Vec2} b - The vector to subtract.
     * @returns {Vec2} A new Vec2 instance representing the difference.
     * @throws {TypeError} If either a or b is not an instance of Vec2.
     */
    static subtract(a, b) {
        validateVector2(a);
        validateVector2(b);
        return new Vec2(a.x - b.x, a.y - b.y);
    }

    /**
     * Multiplies the provided vector by a scalar.
     *
     * @param {Vec2} vector - The vector to multiply.
     * @param {number} scalar - The scalar to multiply by.
     * @returns {Vec2} The new vector.
     * @throws {TypeError} If the provided vector is not an instance of Vec2 or scalar is not a number.
     */
    static multiplyScalar(vector, scalar) {
        validateVector2(vector);
        validateNumber(scalar, "scalar");

        return new Vec2(vector.x * scalar, vector.y * scalar);
    }

    /**
     * Calculates the dot product of two vectors.
     *
     * @param {Vec2} a - The first vector.
     * @param {Vec2} b - The second vector.
     * @returns {number} The dot product of vectors a and b.
     * @throws {TypeError} If either a or b is not an instance of Vec2.
     */
    static dot(a, b) {
        validateVector2(a);
        validateVector2(b);
        return a.x * b.x + a.y * b.y;
    }

    /**
     * Calculates the perpendicular (2D cross product) of two vectors.
     *
     * @param {Vec2} a - The first vector.
     * @param {Vec2} b - The second vector.
     * @returns {number} The scalar perpendicular product of vectors a and b.
     * @throws {TypeError} If either a or b is not an instance of Vec2.
     */
    static cross(a, b) {
        validateVector2(a);
        validateVector2(b);
        return a.x * b.y - a.y * b.x;
    }

    /**
     * Linearly interpolates between two vectors by a factor t and returns a new vector.
     *
     * @param {Vec2} a - The starting vector.
     * @param {Vec2} b - The ending vector.
     * @param {number} t - The interpolation factor (0 <= t <= 1).
     * @returns {Vec2} A new Vec2 instance representing the interpolated vector.
     * @throws {TypeError} If a or b is not an instance of Vec2 or if t is not a number.
     * @throws {RangeError} If t is not between 0 and 1.
     */
    static lerp(a, b, t) {
        validateVector2(a);
        validateVector2(b);
        validateNumber(t, "interpolation factor");
        validateRange(t, { msg: "Interpolation factor t" });

        return new Vec2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
    }

    /**
     * Creates a new vector by applying a transformation matrix to an existing vector.
     *
     * - If a Mat2 is provided, the vector is treated as a direction vector.
     * - If a Mat3 is provided, the vector is treated as a point vector with homogeneous coordinate w=1.
     *
     * @param {Vec2} vector - The vector to transform. Must be a Vec2 instance.
     * @param {Mat2|Mat3} matrix - The matrix to transform the vector with.
     * @returns {Vec2} A new Vec2 instance representing the transformed vector.
     * @throws {TypeError} If the provided vector is not a Vec2 instance or if the matrix is not a Mat2 or Mat3 instance.
     */
    static fromTransform(vector, matrix) {
        validateVector2(vector);
        return vector.clone().transform(matrix);
    }
}

export default Vec2;
