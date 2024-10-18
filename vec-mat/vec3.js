import Mat4 from "./mat4.js";

/**
 * Represents a 3-dimensional vector in a right-handed coordinate system.
 */
class Vec3 {
    /**
     * Creates a new Vec3 instance.
     * @param {number} [x=0] - X-component.
     * @param {number} [y=0] - Y-component.
     * @param {number} [z=0] - Z-component.
     */
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
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
            throw new TypeError("x must be a number.");
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
            throw new TypeError("y must be a number.");
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
            throw new TypeError("z must be a number.");
        }
        this._z = value;
    }

    /**
     * Creates a clone of this vector.
     * @returns {Vec3} A new Vec3 instance with the same components.
     */
    clone() {
        return new Vec3(this.x, this.y, this.z);
    }

    /**
     * Adds another vector to this vector.
     * @param {Vec3} other - Vector to add.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
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
     * Subtracts another vector from this vector.
     * @param {Vec3} other - Vector to subtract.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
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
     * Multiplies this vector by another vector component-wise.
     * @param {Vec3} other - Vector to multiply by.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     */
    multiply(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        this.x *= other.x;
        this.y *= other.y;
        this.z *= other.z;
        return this;
    }

    /**
     * Divides this vector by another vector component-wise.
     * @param {Vec3} other - Vector to divide by.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     * @throws {Error} If any component of the other vector is zero.
     */
    divide(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        if (other.x === 0 || other.y === 0 || other.z === 0) {
            throw new Error("Division by zero.");
        }
        this.x /= other.x;
        this.y /= other.y;
        this.z /= other.z;
        return this;
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - Scalar to multiply by.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the scalar is not a number.
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
     * @param {number} scalar - Scalar to divide by.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the scalar is not a number.
     * @throws {Error} If the scalar is zero.
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
        this.z /= scalar;
        return this;
    }

    /**
     * Negates this vector (multiplies components by -1).
     * @returns {Vec3} This instance for chaining.
     */
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    /**
     * Normalizes this vector to unit length.
     * @returns {Vec3} This instance for chaining.
     * @throws {Error} If the vector length is zero.
     */
    normalize() {
        const len = this.length();
        if (len === 0) {
            throw new Error("Cannot normalize a vector with length of zero.");
        }
        this.divideScalar(len);
        return this;
    }

    /**
     * Calculates the dot product with another vector.
     * @param {Vec3} other - Vector to calculate the dot product with.
     * @returns {number} The dot product.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
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
     * Calculates the cross product with another Vec3.
     * @param {Vec3} other - Vector to calculate the cross product with.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     */
    cross(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        const crossX = this.y * other.z - this.z * other.y;
        const crossY = this.z * other.x - this.x * other.z;
        const crossZ = this.x * other.y - this.y * other.x;
        this.x = crossX;
        this.y = crossY;
        this.z = crossZ;
        return this;
    }

    /**
     * Returns the magnitude (length) of the vector.
     * @returns {number} The length of the vector.
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * Returns the squared magnitude of the vector.
     * @returns {number} The squared length of the vector.
     */
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * Computes the distance to another vector.
     * @param {Vec3} other - The other vector.
     * @returns {number} The distance between the two vectors.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     */
    distanceTo(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    /**
     * Computes the squared distance to another vector.
     * @param {Vec3} other - The other vector.
     * @returns {number} The squared distance between the two vectors.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
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
     * Calculates the angle to another vector in radians.
     * @param {Vec3} other - The other vector.
     * @returns {number} The angle between the two vectors in radians.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     * @throws {Error} If either vector has zero length.
     */
    angleTo(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        const len1 = this.length();
        const len2 = other.length();
        if (len1 === 0 || len2 === 0) {
            throw new Error("Cannot calculate angle with zero-length vector.");
        }
        const dotProduct = this.dot(other);
        // Clamp the cosine to the range [-1, 1] to avoid NaN due to floating point errors
        const cosTheta = Math.max(-1, Math.min(1, dotProduct / (len1 * len2)));
        return Math.acos(cosTheta);
    }

    /**
     * Linearly interpolates between this vector and another vector by factor t.
     * @param {Vec3} other - The target vector.
     * @param {number} t - Interpolation factor between 0 and 1.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameters are of incorrect types.
     */
    lerp(other, t) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        if (typeof t !== "number") {
            throw new TypeError('Parameter "t" must be a number.');
        }
        this.x += (other.x - this.x) * t;
        this.y += (other.y - this.y) * t;
        this.z += (other.z - this.z) * t;
        return this;
    }

    /**
     * Transforms the vector using a Mat4. The vector is treated as a position vector with w = 1.
     * After transformation, if w is not 1, the resulting vector is divided by w to perform perspective division.
     * @param {Mat4} matrix - The matrix to transform with.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Mat4.
     */
    transform(matrix) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        const e = matrix.elements;
        const x = this.x,
            y = this.y,
            z = this.z;
        const transformedX = e[0] * x + e[4] * y + e[8] * z + e[12];
        const transformedY = e[1] * x + e[5] * y + e[9] * z + e[13];
        const transformedZ = e[2] * x + e[6] * y + e[10] * z + e[14];
        const w = e[3] * x + e[7] * y + e[11] * z + e[15];
        if (w !== 1 && w !== 0) {
            this.x = transformedX / w;
            this.y = transformedY / w;
            this.z = transformedZ / w;
        } else {
            this.x = transformedX;
            this.y = transformedY;
            this.z = transformedZ;
        }
        return this;
    }

    /**
     * Projects this vector onto another vector.
     * @param {Vec3} target - The vector to project onto.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     * @throws {Error} If the target vector has zero length.
     */
    projectOnVector(target) {
        if (!(target instanceof Vec3)) {
            throw new TypeError(
                'Parameter "target" must be an instance of Vec3.'
            );
        }
        const targetLenSquared = target.lengthSquared();
        if (targetLenSquared === 0) {
            throw new Error("Cannot project onto a zero-length vector.");
        }
        const scalar = this.dot(target) / targetLenSquared;
        this.x = target.x * scalar;
        this.y = target.y * scalar;
        this.z = target.z * scalar;
        return this;
    }

    /**
     * Projects this vector onto a plane defined by a normal.
     * @param {Vec3} normal - The normal of the plane.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     * @throws {Error} If the normal vector has zero length.
     */
    projectOnPlane(normal) {
        if (!(normal instanceof Vec3)) {
            throw new TypeError(
                'Parameter "normal" must be an instance of Vec3.'
            );
        }
        const normalLenSquared = normal.lengthSquared();
        if (normalLenSquared === 0) {
            throw new Error("Normal vector has zero length.");
        }
        const dotProduct = this.dot(normal);
        this.x -= (dotProduct / normalLenSquared) * normal.x;
        this.y -= (dotProduct / normalLenSquared) * normal.y;
        this.z -= (dotProduct / normalLenSquared) * normal.z;
        return this;
    }

    /**
     * Reflects the vector around a given normal.
     * @param {Vec3} normal - The normal to reflect around.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     * @throws {Error} If the normal vector has zero length.
     */
    reflect(normal) {
        if (!(normal instanceof Vec3)) {
            throw new TypeError(
                'Parameter "normal" must be an instance of Vec3.'
            );
        }
        const normalLenSquared = normal.lengthSquared();
        if (normalLenSquared === 0) {
            throw new Error("Normal vector has zero length.");
        }
        const dotProduct = this.dot(normal);
        const scalar = (2 * dotProduct) / normalLenSquared;
        this.x -= scalar * normal.x;
        this.y -= scalar * normal.y;
        this.z -= scalar * normal.z;
        return this;
    }

    /**
     * Checks if this vector equals another vector.
     * @param {Vec3} other - The vector to compare with.
     * @returns {boolean} True if vectors are equal, false otherwise.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     */
    equals(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    /**
     * Sets each component to the minimum of itself and the corresponding component of another vector.
     * @param {Vec3} other - The vector to compare with.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     */
    min(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        this.x = Math.min(this.x, other.x);
        this.y = Math.min(this.y, other.y);
        this.z = Math.min(this.z, other.z);
        return this;
    }

    /**
     * Sets each component to the maximum of itself and the corresponding component of another vector.
     * @param {Vec3} other - The vector to compare with.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     */
    max(other) {
        if (!(other instanceof Vec3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Vec3.'
            );
        }
        this.x = Math.max(this.x, other.x);
        this.y = Math.max(this.y, other.y);
        this.z = Math.max(this.z, other.z);
        return this;
    }

    /**
     * Clamps this vector's components between the components of minVec and maxVec.
     * @param {Vec3} minVec - The minimum vector.
     * @param {Vec3} maxVec - The maximum vector.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameters are not instances of Vec3.
     */
    clamp(minVec, maxVec) {
        if (!(minVec instanceof Vec3) || !(maxVec instanceof Vec3)) {
            throw new TypeError(
                'Parameters "minVec" and "maxVec" must be instances of Vec3.'
            );
        }
        this.x = Math.min(Math.max(this.x, minVec.x), maxVec.x);
        this.y = Math.min(Math.max(this.y, minVec.y), maxVec.y);
        this.z = Math.min(Math.max(this.z, minVec.z), maxVec.z);
        return this;
    }

    /**
     * Sets the length of this vector to the given value.
     * @param {number} length - The desired length.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the length is not a number.
     * @throws {Error} If the current vector length is zero.
     */
    setLength(length) {
        if (typeof length !== "number") {
            throw new TypeError('Parameter "length" must be a number.');
        }
        const currentLength = this.length();
        if (currentLength === 0) {
            throw new Error("Cannot set length for a zero-length vector.");
        }
        this.multiplyScalar(length / currentLength);
        return this;
    }

    /**
     * Converts this vector to an array.
     * @returns {number[]} An array containing the x, y, z components.
     */
    toArray() {
        return [this.x, this.y, this.z];
    }

    /**
     * Sets the components of this vector from an array.
     * @param {number[]} array - An array containing at least three numerical elements.
     * @returns {Vec3} This instance for chaining.
     * @throws {TypeError} If the parameter is not an array of numbers.
     * @throws {Error} If the array does not contain at least three elements.
     */
    fromArray(array) {
        if (!Array.isArray(array)) {
            throw new TypeError('Parameter "array" must be an array.');
        }
        if (array.length < 3) {
            throw new Error("Array must contain at least three elements.");
        }
        const [x, y, z] = array;
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number"
        ) {
            throw new TypeError("Array elements must be numbers.");
        }
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string} The string representation.
     */
    toString() {
        return `Vec3(${this.x}, ${this.y}, ${this.z})`;
    }

    /**
     * Adds two vectors and returns a new vector.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {Vec3} New Vec3 instance representing the sum.
     * @throws {TypeError} If either parameter is not an instance of Vec3.
     */
    static add(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec3.'
            );
        }
        return new Vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    /**
     * Subtracts v2 from v1 and returns a new vector.
     * @param {Vec3} v1 - The vector to subtract from.
     * @param {Vec3} v2 - The vector to subtract.
     * @returns {Vec3} New Vec3 instance representing the difference.
     * @throws {TypeError} If either parameter is not an instance of Vec3.
     */
    static subtract(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec3.'
            );
        }
        return new Vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    /**
     * Multiplies two vectors component-wise and returns a new vector.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {Vec3} New Vec3 instance representing the product.
     * @throws {TypeError} If either parameter is not an instance of Vec3.
     */
    static multiply(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec3.'
            );
        }
        return new Vec3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }

    /**
     * Divides v1 by v2 component-wise and returns a new vector.
     * @param {Vec3} v1 - The vector to divide.
     * @param {Vec3} v2 - The vector to divide by.
     * @returns {Vec3} New Vec3 instance representing the quotient.
     * @throws {TypeError} If either parameter is not an instance of Vec3.
     * @throws {Error} If any component of v2 is zero.
     */
    static divide(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec3.'
            );
        }
        if (v2.x === 0 || v2.y === 0 || v2.z === 0) {
            throw new Error("Division by zero.");
        }
        return new Vec3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    }

    /**
     * Multiplies a vector by a scalar and returns a new vector.
     * @param {Vec3} v - The vector to multiply.
     * @param {number} scalar - The scalar to multiply by.
     * @returns {Vec3} New Vec3 instance representing the product.
     * @throws {TypeError} If the parameters are of incorrect types.
     */
    static multiplyScalar(v, scalar) {
        if (!(v instanceof Vec3)) {
            throw new TypeError('Parameter "v" must be an instance of Vec3.');
        }
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        return new Vec3(v.x * scalar, v.y * scalar, v.z * scalar);
    }

    /**
     * Divides a vector by a scalar and returns a new vector.
     * @param {Vec3} v - The vector to divide.
     * @param {number} scalar - The scalar to divide by.
     * @returns {Vec3} New Vec3 instance representing the quotient.
     * @throws {TypeError} If the parameters are of incorrect types.
     * @throws {Error} If the scalar is zero.
     */
    static divideScalar(v, scalar) {
        if (!(v instanceof Vec3)) {
            throw new TypeError('Parameter "v" must be an instance of Vec3.');
        }
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        if (scalar === 0) {
            throw new Error("Division by zero.");
        }
        return new Vec3(v.x / scalar, v.y / scalar, v.z / scalar);
    }

    /**
     * Returns the negation of a vector.
     * @param {Vec3} v - The vector to negate.
     * @returns {Vec3} New Vec3 instance representing the negated vector.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     */
    static negate(v) {
        if (!(v instanceof Vec3)) {
            throw new TypeError('Parameter "v" must be an instance of Vec3.');
        }
        return new Vec3(-v.x, -v.y, -v.z);
    }

    /**
     * Normalizes a vector and returns a new vector.
     * @param {Vec3} v - The vector to normalize.
     * @returns {Vec3} New Vec3 instance representing the normalized vector.
     * @throws {TypeError} If the parameter is not an instance of Vec3.
     * @throws {Error} If the vector length is zero.
     */
    static normalize(v) {
        if (!(v instanceof Vec3)) {
            throw new TypeError('Parameter "v" must be an instance of Vec3.');
        }
        const len = v.length();
        if (len === 0) {
            throw new Error("Cannot normalize a zero-length vector.");
        }
        return Vec3.divideScalar(v, len);
    }

    /**
     * Calculates the dot product of two vectors.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {number} The dot product.
     * @throws {TypeError} If either parameter is not an instance of Vec3.
     */
    static dot(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec3.'
            );
        }
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    /**
     * Calculates the cross product of two Vec3 vectors.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {Vec3} New Vec3 instance representing the cross product.
     * @throws {TypeError} If either parameter is not an instance of Vec3.
     */
    static cross(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec3.'
            );
        }
        const crossX = v1.y * v2.z - v1.z * v2.y;
        const crossY = v1.z * v2.x - v1.x * v2.z;
        const crossZ = v1.x * v2.y - v1.y * v2.x;
        return new Vec3(crossX, crossY, crossZ);
    }

    /**
     * Computes the distance between two vectors.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {number} The distance between the two vectors.
     * @throws {TypeError} If either parameter is not an instance of Vec3.
     */
    static distance(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec3.'
            );
        }
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        const dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    /**
     * Computes the squared distance between two vectors.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {number} The squared distance between the two vectors.
     * @throws {TypeError} If either parameter is not an instance of Vec3.
     */
    static distanceSquared(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec3.'
            );
        }
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        const dz = v1.z - v2.z;
        return dx * dx + dy * dy + dz * dz;
    }

    /**
     * Calculates the angle between two vectors in radians.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {number} The angle between the two vectors in radians.
     * @throws {TypeError} If either parameter is not an instance of Vec3.
     * @throws {Error} If either vector has zero length.
     */
    static angleBetween(v1, v2) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec3.'
            );
        }
        const len1 = v1.length();
        const len2 = v2.length();
        if (len1 === 0 || len2 === 0) {
            throw new Error("Cannot calculate angle with zero-length vector.");
        }
        const dotProduct = Vec3.dot(v1, v2);
        // Clamp the cosine to the range [-1, 1] to avoid NaN due to floating point errors
        const cosTheta = Math.max(-1, Math.min(1, dotProduct / (len1 * len2)));
        return Math.acos(cosTheta);
    }

    /**
     * Linearly interpolates between two vectors by factor t and returns a new vector.
     * @param {Vec3} v1 - Start vector.
     * @param {Vec3} v2 - End vector.
     * @param {number} t - Interpolation factor between 0 and 1.
     * @returns {Vec3} New Vec3 instance representing the interpolated vector.
     * @throws {TypeError} If the parameters are of incorrect types.
     */
    static lerp(v1, v2, t) {
        if (!(v1 instanceof Vec3) || !(v2 instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v1" and "v2" must be instances of Vec3.'
            );
        }
        if (typeof t !== "number") {
            throw new TypeError('Parameter "t" must be a number.');
        }
        return new Vec3(
            v1.x + (v2.x - v1.x) * t,
            v1.y + (v2.y - v1.y) * t,
            v1.z + (v2.z - v1.z) * t
        );
    }

    /**
     * Projects vector v onto target.
     * @param {Vec3} v - The vector to project.
     * @param {Vec3} target - The target vector to project onto.
     * @returns {Vec3} New Vec3 instance representing the projection.
     * @throws {TypeError} If the parameters are not instances of Vec3.
     * @throws {Error} If the target vector has zero length.
     */
    static projectOnVector(v, target) {
        if (!(v instanceof Vec3) || !(target instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v" and "target" must be instances of Vec3.'
            );
        }
        const targetLenSquared = target.lengthSquared();
        if (targetLenSquared === 0) {
            throw new Error("Cannot project onto a zero-length vector.");
        }
        const scalar = Vec3.dot(v, target) / targetLenSquared;
        return new Vec3(
            target.x * scalar,
            target.y * scalar,
            target.z * scalar
        );
    }

    /**
     * Projects vector v onto a plane defined by normal.
     * @param {Vec3} v - The vector to project.
     * @param {Vec3} normal - The normal of the plane.
     * @returns {Vec3} New Vec3 instance representing the projection.
     * @throws {TypeError} If the parameters are not instances of Vec3.
     * @throws {Error} If the normal vector has zero length.
     */
    static projectOnPlane(v, normal) {
        if (!(v instanceof Vec3) || !(normal instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v" and "normal" must be instances of Vec3.'
            );
        }
        const normalLenSquared = normal.lengthSquared();
        if (normalLenSquared === 0) {
            throw new Error("Normal vector has zero length.");
        }
        const dotProduct = Vec3.dot(v, normal);
        const scalar = dotProduct / normalLenSquared;
        return new Vec3(
            v.x - scalar * normal.x,
            v.y - scalar * normal.y,
            v.z - scalar * normal.z
        );
    }

    /**
     * Reflects vector v around a given normal.
     * @param {Vec3} v - The vector to reflect.
     * @param {Vec3} normal - The normal to reflect around.
     * @returns {Vec3} New Vec3 instance representing the reflected vector.
     * @throws {TypeError} If the parameters are not instances of Vec3.
     * @throws {Error} If the normal vector has zero length.
     */
    static reflect(v, normal) {
        if (!(v instanceof Vec3) || !(normal instanceof Vec3)) {
            throw new TypeError(
                'Parameters "v" and "normal" must be instances of Vec3.'
            );
        }
        const normalLenSquared = normal.lengthSquared();
        if (normalLenSquared === 0) {
            throw new Error("Normal vector has zero length.");
        }
        const dotProduct = Vec3.dot(v, normal);
        const scalar = (2 * dotProduct) / normalLenSquared;
        return new Vec3(
            v.x - scalar * normal.x,
            v.y - scalar * normal.y,
            v.z - scalar * normal.z
        );
    }

    /**
     * Returns a new Vec3 instance from an array.
     * @param {number[]} array - An array containing at least three numerical elements.
     * @returns {Vec3} New Vec3 instance.
     * @throws {TypeError} If the parameter is not an array of numbers.
     * @throws {Error} If the array does not contain at least three elements.
     */
    static fromArray(array) {
        if (!Array.isArray(array)) {
            throw new TypeError('Parameter "array" must be an array.');
        }
        if (array.length < 3) {
            throw new Error("Array must contain at least three elements.");
        }
        const [x, y, z] = array;
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
     * Creates a vector from an object with relevant component properties.
     * @param {Object} object - An object with x, y, z properties.
     * @returns {Vec3} New Vec3 instance.
     * @throws {TypeError} If the parameter is not an object with numerical x, y, z properties.
     */
    static fromObject(object) {
        if (typeof object !== "object" || object === null) {
            throw new TypeError(
                'Parameter "object" must be a non-null object.'
            );
        }
        const { x, y, z } = object;
        if (
            typeof x !== "number" ||
            typeof y !== "number" ||
            typeof z !== "number"
        ) {
            throw new TypeError(
                'Object properties "x", "y", and "z" must be numbers.'
            );
        }
        return new Vec3(x, y, z);
    }

    /**
     * Performs Catmull-Rom spline interpolation.
     * @param {Vec3} v0 - The vector before the start vector.
     * @param {Vec3} v1 - The start vector.
     * @param {Vec3} v2 - The end vector.
     * @param {Vec3} v3 - The vector after the end vector.
     * @param {number} t - The interpolation factor between 0 and 1.
     * @returns {Vec3} New Vec3 instance representing the interpolated vector.
     * @throws {TypeError} If the parameters are of incorrect types.
     */
    static catmullRom(v0, v1, v2, v3, t) {
        if (
            !(v0 instanceof Vec3) ||
            !(v1 instanceof Vec3) ||
            !(v2 instanceof Vec3) ||
            !(v3 instanceof Vec3)
        ) {
            throw new TypeError(
                'Parameters "v0", "v1", "v2", and "v3" must be instances of Vec3.'
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
        return new Vec3(x, y, z);
    }
}

export default Vec3;
