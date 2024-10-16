/**
 * Represents a 4-dimensional vector.
 */
export class Vec4 {
    /**
     * @param {number} x The X component.
     * @param {number} y The Y component.
     * @param {number} z The Z component.
     * @param {number} w The W component.
     */
    constructor(x = 0, y = 0, z = 0, w = 1) {
        /** @type {number} */
        this.x = x;

        /** @type {number} */
        this.y = y;

        /** @type {number} */
        this.z = z;

        /** @type {number} */
        this.w = w;
    }

    // --- Instance Methods (Mutating) ---

    /**
     * Adds another vector to this vector (mutates).
     * @param {Vec4} v
     * @returns {this}
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    }

    /**
     * Subtracts another vector from this vector (mutates).
     * @param {Vec4} v
     * @returns {this}
     */
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    }

    /**
     * Multiplies the vector by a scalar (mutates).
     * @param {number} scalar
     * @returns {this}
     */
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }

    /**
     * Normalizes the vector to have a magnitude of 1 (mutates).
     * @returns {this}
     */
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
        } else {
            this.scale(1 / mag);
        }
        return this;
    }

    // --- Instance Methods (Non-Mutating) ---

    /**
     * Calculates the magnitude (length) of the vector.
     * @returns {number}
     */
    magnitude() {
        return Math.hypot(this.x, this.y, this.z, this.w);
    }

    /**
     * Calculates the distance to another vector.
     * @param {Vec4} v
     * @returns {number}
     */
    distanceTo(v) {
        return Vec4.distance(this, v);
    }

    /**
     * Linearly interpolates between this vector and another vector.
     * @param {Vec4} v
     * @param {number} t Interpolation factor between 0 and 1.
     * @returns {Vec4}
     */
    lerp(v, t) {
        return Vec4.lerp(this, v, t);
    }

    /**
     * Converts the vector to an array.
     * @returns {number[]}
     */
    toArray() {
        return [this.x, this.y, this.z, this.w];
    }

    /**
     * Returns a string representation of the vector.
     * @returns {string}
     */
    toString() {
        return `Vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    // --- Static Class Methods (Non-Mutating) ---

    /**
     * Adds two vectors component-wise.
     * @param {Vec4} a
     * @param {Vec4} b
     * @returns {Vec4}
     */
    static add(a, b) {
        return new Vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    }

    /**
     * Subtracts vector b from vector a component-wise.
     * @param {Vec4} a
     * @param {Vec4} b
     * @returns {Vec4}
     */
    static subtract(a, b) {
        return new Vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }

    /**
     * Multiplies a vector by a scalar.
     * @param {Vec4} v
     * @param {number} scalar
     * @returns {Vec4}
     */
    static scale(v, scalar) {
        return new Vec4(v.x * scalar, v.y * scalar, v.z * scalar, v.w * scalar);
    }

    /**
     * Normalizes a vector to have a magnitude of 1.
     * @param {Vec4} v
     * @returns {Vec4}
     */
    static normalize(v) {
        const mag = v.magnitude();
        if (mag === 0) return new Vec4(0, 0, 0, 0);
        return Vec4.scale(v, 1 / mag);
    }

    /**
     * Computes the dot product of two vectors.
     * @param {Vec4} a
     * @param {Vec4} b
     * @returns {number}
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }

    /**
     * Calculates the distance between two vectors.
     * @param {Vec4} a
     * @param {Vec4} b
     * @returns {number}
     */
    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }

    /**
     * Linearly interpolates between two vectors.
     * @param {Vec4} a
     * @param {Vec4} b
     * @param {number} t Interpolation factor between 0 and 1.
     * @returns {Vec4}
     */
    static lerp(a, b, t) {
        return Vec4.add(a, Vec4.scale(Vec4.subtract(b, a), t));
    }

    /**
     * Creates a clone of a vector.
     * @param {Vec4} v
     * @returns {Vec4}
     */
    static clone(v) {
        return new Vec4(v.x, v.y, v.z, v.w);
    }

    /**
     * Checks if two vectors are equal within an epsilon.
     * @param {Vec4} a
     * @param {Vec4} b
     * @param {number} [epsilon=1e-10]
     * @returns {boolean}
     */
    static equals(a, b, epsilon = 1e-10) {
        return (
            Math.abs(a.x - b.x) < epsilon &&
            Math.abs(a.y - b.y) < epsilon &&
            Math.abs(a.z - b.z) < epsilon &&
            Math.abs(a.w - b.w) < epsilon
        );
    }
}
