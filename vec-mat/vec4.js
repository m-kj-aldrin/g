import Mat4 from "./mat4.js";

import {
    validateMat4,
    validateNonZero,
    validateNumber,
    validateRange,
    validateVector4,
} from "./validation.js";

/**
 * Represents a four-dimensional vector.
 *
 * @class
 */
class Vec4 {
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
     * The w-component of the vector.
     * @type {number}
     */
    #w = 1;

    /**
     * Constructs a new Vec4 instance.
     *
     * @param {number} [x=0] - The x-component of the vector.
     * @param {number} [y=0] - The y-component of the vector.
     * @param {number} [z=0] - The z-component of the vector.
     * @param {number} [w=1] - The w-component of the vector.
     */
    constructor(x = 0, y = 0, z = 0, w = 1) {
        if (x !== undefined) this.x = x;
        if (y !== undefined) this.y = y;
        if (z !== undefined) this.z = z;
        if (w !== undefined) this.w = w;
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
     * Gets the w-component of the vector.
     *
     * @type {number}
     * @readonly
     */
    get w() {
        return this.#w;
    }

    /**
     * Sets the w-component of the vector.
     *
     * @param {number} value - The new w-component value.
     * @throws {TypeError} If the provided value is not a number.
     */
    set w(value) {
        validateNumber(value, "w component");
        this.#w = value;
    }

    /**
     * Adds another vector to this vector.
     *
     * @param {Vec4} vector - The vector to add.
     * @returns {Vec4} The updated vector (this instance).
     * @throws {TypeError} If the provided vector is not an instance of Vec4.
     */
    add(vector) {
        validateVector4(vector);
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        this.w += vector.w;
        return this;
    }

    /**
     * Subtracts another vector from this vector.
     *
     * @param {Vec4} vector - The vector to subtract.
     * @returns {Vec4} The updated vector (this instance).
     * @throws {TypeError} If the provided vector is not an instance of Vec4.
     */
    subtract(vector) {
        validateVector4(vector);
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        this.w -= vector.w;
        return this;
    }

    /**
     * Multiplies this vector by a scalar.
     *
     * @param {number} scalar - The scalar to multiply by.
     * @returns {Vec4} The updated vector (this instance).
     * @throws {TypeError} If the provided scalar is not a number.
     */
    multiplyScalar(scalar) {
        validateNumber(scalar, "scalar");
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }

    /**
     * Divides this vector by a scalar.
     *
     * @param {number} scalar - The scalar to divide by.
     * @returns {Vec4} The updated vector (this instance).
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
        this.w /= scalar;
        return this;
    }

    /**
     * Clamps each component of the vector within the specified minimum and maximum values.
     *
     * @param {Vec4} min - The minimum bounds for each component.
     * @param {Vec4} max - The maximum bounds for each component.
     * @returns {Vec4} The clamped vector (this instance).
     * @throws {TypeError} If either min or max is not an instance of Vec4.
     */
    clamp(min, max) {
        validateVector4(min);
        validateVector4(max);
        this.x = Math.min(Math.max(this.x, min.x), max.x);
        this.y = Math.min(Math.max(this.y, min.y), max.y);
        this.z = Math.min(Math.max(this.z, min.z), max.z);
        this.w = Math.min(Math.max(this.w, min.w), max.w);
        return this;
    }

    /**
     * Returns the component-wise minimum of this vector and another vector.
     *
     * @param {Vec4} vector - The other vector to compare with.
     * @returns {Vec4} The vector with the minimum components (this instance).
     * @throws {TypeError} If the provided vector is not an instance of Vec4.
     */
    min(vector) {
        validateVector4(vector);
        this.x = Math.min(this.x, vector.x);
        this.y = Math.min(this.y, vector.y);
        this.z = Math.min(this.z, vector.z);
        this.w = Math.min(this.w, vector.w);
        return this;
    }

    /**
     * Returns the component-wise maximum of this vector and another vector.
     *
     * @param {Vec4} vector - The other vector to compare with.
     * @returns {Vec4} The vector with the maximum components (this instance).
     * @throws {TypeError} If the provided vector is not an instance of Vec4.
     */
    max(vector) {
        validateVector4(vector);
        this.x = Math.max(this.x, vector.x);
        this.y = Math.max(this.y, vector.y);
        this.z = Math.max(this.z, vector.z);
        this.w = Math.max(this.w, vector.w);
        return this;
    }

    /**
     * Linearly interpolates between this vector and another vector by a factor t.
     *
     * @param {Vec4} vector - The target vector to interpolate towards.
     * @param {number} t - The interpolation factor (0 <= t <= 1).
     * @returns {Vec4} The interpolated vector (this instance).
     * @throws {TypeError} If the provided vector is not an instance of Vec4 or if t is not a number.
     * @throws {RangeError} If t is not between 0 and 1.
     */
    lerp(vector, t) {
        validateVector4(vector);
        validateNumber(t, "interpolation factor");
        validateRange(t, { msg: "Interpolation factor t" });

        this.x += (vector.x - this.x) * t;
        this.y += (vector.y - this.y) * t;
        this.z += (vector.z - this.z) * t;
        this.w += (vector.w - this.w) * t;
        return this;
    }

    /**
     * Checks if this vector is equal to another vector.
     *
     * @param {Vec4} vector - The other vector to compare with.
     * @returns {boolean} True if all components are equal, otherwise false.
     * @throws {TypeError} If the provided vector is not an instance of Vec4.
     */
    equals(vector) {
        validateVector4(vector);
        return (
            this.x === vector.x &&
            this.y === vector.y &&
            this.z === vector.z &&
            this.w === vector.w
        );
    }

    /**
     * Multiplies this vector by a 4x4 matrix.
     *
     * This operation transforms the vector by the given matrix, including translation,
     * scaling, rotation, and perspective projection. If the resulting w-component is
     * not 1 (and not 0), perspective division is performed to normalize the vector.
     *
     * @param {Mat4} matrix - The 4x4 matrix to transform the vector with.
     * @returns {Vec4} The transformed vector (this instance).
     * @throws {TypeError} If the provided matrix is not an instance of Mat4.
     */
    transform(matrix) {
        validateMat4(matrix);

        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;

        const e = matrix.elements;

        const tX = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
        const tY = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
        const tZ = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
        const tW = e[3] * x + e[7] * y + e[11] * z + e[15] * w;

        this.x = tX;
        this.y = tY;
        this.z = tZ;
        this.w = tW;

        if (this.w !== 0 && this.w !== 1) {
            this.x /= this.w;
            this.y /= this.w;
            this.z /= this.w;
            this.w = 1;
        }

        return this;
    }

    /**
     * Creates a clone of this vector.
     *
     * @returns {Vec4} A new Vec4 instance with the same components as this vector.
     */
    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }

    /**
     * Returns a string representation of the vector.
     *
     * @returns {string} A string in the format "Vec4(x, y, z, w)".
     */
    toString() {
        return `Vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    /**
     * Calculates the dot product of this vector with another vector.
     *
     * The dot product is a scalar value that is a measure of the vectors'
     * magnitude and the cosine of the angle between them.
     *
     * @param {Vec4} vector - The other vector to compute the dot product with.
     * @returns {number} The dot product of the two vectors.
     * @throws {TypeError} If the provided vector is not an instance of Vec4.
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
     * Calculates the cross product of this vector with another vector.
     *
     * @param {Vec4} vector - The other vector to compute the cross product with.
     * @returns {Vec4} The updated vector (this instance) after cross product.
     * @throws {TypeError} If the provided vector is not an instance of Vec4.
     */
    cross(vector) {
        validateVector4(vector);
        const crossX = this.y * vector.z - this.z * vector.y;
        const crossY = this.z * vector.x - this.x * vector.z;
        const crossZ = this.x * vector.y - this.y * vector.x;
        this.x = crossX;
        this.y = crossY;
        this.z = crossZ;
        this.w = 0; // Consistent with the original intention
        return this;
    }

    /**
     * Normalizes the vector to have a length of 1.
     *
     * If the vector is a zero vector (length of 0), an error is thrown.
     *
     * @returns {Vec4} The normalized vector (this instance).
     * @throws {Error} If attempting to normalize a zero-length vector.
     */
    normalize() {
        const len = this.length();
        validateNonZero(len, "Cannot normalize a zero length vector");

        this.x /= len;
        this.y /= len;
        this.z /= len;
        this.w /= len;
        return this;
    }

    /**
     * Calculates the Euclidean distance between this vector and another vector.
     *
     * @param {Vec4} vector - The other vector to calculate the distance to.
     * @returns {number} The Euclidean distance between the two vectors.
     * @throws {TypeError} If the provided vector is not an instance of Vec4.
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
     * Calculates the length (magnitude) of the vector.
     *
     * @returns {number} The length of the vector.
     */
    length() {
        return Math.sqrt(
            this.x * this.x +
                this.y * this.y +
                this.z * this.z +
                this.w * this.w
        );
    }

    // Static methods

    /**
     * Adds two vectors and returns a new vector without modifying the originals.
     *
     * @param {Vec4} a - The first vector.
     * @param {Vec4} b - The second vector.
     * @returns {Vec4} A new Vec4 instance representing the sum.
     * @throws {TypeError} If either a or b is not an instance of Vec4.
     */
    static add(a, b) {
        validateVector4(a);
        validateVector4(b);
        return new Vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    }

    /**
     * Subtracts the second vector from the first and returns a new vector without modifying the originals.
     *
     * @param {Vec4} a - The vector to subtract from.
     * @param {Vec4} b - The vector to subtract.
     * @returns {Vec4} A new Vec4 instance representing the difference.
     * @throws {TypeError} If either a or b is not an instance of Vec4.
     */
    static subtract(a, b) {
        validateVector4(a);
        validateVector4(b);
        return new Vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }

    /**
     * Multiplies the provided vector by a scalar.
     *
     * @param {Vec4} vector - The vector to multiply from.
     * @param {number} scalar - The scalar to multiply by.
     * @returns {Vec4} The new vector.
     * @throws {TypeError} If the provided vector is not an instance of Vec4 or scalar is not a number.
     */
    static multiplyScalar(vector, scalar) {
        validateVector4(vector);
        validateNumber(scalar, "scalar");

        return new Vec4(
            vector.x * scalar,
            vector.y * scalar,
            vector.z * scalar,
            vector.w * scalar
        );
    }

    /**
     * Calculates the dot product of two vectors.
     *
     * @param {Vec4} a - The first vector.
     * @param {Vec4} b - The second vector.
     * @returns {number} The dot product of vectors a and b.
     * @throws {TypeError} If either a or b is not an instance of Vec4.
     */
    static dot(a, b) {
        validateVector4(a);
        validateVector4(b);
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }

    /**
     * Calculates the cross product of two vectors.
     *
     * **Note:** The cross product is traditionally defined for three-dimensional vectors.
     * In this implementation, the w-component is ignored, and the resulting vector's w-component
     * is set to 0.
     *
     * @param {Vec4} a - The first vector.
     * @param {Vec4} b - The second vector.
     * @returns {Vec4} A new Vec4 instance representing the cross product.
     * @throws {TypeError} If either a or b is not an instance of Vec4.
     */
    static cross(a, b) {
        validateVector4(a);
        validateVector4(b);
        const crossX = a.y * b.z - a.z * b.y;
        const crossY = a.z * b.x - a.x * b.z;
        const crossZ = a.x * b.y - a.y * b.x;
        return new Vec4(crossX, crossY, crossZ, 0);
    }

    /**
     * Linearly interpolates between two vectors by a factor t and returns a new vector.
     *
     * @param {Vec4} a - The starting vector.
     * @param {Vec4} b - The ending vector.
     * @param {number} t - The interpolation factor (0 <= t <= 1).
     * @returns {Vec4} A new Vec4 instance representing the interpolated vector.
     * @throws {TypeError} If a or b is not an instance of Vec4 or if t is not a number.
     * @throws {RangeError} If t is not between 0 and 1.
     */
    static lerp(a, b, t) {
        validateVector4(a);
        validateVector4(b);
        validateNumber(t, "interpolation factor");
        validateRange(t, { msg: "Interpolation factor t" });

        return new Vec4(
            a.x + (b.x - a.x) * t,
            a.y + (b.y - a.y) * t,
            a.z + (b.z - a.z) * t,
            a.w + (b.w - a.w) * t
        );
    }

    /**
     * Creates a new vector by applying a transformation matrix to an existing vector.
     *
     * This method does not modify the original vector but returns a new transformed vector.
     *
     * @param {Vec4} vector - The vector to transform. Must be a Vec4 instance.
     * @param {Mat4} matrix - The 4x4 transformation matrix to apply.
     * @returns {Vec4} A new Vec4 instance representing the transformed vector.
     * @throws {TypeError} If the provided vector is not a Vec4 instance or if the matrix is not a Mat4 instance.
     */
    static fromTransform(vector, matrix) {
        validateVector4(vector);
        validateMat4(matrix);

        return vector.clone().transform(matrix);
    }
}

export default Vec4;
