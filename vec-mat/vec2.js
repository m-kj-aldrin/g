import Mat3 from "./mat3.js";

/**
 * Represents a 2-dimensional vector in a right-handed coordinate system.
 */
class Vec2 {
    /**
     * Creates a new Vec2 instance.
     * @param {number} [x=0] - X-component.
     * @param {number} [y=0] - Y-component.
     */
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    /**
     * X-component of the vector.
     * @type {number}
     */
    get x() {
        return this._x;
    }

    set x(value) {
        if (typeof value !== "number") {
            throw new TypeError('Property "x" must be a number.');
        }
        this._x = value;
    }

    /**
     * Y-component of the vector.
     * @type {number}
     */
    get y() {
        return this._y;
    }

    set y(value) {
        if (typeof value !== "number") {
            throw new TypeError('Property "y" must be a number.');
        }
        this._y = value;
    }

    /**
     * Creates a clone of this vector.
     * @returns {Vec2} A new Vec2 instance with the same components.
     */
    clone() {
        return new Vec2(this.x, this.y);
    }

    /**
     * Adds another vector to this vector.
     * @param {Vec2} other - Vector to add.
     * @returns {Vec2} This instance for chaining.
     */
    add(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    /**
     * Subtracts another vector from this vector.
     * @param {Vec2} other - Vector to subtract.
     * @returns {Vec2} This instance for chaining.
     */
    subtract(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    /**
     * Multiplies this vector by another vector component-wise.
     * @param {Vec2} other - Vector to multiply with.
     * @returns {Vec2} This instance for chaining.
     */
    multiply(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }

    /**
     * Divides this vector by another vector component-wise.
     * @param {Vec2} other - Vector to divide by.
     * @returns {Vec2} This instance for chaining.
     */
    divide(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        if (other.x === 0 || other.y === 0) {
            throw new Error("Division by zero.");
        }
        this.x /= other.x;
        this.y /= other.y;
        return this;
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - Scalar to multiply with.
     * @returns {Vec2} This instance for chaining.
     */
    multiplyScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divides this vector by a scalar.
     * @param {number} scalar - Scalar to divide by.
     * @returns {Vec2} This instance for chaining.
     */
    divideScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        if (scalar === 0) {
            throw new Error("Division by zero.");
        }
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    /**
     * Negates this vector (multiplies components by -1).
     * @returns {Vec2} This instance for chaining.
     */
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     * Normalizes this vector to unit length.
     * @returns {Vec2} This instance for chaining.
     * @throws {Error} If the vector length is zero.
     */
    normalize() {
        const len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        this.divideScalar(len);
        return this;
    }

    /**
     * Calculates the dot product with another vector.
     * @param {Vec2} other - Vector to dot with.
     * @returns {number} The dot product.
     */
    dot(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Returns the magnitude (length) of the vector.
     * @returns {number} The length of the vector.
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Returns the squared magnitude of the vector.
     * @returns {number} The squared length of the vector.
     */
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * Computes the distance to another vector.
     * @param {Vec2} other - Vector to compute distance to.
     * @returns {number} The distance.
     */
    distanceTo(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Computes the squared distance to another vector.
     * @param {Vec2} other - Vector to compute squared distance to.
     * @returns {number} The squared distance.
     */
    distanceSquaredTo(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return dx * dx + dy * dy;
    }

    /**
     * Calculates the angle to another vector (in radians).
     * @param {Vec2} other - Vector to calculate angle to.
     * @returns {number} The angle in radians.
     * @throws {Error} If either vector has zero length.
     */
    angleTo(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        const len1 = this.length();
        const len2 = other.length();
        if (len1 === 0 || len2 === 0) {
            throw new Error("Cannot calculate angle with zero-length vector.");
        }
        const dotProd = this.dot(other);
        const cosTheta = dotProd / (len1 * len2);
        // Clamp to handle numerical inaccuracies
        return Math.acos(Math.max(-1, Math.min(1, cosTheta)));
    }

    /**
     * Linearly interpolates between this vector and another vector by factor t.
     * @param {Vec2} other - The target vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec2} This instance for chaining.
     */
    lerp(other, t) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        if (typeof t !== "number") {
            throw new TypeError('Parameter "t" must be a number.');
        }
        this.x += (other.x - this.x) * t;
        this.y += (other.y - this.y) * t;
        return this;
    }

    /**
     * Transforms this vector using a Mat3.
     * @param {Mat3} matrix - The transformation matrix.
     * @returns {Vec2} This instance for chaining.
     */
    transform(matrix) {
        if (!(matrix instanceof Mat3)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat3.'
            );
        }
        const x = this.x;
        const y = this.y;
        const e = matrix.elements;
        const tx = e[0] * x + e[3] * y + e[6];
        const ty = e[1] * x + e[4] * y + e[7];
        const tz = e[2] * x + e[5] * y + e[8];
        if (tz !== 0 && tz !== 1) {
            this.x = tx / tz;
            this.y = ty / tz;
        } else {
            this.x = tx;
            this.y = ty;
        }
        return this;
    }

    /**
     * Projects this vector onto another vector.
     * @param {Vec2} target - The target vector to project onto.
     * @returns {Vec2} This instance for chaining.
     */
    projectOnVector(target) {
        if (!(target instanceof Vec2)) {
            throw new TypeError(
                'Parameter "target" must be an instance of Vec2.'
            );
        }
        const targetLenSq = target.lengthSquared();
        if (targetLenSq === 0) {
            throw new Error("Cannot project onto a zero-length vector.");
        }
        const scalar = this.dot(target) / targetLenSq;
        this.x = target.x * scalar;
        this.y = target.y * scalar;
        return this;
    }

    /**
     * Reflects the vector around a given normal.
     * @param {Vec2} normal - The normal vector to reflect around.
     * @returns {Vec2} This instance for chaining.
     */
    reflect(normal) {
        if (!(normal instanceof Vec2)) {
            throw new TypeError(
                'Parameter "normal" must be an instance of Vec2.'
            );
        }
        const lenSq = normal.lengthSquared();
        if (lenSq === 0) {
            throw new Error("Normal vector cannot be zero-length.");
        }
        const dotProduct = this.dot(normal);
        this.x = this.x - 2 * (dotProduct / lenSq) * normal.x;
        this.y = this.y - 2 * (dotProduct / lenSq) * normal.y;
        return this;
    }

    /**
     * Returns the angle between this vector and the positive X-axis.
     * @returns {number} The angle in radians.
     */
    angle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Rotates the vector by a given angle (in radians).
     * @param {number} angle - The angle to rotate by in radians.
     * @returns {Vec2} This instance for chaining.
     */
    rotate(angle) {
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Checks if this vector equals another vector.
     * @param {Vec2} other - Vector to compare with.
     * @returns {boolean} True if equal, false otherwise.
     */
    equals(other) {
        if (!(other instanceof Vec2)) {
            return false;
        }
        return this.x === other.x && this.y === other.y;
    }

    /**
     * Sets each component to the minimum of itself and the corresponding component of another vector.
     * @param {Vec2} other - Vector to compare with.
     * @returns {Vec2} This instance for chaining.
     */
    min(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        this.x = Math.min(this.x, other.x);
        this.y = Math.min(this.y, other.y);
        return this;
    }

    /**
     * Sets each component to the maximum of itself and the corresponding component of another vector.
     * @param {Vec2} other - Vector to compare with.
     * @returns {Vec2} This instance for chaining.
     */
    max(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        this.x = Math.max(this.x, other.x);
        this.y = Math.max(this.y, other.y);
        return this;
    }

    /**
     * Clamps this vector's components between the components of minVec and maxVec.
     * @param {Vec2} minVec - The minimum vector.
     * @param {Vec2} maxVec - The maximum vector.
     * @returns {Vec2} This instance for chaining.
     */
    clamp(minVec, maxVec) {
        if (!(minVec instanceof Vec2) || !(maxVec instanceof Vec2)) {
            throw new TypeError(
                'Parameters "minVec" and "maxVec" must be instances of Vec2.'
            );
        }
        this.x = Math.max(minVec.x, Math.min(maxVec.x, this.x));
        this.y = Math.max(minVec.y, Math.min(maxVec.y, this.y));
        return this;
    }

    /**
     * Sets the length of this vector to the given value.
     * @param {number} length - The desired length.
     * @returns {Vec2} This instance for chaining.
     */
    setLength(length) {
        if (typeof length !== "number") {
            throw new TypeError('Parameter "length" must be a number.');
        }
        this.normalize();
        this.multiplyScalar(length);
        return this;
    }

    /**
     * Converts this vector to an array.
     * @returns {number[]} An array containing the x and y components.
     */
    toArray() {
        return [this.x, this.y];
    }

    /**
     * Sets the components of this vector from an array.
     * @param {number[]} array - Array containing at least two numbers.
     * @returns {Vec2} This instance for chaining.
     * @throws {TypeError} If the input is not an array of numbers.
     * @throws {RangeError} If the array does not contain at least two elements.
     */
    fromArray(array) {
        if (!Array.isArray(array)) {
            throw new TypeError('Parameter "array" must be an array.');
        }
        if (array.length < 2) {
            throw new RangeError("Array must contain at least two elements.");
        }
        const [x, y] = array;
        if (typeof x !== "number" || typeof y !== "number") {
            throw new TypeError("Array elements must be numbers.");
        }
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string} The string representation.
     */
    toString() {
        return `Vec2(${this.x}, ${this.y})`;
    }

    /**
     * Adds two vectors and returns a new vector.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {Vec2} New Vec2 instance representing the sum.
     * @throws {TypeError} If either parameter is not an instance of Vec2.
     */
    static add(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec2.'
            );
        }
        return new Vec2(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     * Subtracts v2 from v1 and returns a new vector.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {Vec2} New Vec2 instance representing the difference.
     * @throws {TypeError} If either parameter is not an instance of Vec2.
     */
    static subtract(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec2.'
            );
        }
        return new Vec2(v1.x - v2.x, v1.y - v2.y);
    }

    /**
     * Multiplies two vectors component-wise and returns a new vector.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {Vec2} New Vec2 instance representing the product.
     * @throws {TypeError} If either parameter is not an instance of Vec2.
     */
    static multiply(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec2.'
            );
        }
        return new Vec2(v1.x * v2.x, v1.y * v2.y);
    }

    /**
     * Divides v1 by v2 component-wise and returns a new vector.
     * @param {Vec2} v1 - Numerator vector.
     * @param {Vec2} v2 - Denominator vector.
     * @returns {Vec2} New Vec2 instance representing the quotient.
     * @throws {TypeError} If either parameter is not an instance of Vec2.
     * @throws {Error} If division by zero occurs.
     */
    static divide(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec2.'
            );
        }
        if (v2.x === 0 || v2.y === 0) {
            throw new Error("Division by zero.");
        }
        return new Vec2(v1.x / v2.x, v1.y / v2.y);
    }

    /**
     * Multiplies a vector by a scalar and returns a new vector.
     * @param {Vec2} v - The vector to multiply.
     * @param {number} scalar - The scalar to multiply with.
     * @returns {Vec2} New Vec2 instance representing the product.
     * @throws {TypeError} If the first parameter is not an instance of Vec2 or the scalar is not a number.
     */
    static multiplyScalar(v, scalar) {
        if (!(v instanceof Vec2)) {
            throw new TypeError('Parameter "v" must be an instance of Vec2.');
        }
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        return new Vec2(v.x * scalar, v.y * scalar);
    }

    /**
     * Divides a vector by a scalar and returns a new vector.
     * @param {Vec2} v - The vector to divide.
     * @param {number} scalar - The scalar to divide by.
     * @returns {Vec2} New Vec2 instance representing the quotient.
     * @throws {TypeError} If the first parameter is not an instance of Vec2 or the scalar is not a number.
     * @throws {Error} If division by zero occurs.
     */
    static divideScalar(v, scalar) {
        if (!(v instanceof Vec2)) {
            throw new TypeError('Parameter "v" must be an instance of Vec2.');
        }
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        if (scalar === 0) {
            throw new Error("Division by zero.");
        }
        return new Vec2(v.x / scalar, v.y / scalar);
    }

    /**
     * Returns the negation of a vector.
     * @param {Vec2} v - The vector to negate.
     * @returns {Vec2} New Vec2 instance representing the negated vector.
     * @throws {TypeError} If the parameter is not an instance of Vec2.
     */
    static negate(v) {
        if (!(v instanceof Vec2)) {
            throw new TypeError('Parameter "v" must be an instance of Vec2.');
        }
        return new Vec2(-v.x, -v.y);
    }

    /**
     * Normalizes a vector and returns a new vector.
     * @param {Vec2} v - The vector to normalize.
     * @returns {Vec2} New Vec2 instance representing the normalized vector.
     * @throws {TypeError} If the parameter is not an instance of Vec2.
     * @throws {Error} If the vector length is zero.
     */
    static normalize(v) {
        if (!(v instanceof Vec2)) {
            throw new TypeError('Parameter "v" must be an instance of Vec2.');
        }
        const len = v.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return Vec2.divideScalar(v, len);
    }

    /**
     * Calculates the dot product of two vectors.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {number} The dot product.
     * @throws {TypeError} If either parameter is not an instance of Vec2.
     */
    static dot(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec2.'
            );
        }
        return v1.x * v2.x + v1.y * v2.y;
    }

    /**
     * Computes the distance between two vectors.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {number} The distance.
     * @throws {TypeError} If either parameter is not an instance of Vec2.
     */
    static distance(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec2.'
            );
        }
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Computes the squared distance between two vectors.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {number} The squared distance.
     * @throws {TypeError} If either parameter is not an instance of Vec2.
     */
    static distanceSquared(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec2.'
            );
        }
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        return dx * dx + dy * dy;
    }

    /**
     * Calculates the angle between two vectors (in radians).
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {number} The angle in radians.
     * @throws {TypeError} If either parameter is not an instance of Vec2.
     * @throws {Error} If either vector has zero length.
     */
    static angleBetween(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec2.'
            );
        }
        const len1 = v1.length();
        const len2 = v2.length();
        if (len1 === 0 || len2 === 0) {
            throw new Error("Cannot calculate angle with zero-length vector.");
        }
        const dotProd = Vec2.dot(v1, v2);
        const cosTheta = dotProd / (len1 * len2);
        // Clamp to handle numerical inaccuracies
        return Math.acos(Math.max(-1, Math.min(1, cosTheta)));
    }

    /**
     * Linearly interpolates between two vectors by factor t and returns a new vector.
     * @param {Vec2} v1 - Starting vector.
     * @param {Vec2} v2 - Ending vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec2} New Vec2 instance representing the interpolated vector.
     * @throws {TypeError} If parameters are of incorrect types.
     */
    static lerp(v1, v2, t) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec2.'
            );
        }
        if (typeof t !== "number") {
            throw new TypeError('Parameter "t" must be a number.');
        }
        return new Vec2(v1.x + (v2.x - v1.x) * t, v1.y + (v2.y - v1.y) * t);
    }

    /**
     * Projects vector v onto target.
     * @param {Vec2} v - The vector to project.
     * @param {Vec2} target - The target vector to project onto.
     * @returns {Vec2} New Vec2 instance representing the projection.
     * @throws {TypeError} If parameters are of incorrect types.
     * @throws {Error} If the target vector has zero length.
     */
    static projectOnVector(v, target) {
        if (!(v instanceof Vec2) || !(target instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v" and "target" must be instances of Vec2.'
            );
        }
        const targetLenSq = target.lengthSquared();
        if (targetLenSq === 0) {
            throw new Error("Cannot project onto a zero-length vector.");
        }
        const scalar = Vec2.dot(v, target) / targetLenSq;
        return new Vec2(target.x * scalar, target.y * scalar);
    }

    /**
     * Reflects vector v around a given normal.
     * @param {Vec2} v - The vector to reflect.
     * @param {Vec2} normal - The normal vector to reflect around.
     * @returns {Vec2} New Vec2 instance representing the reflected vector.
     * @throws {TypeError} If parameters are of incorrect types.
     * @throws {Error} If the normal vector has zero length.
     */
    static reflect(v, normal) {
        if (!(v instanceof Vec2) || !(normal instanceof Vec2)) {
            throw new TypeError(
                'Parameters "v" and "normal" must be instances of Vec2.'
            );
        }
        const lenSq = normal.lengthSquared();
        if (lenSq === 0) {
            throw new Error("Normal vector cannot be zero-length.");
        }
        const dotProduct = Vec2.dot(v, normal);
        const reflectedX = v.x - 2 * (dotProduct / lenSq) * normal.x;
        const reflectedY = v.y - 2 * (dotProduct / lenSq) * normal.y;
        return new Vec2(reflectedX, reflectedY);
    }

    /**
     * Creates a vector from an array.
     * @param {number[]} array - Array containing at least two numbers.
     * @returns {Vec2} New Vec2 instance.
     * @throws {TypeError} If the input is not an array of numbers.
     * @throws {RangeError} If the array does not contain at least two elements.
     */
    static fromArray(array) {
        const vec = new Vec2();
        vec.fromArray(array);
        return vec;
    }

    /**
     * Creates a vector from an object with relevant component properties.
     * @param {Object} object - Object containing x and y properties.
     * @returns {Vec2} New Vec2 instance.
     * @throws {TypeError} If the input is not an object or lacks x and y properties.
     */
    static fromObject(object) {
        if (typeof object !== "object" || object === null) {
            throw new TypeError(
                'Parameter "object" must be a non-null object.'
            );
        }
        const { x, y } = object;
        if (typeof x !== "number" || typeof y !== "number") {
            throw new TypeError(
                'Object properties "x" and "y" must be numbers.'
            );
        }
        return new Vec2(x, y);
    }

    /**
     * Performs Catmull-Rom spline interpolation.
     * @param {Vec2} v0 - Previous vector.
     * @param {Vec2} v1 - Current vector.
     * @param {Vec2} v2 - Next vector.
     * @param {Vec2} v3 - Next-next vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec2} New Vec2 instance representing the interpolated vector.
     * @throws {TypeError} If parameters are of incorrect types.
     */
    static catmullRom(v0, v1, v2, v3, t) {
        if (
            !(v0 instanceof Vec2) ||
            !(v1 instanceof Vec2) ||
            !(v2 instanceof Vec2) ||
            !(v3 instanceof Vec2)
        ) {
            throw new TypeError(
                'Parameters "v0", "v1", "v2", and "v3" must be instances of Vec2.'
            );
        }
        if (typeof t !== "number") {
            throw new TypeError('Parameter "t" must be a number.');
        }
        const t2 = t * t;
        const t3 = t2 * t;

        const x =
            0.5 *
            (2 * v1.x +
                (-v0.x + v2.x) * t +
                (2 * v0.x - 5 * v1.x + 4 * v2.x - v3.x) * t2 +
                (-v0.x + 3 * v1.x - 3 * v2.x + v3.x) * t3);

        const y =
            0.5 *
            (2 * v1.y +
                (-v0.y + v2.y) * t +
                (2 * v0.y - 5 * v1.y + 4 * v2.y - v3.y) * t2 +
                (-v0.y + 3 * v1.y - 3 * v2.y + v3.y) * t3);

        return new Vec2(x, y);
    }
}

export default Vec2;
