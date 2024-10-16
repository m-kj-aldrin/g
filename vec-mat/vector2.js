/**
 * Represents a 2-dimensional vector.
 */
export class Vec2 {
    /**
     * @param {number} x The X component.
     * @param {number} y The Y component.
     */
    constructor(x = 0, y = 0) {
        /** @type {number} */
        this.x = x;

        /** @type {number} */
        this.y = y;
    }

    /**
     * Adds another vector to this vector (mutates).
     * @param {Vec2} v
     * @returns {this}
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * Subtracts another vector from this vector (mutates).
     * @param {Vec2} v
     * @returns {this}
     */
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * Scales this vector by a scalar (mutates).
     * @param {number} scalar
     * @returns {this}
     */
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Normalizes this vector to have a magnitude of 1 (mutates).
     * @returns {this}
     */
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x /= mag;
            this.y /= mag;
        }
        return this;
    }

    /**
     * Computes the dot product of this vector with another vector.
     * @param {Vec2} v
     * @returns {number}
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * Calculates the magnitude (length) of the vector.
     * @returns {number}
     */
    magnitude() {
        return Math.hypot(this.x, this.y);
    }

    /**
     * Calculates the distance to another vector.
     * @param {Vec2} v
     * @returns {number}
     */
    distanceTo(v) {
        return Math.hypot(this.x - v.x, this.y - v.y);
    }

    /**
     * Calculates the angle between this vector and another vector in radians.
     * @param {Vec2} v
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
     * Linearly interpolates between this vector and another vector (mutates).
     * @param {Vec2} v
     * @param {number} t Interpolation factor between 0 and 1.
     * @returns {this}
     */
    lerp(v, t) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        return this;
    }

    /**
     * Checks if this vector equals another vector within an epsilon.
     * @param {Vec2} v
     * @param {number} [epsilon=1e-10]
     * @returns {boolean}
     */
    equals(v, epsilon = 1e-10) {
        return (
            Math.abs(this.x - v.x) < epsilon && Math.abs(this.y - v.y) < epsilon
        );
    }

    /**
     * Converts the vector to an array.
     * @returns {number[]}
     */
    toArray() {
        return [this.x, this.y];
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string}
     */
    toString() {
        return `Vector2(${this.x}, ${this.y})`;
    }

    // Static Class Methods

    /**
     * Adds two vectors component-wise.
     * @param {Vec2} v1
     * @param {Vec2} v2
     * @returns {Vec2}
     */
    static add(v1, v2) {
        return new Vec2(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     * Subtracts the second vector from the first vector component-wise.
     * @param {Vec2} v1
     * @param {Vec2} v2
     * @returns {Vec2}
     */
    static subtract(v1, v2) {
        return new Vec2(v1.x - v2.x, v1.y - v2.y);
    }

    /**
     * Scales a vector by a scalar.
     * @param {Vec2} v
     * @param {number} scalar
     * @returns {Vec2}
     */
    static scale(v, scalar) {
        return new Vec2(v.x * scalar, v.y * scalar);
    }

    /**
     * Normalizes a vector to have a magnitude of 1.
     * @param {Vec2} v
     * @returns {Vec2}
     */
    static normalize(v) {
        const mag = v.magnitude();
        if (mag === 0) return new Vec2(0, 0);
        return new Vec2(v.x / mag, v.y / mag);
    }

    /**
     * Linearly interpolates between two vectors.
     * @param {Vec2} v1
     * @param {Vec2} v2
     * @param {number} t Interpolation factor between 0 and 1.
     * @returns {Vec2}
     */
    static lerp(v1, v2, t) {
        return new Vec2(v1.x + (v2.x - v1.x) * t, v1.y + (v2.y - v1.y) * t);
    }

    /**
     * Creates a clone of the given vector.
     * @param {Vec2} v
     * @returns {Vec2}
     */
    static clone(v) {
        return new Vec2(v.x, v.y);
    }

    /**
     * Creates a vector from an array.
     * @param {number[]} arr
     * @returns {Vec2}
     */
    static fromArray(arr) {
        if (!Array.isArray(arr) || arr.length < 2) {
            throw new Error("Array must have at least two elements.");
        }
        return new Vec2(arr[0], arr[1]);
    }
}
