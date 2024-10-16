import { Vec3 } from "./vector3.js";

/**
 * Represents a 3x3 matrix.
 */
export class Mat3 {
    /**
     * Creates a new Mat3 instance.
     * @param {number[] | Float32Array | Float64Array} [elements] - An array of 9 numbers.
     * @throws Will throw an error if the provided elements do not have exactly 9 numbers.
     */
    constructor(elements) {
        if (elements) {
            if (elements.length !== 9) {
                throw new Error("Mat3 must have 9 elements.");
            }
            /** @type {Float32Array} */
            this.elements = new Float32Array(elements);
        } else {
            this.elements = new Float32Array(9);
            this.identity();
        }
    }

    /**
     * Multiplies this matrix by another matrix, mutating the instance.
     * @param {Mat3} m - The matrix to multiply with.
     * @returns {Mat3} The mutated matrix instance.
     */
    multiply(m) {
        const a = this.elements;
        const b = m.elements;
        const result = new Float32Array(9);

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                result[row * 3 + col] =
                    a[row * 3] * b[col] +
                    a[row * 3 + 1] * b[col + 3] +
                    a[row * 3 + 2] * b[col + 6];
            }
        }

        this.elements = result;
        return this;
    }

    /**
     * Transforms a vector by this matrix.
     * @param {Vec3} v - The vector to transform.
     * @returns {Vec3} The transformed vector.
     */
    multiplyVector(v) {
        const e = this.elements;
        return new Vec3(
            e[0] * v.x + e[1] * v.y + e[2] * v.z,
            e[3] * v.x + e[4] * v.y + e[5] * v.z,
            e[6] * v.x + e[7] * v.y + e[8] * v.z
        );
    }

    /**
     * Transposes the matrix, mutating the instance.
     * @returns {Mat3} The mutated matrix instance.
     */
    transpose() {
        const e = this.elements;
        let temp;

        temp = e[1];
        e[1] = e[3];
        e[3] = temp;

        temp = e[2];
        e[2] = e[6];
        e[6] = temp;

        temp = e[5];
        e[5] = e[7];
        e[7] = temp;

        return this;
    }

    /**
     * Inverts the matrix, mutating the instance.
     * @returns {Mat3} The mutated matrix instance.
     * @throws Will throw an error if the matrix is non-invertible.
     */
    invert() {
        const e = this.elements;
        const a = e[0],
            b = e[1],
            c = e[2],
            d = e[3],
            f = e[4],
            g = e[5],
            h = e[6],
            i = e[7],
            j = e[8];

        const det =
            a * (f * j - g * i) - b * (d * j - g * h) + c * (d * i - f * h);

        if (det === 0) {
            throw new Error("Non-invertible matrix.");
        }

        const invDet = 1 / det;

        const result = new Float32Array(9);

        result[0] = (f * j - g * i) * invDet;
        result[1] = (c * i - b * j) * invDet;
        result[2] = (b * g - c * f) * invDet;
        result[3] = (g * h - d * j) * invDet;
        result[4] = (a * j - c * h) * invDet;
        result[5] = (c * d - a * g) * invDet;
        result[6] = (d * i - f * h) * invDet;
        result[7] = (b * h - a * i) * invDet;
        result[8] = (a * f - b * d) * invDet;

        this.elements = result;
        return this;
    }

    /**
     * Sets this matrix to the identity matrix, mutating the instance.
     * @returns {Mat3} The mutated matrix instance.
     */
    identity() {
        this.elements.set([
            1,
            0,
            0, //
            0,
            1,
            0, //
            0,
            0,
            1,
        ]);
        return this;
    }

    /**
     * Calculates the determinant of the matrix.
     * @returns {number} The determinant.
     */
    determinant() {
        const e = this.elements;
        const a = e[0],
            b = e[1],
            c = e[2],
            d = e[3],
            f = e[4],
            g = e[5],
            h = e[6],
            i = e[7],
            j = e[8];

        return a * (f * j - g * i) - b * (d * j - g * h) + c * (d * i - f * h);
    }

    /**
     * Gets an element by row and column.
     * @param {number} row - Zero-based row index.
     * @param {number} col - Zero-based column index.
     * @returns {number} The element at the specified position.
     */
    getElement(row, col) {
        return this.elements[row * 3 + col];
    }

    /**
     * Sets an element by row and column.
     * @param {number} row - Zero-based row index.
     * @param {number} col - Zero-based column index.
     * @param {number} value - The value to set.
     */
    setElement(row, col, value) {
        this.elements[row * 3 + col] = value;
    }

    /**
     * Checks if this matrix equals another matrix within an epsilon.
     * @param {Mat3} m - The matrix to compare with.
     * @param {number} [epsilon=1e-10] - The tolerance for comparison.
     * @returns {boolean} True if matrices are equal within the specified epsilon, else false.
     */
    equals(m, epsilon = 1e-10) {
        for (let i = 0; i < 9; i++) {
            if (Math.abs(this.elements[i] - m.elements[i]) >= epsilon) {
                return false;
            }
        }
        return true;
    }

    /**
     * Converts the matrix to an array.
     * @returns {number[]} An array containing the matrix elements.
     */
    toArray() {
        return Array.from(this.elements);
    }

    /**
     * Returns a string representation of the matrix.
     * @returns {string} The string representation.
     */
    toString() {
        const e = this.elements;
        return `Mat3(\n  ${e[0]}, ${e[1]}, ${e[2]},\n  ${e[3]}, ${e[4]}, ${e[5]},\n  ${e[6]}, ${e[7]}, ${e[8]}\n)`;
    }

    // ------------------
    // Static Methods (Create new matrices)
    // ------------------

    /**
     * Creates a new identity matrix.
     * @returns {Mat3} A new identity matrix.
     */
    static identity() {
        return new Mat3([
            1,
            0,
            0, //
            0,
            1,
            0, //
            0,
            0,
            1,
        ]);
    }

    /**
     * Creates a rotation matrix from an angle.
     * @param {number} angle - Angle in radians.
     * @returns {Mat3} A new rotation matrix.
     */
    static fromRotation(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Mat3([
            c,
            -s,
            0, //
            s,
            c,
            0, //
            0,
            0,
            1,
        ]);
    }

    /**
     * Creates a scaling matrix.
     * @param {number} sx - Scaling factor in X.
     * @param {number} sy - Scaling factor in Y.
     * @returns {Mat3} A new scaling matrix.
     */
    static fromScale(sx, sy) {
        return new Mat3([
            sx,
            0,
            0, //
            0,
            sy,
            0, //
            0,
            0,
            1,
        ]);
    }

    /**
     * Creates a translation matrix.
     * @param {number} tx - Translation in X.
     * @param {number} ty - Translation in Y.
     * @returns {Mat3} A new translation matrix.
     */
    static fromTranslation(tx, ty) {
        return new Mat3([
            1,
            0,
            tx, //
            0,
            1,
            ty, //
            0,
            0,
            1,
        ]);
    }

    /**
     * Multiplies two matrices and returns a new matrix.
     * @param {Mat3} a - The first matrix.
     * @param {Mat3} b - The second matrix.
     * @returns {Mat3} The result of multiplying matrix a by matrix b.
     */
    static multiply(a, b) {
        const ae = a.elements;
        const be = b.elements;
        const result = new Float32Array(9);

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                result[row * 3 + col] =
                    ae[row * 3] * be[col] +
                    ae[row * 3 + 1] * be[col + 3] +
                    ae[row * 3 + 2] * be[col + 6];
            }
        }

        return new Mat3(result);
    }

    /**
     * Transposes the given matrix and returns a new matrix.
     * @param {Mat3} m - The matrix to transpose.
     * @returns {Mat3} The transposed matrix.
     */
    static transpose(m) {
        const e = m.elements;
        return new Mat3([e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]]);
    }

    /**
     * Inverts the given matrix and returns a new matrix.
     * @param {Mat3} m - The matrix to invert.
     * @returns {Mat3} The inverted matrix.
     * @throws Will throw an error if the matrix is non-invertible.
     */
    static invert(m) {
        const e = m.elements;
        const a = e[0],
            b = e[1],
            c = e[2],
            d = e[3],
            f = e[4],
            g = e[5],
            h = e[6],
            i = e[7],
            j = e[8];

        const det =
            a * (f * j - g * i) - b * (d * j - g * h) + c * (d * i - f * h);

        if (det === 0) {
            throw new Error("Non-invertible matrix.");
        }

        const invDet = 1 / det;

        const result = new Float32Array(9);

        result[0] = (f * j - g * i) * invDet;
        result[1] = (c * i - b * j) * invDet;
        result[2] = (b * g - c * f) * invDet;
        result[3] = (g * h - d * j) * invDet;
        result[4] = (a * j - c * h) * invDet;
        result[5] = (c * d - a * g) * invDet;
        result[6] = (d * i - f * h) * invDet;
        result[7] = (b * h - a * i) * invDet;
        result[8] = (a * f - b * d) * invDet;

        return new Mat3(result);
    }

    /**
     * Creates a clone of the given matrix.
     * @param {Mat3} m - The matrix to clone.
     * @returns {Mat3} A new cloned matrix.
     */
    static clone(m) {
        return new Mat3(m.elements);
    }
}
