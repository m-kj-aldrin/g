import Mat4 from "./_mat4.js";

/**
 * Represents a 4-dimensional vector, often used for homogeneous coordinates in transformations.
 */
class Vec4 {
    /**
     * Creates a new Vec4 instance.
     * @param {number} [x=0] - X-component.
     * @param {number} [y=0] - Y-component.
     * @param {number} [z=0] - Z-component.
     * @param {number} [w=0] - W-component.
     */
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
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
            throw new TypeError('Component "x" must be a number.');
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
            throw new TypeError('Component "y" must be a number.');
        }
        this._y = value;
    }

    /**
     * Z-component of the vector.
     * @type {number}
     */
    get z() {
        return this._z;
    }

    set z(value) {
        if (typeof value !== "number") {
            throw new TypeError('Component "z" must be a number.');
        }
        this._z = value;
    }

    /**
     * W-component of the vector.
     * @type {number}
     */
    get w() {
        return this._w;
    }

    set w(value) {
        if (typeof value !== "number") {
            throw new TypeError('Component "w" must be a number.');
        }
        this._w = value;
    }

    /**
     * Adds another Vec4 to this vector.
     * @param {Vec4} other - Vector to add.
     * @returns {Vec4} This instance for chaining.
     */
    add(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        this._x += other.x;
        this._y += other.y;
        this._z += other.z;
        this._w += other.w;
        return this;
    }

    /**
     * Subtracts another Vec4 from this vector.
     * @param {Vec4} other - Vector to subtract.
     * @returns {Vec4} This instance for chaining.
     */
    subtract(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        this._x -= other.x;
        this._y -= other.y;
        this._z -= other.z;
        this._w -= other.w;
        return this;
    }

    /**
     * Multiplies this vector by another Vec4 component-wise.
     * @param {Vec4} other - Vector to multiply with.
     * @returns {Vec4} This instance for chaining.
     */
    multiply(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        this._x *= other.x;
        this._y *= other.y;
        this._z *= other.z;
        this._w *= other.w;
        return this;
    }

    /**
     * Divides this vector by another Vec4 component-wise.
     * @param {Vec4} other - Vector to divide by.
     * @returns {Vec4} This instance for chaining.
     */
    divide(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        if (other.x === 0 || other.y === 0 || other.z === 0 || other.w === 0) {
            throw new Error(
                "Division by zero in one of the vector components."
            );
        }
        this._x /= other.x;
        this._y /= other.y;
        this._z /= other.z;
        this._w /= other.w;
        return this;
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - Scalar value to multiply.
     * @returns {Vec4} This instance for chaining.
     */
    multiplyScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        this._x *= scalar;
        this._y *= scalar;
        this._z *= scalar;
        this._w *= scalar;
        return this;
    }

    /**
     * Divides this vector by a scalar.
     * @param {number} scalar - Scalar value to divide by.
     * @returns {Vec4} This instance for chaining.
     */
    divideScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        if (scalar === 0) {
            throw new Error("Division by zero.");
        }
        this._x /= scalar;
        this._y /= scalar;
        this._z /= scalar;
        this._w /= scalar;
        return this;
    }

    /**
     * Negates this vector (multiplies all components by -1).
     * @returns {Vec4} This instance for chaining.
     */
    negate() {
        this._x = -this._x;
        this._y = -this._y;
        this._z = -this._z;
        this._w = -this._w;
        return this;
    }

    /**
     * Normalizes this vector to unit length.
     * @returns {Vec4} This instance for chaining.
     * @throws {Error} If the vector length is zero.
     */
    normalize() {
        const len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return this.divideScalar(len);
    }

    /**
     * Calculates the dot product with another Vec4.
     * @param {Vec4} other - Vector to calculate the dot product with.
     * @returns {number} The dot product.
     */
    dot(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        return (
            this._x * other.x +
            this._y * other.y +
            this._z * other.z +
            this._w * other.w
        );
    }

    /**
     * Returns the magnitude (length) of the vector.
     * @returns {number} The length of the vector.
     */
    length() {
        return Math.sqrt(this.lengthSquared());
    }

    /**
     * Returns the squared magnitude of the vector.
     * @returns {number} The squared length of the vector.
     */
    lengthSquared() {
        return (
            this._x * this._x +
            this._y * this._y +
            this._z * this._z +
            this._w * this._w
        );
    }

    /**
     * Computes the distance to another Vec4.
     * @param {Vec4} other - Vector to compute the distance to.
     * @returns {number} The distance.
     */
    distanceTo(other) {
        return Math.sqrt(this.distanceSquaredTo(other));
    }

    /**
     * Computes the squared distance to another Vec4.
     * @param {Vec4} other - Vector to compute the squared distance to.
     * @returns {number} The squared distance.
     */
    distanceSquaredTo(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        const dx = this._x - other.x;
        const dy = this._y - other.y;
        const dz = this._z - other.z;
        const dw = this._w - other.w;
        return dx * dx + dy * dy + dz * dz + dw * dw;
    }

    /**
     * Calculates the angle to another Vec4 in radians.
     * @param {Vec4} other - Vector to calculate the angle to.
     * @returns {number} The angle in radians.
     * @throws {Error} If either vector has zero length.
     */
    angleTo(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        const len1 = this.length();
        const len2 = other.length();
        if (len1 === 0 || len2 === 0) {
            throw new Error("Cannot calculate angle with zero-length vector.");
        }
        const dotProduct = this.dot(other);
        const cosTheta = dotProduct / (len1 * len2);
        // Clamp cosTheta to the range [-1, 1] to avoid NaN due to floating point errors
        return Math.acos(Math.max(-1, Math.min(1, cosTheta)));
    }

    /**
     * Linearly interpolates between this vector and another vector by factor t.
     * @param {Vec4} other - The target vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec4} This instance for chaining.
     */
    lerp(other, t) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        if (typeof t !== "number") {
            throw new TypeError('Parameter "t" must be a number.');
        }
        this._x += (other.x - this._x) * t;
        this._y += (other.y - this._y) * t;
        this._z += (other.z - this._z) * t;
        this._w += (other.w - this._w) * t;
        return this;
    }

    /**
     * Transforms this vector using a Mat4.
     * @param {Mat4} matrix - The matrix to transform with.
     * @returns {Vec4} This instance for chaining.
     */
    transform(matrix) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        const e = matrix.elements;
        const x = this._x,
            y = this._y,
            z = this._z,
            w = this._w;
        this._x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
        this._y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
        this._z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
        this._w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
        // Perform perspective division if w is not 1
        if (this._w !== 0 && this._w !== 1) {
            this._x /= this._w;
            this._y /= this._w;
            this._z /= this._w;
            // Optionally, set w to 1 if perspective division is performed
            // this._w = 1;
        }
        return this;
    }

    /**
     * Projects this vector onto another vector.
     * @param {Vec4} vector - The target vector to project onto.
     * @returns {Vec4} This instance for chaining.
     */
    projectOnVector(vector) {
        if (!(vector instanceof Vec4)) {
            throw new TypeError(
                'Parameter "vector" must be an instance of Vec4.'
            );
        }
        const scalar = this.dot(vector) / vector.lengthSquared();
        this._x = scalar * vector.x;
        this._y = scalar * vector.y;
        this._z = scalar * vector.z;
        this._w = scalar * vector.w;
        return this;
    }

    /**
     * Projects this vector onto a plane defined by a normal.
     * @param {Vec4} normal - The normal vector of the plane.
     * @returns {Vec4} This instance for chaining.
     */
    projectOnPlane(normal) {
        if (!(normal instanceof Vec4)) {
            throw new TypeError(
                'Parameter "normal" must be an instance of Vec4.'
            );
        }
        const dotProduct = this.dot(normal);
        const normLengthSquared = normal.lengthSquared();
        if (normLengthSquared === 0) {
            throw new Error(
                "Cannot project onto a plane with a zero-length normal vector."
            );
        }
        const scalar = dotProduct / normLengthSquared;
        this._x -= scalar * normal.x;
        this._y -= scalar * normal.y;
        this._z -= scalar * normal.z;
        this._w -= scalar * normal.w;
        return this;
    }

    /**
     * Reflects the vector around a given normal.
     * @param {Vec4} normal - The normal vector to reflect around.
     * @returns {Vec4} This instance for chaining.
     */
    reflect(normal) {
        if (!(normal instanceof Vec4)) {
            throw new TypeError(
                'Parameter "normal" must be an instance of Vec4.'
            );
        }
        const dotProduct = this.dot(normal);
        const normLengthSquared = normal.lengthSquared();
        if (normLengthSquared === 0) {
            throw new Error(
                "Cannot reflect around a plane with a zero-length normal vector."
            );
        }
        const scalar = (2 * dotProduct) / normLengthSquared;
        this._x -= scalar * normal.x;
        this._y -= scalar * normal.y;
        this._z -= scalar * normal.z;
        this._w -= scalar * normal.w;
        return this;
    }

    /**
     * Checks if this vector equals another vector.
     * @param {Vec4} other - Vector to compare with.
     * @returns {boolean} True if equal, false otherwise.
     */
    equals(other) {
        if (!(other instanceof Vec4)) {
            return false;
        }
        return (
            this._x === other.x &&
            this._y === other.y &&
            this._z === other.z &&
            this._w === other.w
        );
    }

    /**
     * Sets each component to the minimum of itself and the corresponding component of another vector.
     * @param {Vec4} other - Vector to compare with.
     * @returns {Vec4} This instance for chaining.
     */
    min(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        this._x = Math.min(this._x, other.x);
        this._y = Math.min(this._y, other.y);
        this._z = Math.min(this._z, other.z);
        this._w = Math.min(this._w, other.w);
        return this;
    }

    /**
     * Sets each component to the maximum of itself and the corresponding component of another vector.
     * @param {Vec4} other - Vector to compare with.
     * @returns {Vec4} This instance for chaining.
     */
    max(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        this._x = Math.max(this._x, other.x);
        this._y = Math.max(this._y, other.y);
        this._z = Math.max(this._z, other.z);
        this._w = Math.max(this._w, other.w);
        return this;
    }

    /**
     * Clamps this vector's components between the components of minVec and maxVec.
     * @param {Vec4} minVec - The minimum vector.
     * @param {Vec4} maxVec - The maximum vector.
     * @returns {Vec4} This instance for chaining.
     */
    clamp(minVec, maxVec) {
        if (!(minVec instanceof Vec4)) {
            throw new TypeError(
                'Parameter "minVec" must be an instance of Vec4.'
            );
        }
        if (!(maxVec instanceof Vec4)) {
            throw new TypeError(
                'Parameter "maxVec" must be an instance of Vec4.'
            );
        }
        this._x = Math.max(minVec.x, Math.min(this._x, maxVec.x));
        this._y = Math.max(minVec.y, Math.min(this._y, maxVec.y));
        this._z = Math.max(minVec.z, Math.min(this._z, maxVec.z));
        this._w = Math.max(minVec.w, Math.min(this._w, maxVec.w));
        return this;
    }

    /**
     * Sets the length of this vector to the given value.
     * @param {number} length - The desired length.
     * @returns {Vec4} This instance for chaining.
     * @throws {Error} If the vector length is zero.
     */
    setLength(length) {
        if (typeof length !== "number") {
            throw new TypeError('Parameter "length" must be a number.');
        }
        const currentLength = this.length();
        if (currentLength === 0) {
            throw new Error("Cannot set length on a zero-length vector.");
        }
        return this.multiplyScalar(length / currentLength);
    }

    /**
     * Creates a clone of this vector.
     * @returns {Vec4} A new Vec4 instance with the same components.
     */
    clone() {
        return new Vec4(this._x, this._y, this._z, this._w);
    }

    /**
     * Converts this vector to an array.
     * @returns {number[]} An array containing the vector components.
     */
    toArray() {
        return [this._x, this._y, this._z, this._w];
    }

    /**
     * Sets the components of this vector from an array.
     * @param {number[]} array - Array containing the vector components.
     * @returns {Vec4} This instance for chaining.
     * @throws {TypeError} If the input is not an array of four numbers.
     */
    fromArray(array) {
        if (!Array.isArray(array) || array.length !== 4) {
            throw new TypeError("Input must be an array of four numbers.");
        }
        const [x, y, z, w] = array;
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number" ||
            typeof w !== "number"
        ) {
            throw new TypeError("All elements in the array must be numbers.");
        }
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        return this;
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string} String in the format "Vec4(x, y, z, w)".
     */
    toString() {
        return `Vec4(${this._x}, ${this._y}, ${this._z}, ${this._w})`;
    }

    /**
     * Creates a new Vec4 by adding two Vec4s.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {Vec4} New Vec4 instance representing the sum.
     */
    static add(v1, v2) {
        if (!(v1 instanceof Vec4)) {
            throw new TypeError('Parameter "v1" must be an instance of Vec4.');
        }
        if (!(v2 instanceof Vec4)) {
            throw new TypeError('Parameter "v2" must be an instance of Vec4.');
        }
        return new Vec4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
    }

    /**
     * Creates a new Vec4 by subtracting v2 from v1.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {Vec4} New Vec4 instance representing the difference.
     */
    static subtract(v1, v2) {
        if (!(v1 instanceof Vec4)) {
            throw new TypeError('Parameter "v1" must be an instance of Vec4.');
        }
        if (!(v2 instanceof Vec4)) {
            throw new TypeError('Parameter "v2" must be an instance of Vec4.');
        }
        return new Vec4(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w);
    }

    /**
     * Creates a new Vec4 by multiplying two Vec4s component-wise.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {Vec4} New Vec4 instance representing the component-wise product.
     */
    static multiply(v1, v2) {
        if (!(v1 instanceof Vec4)) {
            throw new TypeError('Parameter "v1" must be an instance of Vec4.');
        }
        if (!(v2 instanceof Vec4)) {
            throw new TypeError('Parameter "v2" must be an instance of Vec4.');
        }
        return new Vec4(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z, v1.w * v2.w);
    }

    /**
     * Creates a new Vec4 by dividing v1 by v2 component-wise.
     * @param {Vec4} v1 - Dividend vector.
     * @param {Vec4} v2 - Divisor vector.
     * @returns {Vec4} New Vec4 instance representing the component-wise division.
     * @throws {Error} If any component of v2 is zero.
     */
    static divide(v1, v2) {
        if (!(v1 instanceof Vec4)) {
            throw new TypeError('Parameter "v1" must be an instance of Vec4.');
        }
        if (!(v2 instanceof Vec4)) {
            throw new TypeError('Parameter "v2" must be an instance of Vec4.');
        }
        if (v2.x === 0 || v2.y === 0 || v2.z === 0 || v2.w === 0) {
            throw new Error(
                "Division by zero in one of the vector components."
            );
        }
        return new Vec4(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z, v1.w / v2.w);
    }

    /**
     * Creates a new Vec4 by multiplying a Vec4 by a scalar.
     * @param {Vec4} v - Vector to multiply.
     * @param {number} scalar - Scalar value.
     * @returns {Vec4} New Vec4 instance representing the scaled vector.
     */
    static multiplyScalar(v, scalar) {
        if (!(v instanceof Vec4)) {
            throw new TypeError('Parameter "v" must be an instance of Vec4.');
        }
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        return new Vec4(v.x * scalar, v.y * scalar, v.z * scalar, v.w * scalar);
    }

    /**
     * Creates a new Vec4 by dividing a Vec4 by a scalar.
     * @param {Vec4} v - Vector to divide.
     * @param {number} scalar - Scalar value.
     * @returns {Vec4} New Vec4 instance representing the scaled vector.
     * @throws {Error} If the scalar is zero.
     */
    static divideScalar(v, scalar) {
        if (!(v instanceof Vec4)) {
            throw new TypeError('Parameter "v" must be an instance of Vec4.');
        }
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        if (scalar === 0) {
            throw new Error("Division by zero.");
        }
        return new Vec4(v.x / scalar, v.y / scalar, v.z / scalar, v.w / scalar);
    }

    /**
     * Returns the negation of a Vec4.
     * @param {Vec4} v - Vector to negate.
     * @returns {Vec4} New Vec4 instance representing the negated vector.
     */
    static negate(v) {
        if (!(v instanceof Vec4)) {
            throw new TypeError('Parameter "v" must be an instance of Vec4.');
        }
        return new Vec4(-v.x, -v.y, -v.z, -v.w);
    }

    /**
     * Normalizes a Vec4 and returns a new Vec4.
     * @param {Vec4} v - Vector to normalize.
     * @returns {Vec4} New Vec4 instance representing the normalized vector.
     * @throws {Error} If the vector length is zero.
     */
    static normalize(v) {
        if (!(v instanceof Vec4)) {
            throw new TypeError('Parameter "v" must be an instance of Vec4.');
        }
        const len = v.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return Vec4.divideScalar(v, len);
    }

    /**
     * Calculates the dot product of two Vec4s.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {number} The dot product.
     */
    static dot(v1, v2) {
        if (!(v1 instanceof Vec4)) {
            throw new TypeError('Parameter "v1" must be an instance of Vec4.');
        }
        if (!(v2 instanceof Vec4)) {
            throw new TypeError('Parameter "v2" must be an instance of Vec4.');
        }
        return v1.dot(v2);
    }

    /**
     * Computes the distance between two Vec4s.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {number} The distance.
     */
    static distance(v1, v2) {
        if (!(v1 instanceof Vec4)) {
            throw new TypeError('Parameter "v1" must be an instance of Vec4.');
        }
        if (!(v2 instanceof Vec4)) {
            throw new TypeError('Parameter "v2" must be an instance of Vec4.');
        }
        return v1.distanceTo(v2);
    }

    /**
     * Computes the squared distance between two Vec4s.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {number} The squared distance.
     */
    static distanceSquared(v1, v2) {
        if (!(v1 instanceof Vec4)) {
            throw new TypeError('Parameter "v1" must be an instance of Vec4.');
        }
        if (!(v2 instanceof Vec4)) {
            throw new TypeError('Parameter "v2" must be an instance of Vec4.');
        }
        return v1.distanceSquaredTo(v2);
    }

    /**
     * Calculates the angle between two Vec4s in radians.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {number} The angle in radians.
     * @throws {Error} If either vector has zero length.
     */
    static angleBetween(v1, v2) {
        if (!(v1 instanceof Vec4)) {
            throw new TypeError('Parameter "v1" must be an instance of Vec4.');
        }
        if (!(v2 instanceof Vec4)) {
            throw new TypeError('Parameter "v2" must be an instance of Vec4.');
        }
        return v1.angleTo(v2);
    }

    /**
     * Linearly interpolates between two Vec4s by factor t.
     * @param {Vec4} v1 - Starting vector.
     * @param {Vec4} v2 - Ending vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec4} New Vec4 instance representing the interpolated vector.
     */
    static lerp(v1, v2, t) {
        if (!(v1 instanceof Vec4)) {
            throw new TypeError('Parameter "v1" must be an instance of Vec4.');
        }
        if (!(v2 instanceof Vec4)) {
            throw new TypeError('Parameter "v2" must be an instance of Vec4.');
        }
        if (typeof t !== "number") {
            throw new TypeError('Parameter "t" must be a number.');
        }
        return new Vec4(
            v1.x + (v2.x - v1.x) * t,
            v1.y + (v2.y - v1.y) * t,
            v1.z + (v2.z - v1.z) * t,
            v1.w + (v2.w - v1.w) * t
        );
    }

    /**
     * Projects vector v onto target vector.
     * @param {Vec4} v - Vector to project.
     * @param {Vec4} target - Target vector to project onto.
     * @returns {Vec4} New Vec4 instance representing the projection.
     */
    static projectOnVector(v, target) {
        if (!(v instanceof Vec4)) {
            throw new TypeError('Parameter "v" must be an instance of Vec4.');
        }
        if (!(target instanceof Vec4)) {
            throw new TypeError(
                'Parameter "target" must be an instance of Vec4.'
            );
        }
        const scalar = v.dot(target) / target.lengthSquared();
        return new Vec4(
            scalar * target.x,
            scalar * target.y,
            scalar * target.z,
            scalar * target.w
        );
    }

    /**
     * Projects vector v onto a plane defined by normal.
     * @param {Vec4} v - Vector to project.
     * @param {Vec4} normal - Normal vector of the plane.
     * @returns {Vec4} New Vec4 instance representing the projection.
     * @throws {Error} If the normal vector has zero length.
     */
    static projectOnPlane(v, normal) {
        if (!(v instanceof Vec4)) {
            throw new TypeError('Parameter "v" must be an instance of Vec4.');
        }
        if (!(normal instanceof Vec4)) {
            throw new TypeError(
                'Parameter "normal" must be an instance of Vec4.'
            );
        }
        const dotProduct = v.dot(normal);
        const normLengthSquared = normal.lengthSquared();
        if (normLengthSquared === 0) {
            throw new Error(
                "Cannot project onto a plane with a zero-length normal vector."
            );
        }
        const scalar = dotProduct / normLengthSquared;
        return new Vec4(
            v.x - scalar * normal.x,
            v.y - scalar * normal.y,
            v.z - scalar * normal.z,
            v.w - scalar * normal.w
        );
    }

    /**
     * Reflects vector v around a given normal.
     * @param {Vec4} v - Vector to reflect.
     * @param {Vec4} normal - Normal vector to reflect around.
     * @returns {Vec4} New Vec4 instance representing the reflected vector.
     * @throws {Error} If the normal vector has zero length.
     */
    static reflect(v, normal) {
        if (!(v instanceof Vec4)) {
            throw new TypeError('Parameter "v" must be an instance of Vec4.');
        }
        if (!(normal instanceof Vec4)) {
            throw new TypeError(
                'Parameter "normal" must be an instance of Vec4.'
            );
        }
        const dotProduct = v.dot(normal);
        const normLengthSquared = normal.lengthSquared();
        if (normLengthSquared === 0) {
            throw new Error(
                "Cannot reflect around a plane with a zero-length normal vector."
            );
        }
        const scalar = (2 * dotProduct) / normLengthSquared;
        return new Vec4(
            v.x - scalar * normal.x,
            v.y - scalar * normal.y,
            v.z - scalar * normal.z,
            v.w - scalar * normal.w
        );
    }

    /**
     * Creates a Vec4 from an array.
     * @param {number[]} array - Array containing four numerical components.
     * @returns {Vec4} New Vec4 instance.
     * @throws {TypeError} If the input is not an array of four numbers.
     */
    static fromArray(array) {
        if (!Array.isArray(array) || array.length !== 4) {
            throw new TypeError("Input must be an array of four numbers.");
        }
        const [x, y, z, w] = array;
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number" ||
            typeof w !== "number"
        ) {
            throw new TypeError("All elements in the array must be numbers.");
        }
        return new Vec4(x, y, z, w);
    }

    /**
     * Creates a Vec4 from an object with relevant component properties.
     * @param {Object} object - Object containing x, y, z, w properties.
     * @returns {Vec4} New Vec4 instance.
     * @throws {TypeError} If the object does not have the required numerical properties.
     */
    static fromObject(object) {
        if (typeof object !== "object" || object === null) {
            throw new TypeError("Input must be a non-null object.");
        }
        const { x, y, z, w } = object;
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number" ||
            typeof w !== "number"
        ) {
            throw new TypeError(
                "Object properties x, y, z, w must all be numbers."
            );
        }
        return new Vec4(x, y, z, w);
    }

    /**
     * Performs Catmull-Rom spline interpolation.
     * @param {Vec4} v0 - The previous vector.
     * @param {Vec4} v1 - The current vector.
     * @param {Vec4} v2 - The next vector.
     * @param {Vec4} v3 - The vector after next.
     * @param {number} t - The interpolation factor (0 <= t <= 1).
     * @returns {Vec4} New Vec4 instance representing the interpolated vector.
     */
    static catmullRom(v0, v1, v2, v3, t) {
        if (
            !(v0 instanceof Vec4) ||
            !(v1 instanceof Vec4) ||
            !(v2 instanceof Vec4) ||
            !(v3 instanceof Vec4)
        ) {
            throw new TypeError(
                'Parameters "v0", "v1", "v2", "v3" must all be instances of Vec4.'
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

        const z =
            0.5 *
            (2 * v1.z +
                (-v0.z + v2.z) * t +
                (2 * v0.z - 5 * v1.z + 4 * v2.z - v3.z) * t2 +
                (-v0.z + 3 * v1.z - 3 * v2.z + v3.z) * t3);

        const w =
            0.5 *
            (2 * v1.w +
                (-v0.w + v2.w) * t +
                (2 * v0.w - 5 * v1.w + 4 * v2.w - v3.w) * t2 +
                (-v0.w + 3 * v1.w - 3 * v2.w + v3.w) * t3);

        return new Vec4(x, y, z, w);
    }
}

export default Vec4;
