/**
 * JavaScript Vector and Matrix Library
 * =====================================
 *
 * This library provides comprehensive classes for 2D, 3D, and 4D vectors, quaternions, and matrices.
 * It includes essential operations with both instance and static methods, ensuring consistency,
 * ease of use, and robustness through standardized naming conventions, thorough documentation,
 * and robust error handling.
 *
 * @version 1.0.0
 * @license MIT
 */

/**
 * Represents a 2-dimensional vector.
 */
class Vec2 {
    /**
     * X-component of the vector.
     * @type {number}
     */
    x;

    /**
     * Y-component of the vector.
     * @type {number}
     */
    y;

    /**
     * Creates a new Vec2 instance.
     * @param {number} x - X-component.
     * @param {number} y - Y-component.
     */
    constructor(x, y) {
        if (typeof x !== "number" || typeof y !== "number") {
            throw new TypeError("Vec2 components must be numbers.");
        }
        this.x = x;
        this.y = y;
    }

    /**
     * Adds another Vec2 to this vector.
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
     * Subtracts another Vec2 from this vector.
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
     * Multiplies this vector by a scalar.
     * @param {number} scalar - Scalar to multiply.
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
     * @param {number} scalar - Scalar to divide.
     * @returns {Vec2} This instance for chaining.
     */
    divideScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        if (scalar === 0) {
            throw new Error("Cannot divide by zero.");
        }
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    /**
     * Normalizes the vector.
     * @returns {Vec2} This instance for chaining.
     */
    normalize() {
        const len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return this.divideScalar(len);
    }

    /**
     * Computes the dot product with another Vec2.
     * @param {Vec2} other - The other vector.
     * @returns {number} Dot product.
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
     * Creates a clone of this vector.
     * @returns {Vec2} A new Vec2 instance.
     */
    clone() {
        return new Vec2(this.x, this.y);
    }

    /**
     * Returns the magnitude of the vector.
     * @returns {number} Length of the vector.
     */
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Returns the squared magnitude of the vector.
     * @returns {number} Squared length of the vector.
     */
    lengthSquared() {
        return this.x ** 2 + this.y ** 2;
    }

    /**
     * Computes the distance to another Vec2.
     * @param {Vec2} other - The other vector.
     * @returns {number} Distance.
     */
    distanceTo(other) {
        return Math.sqrt(this.distanceSquaredTo(other));
    }

    /**
     * Computes the squared distance to another Vec2.
     * @param {Vec2} other - The other vector.
     * @returns {number} Squared distance.
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
     * Calculates the angle between this vector and another Vec2.
     * @param {Vec2} other - The other vector.
     * @returns {number} Angle in radians.
     */
    angleBetween(other) {
        if (!(other instanceof Vec2)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec2.'
            );
        }
        const dotProduct = this.dot(other);
        const lengths = this.length() * other.length();
        if (lengths === 0) {
            throw new Error("Cannot calculate angle with zero-length vector.");
        }
        return Math.acos(Math.min(Math.max(dotProduct / lengths, -1), 1));
    }

    /**
     * Linearly interpolates between this vector and a target vector by a factor t.
     * @param {Vec2} target - The target vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec2} This instance for chaining.
     */
    lerp(target, t) {
        if (!(target instanceof Vec2)) {
            throw new TypeError(
                'Parameter "target" must be an instance of Vec2.'
            );
        }
        if (typeof t !== "number") {
            throw new TypeError('Parameter "t" must be a number.');
        }
        this.x += (target.x - this.x) * t;
        this.y += (target.y - this.y) * t;
        return this;
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string} String representation.
     */
    toString() {
        return `Vec2(${this.x}, ${this.y})`;
    }

    /**
     * Creates a vector from an array.
     * @param {number[]} arr - Array containing vector components.
     * @returns {Vec2} New Vec2 instance.
     */
    static fromArray(arr) {
        if (!Array.isArray(arr) || arr.length !== 2) {
            throw new TypeError("Array must have exactly 2 elements.");
        }
        const [x, y] = arr;
        if (typeof x !== "number" || typeof y !== "number") {
            throw new TypeError("Array elements must be numbers.");
        }
        return new Vec2(x, y);
    }

    /**
     * Adds two Vec2 vectors and returns a new Vec2.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {Vec2} New Vec2 instance.
     */
    static add(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError("Parameters must be instances of Vec2.");
        }
        return new Vec2(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     * Subtracts v2 from v1 and returns a new Vec2.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {Vec2} New Vec2 instance.
     */
    static subtract(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError("Parameters must be instances of Vec2.");
        }
        return new Vec2(v1.x - v2.x, v1.y - v2.y);
    }

    /**
     * Multiplies a Vec2 by a scalar and returns a new Vec2.
     * @param {Vec2} v - Vector to multiply.
     * @param {number} scalar - Scalar value.
     * @returns {Vec2} New Vec2 instance.
     */
    static multiplyScalar(v, scalar) {
        if (!(v instanceof Vec2)) {
            throw new TypeError("First parameter must be an instance of Vec2.");
        }
        if (typeof scalar !== "number") {
            throw new TypeError("Second parameter must be a number.");
        }
        return new Vec2(v.x * scalar, v.y * scalar);
    }

    /**
     * Divides a Vec2 by a scalar and returns a new Vec2.
     * @param {Vec2} v - Vector to divide.
     * @param {number} scalar - Scalar value.
     * @returns {Vec2} New Vec2 instance.
     */
    static divideScalar(v, scalar) {
        if (!(v instanceof Vec2)) {
            throw new TypeError("First parameter must be an instance of Vec2.");
        }
        if (typeof scalar !== "number") {
            throw new TypeError("Second parameter must be a number.");
        }
        if (scalar === 0) {
            throw new Error("Cannot divide by zero.");
        }
        return new Vec2(v.x / scalar, v.y / scalar);
    }

    /**
     * Normalizes a Vec2 and returns a new Vec2.
     * @param {Vec2} v - Vector to normalize.
     * @returns {Vec2} New normalized Vec2 instance.
     */
    static normalize(v) {
        if (!(v instanceof Vec2)) {
            throw new TypeError("Parameter must be an instance of Vec2.");
        }
        const len = v.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return Vec2.divideScalar(v, len);
    }

    /**
     * Computes the dot product of two Vec2 vectors.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {number} Dot product.
     */
    static dot(v1, v2) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError("Parameters must be instances of Vec2.");
        }
        return v1.dot(v2);
    }

    /**
     * Creates a clone of a Vec2.
     * @param {Vec2} v - Vector to clone.
     * @returns {Vec2} New Vec2 instance.
     */
    static clone(v) {
        if (!(v instanceof Vec2)) {
            throw new TypeError("Parameter must be an instance of Vec2.");
        }
        return v.clone();
    }

    /**
     * Computes the distance between two Vec2 vectors.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {number} Distance.
     */
    static distance(v1, v2) {
        return Vec2.subtract(v1, v2).length();
    }

    /**
     * Computes the squared distance between two Vec2 vectors.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {number} Squared distance.
     */
    static distanceSquared(v1, v2) {
        return Vec2.subtract(v1, v2).lengthSquared();
    }

    /**
     * Calculates the angle between two Vec2 vectors.
     * @param {Vec2} v1 - First vector.
     * @param {Vec2} v2 - Second vector.
     * @returns {number} Angle in radians.
     */
    static angleBetween(v1, v2) {
        return v1.angleBetween(v2);
    }

    /**
     * Linearly interpolates between two Vec2 vectors by a factor t.
     * @param {Vec2} v1 - Start vector.
     * @param {Vec2} v2 - End vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec2} New Vec2 instance.
     */
    static lerp(v1, v2, t) {
        if (!(v1 instanceof Vec2) || !(v2 instanceof Vec2)) {
            throw new TypeError(
                "First two parameters must be instances of Vec2."
            );
        }
        if (typeof t !== "number") {
            throw new TypeError("Third parameter must be a number.");
        }
        return new Vec2(v1.x + (v2.x - v1.x) * t, v1.y + (v2.y - v1.y) * t);
    }
}

/**
 * Represents a 3-dimensional vector.
 */
class Vec3 {
    /**
     * X-component of the vector.
     * @type {number}
     */
    x;

    /**
     * Y-component of the vector.
     * @type {number}
     */
    y;

    /**
     * Z-component of the vector.
     * @type {number}
     */
    z;

    /**
     * Creates a new Vec3 instance.
     * @param {number} x - X-component.
     * @param {number} y - Y-component.
     * @param {number} z - Z-component.
     */
    constructor(x, y, z) {
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number"
        ) {
            throw new TypeError("Vec3 components must be numbers.");
        }
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Adds another Vec3 to this vector.
     * @param {Vec3} other - Vector to add.
     * @returns {Vec3} This instance for chaining.
     */
    add(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    /**
     * Subtracts another Vec3 from this vector.
     * @param {Vec3} other - Vector to subtract.
     * @returns {Vec3} This instance for chaining.
     */
    subtract(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - Scalar to multiply.
     * @returns {Vec3} This instance for chaining.
     */
    multiplyScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    /**
     * Divides this vector by a scalar.
     * @param {number} scalar - Scalar to divide.
     * @returns {Vec3} This instance for chaining.
     */
    divideScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        if (scalar === 0) {
            throw new Error("Cannot divide by zero.");
        }
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        return this;
    }

    /**
     * Normalizes the vector.
     * @returns {Vec3} This instance for chaining.
     */
    normalize() {
        const len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return this.divideScalar(len);
    }

    /**
     * Computes the dot product with another Vec3.
     * @param {Vec3} other - The other vector.
     * @returns {number} Dot product.
     */
    dot(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    /**
     * Computes the cross product with another Vec3.
     * @param {Vec3} other - The other vector.
     * @returns {Vec3} This instance for chaining.
     */
    cross(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        const cx = this.y * other.z - this.z * other.y;
        const cy = this.z * other.x - this.x * other.z;
        const cz = this.x * other.y - this.y * other.x;
        this.x = cx;
        this.y = cy;
        this.z = cz;
        return this;
    }

    /**
     * Creates a clone of this vector.
     * @returns {Vec3} A new Vec3 instance.
     */
    clone() {
        return new Vec3(this.x, this.y, this.z);
    }

    /**
     * Returns the magnitude of the vector.
     * @returns {number} Length of the vector.
     */
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    /**
     * Returns the squared magnitude of the vector.
     * @returns {number} Squared length of the vector.
     */
    lengthSquared() {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }

    /**
     * Computes the distance to another Vec3.
     * @param {Vec3} other - The other vector.
     * @returns {number} Distance.
     */
    distanceTo(other) {
        return Math.sqrt(this.distanceSquaredTo(other));
    }

    /**
     * Computes the squared distance to another Vec3.
     * @param {Vec3} other - The other vector.
     * @returns {number} Squared distance.
     */
    distanceSquaredTo(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        return dx * dx + dy * dy + dz * dz;
    }

    /**
     * Calculates the angle between this vector and another Vec3.
     * @param {Vec3} other - The other vector.
     * @returns {number} Angle in radians.
     */
    angleBetween(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        const dotProduct = this.dot(other);
        const lengths = this.length() * other.length();
        if (lengths === 0) {
            throw new Error("Cannot calculate angle with zero-length vector.");
        }
        return Math.acos(Math.min(Math.max(dotProduct / lengths, -1), 1));
    }

    /**
     * Linearly interpolates between this vector and a target vector by a factor t.
     * @param {Vec3} target - The target vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec3} This instance for chaining.
     */
    lerp(target, t) {
        if (!(target instanceof Vec3)) {
            throw new TypeError(
                'Parameter "target" must be an instance of Vec3.'
            );
        }
        if (typeof t !== "number") {
            throw new TypeError('Parameter "t" must be a number.');
        }
        this.x += (target.x - this.x) * t;
        this.y += (target.y - this.y) * t;
        this.z += (target.z - this.z) * t;
        return this;
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string} String representation.
     */
    toString() {
        return `Vec3(${this.x}, ${this.y}, ${this.z})`;
    }

    /**
     * Creates a vector from an array.
     * @param {number[]} arr - Array containing vector components.
     * @returns {Vec3} New Vec3 instance.
     */
    static fromArray(arr) {
        if (!Array.isArray(arr) || arr.length !== 3) {
            throw new TypeError("Array must have exactly 3 elements.");
        }
        const [x, y, z] = arr;
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number"
        ) {
            throw new TypeError("Array elements must be numbers.");
        }
        return new Vec3(x, y, z);
    }

    /**
     * Adds two Vec3 vectors and returns a new Vec3.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {Vec3} New Vec3 instance.
     */
    static add(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError("Parameters must be instances of Vec3.");
        }
        return new Vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    /**
     * Subtracts v2 from v1 and returns a new Vec3.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {Vec3} New Vec3 instance.
     */
    static subtract(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError("Parameters must be instances of Vec3.");
        }
        return new Vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    /**
     * Multiplies a Vec3 by a scalar and returns a new Vec3.
     * @param {Vec3} v - Vector to multiply.
     * @param {number} scalar - Scalar value.
     * @returns {Vec3} New Vec3 instance.
     */
    static multiplyScalar(v, scalar) {
        if (!(v instanceof Vec3)) {
            throw new TypeError("First parameter must be an instance of Vec3.");
        }
        if (typeof scalar !== "number") {
            throw new TypeError("Second parameter must be a number.");
        }
        return new Vec3(v.x * scalar, v.y * scalar, v.z * scalar);
    }

    /**
     * Divides a Vec3 by a scalar and returns a new Vec3.
     * @param {Vec3} v - Vector to divide.
     * @param {number} scalar - Scalar value.
     * @returns {Vec3} New Vec3 instance.
     */
    static divideScalar(v, scalar) {
        if (!(v instanceof Vec3)) {
            throw new TypeError("First parameter must be an instance of Vec3.");
        }
        if (typeof scalar !== "number") {
            throw new TypeError("Second parameter must be a number.");
        }
        if (scalar === 0) {
            throw new Error("Cannot divide by zero.");
        }
        return new Vec3(v.x / scalar, v.y / scalar, v.z / scalar);
    }

    /**
     * Normalizes a Vec3 and returns a new Vec3.
     * @param {Vec3} v - Vector to normalize.
     * @returns {Vec3} New normalized Vec3 instance.
     */
    static normalize(v) {
        if (!(v instanceof Vec3)) {
            throw new TypeError("Parameter must be an instance of Vec3.");
        }
        const len = v.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return Vec3.divideScalar(v, len);
    }

    /**
     * Computes the dot product of two Vec3 vectors.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {number} Dot product.
     */
    static dot(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError("Parameters must be instances of Vec3.");
        }
        return v1.dot(v2);
    }

    /**
     * Computes the cross product of two Vec3 vectors.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {Vec3} New Vec3 instance.
     */
    static cross(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError("Parameters must be instances of Vec3.");
        }
        const cx = v1.y * v2.z - v1.z * v2.y;
        const cy = v1.z * v2.x - v1.x * v2.z;
        const cz = v1.x * v2.y - v1.y * v2.x;
        return new Vec3(cx, cy, cz);
    }

    /**
     * Creates a clone of a Vec3.
     * @param {Vec3} v - Vector to clone.
     * @returns {Vec3} New Vec3 instance.
     */
    static clone(v) {
        if (!(v instanceof Vec3)) {
            throw new TypeError("Parameter must be an instance of Vec3.");
        }
        return v.clone();
    }

    /**
     * Computes the distance between two Vec3 vectors.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {number} Distance.
     */
    static distance(v1, v2) {
        return Vec3.subtract(v1, v2).length();
    }

    /**
     * Computes the squared distance between two Vec3 vectors.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {number} Squared distance.
     */
    static distanceSquared(v1, v2) {
        return Vec3.subtract(v1, v2).lengthSquared();
    }

    /**
     * Calculates the angle between two Vec3 vectors.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {number} Angle in radians.
     */
    static angleBetween(v1, v2) {
        return v1.angleBetween(v2);
    }

    /**
     * Linearly interpolates between two Vec3 vectors by a factor t.
     * @param {Vec3} v1 - Start vector.
     * @param {Vec3} v2 - End vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec3} New Vec3 instance.
     */
    static lerp(v1, v2, t) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                "First two parameters must be instances of Vec3."
            );
        }
        if (typeof t !== "number") {
            throw new TypeError("Third parameter must be a number.");
        }
        return new Vec3(
            v1.x + (v2.x - v1.x) * t,
            v1.y + (v2.y - v1.y) * t,
            v1.z + (v2.z - v1.z) * t
        );
    }
}

/**
 * Represents a 4-dimensional vector.
 */
class Vec4 {
    /**
     * X-component of the vector.
     * @type {number}
     */
    x;

    /**
     * Y-component of the vector.
     * @type {number}
     */
    y;

    /**
     * Z-component of the vector.
     * @type {number}
     */
    z;

    /**
     * W-component of the vector.
     * @type {number}
     */
    w;

    /**
     * Creates a new Vec4 instance.
     * @param {number} x - X-component.
     * @param {number} y - Y-component.
     * @param {number} z - Z-component.
     * @param {number} w - W-component.
     */
    constructor(x, y, z, w) {
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number" ||
            typeof w !== "number"
        ) {
            throw new TypeError("Vec4 components must be numbers.");
        }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
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
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        this.w += other.w;
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
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        this.w -= other.w;
        return this;
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - Scalar to multiply.
     * @returns {Vec4} This instance for chaining.
     */
    multiplyScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }

    /**
     * Divides this vector by a scalar.
     * @param {number} scalar - Scalar to divide.
     * @returns {Vec4} This instance for chaining.
     */
    divideScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        if (scalar === 0) {
            throw new Error("Cannot divide by zero.");
        }
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        this.w /= scalar;
        return this;
    }

    /**
     * Normalizes the vector.
     * @returns {Vec4} This instance for chaining.
     */
    normalize() {
        const len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return this.divideScalar(len);
    }

    /**
     * Computes the dot product with another Vec4.
     * @param {Vec4} other - The other vector.
     * @returns {number} Dot product.
     */
    dot(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        return (
            this.x * other.x +
            this.y * other.y +
            this.z * other.z +
            this.w * other.w
        );
    }

    /**
     * Creates a clone of this vector.
     * @returns {Vec4} A new Vec4 instance.
     */
    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }

    /**
     * Returns the magnitude of the vector.
     * @returns {number} Length of the vector.
     */
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
    }

    /**
     * Returns the squared magnitude of the vector.
     * @returns {number} Squared length of the vector.
     */
    lengthSquared() {
        return this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2;
    }

    /**
     * Computes the distance to another Vec4.
     * @param {Vec4} other - The other vector.
     * @returns {number} Distance.
     */
    distanceTo(other) {
        return Math.sqrt(this.distanceSquaredTo(other));
    }

    /**
     * Computes the squared distance to another Vec4.
     * @param {Vec4} other - The other vector.
     * @returns {number} Squared distance.
     */
    distanceSquaredTo(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        const dw = this.w - other.w;
        return dx * dx + dy * dy + dz * dz + dw * dw;
    }

    /**
     * Calculates the angle between this vector and another Vec4.
     * @param {Vec4} other - The other vector.
     * @returns {number} Angle in radians.
     */
    angleBetween(other) {
        if (!(other instanceof Vec4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec4.'
            );
        }
        const dotProduct = this.dot(other);
        const lengths = this.length() * other.length();
        if (lengths === 0) {
            throw new Error("Cannot calculate angle with zero-length vector.");
        }
        return Math.acos(Math.min(Math.max(dotProduct / lengths, -1), 1));
    }

    /**
     * Linearly interpolates between this vector and a target vector by a factor t.
     * @param {Vec4} target - The target vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec4} This instance for chaining.
     */
    lerp(target, t) {
        if (!(target instanceof Vec4)) {
            throw new TypeError(
                'Parameter "target" must be an instance of Vec4.'
            );
        }
        if (typeof t !== "number") {
            throw new TypeError('Parameter "t" must be a number.');
        }
        this.x += (target.x - this.x) * t;
        this.y += (target.y - this.y) * t;
        this.z += (target.z - this.z) * t;
        this.w += (target.w - this.w) * t;
        return this;
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string} String representation.
     */
    toString() {
        return `Vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    /**
     * Creates a vector from an array.
     * @param {number[]} arr - Array containing vector components.
     * @returns {Vec4} New Vec4 instance.
     */
    static fromArray(arr) {
        if (!Array.isArray(arr) || arr.length !== 4) {
            throw new TypeError("Array must have exactly 4 elements.");
        }
        const [x, y, z, w] = arr;
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number" ||
            typeof w !== "number"
        ) {
            throw new TypeError("Array elements must be numbers.");
        }
        return new Vec4(x, y, z, w);
    }

    /**
     * Adds two Vec4 vectors and returns a new Vec4.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {Vec4} New Vec4 instance.
     */
    static add(v1, v2) {
        if (!(v1 instanceof Vec4) || !(v2 instanceof Vec4)) {
            throw new TypeError("Parameters must be instances of Vec4.");
        }
        return new Vec4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
    }

    /**
     * Subtracts v2 from v1 and returns a new Vec4.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {Vec4} New Vec4 instance.
     */
    static subtract(v1, v2) {
        if (!(v1 instanceof Vec4) || !(v2 instanceof Vec4)) {
            throw new TypeError("Parameters must be instances of Vec4.");
        }
        return new Vec4(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w);
    }

    /**
     * Multiplies a Vec4 by a scalar and returns a new Vec4.
     * @param {Vec4} v - Vector to multiply.
     * @param {number} scalar - Scalar value.
     * @returns {Vec4} New Vec4 instance.
     */
    static multiplyScalar(v, scalar) {
        if (!(v instanceof Vec4)) {
            throw new TypeError("First parameter must be an instance of Vec4.");
        }
        if (typeof scalar !== "number") {
            throw new TypeError("Second parameter must be a number.");
        }
        return new Vec4(v.x * scalar, v.y * scalar, v.z * scalar, v.w * scalar);
    }

    /**
     * Divides a Vec4 by a scalar and returns a new Vec4.
     * @param {Vec4} v - Vector to divide.
     * @param {number} scalar - Scalar value.
     * @returns {Vec4} New Vec4 instance.
     */
    static divideScalar(v, scalar) {
        if (!(v instanceof Vec4)) {
            throw new TypeError("First parameter must be an instance of Vec4.");
        }
        if (typeof scalar !== "number") {
            throw new TypeError("Second parameter must be a number.");
        }
        if (scalar === 0) {
            throw new Error("Cannot divide by zero.");
        }
        return new Vec4(v.x / scalar, v.y / scalar, v.z / scalar, v.w / scalar);
    }

    /**
     * Normalizes a Vec4 and returns a new Vec4.
     * @param {Vec4} v - Vector to normalize.
     * @returns {Vec4} New normalized Vec4 instance.
     */
    static normalize(v) {
        if (!(v instanceof Vec4)) {
            throw new TypeError("Parameter must be an instance of Vec4.");
        }
        const len = v.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return Vec4.divideScalar(v, len);
    }

    /**
     * Computes the dot product of two Vec4 vectors.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {number} Dot product.
     */
    static dot(v1, v2) {
        if (!(v1 instanceof Vec4) || !(v2 instanceof Vec4)) {
            throw new TypeError("Parameters must be instances of Vec4.");
        }
        return v1.dot(v2);
    }

    /**
     * Creates a clone of a Vec4.
     * @param {Vec4} v - Vector to clone.
     * @returns {Vec4} New Vec4 instance.
     */
    static clone(v) {
        if (!(v instanceof Vec4)) {
            throw new TypeError("Parameter must be an instance of Vec4.");
        }
        return v.clone();
    }

    /**
     * Computes the distance between two Vec4 vectors.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {number} Distance.
     */
    static distance(v1, v2) {
        return Vec4.subtract(v1, v2).length();
    }

    /**
     * Computes the squared distance between two Vec4 vectors.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {number} Squared distance.
     */
    static distanceSquared(v1, v2) {
        return Vec4.subtract(v1, v2).lengthSquared();
    }

    /**
     * Calculates the angle between two Vec4 vectors.
     * @param {Vec4} v1 - First vector.
     * @param {Vec4} v2 - Second vector.
     * @returns {number} Angle in radians.
     */
    static angleBetween(v1, v2) {
        return v1.angleBetween(v2);
    }

    /**
     * Linearly interpolates between two Vec4 vectors by a factor t.
     * @param {Vec4} v1 - Start vector.
     * @param {Vec4} v2 - End vector.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Vec4} New Vec4 instance.
     */
    static lerp(v1, v2, t) {
        if (!(v1 instanceof Vec4) || !(v2 instanceof Vec4)) {
            throw new TypeError(
                "First two parameters must be instances of Vec4."
            );
        }
        if (typeof t !== "number") {
            throw new TypeError("Third parameter must be a number.");
        }
        return new Vec4(
            v1.x + (v2.x - v1.x) * t,
            v1.y + (v2.y - v1.y) * t,
            v1.z + (v2.z - v1.z) * t,
            v1.w + (v2.w - v1.w) * t
        );
    }
}

/**
 * Represents a quaternion for handling rotations.
 */
class Quat {
    /**
     * X-component of the quaternion.
     * @type {number}
     */
    x;

    /**
     * Y-component of the quaternion.
     * @type {number}
     */
    y;

    /**
     * Z-component of the quaternion.
     * @type {number}
     */
    z;

    /**
     * W-component of the quaternion.
     * @type {number}
     */
    w;

    /**
     * Creates a new Quat instance.
     * @param {number} x - X-component.
     * @param {number} y - Y-component.
     * @param {number} z - Z-component.
     * @param {number} w - W-component.
     */
    constructor(x, y, z, w) {
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number" ||
            typeof w !== "number"
        ) {
            throw new TypeError("Quat components must be numbers.");
        }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    /**
     * Adds another Quat to this quaternion.
     * @param {Quat} other - Quaternion to add.
     * @returns {Quat} This instance for chaining.
     */
    add(other) {
        if (!(other instanceof Quat)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Quat.'
            );
        }
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        this.w += other.w;
        return this;
    }

    /**
     * Multiplies this quaternion by another quaternion.
     * @param {Quat} other - Quaternion to multiply.
     * @returns {Quat} This instance for chaining.
     */
    multiply(other) {
        if (!(other instanceof Quat)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Quat.'
            );
        }
        const x =
            this.w * other.x +
            this.x * other.w +
            this.y * other.z -
            this.z * other.y;
        const y =
            this.w * other.y -
            this.x * other.z +
            this.y * other.w +
            this.z * other.x;
        const z =
            this.w * other.z +
            this.x * other.y -
            this.y * other.x +
            this.z * other.w;
        const w =
            this.w * other.w -
            this.x * other.x -
            this.y * other.y -
            this.z * other.z;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    /**
     * Multiplies this quaternion by a scalar.
     * @param {number} scalar - Scalar to multiply.
     * @returns {Quat} This instance for chaining.
     */
    multiplyScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }

    /**
     * Normalizes the quaternion.
     * @returns {Quat} This instance for chaining.
     */
    normalize() {
        const len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length quaternion.");
        }
        return this.divideScalar(len);
    }

    /**
     * Inverts the quaternion.
     * @returns {Quat} This instance for chaining.
     */
    invert() {
        const lenSq = this.lengthSquared();
        if (lenSq === 0) {
            throw new Error("Cannot invert a zero-length quaternion.");
        }
        this.x = -this.x / lenSq;
        this.y = -this.y / lenSq;
        this.z = -this.z / lenSq;
        this.w = this.w / lenSq;
        return this;
    }

    /**
     * Computes the dot product with another quaternion.
     * @param {Quat} other - The other quaternion.
     * @returns {number} Dot product.
     */
    dot(other) {
        if (!(other instanceof Quat)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Quat.'
            );
        }
        return (
            this.x * other.x +
            this.y * other.y +
            this.z * other.z +
            this.w * other.w
        );
    }

    /**
     * Applies another quaternion rotation to this quaternion.
     * @param {Quat} q - Quaternion to rotate by.
     * @returns {Quat} This instance for chaining.
     */
    rotateBy(q) {
        if (!(q instanceof Quat)) {
            throw new TypeError('Parameter "q" must be an instance of Quat.');
        }
        return this.multiply(q);
    }

    /**
     * Creates a clone of this quaternion.
     * @returns {Quat} A new Quat instance.
     */
    clone() {
        return new Quat(this.x, this.y, this.z, this.w);
    }

    /**
     * Converts the quaternion to a rotation matrix (Mat4).
     * @returns {Mat4} Rotation matrix.
     */
    toMatrix() {
        const mat = new Mat4();
        const x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;
        const x2 = x + x,
            y2 = y + y,
            z2 = z + z;
        const xx = x * x2,
            xy = x * y2,
            xz = x * z2;
        const yy = y * y2,
            yz = y * z2,
            zz = z * z2;
        const wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        mat.elements[0] = 1 - (yy + zz);
        mat.elements[1] = xy + wz;
        mat.elements[2] = xz - wy;
        mat.elements[3] = 0;

        mat.elements[4] = xy - wz;
        mat.elements[5] = 1 - (xx + zz);
        mat.elements[6] = yz + wx;
        mat.elements[7] = 0;

        mat.elements[8] = xz + wy;
        mat.elements[9] = yz - wx;
        mat.elements[10] = 1 - (xx + yy);
        mat.elements[11] = 0;

        mat.elements[12] = 0;
        mat.elements[13] = 0;
        mat.elements[14] = 0;
        mat.elements[15] = 1;

        return mat;
    }

    /**
     * Converts the quaternion to Euler angles (Vec3).
     * @returns {Vec3} Euler angles in radians.
     */
    toEuler() {
        const ysqr = this.y * this.y;

        // roll (x-axis rotation)
        let t0 = +2.0 * (this.w * this.x + this.y * this.z);
        let t1 = +1.0 - 2.0 * (this.x * this.x + ysqr);
        const roll = Math.atan2(t0, t1);

        // pitch (y-axis rotation)
        let t2 = +2.0 * (this.w * this.y - this.z * this.x);
        t2 = t2 > 1.0 ? 1.0 : t2;
        t2 = t2 < -1.0 ? -1.0 : t2;
        const pitch = Math.asin(t2);

        // yaw (z-axis rotation)
        let t3 = +2.0 * (this.w * this.z + this.x * this.y);
        let t4 = +1.0 - 2.0 * (ysqr + this.z * this.z);
        const yaw = Math.atan2(t3, t4);

        return new Vec3(roll, pitch, yaw);
    }

    /**
     * Returns a string representation of the quaternion.
     * @returns {string} String representation.
     */
    toString() {
        return `Quat(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    /**
     * Creates a quaternion from an array.
     * @param {number[]} arr - Array containing quaternion components.
     * @returns {Quat} New Quat instance.
     */
    static fromArray(arr) {
        if (!Array.isArray(arr) || arr.length !== 4) {
            throw new TypeError("Array must have exactly 4 elements.");
        }
        const [x, y, z, w] = arr;
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number" ||
            typeof w !== "number"
        ) {
            throw new TypeError("Array elements must be numbers.");
        }
        return new Quat(x, y, z, w);
    }

    /**
     * Adds two Quat quaternions and returns a new Quat.
     * @param {Quat} q1 - First quaternion.
     * @param {Quat} q2 - Second quaternion.
     * @returns {Quat} New Quat instance.
     */
    static add(q1, q2) {
        if (!(q1 instanceof Quat) || !(q2 instanceof Quat)) {
            throw new TypeError("Parameters must be instances of Quat.");
        }
        return new Quat(q1.x + q2.x, q1.y + q2.y, q1.z + q2.z, q1.w + q2.w);
    }

    /**
     * Multiplies two Quat quaternions and returns a new Quat.
     * @param {Quat} q1 - First quaternion.
     * @param {Quat} q2 - Second quaternion.
     * @returns {Quat} New Quat instance.
     */
    static multiply(q1, q2) {
        if (!(q1 instanceof Quat) || !(q2 instanceof Quat)) {
            throw new TypeError("Parameters must be instances of Quat.");
        }
        const x = q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y;
        const y = q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x;
        const z = q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w;
        const w = q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z;
        return new Quat(x, y, z, w);
    }

    /**
     * Multiplies a Quat by a scalar and returns a new Quat.
     * @param {Quat} q - Quaternion to multiply.
     * @param {number} scalar - Scalar value.
     * @returns {Quat} New Quat instance.
     */
    static multiplyScalar(q, scalar) {
        if (!(q instanceof Quat)) {
            throw new TypeError("First parameter must be an instance of Quat.");
        }
        if (typeof scalar !== "number") {
            throw new TypeError("Second parameter must be a number.");
        }
        return new Quat(q.x * scalar, q.y * scalar, q.z * scalar, q.w * scalar);
    }

    /**
     * Normalizes a Quat and returns a new Quat.
     * @param {Quat} q - Quaternion to normalize.
     * @returns {Quat} New normalized Quat instance.
     */
    static normalize(q) {
        if (!(q instanceof Quat)) {
            throw new TypeError("Parameter must be an instance of Quat.");
        }
        const len = q.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length quaternion.");
        }
        return new Quat(q.x / len, q.y / len, q.z / len, q.w / len);
    }

    /**
     * Inverts a Quat and returns a new Quat.
     * @param {Quat} q - Quaternion to invert.
     * @returns {Quat} New inverted Quat instance.
     */
    static invert(q) {
        if (!(q instanceof Quat)) {
            throw new TypeError("Parameter must be an instance of Quat.");
        }
        const lenSq = q.lengthSquared();
        if (lenSq === 0) {
            throw new Error("Cannot invert a zero-length quaternion.");
        }
        return new Quat(-q.x / lenSq, -q.y / lenSq, -q.z / lenSq, q.w / lenSq);
    }

    /**
     * Computes the dot product of two Quat quaternions.
     * @param {Quat} q1 - First quaternion.
     * @param {Quat} q2 - Second quaternion.
     * @returns {number} Dot product.
     */
    static dot(q1, q2) {
        if (!(q1 instanceof Quat) || !(q2 instanceof Quat)) {
            throw new TypeError("Parameters must be instances of Quat.");
        }
        return q1.dot(q2);
    }

    /**
     * Creates a quaternion from an axis-angle representation.
     * @param {Vec3} axis - Rotation axis.
     * @param {number} angle - Rotation angle in radians.
     * @returns {Quat} New Quat instance.
     */
    static fromAxisAngle(axis, angle) {
        if (!(axis instanceof Vec3)) {
            throw new TypeError(
                'Parameter "axis" must be an instance of Vec3.'
            );
        }
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }
        const halfAngle = angle / 2;
        const sinHalf = Math.sin(halfAngle);
        return new Quat(
            axis.x * sinHalf,
            axis.y * sinHalf,
            axis.z * sinHalf,
            Math.cos(halfAngle)
        ).normalize();
    }

    /**
     * Creates a quaternion representing a rotation around the X-axis.
     * @param {number} angle - Rotation angle in radians.
     * @returns {Quat} New Quat instance.
     */
    static fromRotationX(angle) {
        return Quat.fromAxisAngle(new Vec3(1, 0, 0), angle);
    }

    /**
     * Creates a quaternion representing a rotation around the Y-axis.
     * @param {number} angle - Rotation angle in radians.
     * @returns {Quat} New Quat instance.
     */
    static fromRotationY(angle) {
        return Quat.fromAxisAngle(new Vec3(0, 1, 0), angle);
    }

    /**
     * Creates a quaternion representing a rotation around the Z-axis.
     * @param {number} angle - Rotation angle in radians.
     * @returns {Quat} New Quat instance.
     */
    static fromRotationZ(angle) {
        return Quat.fromAxisAngle(new Vec3(0, 0, 1), angle);
    }

    /**
     * Creates a quaternion from Euler angles.
     * @param {number} pitch - Rotation around the X-axis in radians.
     * @param {number} yaw - Rotation around the Y-axis in radians.
     * @param {number} roll - Rotation around the Z-axis in radians.
     * @returns {Quat} New Quat instance.
     */
    static fromEuler(pitch, yaw, roll) {
        const halfPitch = pitch / 2;
        const halfYaw = yaw / 2;
        const halfRoll = roll / 2;

        const sinPitch = Math.sin(halfPitch);
        const cosPitch = Math.cos(halfPitch);
        const sinYaw = Math.sin(halfYaw);
        const cosYaw = Math.cos(halfYaw);
        const sinRoll = Math.sin(halfRoll);
        const cosRoll = Math.cos(halfRoll);

        const x = sinPitch * cosYaw * cosRoll - cosPitch * sinYaw * sinRoll;
        const y = cosPitch * sinYaw * cosRoll + sinPitch * cosYaw * sinRoll;
        const z = cosPitch * cosYaw * sinRoll - sinPitch * sinYaw * cosRoll;
        const w = cosPitch * cosYaw * cosRoll + sinPitch * sinYaw * sinRoll;

        return new Quat(x, y, z, w).normalize();
    }

    /**
     * Performs spherical linear interpolation between two quaternions.
     * @param {Quat} q1 - Start quaternion.
     * @param {Quat} q2 - End quaternion.
     * @param {number} t - Interpolation factor (0 <= t <= 1).
     * @returns {Quat} New interpolated Quat instance.
     */
    static slerp(q1, q2, t) {
        if (!(q1 instanceof Quat) || !(q2 instanceof Quat)) {
            throw new TypeError(
                "First two parameters must be instances of Quat."
            );
        }
        if (typeof t !== "number") {
            throw new TypeError("Third parameter must be a number.");
        }

        let cosTheta = q1.dot(q2);
        let q2Copy = q2.clone();

        if (cosTheta < 0) {
            q2Copy = new Quat(-q2.x, -q2.y, -q2.z, -q2.w);
            cosTheta = -cosTheta;
        }

        if (cosTheta > 0.9995) {
            // If the quaternions are very close, use linear interpolation
            return Quat.normalize(
                new Quat(
                    q1.x + t * (q2Copy.x - q1.x),
                    q1.y + t * (q2Copy.y - q1.y),
                    q1.z + t * (q2Copy.z - q1.z),
                    q1.w + t * (q2Copy.w - q1.w)
                )
            );
        } else {
            const angle = Math.acos(cosTheta);
            const sinTheta = Math.sqrt(1.0 - cosTheta * cosTheta);
            if (sinTheta < 0.001) {
                // If the angle is small, use linear interpolation
                return Quat.normalize(
                    new Quat(
                        q1.x + t * (q2Copy.x - q1.x),
                        q1.y + t * (q2Copy.y - q1.y),
                        q1.z + t * (q2Copy.z - q1.z),
                        q1.w + t * (q2Copy.w - q1.w)
                    )
                );
            }
            const ratioA = Math.sin((1 - t) * angle) / sinTheta;
            const ratioB = Math.sin(t * angle) / sinTheta;
            return new Quat(
                q1.x * ratioA + q2Copy.x * ratioB,
                q1.y * ratioA + q2Copy.y * ratioB,
                q1.z * ratioA + q2Copy.z * ratioB,
                q1.w * ratioA + q2Copy.w * ratioB
            );
        }
    }

    /**
     * Converts a quaternion to a rotation matrix (Mat4).
     * @param {Quat} q - Quaternion to convert.
     * @returns {Mat4} Rotation matrix.
     */
    static toMatrix(q) {
        if (!(q instanceof Quat)) {
            throw new TypeError("Parameter must be an instance of Quat.");
        }
        return q.toMatrix();
    }

    /**
     * Converts a quaternion to Euler angles (Vec3).
     * @param {Quat} q - Quaternion to convert.
     * @returns {Vec3} Euler angles in radians.
     */
    static toEuler(q) {
        if (!(q instanceof Quat)) {
            throw new TypeError("Parameter must be an instance of Quat.");
        }
        return q.toEuler();
    }
}

/**
 * Represents a 3x3 matrix.
 */
class Mat3 {
    /**
     * Matrix elements in column-major order.
     * @type {Float32Array}
     */
    elements;

    /**
     * Creates a new Mat3 instance.
     * @param {Float32Array} [elements] - Optional array of 9 elements.
     */
    constructor(elements) {
        if (elements !== undefined) {
            if (!(elements instanceof Float32Array) || elements.length !== 9) {
                throw new TypeError(
                    'Parameter "elements" must be a Float32Array of length 9.'
                );
            }
            this.elements = new Float32Array(elements);
        } else {
            this.elements = new Float32Array(9);
            // Initialize to identity matrix
            this.elements[0] = 1;
            this.elements[4] = 1;
            this.elements[8] = 1;
        }
    }

    /**
     * Multiplies this matrix by another Mat3.
     * @param {Mat3} other - Matrix to multiply.
     * @returns {Mat3} This instance for chaining.
     */
    multiply(other) {
        if (!(other instanceof Mat3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Mat3.'
            );
        }
        const a = this.elements;
        const b = other.elements;
        const result = new Float32Array(9);

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                result[col * 3 + row] =
                    a[0 * 3 + row] * b[col * 3 + 0] +
                    a[1 * 3 + row] * b[col * 3 + 1] +
                    a[2 * 3 + row] * b[col * 3 + 2];
            }
        }

        this.elements = result;
        return this;
    }

    /**
     * Transposes the matrix.
     * @returns {Mat3} This instance for chaining.
     */
    transpose() {
        const e = this.elements;
        [e[1], e[3]] = [e[3], e[1]];
        [e[2], e[6]] = [e[6], e[2]];
        [e[5], e[7]] = [e[7], e[5]];
        return this;
    }

    /**
     * Inverts the matrix.
     * @returns {Mat3} This instance for chaining.
     */
    invert() {
        const e = this.elements;
        const a00 = e[0],
            a01 = e[1],
            a02 = e[2];
        const a10 = e[3],
            a11 = e[4],
            a12 = e[5];
        const a20 = e[6],
            a21 = e[7],
            a22 = e[8];

        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;

        // Calculate the determinant
        let det = a00 * b01 + a01 * b11 + a02 * b21;

        if (det === 0) {
            throw new Error(
                "Matrix is not invertible because the determinant is zero."
            );
        }
        det = 1.0 / det;

        e[0] = b01 * det;
        e[1] = (-a22 * a01 + a02 * a21) * det;
        e[2] = (a12 * a01 - a02 * a11) * det;
        e[3] = b11 * det;
        e[4] = (a22 * a00 - a02 * a20) * det;
        e[5] = (-a12 * a00 + a02 * a10) * det;
        e[6] = b21 * det;
        e[7] = (-a21 * a00 + a01 * a20) * det;
        e[8] = (a11 * a00 - a01 * a10) * det;

        return this;
    }

    /**
     * Inverts matrices with known properties (e.g., orthogonal matrices) for performance optimization.
     * @returns {Mat3} This instance for chaining.
     */
    invertSpecial() {
        // Example optimization for orthogonal matrices: inverse is the transpose
        return this.transpose();
    }

    /**
     * Creates a clone of this matrix.
     * @returns {Mat3} New Mat3 instance.
     */
    clone() {
        return new Mat3(this.elements);
    }

    /**
     * Transforms a Vec2 or Vec3 by this matrix.
     * @param {Vec2|Vec3} vec - Vector to transform.
     * @returns {Vec2|Vec3} Transformed vector.
     */
    transform(vec) {
        if (!(vec instanceof Vec2) && !(vec instanceof Vec3)) {
            throw new TypeError(
                'Parameter "vec" must be an instance of Vec2 or Vec3.'
            );
        }

        const e = this.elements;
        if (vec instanceof Vec2) {
            const x = vec.x,
                y = vec.y;
            return new Vec2(
                e[0] * x + e[3] * y + e[6],
                e[1] * x + e[4] * y + e[7]
            );
        } else {
            // Vec3
            const x = vec.x,
                y = vec.y,
                z = vec.z;
            return new Vec3(
                e[0] * x + e[3] * y + e[6] * z,
                e[1] * x + e[4] * y + e[7] * z,
                e[2] * x + e[5] * y + e[8] * z
            );
        }
    }

    /**
     * Applies translation to the matrix.
     * @param {Vec2} vec - Translation vector.
     * @returns {Mat3} This instance for chaining.
     */
    translate(vec) {
        if (!(vec instanceof Vec2)) {
            throw new TypeError('Parameter "vec" must be an instance of Vec2.');
        }
        const e = this.elements;
        e[6] += e[0] * vec.x + e[3] * vec.y;
        e[7] += e[1] * vec.x + e[4] * vec.y;
        e[8] += e[2] * vec.x + e[5] * vec.y;
        return this;
    }

    /**
     * Applies scaling to the matrix.
     * @param {Vec2} vec - Scaling vector.
     * @returns {Mat3} This instance for chaining.
     */
    scale(vec) {
        if (!(vec instanceof Vec2)) {
            throw new TypeError('Parameter "vec" must be an instance of Vec2.');
        }
        const e = this.elements;
        e[0] *= vec.x;
        e[1] *= vec.x;
        e[2] *= vec.x;
        e[3] *= vec.y;
        e[4] *= vec.y;
        e[5] *= vec.y;
        return this;
    }

    /**
     * Applies rotation to the matrix.
     * @param {number} angle - Rotation angle in radians.
     * @returns {Mat3} This instance for chaining.
     */
    rotate(angle) {
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const e = this.elements;

        const a00 = e[0],
            a01 = e[1],
            a02 = e[2];
        const a10 = e[3],
            a11 = e[4],
            a12 = e[5];

        e[0] = a00 * c + a10 * s;
        e[1] = a01 * c + a11 * s;
        e[2] = a02 * c + a12 * s;

        e[3] = a00 * -s + a10 * c;
        e[4] = a01 * -s + a11 * c;
        e[5] = a02 * -s + a12 * c;

        return this;
    }

    /**
     * Calculates the determinant of the matrix.
     * @returns {number} Determinant.
     */
    determinant() {
        const e = this.elements;
        return (
            e[0] * (e[4] * e[8] - e[5] * e[7]) -
            e[3] * (e[1] * e[8] - e[2] * e[7]) +
            e[6] * (e[1] * e[5] - e[2] * e[4])
        );
    }

    /**
     * Computes the adjugate of the matrix.
     * @returns {Mat3} This instance for chaining.
     */
    adjugate() {
        const e = this.elements;
        const a00 = e[0],
            a01 = e[1],
            a02 = e[2];
        const a10 = e[3],
            a11 = e[4],
            a12 = e[5];
        const a20 = e[6],
            a21 = e[7],
            a22 = e[8];

        e[0] = a11 * a22 - a12 * a21;
        e[1] = -(a01 * a22 - a02 * a21);
        e[2] = a01 * a12 - a02 * a11;
        e[3] = -(a10 * a22 - a12 * a20);
        e[4] = a00 * a22 - a02 * a20;
        e[5] = -(a00 * a12 - a02 * a10);
        e[6] = a10 * a21 - a11 * a20;
        e[7] = -(a00 * a21 - a01 * a20);
        e[8] = a00 * a11 - a01 * a10;

        return this;
    }

    /**
     * Creates a clone of this matrix.
     * @returns {Mat3} New Mat3 instance.
     */
    clone() {
        return new Mat3(this.elements);
    }

    /**
     * Returns a string representation of the matrix.
     * @returns {string} String representation.
     */
    toString() {
        const e = this.elements;
        return `Mat3([\n  ${e[0]}, ${e[3]}, ${e[6]},\n  ${e[1]}, ${e[4]}, ${e[7]},\n  ${e[2]}, ${e[5]}, ${e[8]}\n])`;
    }

    /**
     * Creates a matrix from an array.
     * @param {number[]} arr - Array containing 9 elements.
     * @returns {Mat3} New Mat3 instance.
     */
    static fromArray(arr) {
        if (!Array.isArray(arr) || arr.length !== 9) {
            throw new TypeError("Array must have exactly 9 elements.");
        }
        const floatArray = new Float32Array(arr);
        return new Mat3(floatArray);
    }

    /**
     * Converts a matrix to an array.
     * @param {Mat3} mat - Matrix to convert.
     * @returns {number[]} Array of 9 elements.
     */
    static toArray(mat) {
        if (!(mat instanceof Mat3)) {
            throw new TypeError("Parameter must be an instance of Mat3.");
        }
        return Array.from(mat.elements);
    }

    /**
     * Creates an identity matrix.
     * @returns {Mat3} Identity matrix.
     */
    static identity() {
        return new Mat3();
    }

    /**
     * Multiplies two matrices and returns a new Mat3.
     * @param {Mat3} m1 - First matrix.
     * @param {Mat3} m2 - Second matrix.
     * @returns {Mat3} New Mat3 instance.
     */
    static multiply(m1, m2) {
        if (!(m1 instanceof Mat3) || !(m2 instanceof Mat3)) {
            throw new TypeError("Parameters must be instances of Mat3.");
        }
        const result = new Mat3();
        const a = m1.elements;
        const b = m2.elements;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                result.elements[col * 3 + row] =
                    a[0 * 3 + row] * b[col * 3 + 0] +
                    a[1 * 3 + row] * b[col * 3 + 1] +
                    a[2 * 3 + row] * b[col * 3 + 2];
            }
        }

        return result;
    }

    /**
     * Transposes a matrix and returns a new Mat3.
     * @param {Mat3} mat - Matrix to transpose.
     * @returns {Mat3} New Mat3 instance.
     */
    static transpose(mat) {
        if (!(mat instanceof Mat3)) {
            throw new TypeError("Parameter must be an instance of Mat3.");
        }
        return mat.clone().transpose();
    }

    /**
     * Inverts a matrix and returns a new Mat3.
     * @param {Mat3} mat - Matrix to invert.
     * @returns {Mat3} New inverted Mat3 instance.
     */
    static invert(mat) {
        if (!(mat instanceof Mat3)) {
            throw new TypeError("Parameter must be an instance of Mat3.");
        }
        return mat.clone().invert();
    }

    /**
     * Transforms a vector by a matrix and returns a new vector.
     * @param {Mat3} mat - Matrix to use for transformation.
     * @param {Vec2|Vec3} vec - Vector to transform.
     * @returns {Vec2|Vec3} Transformed vector.
     */
    static transform(mat, vec) {
        if (!(mat instanceof Mat3)) {
            throw new TypeError("First parameter must be an instance of Mat3.");
        }
        return mat.transform(vec);
    }

    /**
     * Creates a translation matrix.
     * @param {Vec2} vec - Translation vector.
     * @returns {Mat3} Translation matrix.
     */
    static translation(vec) {
        if (!(vec instanceof Vec2)) {
            throw new TypeError("Parameter must be an instance of Vec2.");
        }
        const mat = Mat3.identity();
        mat.elements[6] = vec.x;
        mat.elements[7] = vec.y;
        return mat;
    }

    /**
     * Creates a scaling matrix.
     * @param {Vec2} vec - Scaling vector.
     * @returns {Mat3} Scaling matrix.
     */
    static scaling(vec) {
        if (!(vec instanceof Vec2)) {
            throw new TypeError("Parameter must be an instance of Vec2.");
        }
        const mat = Mat3.identity();
        mat.elements[0] = vec.x;
        mat.elements[4] = vec.y;
        return mat;
    }

    /**
     * Creates a rotation matrix.
     * @param {number} angle - Rotation angle in radians.
     * @returns {Mat3} Rotation matrix.
     */
    static rotation(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const mat = Mat3.identity();
        mat.elements[0] = c;
        mat.elements[1] = s;
        mat.elements[3] = -s;
        mat.elements[4] = c;
        return mat;
    }

    /**
     * Calculates the determinant of a matrix.
     * @param {Mat3} mat - Matrix to calculate determinant.
     * @returns {number} Determinant.
     */
    static determinant(mat) {
        if (!(mat instanceof Mat3)) {
            throw new TypeError("Parameter must be an instance of Mat3.");
        }
        return mat.determinant();
    }

    /**
     * Computes the adjugate of a matrix and returns a new Mat3.
     * @param {Mat3} mat - Matrix to compute adjugate.
     * @returns {Mat3} New Mat3 instance.
     */
    static adjugate(mat) {
        if (!(mat instanceof Mat3)) {
            throw new TypeError("Parameter must be an instance of Mat3.");
        }
        return mat.clone().adjugate();
    }

    /**
     * Inverts matrices with known properties (e.g., orthogonal matrices) for performance optimization.
     * @param {Mat3} mat - Matrix to invert.
     * @returns {Mat3} New inverted Mat3 instance.
     */
    static invertSpecial(mat) {
        if (!(mat instanceof Mat3)) {
            throw new TypeError("Parameter must be an instance of Mat3.");
        }
        return mat.clone().invertSpecial();
    }
}

/**
 * Represents a 4x4 matrix.
 */
class Mat4 {
    /**
     * Matrix elements in column-major order.
     * @type {Float32Array}
     */
    elements;

    /**
     * Creates a new Mat4 instance.
     * @param {Float32Array} [elements] - Optional array of 16 elements.
     */
    constructor(elements) {
        if (elements !== undefined) {
            if (!(elements instanceof Float32Array) || elements.length !== 16) {
                throw new TypeError(
                    'Parameter "elements" must be a Float32Array of length 16.'
                );
            }
            this.elements = new Float32Array(elements);
        } else {
            this.elements = new Float32Array(16);
            // Initialize to identity matrix
            this.elements[0] = 1;
            this.elements[5] = 1;
            this.elements[10] = 1;
            this.elements[15] = 1;
        }
    }

    /**
     * Multiplies this matrix by another Mat4.
     * @param {Mat4} other - Matrix to multiply.
     * @returns {Mat4} This instance for chaining.
     */
    multiply(other) {
        if (!(other instanceof Mat4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Mat4.'
            );
        }
        const a = this.elements;
        const b = other.elements;
        const result = new Float32Array(16);

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                result[col * 4 + row] =
                    a[0 * 4 + row] * b[col * 4 + 0] +
                    a[1 * 4 + row] * b[col * 4 + 1] +
                    a[2 * 4 + row] * b[col * 4 + 2] +
                    a[3 * 4 + row] * b[col * 4 + 3];
            }
        }

        this.elements = result;
        return this;
    }

    /**
     * Transposes the matrix.
     * @returns {Mat4} This instance for chaining.
     */
    transpose() {
        const e = this.elements;
        [e[1], e[4]] = [e[4], e[1]];
        [e[2], e[8]] = [e[8], e[2]];
        [e[3], e[12]] = [e[12], e[3]];
        [e[6], e[9]] = [e[9], e[6]];
        [e[7], e[13]] = [e[13], e[7]];
        [e[11], e[14]] = [e[14], e[11]];
        return this;
    }

    /**
     * Inverts the matrix.
     * @returns {Mat4} This instance for chaining.
     */
    invert() {
        const e = this.elements;
        const a00 = e[0],
            a01 = e[1],
            a02 = e[2],
            a03 = e[3];
        const a10 = e[4],
            a11 = e[5],
            a12 = e[6],
            a13 = e[7];
        const a20 = e[8],
            a21 = e[9],
            a22 = e[10],
            a23 = e[11];
        const a30 = e[12],
            a31 = e[13],
            a32 = e[14],
            a33 = e[15];

        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;

        // Calculate the determinant
        const det =
            b00 * b11 -
            b01 * b10 +
            b02 * b09 +
            b03 * b08 -
            b04 * b07 +
            b05 * b06;

        if (det === 0) {
            throw new Error(
                "Matrix is not invertible because the determinant is zero."
            );
        }

        const invDet = 1.0 / det;

        e[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        e[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        e[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        e[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;

        e[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        e[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        e[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        e[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;

        e[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        e[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        e[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        e[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;

        e[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        e[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        e[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        e[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

        return this;
    }

    /**
     * Inverts matrices with known properties (e.g., orthogonal matrices) for performance optimization.
     * @returns {Mat4} This instance for chaining.
     */
    invertSpecial() {
        // Example optimization for orthogonal matrices: inverse is the transpose
        return this.transpose();
    }

    /**
     * Creates a clone of this matrix.
     * @returns {Mat4} New Mat4 instance.
     */
    clone() {
        return new Mat4(this.elements);
    }

    /**
     * Transforms a vector by this matrix.
     * @param {Vec3|Vec4} vec - Vector to transform.
     * @returns {Vec3|Vec4} Transformed vector.
     */
    transform(vec) {
        if (!(vec instanceof Vec3) && !(vec instanceof Vec4)) {
            throw new TypeError(
                'Parameter "vec" must be an instance of Vec3 or Vec4.'
            );
        }

        const e = this.elements;
        if (vec instanceof Vec3) {
            const x = vec.x,
                y = vec.y,
                z = vec.z;
            return new Vec3(
                e[0] * x + e[4] * y + e[8] * z + e[12],
                e[1] * x + e[5] * y + e[9] * z + e[13],
                e[2] * x + e[6] * y + e[10] * z + e[14]
            );
        } else {
            // Vec4
            const x = vec.x,
                y = vec.y,
                z = vec.z,
                w = vec.w;
            return new Vec4(
                e[0] * x + e[4] * y + e[8] * z + e[12] * w,
                e[1] * x + e[5] * y + e[9] * z + e[13] * w,
                e[2] * x + e[6] * y + e[10] * z + e[14] * w,
                e[3] * x + e[7] * y + e[11] * z + e[15] * w
            );
        }
    }

    /**
     * Applies translation to the matrix.
     * @param {Vec3} vec - Translation vector.
     * @returns {Mat4} This instance for chaining.
     */
    translate(vec) {
        if (!(vec instanceof Vec3)) {
            throw new TypeError('Parameter "vec" must be an instance of Vec3.');
        }
        const e = this.elements;
        e[12] += e[0] * vec.x + e[4] * vec.y + e[8] * vec.z;
        e[13] += e[1] * vec.x + e[5] * vec.y + e[9] * vec.z;
        e[14] += e[2] * vec.x + e[6] * vec.y + e[10] * vec.z;
        e[15] += e[3] * vec.x + e[7] * vec.y + e[11] * vec.z;
        return this;
    }

    /**
     * Applies scaling to the matrix.
     * @param {Vec3} vec - Scaling vector.
     * @returns {Mat4} This instance for chaining.
     */
    scale(vec) {
        if (!(vec instanceof Vec3)) {
            throw new TypeError('Parameter "vec" must be an instance of Vec3.');
        }
        const e = this.elements;
        e[0] *= vec.x;
        e[1] *= vec.x;
        e[2] *= vec.x;
        e[3] *= vec.x;

        e[4] *= vec.y;
        e[5] *= vec.y;
        e[6] *= vec.y;
        e[7] *= vec.y;

        e[8] *= vec.z;
        e[9] *= vec.z;
        e[10] *= vec.z;
        e[11] *= vec.z;

        return this;
    }

    /**
     * Applies rotation to the matrix.
     * @param {Quat|Vec3} axisOrQuat - Axis vector or quaternion.
     * @param {number} [angle] - Rotation angle in radians (if axis is a Vec3).
     * @returns {Mat4} This instance for chaining.
     */
    rotate(axisOrQuat, angle) {
        const mat = new Mat4();
        if (axisOrQuat instanceof Quat) {
            mat.elements = axisOrQuat.toMatrix().elements;
        } else if (axisOrQuat instanceof Vec3 && typeof angle === "number") {
            const quat = Quat.fromAxisAngle(axisOrQuat, angle);
            mat.elements = quat.toMatrix().elements;
        } else {
            throw new TypeError(
                "Invalid parameters for rotate. Provide a Quat or Vec3 and angle."
            );
        }
        this.multiply(mat);
        return this;
    }

    /**
     * Calculates the determinant of the matrix.
     * @returns {number} Determinant.
     */
    determinant() {
        const e = this.elements;
        const a00 = e[0],
            a01 = e[1],
            a02 = e[2],
            a03 = e[3];
        const a10 = e[4],
            a11 = e[5],
            a12 = e[6],
            a13 = e[7];
        const a20 = e[8],
            a21 = e[9],
            a22 = e[10],
            a23 = e[11];
        const a30 = e[12],
            a31 = e[13],
            a32 = e[14],
            a33 = e[15];

        return (
            a00 * a11 * a22 * a33 +
            a00 * a12 * a21 * a33 +
            a00 * a13 * a20 * a32 +
            a01 * a10 * a22 * a33 +
            a01 * a12 * a20 * a33 +
            a01 * a13 * a22 * a30 +
            a02 * a10 * a21 * a33 +
            a02 * a11 * a20 * a33 +
            a02 * a13 * a21 * a30 +
            a03 * a10 * a21 * a32 +
            a03 * a11 * a20 * a32 +
            a03 * a12 * a21 * a30 -
            a00 * a11 * a23 * a32 -
            a00 * a12 * a21 * a33 -
            a00 * a13 * a20 * a32 -
            a01 * a10 * a23 * a32 -
            a01 * a12 * a20 * a33 -
            a01 * a13 * a22 * a30 -
            a02 * a10 * a23 * a31 -
            a02 * a11 * a20 * a33 -
            a02 * a13 * a21 * a30 -
            a03 * a10 * a21 * a32 -
            a03 * a11 * a20 * a32 -
            a03 * a12 * a21 * a30
        );
    }

    /**
     * Computes the adjugate of the matrix.
     * @returns {Mat4} This instance for chaining.
     */
    adjugate() {
        const e = this.elements;
        const a00 = e[0],
            a01 = e[1],
            a02 = e[2],
            a03 = e[3];
        const a10 = e[4],
            a11 = e[5],
            a12 = e[6],
            a13 = e[7];
        const a20 = e[8],
            a21 = e[9],
            a22 = e[10],
            a23 = e[11];
        const a30 = e[12],
            a31 = e[13],
            a32 = e[14],
            a33 = e[15];

        e[0] =
            a11 * a22 * a33 -
            a11 * a23 * a32 -
            a21 * a12 * a33 +
            a21 * a13 * a32 +
            a31 * a12 * a23 -
            a31 * a13 * a22;
        e[1] =
            -a01 * a22 * a33 +
            a01 * a23 * a32 +
            a21 * a02 * a33 -
            a21 * a03 * a32 -
            a31 * a02 * a23 +
            a31 * a03 * a22;
        e[2] =
            a01 * a12 * a33 -
            a01 * a13 * a32 -
            a11 * a02 * a33 +
            a11 * a03 * a32 +
            a31 * a02 * a13 -
            a31 * a03 * a12;
        e[3] =
            -a01 * a12 * a23 +
            a01 * a13 * a22 +
            a11 * a02 * a23 -
            a11 * a03 * a22 -
            a21 * a02 * a13 +
            a21 * a03 * a12;

        e[4] =
            -a10 * a22 * a33 +
            a10 * a23 * a32 +
            a20 * a12 * a33 -
            a20 * a13 * a32 -
            a30 * a12 * a23 +
            a30 * a13 * a22;
        e[5] =
            a00 * a22 * a33 -
            a00 * a23 * a32 -
            a20 * a02 * a33 +
            a20 * a03 * a32 +
            a30 * a02 * a23 -
            a30 * a03 * a22;
        e[6] =
            -a00 * a12 * a33 +
            a00 * a13 * a32 +
            a10 * a02 * a33 -
            a10 * a03 * a32 -
            a30 * a02 * a13 +
            a30 * a03 * a12;
        e[7] =
            a00 * a12 * a23 -
            a00 * a13 * a22 -
            a10 * a02 * a23 +
            a10 * a03 * a22 +
            a20 * a02 * a13 -
            a20 * a03 * a12;

        e[8] =
            a10 * a21 * a33 -
            a10 * a23 * a31 -
            a20 * a11 * a33 +
            a20 * a13 * a31 +
            a30 * a11 * a23 -
            a30 * a13 * a21;
        e[9] =
            -a00 * a21 * a33 +
            a00 * a23 * a31 +
            a20 * a01 * a33 -
            a20 * a03 * a31 -
            a30 * a01 * a23 +
            a30 * a03 * a21;
        e[10] =
            a00 * a11 * a33 -
            a00 * a13 * a31 -
            a10 * a01 * a33 +
            a10 * a03 * a31 +
            a30 * a01 * a13 -
            a30 * a03 * a11;
        e[11] =
            -a00 * a11 * a23 +
            a00 * a13 * a21 +
            a10 * a01 * a23 -
            a10 * a03 * a21 -
            a20 * a01 * a13 +
            a20 * a03 * a11;

        e[12] =
            -a10 * a21 * a32 +
            a10 * a22 * a31 +
            a20 * a11 * a32 -
            a20 * a12 * a31 -
            a30 * a11 * a22 +
            a30 * a12 * a21;
        e[13] =
            a00 * a21 * a32 -
            a00 * a22 * a31 -
            a20 * a01 * a32 +
            a20 * a02 * a31 +
            a30 * a01 * a22 -
            a30 * a02 * a21;
        e[14] =
            -a00 * a11 * a32 +
            a00 * a12 * a31 +
            a10 * a01 * a32 -
            a10 * a02 * a31 -
            a30 * a01 * a12 +
            a30 * a02 * a11;
        e[15] =
            a00 * a11 * a22 -
            a00 * a12 * a21 -
            a10 * a01 * a22 +
            a10 * a02 * a21 +
            a20 * a01 * a12 -
            a20 * a02 * a11;

        return this;
    }

    /**
     * Creates a clone of this matrix.
     * @returns {Mat4} New Mat4 instance.
     */
    clone() {
        return new Mat4(this.elements);
    }

    /**
     * Transforms a vector by this matrix.
     * @param {Mat4} mat - Matrix to use for transformation.
     * @param {Vec3|Vec4} vec - Vector to transform.
     * @returns {Vec3|Vec4} Transformed vector.
     */
    static transform(mat, vec) {
        if (!(mat instanceof Mat4)) {
            throw new TypeError("First parameter must be an instance of Mat4.");
        }
        return mat.transform(vec);
    }

    /**
     * Creates a translation matrix.
     * @param {Vec3} vec - Translation vector.
     * @returns {Mat4} Translation matrix.
     */
    static translation(vec) {
        if (!(vec instanceof Vec3)) {
            throw new TypeError("Parameter must be an instance of Vec3.");
        }
        const mat = Mat4.identity();
        mat.elements[12] = vec.x;
        mat.elements[13] = vec.y;
        mat.elements[14] = vec.z;
        return mat;
    }

    /**
     * Creates a scaling matrix.
     * @param {Vec3} vec - Scaling vector.
     * @returns {Mat4} Scaling matrix.
     */
    static scaling(vec) {
        if (!(vec instanceof Vec3)) {
            throw new TypeError("Parameter must be an instance of Vec3.");
        }
        const mat = Mat4.identity();
        mat.elements[0] = vec.x;
        mat.elements[5] = vec.y;
        mat.elements[10] = vec.z;
        return mat;
    }

    /**
     * Creates a rotation matrix.
     * @param {Quat} quat - Quaternion representing rotation.
     * @returns {Mat4} Rotation matrix.
     */
    static rotation(quat) {
        if (!(quat instanceof Quat)) {
            throw new TypeError("Parameter must be an instance of Quat.");
        }
        const mat = quat.toMatrix();
        return mat;
    }

    /**
     * Creates a perspective projection matrix.
     * @param {number} fov - Field of view in radians.
     * @param {number} aspect - Aspect ratio.
     * @param {number} near - Near clipping plane.
     * @param {number} far - Far clipping plane.
     * @returns {Mat4} Perspective projection matrix.
     */
    static perspective(fov, aspect, near, far) {
        if (
            typeof fov !== "number" ||
            typeof aspect !== "number" ||
            typeof near !== "number" ||
            typeof far !== "number"
        ) {
            throw new TypeError("Parameters must be numbers.");
        }
        const mat = new Mat4();
        const f = 1.0 / Math.tan(fov / 2);
        mat.elements[0] = f / aspect;
        mat.elements[5] = f;
        mat.elements[10] = (far + near) / (near - far);
        mat.elements[11] = -1;
        mat.elements[14] = (2 * far * near) / (near - far);
        mat.elements[15] = 0;
        return mat;
    }

    /**
     * Creates a lookAt matrix.
     * @param {Vec3} eye - Eye position.
     * @param {Vec3} center - Center position.
     * @param {Vec3} up - Up vector.
     * @returns {Mat4} LookAt matrix.
     */
    static lookAt(eye, center, up) {
        if (
            !(eye instanceof Vec3) ||
            !(center instanceof Vec3) ||
            !(up instanceof Vec3)
        ) {
            throw new TypeError("Parameters must be instances of Vec3.");
        }

        const f = Vec3.subtract(center, eye).normalize();
        const s = Vec3.cross(f, up.clone().normalize()).normalize();
        const u = Vec3.cross(s, f);

        const mat = new Mat4();
        mat.elements[0] = s.x;
        mat.elements[1] = u.x;
        mat.elements[2] = -f.x;
        mat.elements[3] = 0;

        mat.elements[4] = s.y;
        mat.elements[5] = u.y;
        mat.elements[6] = -f.y;
        mat.elements[7] = 0;

        mat.elements[8] = s.z;
        mat.elements[9] = u.z;
        mat.elements[10] = -f.z;
        mat.elements[11] = 0;

        mat.elements[12] = -Vec3.dot(s, eye);
        mat.elements[13] = -Vec3.dot(u, eye);
        mat.elements[14] = Vec3.dot(f, eye);
        mat.elements[15] = 1;

        return mat;
    }

    /**
     * Creates an identity matrix.
     * @returns {Mat4} Identity matrix.
     */
    static identity() {
        return new Mat4();
    }

    /**
     * Multiplies two matrices and returns a new Mat4.
     * @param {Mat4} m1 - First matrix.
     * @param {Mat4} m2 - Second matrix.
     * @returns {Mat4} New Mat4 instance.
     */
    static multiply(m1, m2) {
        if (!(m1 instanceof Mat4) || !(m2 instanceof Mat4)) {
            throw new TypeError("Parameters must be instances of Mat4.");
        }
        const result = new Mat4();
        const a = m1.elements;
        const b = m2.elements;

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                result.elements[col * 4 + row] =
                    a[0 * 4 + row] * b[col * 4 + 0] +
                    a[1 * 4 + row] * b[col * 4 + 1] +
                    a[2 * 4 + row] * b[col * 4 + 2] +
                    a[3 * 4 + row] * b[col * 4 + 3];
            }
        }

        return result;
    }

    /**
     * Transposes a matrix and returns a new Mat4.
     * @param {Mat4} mat - Matrix to transpose.
     * @returns {Mat4} New Mat4 instance.
     */
    static transpose(mat) {
        if (!(mat instanceof Mat4)) {
            throw new TypeError("Parameter must be an instance of Mat4.");
        }
        return mat.clone().transpose();
    }

    /**
     * Inverts a matrix and returns a new Mat4.
     * @param {Mat4} mat - Matrix to invert.
     * @returns {Mat4} New inverted Mat4 instance.
     */
    static invert(mat) {
        if (!(mat instanceof Mat4)) {
            throw new TypeError("Parameter must be an instance of Mat4.");
        }
        return mat.clone().invert();
    }

    /**
     * Transforms a vector by a matrix and returns a new vector.
     * @param {Mat4} mat - Matrix to use for transformation.
     * @param {Vec3|Vec4} vec - Vector to transform.
     * @returns {Vec3|Vec4} Transformed vector.
     */
    static transform(mat, vec) {
        return mat.transform(vec);
    }

    /**
     * Creates a translation matrix.
     * @param {Vec3} vec - Translation vector.
     * @returns {Mat4} Translation matrix.
     */
    static translate(vec) {
        return Mat4.translation(vec);
    }

    /**
     * Creates a scaling matrix.
     * @param {Vec3} vec - Scaling vector.
     * @returns {Mat4} Scaling matrix.
     */
    static scale(vec) {
        return Mat4.scaling(vec);
    }

    /**
     * Creates a rotation matrix.
     * @param {Quat} quat - Quaternion representing rotation.
     * @returns {Mat4} Rotation matrix.
     */
    static rotate(quat) {
        return Mat4.rotation(quat);
    }

    /**
     * Creates a perspective projection matrix.
     * @param {number} fov - Field of view in radians.
     * @param {number} aspect - Aspect ratio.
     * @param {number} near - Near clipping plane.
     * @param {number} far - Far clipping plane.
     * @returns {Mat4} Perspective projection matrix.
     */
    static perspective(fov, aspect, near, far) {
        return Mat4.perspective(fov, aspect, near, far);
    }

    /**
     * Creates a lookAt matrix.
     * @param {Vec3} eye - Eye position.
     * @param {Vec3} center - Center position.
     * @param {Vec3} up - Up vector.
     * @returns {Mat4} LookAt matrix.
     */
    static lookAt(eye, center, up) {
        return Mat4.lookAt(eye, center, up);
    }

    /**
     * Calculates the determinant of a matrix.
     * @param {Mat4} mat - Matrix to calculate determinant.
     * @returns {number} Determinant.
     */
    static determinant(mat) {
        if (!(mat instanceof Mat4)) {
            throw new TypeError("Parameter must be an instance of Mat4.");
        }
        return mat.determinant();
    }

    /**
     * Computes the adjugate of a matrix and returns a new Mat4.
     * @param {Mat4} mat - Matrix to compute adjugate.
     * @returns {Mat4} New Mat4 instance.
     */
    static adjugate(mat) {
        if (!(mat instanceof Mat4)) {
            throw new TypeError("Parameter must be an instance of Mat4.");
        }
        return mat.clone().adjugate();
    }

    /**
     * Inverts matrices with known properties (e.g., orthogonal matrices) for performance optimization.
     * @param {Mat4} mat - Matrix to invert.
     * @returns {Mat4} New inverted Mat4 instance.
     */
    static invertSpecial(mat) {
        if (!(mat instanceof Mat4)) {
            throw new TypeError("Parameter must be an instance of Mat4.");
        }
        return mat.clone().invertSpecial();
    }
}

/**
 * Example Usage
 * -------------
 */

// Creating Vectors
const v2 = new Vec2(1, 2);
const v3 = new Vec3(1, 2, 3);
const v4 = new Vec4(1, 2, 3, 4);

// Vector Operations with Chaining
v3.add(new Vec3(4, 5, 6)).multiplyScalar(2).normalize();
console.log(v3.toString()); // Vec3(...)

// Quaternion Rotations
const quatY = Quat.fromRotationY(Math.PI / 2);
const axis = new Vec3(1, 0, 0);
const quatAxis = Quat.fromAxisAngle(axis, Math.PI / 4);
const quatCombined = new Quat(0, 0, 0, 1).rotateBy(quatY).rotateBy(quatAxis);
console.log(quatCombined.toString()); // Quat(...)

// Transforming Vectors with Matrices
const translation = Mat4.translation(new Vec3(5, 0, 0));
const scaling = Mat4.scaling(new Vec3(2, 2, 2));
const rotation = Mat4.rotation(quatY);
const modelMatrix = new Mat4()
    .multiply(translation)
    .multiply(rotation)
    .multiply(scaling);

const originalVec = new Vec3(1, 1, 1);
const transformedVec = modelMatrix.transform(originalVec);
console.log(transformedVec.toString()); // Vec3(...)

// Cloning and Copying
const clonedVec = v3.clone();
const clonedMat = modelMatrix.clone();
console.log(clonedVec.toString(), clonedMat.toString());

// Using Static Methods
const vA = new Vec3(1, 2, 3);
const vB = new Vec3(4, 5, 6);
const vC = Vec3.add(vA, vB); // Vec3(5, 7, 9)
console.log(vC.toString());

// Handling Errors
try {
    const nonInvertibleMat = new Mat3(
        new Float32Array([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9, // Determinant is zero
        ])
    );
    nonInvertibleMat.invert();
} catch (error) {
    console.error(error.message); // "Matrix is not invertible because the determinant is zero."
}

// Additional Vector Operations
const vD = new Vec3(3, 4, 0);
console.log(vD.length()); // 5
console.log(vD.distanceTo(new Vec3(0, 0, 0))); // 5
const angle = vA.angleBetween(vB);
console.log(angle); // Angle in radians between vA and vB
const vE = vA.lerp(vB, 0.5); // Vec3(2.5, 3.5, 4.5)
console.log(vE.toString());
