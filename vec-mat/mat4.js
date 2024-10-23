import Vec3 from "./vec3.js";

class Mat4 {
    #elements = new Float32Array(16);

    /**
     * @param {...number} elements
     */
    constructor(...elements) {
        if (elements.length) {
            this.fromArray(elements);
        } else {
            this.#identity();
        }
    }

    get elements() {
        return this.#elements;
    }

    /**
     * @param {Float32Array | number[]} elements
     */
    set elements(elements) {
        if (elements.length !== 16) {
            throw new Error("setMatrix requires exactly 16 values.");
        }

        // Update each element directly in the #elements array
        this.#elements[0] = elements[0]; // Column 1, Row 1
        this.#elements[1] = elements[4]; // Column 1, Row 2
        this.#elements[2] = elements[8]; // Column 1, Row 3
        this.#elements[3] = elements[12]; // Column 1, Row 4

        this.#elements[4] = elements[1]; // Column 2, Row 1
        this.#elements[5] = elements[5]; // Column 2, Row 2
        this.#elements[6] = elements[9]; // Column 2, Row 3
        this.#elements[7] = elements[13]; // Column 2, Row 4

        this.#elements[8] = elements[2]; // Column 3, Row 1
        this.#elements[9] = elements[6]; // Column 3, Row 2
        this.#elements[10] = elements[10]; // Column 3, Row 3
        this.#elements[11] = elements[14]; // Column 3, Row 4

        this.#elements[12] = elements[3]; // Column 4, Row 1
        this.#elements[13] = elements[7]; // Column 4, Row 2
        this.#elements[14] = elements[11]; // Column 4, Row 3
        this.#elements[15] = elements[15]; // Column 4, Row 4
    }

    #identity() {
        this.#elements.fill(0);
        this.#elements[0] = 1;
        this.#elements[5] = 1;
        this.#elements[10] = 1;
        this.#elements[15] = 1;
    }

    /**
     * Multiplies this matrix by another Mat4.
     * @param {Mat4} other - The matrix to multiply with.
     * @returns {Mat4} This instance for chaining.
     */
    multiply(other) {
        if (!(other instanceof Mat4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Mat4.'
            );
        }

        const a = this.#elements;
        const b = other.#elements;
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

        this.#elements = result;
        return this;
    }

    /**
     * @param {Float32Array | number[]} [array]
     */
    fromArray(array) {
        if (!Array.isArray(array) && !(array instanceof Float32Array)) {
            throw new TypeError(
                'Parameter "array" must be an array of numbers.'
            );
        }

        if (array.length !== 16) {
            throw new Error('Parameter "array" must have exactly 16 elements.');
        }

        for (let i = 0; i < 16; i++) {
            if (typeof array[i] !== "number") {
                throw new TypeError(`Element at index ${i} is not a number.`);
            }
            this.#elements[i] = array[i];
        }
    }

    /**
     * Returns a string representation of the matrix.
     * @returns {string} String representation of the matrix.
     */
    toString() {
        let str = "";
        for (let row = 0; row < 4; row++) {
            str += "| ";
            for (let col = 0; col < 4; col++) {
                str += this.#elements[col * 4 + row].toFixed(2) + " ";
            }
            str += "|\n";
        }
        return str;
    }

    // static

    /**
     * @param {Vec3 | [number,number,number]} vector
     */
    static fromScaling(vector) {
        if (vector instanceof Vec3) {
            return new Mat4(
                vector.x,
                0,
                0,
                0,
                0,
                vector.y,
                0,
                0,
                0,
                0,
                vector.z,
                0,
                0,
                0,
                0,
                1
            );
        }
        return new Mat4(
            vector[0],
            0,
            0,
            0,
            0,
            vector[1],
            0,
            0,
            0,
            0,
            vector[2],
            0,
            0,
            0,
            0,
            1
        );
    }
    /**
     * @param {Vec3 | [number,number,number]} axis
     * @param {number} angle
     */
    static fromAxisAngle(axis, angle) {
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }
        if (!(axis instanceof Vec3) && !Array.isArray(axis)) {
            throw new TypeError(
                'Parameter "axis" must be an instance of Vec3 or number[].'
            );
        }

        let x, y, z;

        if (axis instanceof Vec3) {
            x = axis.x;
            y = axis.y;
            z = axis.z;
        } else {
            x = axis[0];
            y = axis[1];
            z = axis[2];
        }

        const len = Math.hypot(x, y, z);

        if (len === 0) {
            throw new Error("Cannot rotate around a zero-length axis.");
        }

        const s = Math.sin(angle);
        const c = Math.cos(angle);
        const t = 1 - c;

        const nx = x / len;
        const ny = y / len;
        const nz = z / len;

        const rot = new Mat4(
            t * nx * nx + c,
            t * nx * ny - s * nz,
            t * nx * nz + s * ny,
            0,
            t * nx * ny + s * nz,
            t * ny * ny + c,
            t * ny * nz - s * nx,
            0,
            t * nx * nz - s * ny,
            t * ny * nz + s * nx,
            t * nz * nz + c,
            0,
            0,
            0,
            0,
            1
        );
        return rot;
    }
    /**
     * @param {Vec3 | [number,number,number]} vector
     */
    static fromTranslation(vector) {
        let x, y, z;
        if (vector instanceof Vec3) {
            x = vector.x;
            y = vector.y;
            z = vector.z;
        } else {
            x = vector[0];
            y = vector[1];
            z = vector[2];
        }
        return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1);
    }
}

export default Mat4;
