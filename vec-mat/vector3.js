/**
 * Represents a 3-dimensional vector.
 */
export class Vec3 {
    /**
     * @param {number} [x=0] The X component.
     * @param {number} [y=0] The Y component.
     * @param {number} [z=0] The Z component.
     */
    constructor(x = 0, y = 0, z = 0) {
        /** @type {number} */
        this.x = x;

        /** @type {number} */
        this.y = y;

        /** @type {number} */
        this.z = z;
    }

    /**
     * Adds another vector to this vector (mutates).
     * @param {Vec3} v
     * @returns {this}
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    /**
     * Subtracts another vector from this vector (mutates).
     * @param {Vec3} v
     * @returns {this}
     */
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    /**
     * Multiplies this vector by a scalar (mutates).
     * @param {number} scalar
     * @returns {this}
     */
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    /**
     * Normalizes this vector to have a magnitude of 1 (mutates).
     * @returns {this}
     */
    normalize() {
        const mag = this.magnitude();
        if (mag !== 0) {
            this.scale(1 / mag);
        } else {
            this.x = this.y = this.z = 0;
        }
        return this;
    }

    /**
     * Computes the dot product of this vector with another vector.
     * @param {Vec3} v
     * @returns {number}
     */
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    /**
     * Computes the cross product of this vector with another vector.
     * @param {Vec3} v
     * @returns {Vec3}
     */
    cross(v) {
        const crossX = this.y * v.z - this.z * v.y;
        const crossY = this.z * v.x - this.x * v.z;
        const crossZ = this.x * v.y - this.y * v.x;
        this.x = crossX;
        this.y = crossY;
        this.z = crossZ;
        return this;
    }

    /**
     * Calculates the magnitude (length) of the vector.
     * @returns {number}
     */
    magnitude() {
        return Math.hypot(this.x, this.y, this.z);
    }

    /**
     * Calculates the magnitude (length) squared of the vector.
     * @returns {number}
     */
    sqMagnitude() {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }

    /**
     * Calculates the distance to another vector.
     * @param {Vec3} v
     * @returns {number}
     */
    distanceTo(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        return Math.hypot(dx, dy, dz);
    }

    /**
     * Calculates the angle between this vector and another vector in radians.
     * @param {Vec3} v
     * @returns {number}
     */
    angleBetween(v) {
        const dotProd = this.dot(v);
        const mags = this.magnitude() * v.magnitude();
        if (mags === 0) {
            throw new Error(
                "Cannot calculate angle with zero magnitude vector."
            );
        }
        return Math.acos(dotProd / mags);
    }

    /**
     * Linearly interpolates between this vector and another vector.
     * @param {Vec3} v
     * @param {number} t Interpolation factor between 0 and 1.
     * @returns {this}
     */
    lerp(v, t) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        this.z += (v.z - this.z) * t;
        return this;
    }

    /**
     * Checks if this vector equals another vector within an epsilon.
     * @param {Vec3} v
     * @param {number} [epsilon=1e-10]
     * @returns {boolean}
     */
    equals(v, epsilon = 1e-10) {
        return (
            Math.abs(this.x - v.x) < epsilon &&
            Math.abs(this.y - v.y) < epsilon &&
            Math.abs(this.z - v.z) < epsilon
        );
    }

    /**
     * Converts the vector to an array.
     * @returns {number[]}
     */
    toArray() {
        return [this.x, this.y, this.z];
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string}
     */
    toString() {
        return `Vec3(${this.x}, ${this.y}, ${this.z})`;
    }

    // Static Class Methods

    /**
     * Adds two vectors component-wise.
     * @param {Vec3} v1
     * @param {Vec3} v2
     * @returns {Vec3}
     */
    static add(v1, v2) {
        return new Vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    /**
     * Subtracts the second vector from the first vector component-wise.
     * @param {Vec3} v1
     * @param {Vec3} v2
     * @returns {Vec3}
     */
    static subtract(v1, v2) {
        return new Vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    /**
     * Multiplies a vector by a scalar.
     * @param {Vec3} v
     * @param {number} scalar
     * @returns {Vec3}
     */
    static scale(v, scalar) {
        return new Vec3(v.x * scalar, v.y * scalar, v.z * scalar);
    }

    /**
     * Normalizes a vector to have a magnitude of 1.
     * @param {Vec3} v
     * @returns {Vec3}
     */
    static normalize(v) {
        const mag = v.magnitude();
        if (mag === 0) {
            return new Vec3(0, 0, 0);
        }
        return Vec3.scale(v, 1 / mag);
    }

    /**
     * Computes the dot product of two vectors.
     * @param {Vec3} v1
     * @param {Vec3} v2
     * @returns {number}
     */
    static dot(v1, v2) {
        return v1.dot(v2);
    }

    /**
     * Computes the cross product of two vectors.
     * @param {Vec3} v1
     * @param {Vec3} v2
     * @returns {Vec3}
     */
    static cross(v1, v2) {
        return new Vec3(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x
        );
    }

    /**
     * Calculates the distance between two vectors.
     * @param {Vec3} v1
     * @param {Vec3} v2
     * @returns {number}
     */
    static distance(v1, v2) {
        return Vec3.subtract(v1, v2).magnitude();
    }

    /**
     * Calculates the angle between two vectors in radians.
     * @param {Vec3} v1
     * @param {Vec3} v2
     * @returns {number}
     */
    static angleBetween(v1, v2) {
        return v1.angleBetween(v2);
    }

    /**
     * Linearly interpolates between two vectors.
     * @param {Vec3} v1
     * @param {Vec3} v2
     * @param {number} t Interpolation factor between 0 and 1.
     * @returns {Vec3}
     */
    static lerp(v1, v2, t) {
        return Vec3.add(v1, Vec3.scale(Vec3.subtract(v2, v1), t));
    }

    /**
     * Creates a clone of a vector.
     * @param {Vec3} v
     * @returns {Vec3}
     */
    static clone(v) {
        return new Vec3(v.x, v.y, v.z);
    }

    /**
     * Checks if two vectors are equal within an epsilon.
     * @param {Vec3} v1
     * @param {Vec3} v2
     * @param {number} [epsilon=1e-10]
     * @returns {boolean}
     */
    static equals(v1, v2, epsilon = 1e-10) {
        return v1.equals(v2, epsilon);
    }
}
