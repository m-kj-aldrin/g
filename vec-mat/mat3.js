import Vec2 from "./vec2.js";

/**
 * Represents a 3x3 matrix.
 */
class Mat3 {
    /**
     * Creates a new Mat3 instance.
     * @param {Float32Array | number[]} [elements=new Float32Array(9).fill(0)] - Optional array of 9 elements in column-major order.
     */
    constructor(elements = new Float32Array(9).fill(0)) {
        // this._elements = new Float32Array(9);
        this.fromArray(elements);
    }

    /**
     * Gets the elements of the matrix in column-major order.
     * @type {Float32Array}
     */
    get elements() {
        return this._elements;
    }

    /**
     * Sets the elements of the matrix in column-major order.
     * @param {Float32Array | number[]} elements - Array of 9 elements in column-major order.
     */
    set elements(elements) {
        this.fromArray(elements);
    }

    /**
     * Sets the elements of the matrix. Elements should be provided in column-major order.
     * @param {...number} elements - 9 numerical elements.
     * @returns {Mat3} This instance for chaining.
     */
    set(...elements) {
        if (elements.length !== 9) {
            throw new Error("Mat3.set requires exactly 9 numerical elements.");
        }
        for (let i = 0; i < 9; i++) {
            if (typeof elements[i] !== "number") {
                throw new TypeError(`Element at index ${i} is not a number.`);
            }
            this._elements[i] = elements[i];
        }
        return this;
    }

    /**
     * Resets this matrix to the identity matrix.
     * @returns {Mat3} This instance for chaining.
     */
    identity() {
        this._elements.set([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        return this;
    }

    /**
     * Creates a clone of this matrix.
     * @returns {Mat3} A new Mat3 instance with the same elements.
     */
    clone() {
        return new Mat3(this._elements);
    }

    /**
     * Multiplies this matrix by another Mat3.
     * @param {Mat3} other - The matrix to multiply by.
     * @returns {Mat3} This instance for chaining.
     */
    multiply(other) {
        if (!(other instanceof Mat3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Mat3.'
            );
        }
        const a = this._elements;
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

        this._elements = result;
        return this;
    }

    /**
     * Premultiplies this matrix by another Mat3.
     * @param {Mat3} other - The matrix to premultiply by.
     * @returns {Mat3} This instance for chaining.
     */
    premultiply(other) {
        if (!(other instanceof Mat3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Mat3.'
            );
        }
        const a = other.elements;
        const b = this._elements;
        const result = new Float32Array(9);

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                result[col * 3 + row] =
                    a[0 * 3 + row] * b[col * 3 + 0] +
                    a[1 * 3 + row] * b[col * 3 + 1] +
                    a[2 * 3 + row] * b[col * 3 + 2];
            }
        }

        this._elements = result;
        return this;
    }

    /**
     * Multiplies this matrix by a scalar.
     * @param {number} scalar - The scalar to multiply by.
     * @returns {Mat3} This instance for chaining.
     */
    multiplyScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        for (let i = 0; i < 9; i++) {
            this._elements[i] *= scalar;
        }
        return this;
    }

    /**
     * Transposes this matrix.
     * @returns {Mat3} This instance for chaining.
     */
    transpose() {
        const a = this._elements;
        this._elements.set([
            a[0],
            a[3],
            a[6],
            a[1],
            a[4],
            a[7],
            a[2],
            a[5],
            a[8],
        ]);
        return this;
    }

    /**
     * Inverts this matrix. Throws an error if the matrix is not invertible.
     * @returns {Mat3} This instance for chaining.
     */
    invert() {
        const m = this._elements;
        const a00 = m[0],
            a01 = m[3],
            a02 = m[6];
        const a10 = m[1],
            a11 = m[4],
            a12 = m[7];
        const a20 = m[2],
            a21 = m[5],
            a22 = m[8];

        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;

        // Calculate the determinant
        const det = a00 * b01 + a01 * b11 + a02 * b21;

        if (det === 0) {
            throw new Error(
                "Matrix is not invertible because the determinant is zero."
            );
        }

        const invDet = 1 / det;

        this._elements.set([
            b01 * invDet,
            (-a22 * a01 + a02 * a21) * invDet,
            (a12 * a01 - a02 * a11) * invDet,
            b11 * invDet,
            (a22 * a00 - a02 * a20) * invDet,
            (-a12 * a00 + a02 * a10) * invDet,
            b21 * invDet,
            (-a21 * a00 + a01 * a20) * invDet,
            (a11 * a00 - a01 * a10) * invDet,
        ]);

        return this;
    }

    /**
     * Calculates the determinant of this matrix.
     * @returns {number} The determinant.
     */
    determinant() {
        const m = this._elements;
        const a00 = m[0],
            a01 = m[3],
            a02 = m[6];
        const a10 = m[1],
            a11 = m[4],
            a12 = m[7];
        const a20 = m[2],
            a21 = m[5],
            a22 = m[8];

        return (
            a00 * (a22 * a11 - a12 * a21) -
            a01 * (a22 * a10 - a12 * a20) +
            a02 * (a21 * a10 - a11 * a20)
        );
    }

    /**
     * Applies scaling using a Vec2.
     * @param {Vec2} vector - The vector to scale by.
     * @returns {Mat3} This instance for chaining.
     */
    scale(vector) {
        if (!(vector instanceof Vec2)) {
            throw new TypeError(
                'Parameter "vector" must be an instance of Vec2.'
            );
        }
        const sx = vector.x;
        const sy = vector.y;

        this._elements[0] *= sx;
        this._elements[3] *= sx;
        this._elements[6] *= sx;

        this._elements[1] *= sy;
        this._elements[4] *= sy;
        this._elements[7] *= sy;

        return this;
    }

    /**
     * Applies translation using a Vec2.
     * @param {Vec2} vector - The vector to translate by.
     * @returns {Mat3} This instance for chaining.
     */
    translate(vector) {
        if (!(vector instanceof Vec2)) {
            throw new TypeError(
                'Parameter "vector" must be an instance of Vec2.'
            );
        }
        const tx = vector.x;
        const ty = vector.y;

        this._elements[6] += tx;
        this._elements[7] += ty;

        return this;
    }

    /**
     * Rotates the matrix around the Z-axis by the given angle (in radians).
     * @param {number} angle - The angle to rotate by in radians.
     * @returns {Mat3} This instance for chaining.
     */
    rotate(angle) {
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        const a00 = this._elements[0];
        const a01 = this._elements[3];
        const a02 = this._elements[6];
        const a10 = this._elements[1];
        const a11 = this._elements[4];
        const a12 = this._elements[7];

        this._elements[0] = a00 * c + a10 * s;
        this._elements[1] = -a00 * s + a10 * c;
        this._elements[3] = a01 * c + a11 * s;
        this._elements[4] = -a01 * s + a11 * c;
        this._elements[6] = a02 * c + a12 * s;
        this._elements[7] = -a02 * s + a12 * c;

        return this;
    }

    /**
     * Checks if this matrix equals another matrix.
     * @param {Mat3} other - The matrix to compare with.
     * @returns {boolean} True if equal, false otherwise.
     */
    equals(other) {
        if (!(other instanceof Mat3)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Mat3.'
            );
        }
        for (let i = 0; i < 9; i++) {
            if (this._elements[i] !== other.elements[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Converts this matrix to an array in column-major order.
     * @returns {number[]} An array of 9 elements.
     */
    toArray() {
        return Array.from(this._elements);
    }

    /**
     * Sets the elements of this matrix from an array. Elements should be in column-major order.
     * @param {Float32Array | number[]} array - Array of 9 elements in column-major order.
     * @returns {Mat3} This instance for chaining.
     */
    fromArray(array) {
        if (!(array instanceof Float32Array) && !Array.isArray(array)) {
            throw new TypeError(
                'Parameter "array" must be a Float32Array or an array of numbers.'
            );
        }
        if (array.length !== 9) {
            throw new Error("Array must have exactly 9 elements.");
        }
        for (let i = 0; i < 9; i++) {
            if (typeof array[i] !== "number") {
                throw new TypeError(`Element at index ${i} is not a number.`);
            }
            this._elements[i] = array[i];
        }
        return this;
    }

    /**
     * Returns a string representation of the matrix.
     * @returns {string} The string representation.
     */
    toString() {
        const m = this._elements;
        return `Mat3([
  ${m[0]}, ${m[3]}, ${m[6]},
  ${m[1]}, ${m[4]}, ${m[7]},
  ${m[2]}, ${m[5]}, ${m[8]}
])`;
    }

    /**
     * Creates a 3x3 identity matrix.
     * @returns {Mat3} A new Mat3 instance representing the identity matrix.
     */
    static identity() {
        return new Mat3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    }

    /**
     * Multiplies two Mat3 matrices and returns a new Mat3.
     * @param {Mat3} m1 - The first matrix.
     * @param {Mat3} m2 - The second matrix.
     * @returns {Mat3} A new Mat3 instance representing the product.
     */
    static multiply(m1, m2) {
        if (!(m1 instanceof Mat3)) {
            throw new TypeError('Parameter "m1" must be an instance of Mat3.');
        }
        if (!(m2 instanceof Mat3)) {
            throw new TypeError('Parameter "m2" must be an instance of Mat3.');
        }
        const a = m1.elements;
        const b = m2.elements;
        const result = new Float32Array(9);

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                result[col * 3 + row] =
                    a[0 * 3 + row] * b[col * 3 + 0] +
                    a[1 * 3 + row] * b[col * 3 + 1] +
                    a[2 * 3 + row] * b[col * 3 + 2];
            }
        }

        return new Mat3(result);
    }

    /**
     * Multiplies a Mat3 by a scalar and returns a new Mat3.
     * @param {Mat3} matrix - The matrix to multiply.
     * @param {number} scalar - The scalar to multiply by.
     * @returns {Mat3} A new Mat3 instance representing the scaled matrix.
     */
    static multiplyScalar(matrix, scalar) {
        if (!(matrix instanceof Mat3)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat3.'
            );
        }
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }
        const result = new Float32Array(9);
        for (let i = 0; i < 9; i++) {
            result[i] = matrix.elements[i] * scalar;
        }
        return new Mat3(result);
    }

    /**
     * Transposes a Mat3 and returns a new Mat3.
     * @param {Mat3} matrix - The matrix to transpose.
     * @returns {Mat3} A new Mat3 instance representing the transposed matrix.
     */
    static transpose(matrix) {
        if (!(matrix instanceof Mat3)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat3.'
            );
        }
        const m = matrix.elements;
        return new Mat3([m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]]);
    }

    /**
     * Inverts a Mat3 and returns a new Mat3. Throws an error if the matrix is not invertible.
     * @param {Mat3} matrix - The matrix to invert.
     * @returns {Mat3} A new Mat3 instance representing the inverted matrix.
     */
    static invert(matrix) {
        if (!(matrix instanceof Mat3)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat3.'
            );
        }
        const m = matrix.elements;
        const a00 = m[0],
            a01 = m[3],
            a02 = m[6];
        const a10 = m[1],
            a11 = m[4],
            a12 = m[7];
        const a20 = m[2],
            a21 = m[5],
            a22 = m[8];

        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;

        // Calculate the determinant
        const det = a00 * b01 + a01 * b11 + a02 * b21;

        if (det === 0) {
            throw new Error(
                "Matrix is not invertible because the determinant is zero."
            );
        }

        const invDet = 1 / det;

        return new Mat3([
            b01 * invDet,
            (-a22 * a01 + a02 * a21) * invDet,
            (a12 * a01 - a02 * a11) * invDet,
            b11 * invDet,
            (a22 * a00 - a02 * a20) * invDet,
            (-a12 * a00 + a02 * a10) * invDet,
            b21 * invDet,
            (-a21 * a00 + a01 * a20) * invDet,
            (a11 * a00 - a01 * a10) * invDet,
        ]);
    }

    /**
     * Calculates the determinant of a Mat3.
     * @param {Mat3} matrix - The matrix to calculate the determinant of.
     * @returns {number} The determinant.
     */
    static determinant(matrix) {
        if (!(matrix instanceof Mat3)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat3.'
            );
        }
        const m = matrix.elements;
        const a00 = m[0],
            a01 = m[3],
            a02 = m[6];
        const a10 = m[1],
            a11 = m[4],
            a12 = m[7];
        const a20 = m[2],
            a21 = m[5],
            a22 = m[8];

        return (
            a00 * (a22 * a11 - a12 * a21) -
            a01 * (a22 * a10 - a12 * a20) +
            a02 * (a21 * a10 - a11 * a20)
        );
    }

    /**
     * Applies scaling using a Vec2 and returns a new Mat3.
     * @param {Mat3} matrix - The matrix to scale.
     * @param {Vec2} vector - The vector to scale by.
     * @returns {Mat3} A new Mat3 instance representing the scaled matrix.
     */
    static scale(matrix, vector) {
        if (!(matrix instanceof Mat3)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat3.'
            );
        }
        if (!(vector instanceof Vec2)) {
            throw new TypeError(
                'Parameter "vector" must be an instance of Vec2.'
            );
        }
        const sx = vector.x;
        const sy = vector.y;
        const m = matrix.elements;

        return new Mat3([
            m[0] * sx,
            m[3] * sx,
            m[6] * sx,
            m[1] * sy,
            m[4] * sy,
            m[7] * sy,
            m[2],
            m[5],
            m[8],
        ]);
    }

    /**
     * Applies translation using a Vec2 and returns a new Mat3.
     * @param {Mat3} matrix - The matrix to translate.
     * @param {Vec2} vector - The vector to translate by.
     * @returns {Mat3} A new Mat3 instance representing the translated matrix.
     */
    static translate(matrix, vector) {
        if (!(matrix instanceof Mat3)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat3.'
            );
        }
        if (!(vector instanceof Vec2)) {
            throw new TypeError(
                'Parameter "vector" must be an instance of Vec2.'
            );
        }
        const tx = vector.x;
        const ty = vector.y;
        const m = matrix.elements;

        return new Mat3([
            m[0],
            m[3],
            m[6] + tx,
            m[1],
            m[4],
            m[7] + ty,
            m[2],
            m[5],
            m[8],
        ]);
    }

    /**
     * Rotates a Mat3 around the Z-axis by the given angle and returns a new Mat3.
     * @param {Mat3} matrix - The matrix to rotate.
     * @param {number} angle - The angle to rotate by in radians.
     * @returns {Mat3} A new Mat3 instance representing the rotated matrix.
     */
    static rotate(matrix, angle) {
        if (!(matrix instanceof Mat3)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat3.'
            );
        }
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const m = matrix.elements;

        return new Mat3([
            m[0] * c + m[3] * s,
            m[3] * c - m[0] * s,
            m[6],
            m[1] * c + m[4] * s,
            m[4] * c - m[1] * s,
            m[7],
            m[2] * c + m[5] * s,
            m[5] * c - m[2] * s,
            m[8],
        ]);
    }

    /**
     * Creates a Mat3 from an array of 9 elements in column-major order.
     * @param {number[]} array - Array of 9 numerical elements.
     * @returns {Mat3} A new Mat3 instance.
     */
    static fromArray(array) {
        if (!Array.isArray(array) && !(array instanceof Float32Array)) {
            throw new TypeError(
                'Parameter "array" must be an array of numbers.'
            );
        }
        if (array.length !== 9) {
            throw new Error("Array must have exactly 9 elements.");
        }
        for (let i = 0; i < 9; i++) {
            if (typeof array[i] !== "number") {
                throw new TypeError(`Element at index ${i} is not a number.`);
            }
        }
        return new Mat3(array);
    }

    /**
     * Checks if two Mat3 instances are equal.
     * @param {Mat3} m1 - The first matrix.
     * @param {Mat3} m2 - The second matrix.
     * @returns {boolean} True if equal, false otherwise.
     */
    static equals(m1, m2) {
        if (!(m1 instanceof Mat3)) {
            throw new TypeError('Parameter "m1" must be an instance of Mat3.');
        }
        if (!(m2 instanceof Mat3)) {
            throw new TypeError('Parameter "m2" must be an instance of Mat3.');
        }
        for (let i = 0; i < 9; i++) {
            if (m1.elements[i] !== m2.elements[i]) {
                return false;
            }
        }
        return true;
    }
}

export default Mat3;
