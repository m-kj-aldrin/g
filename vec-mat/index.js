class Vec2 {
    #x = 0;
    #y = 0;

    constructor(x = 0, y = 0) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }
    get y() {
        return this.#y;
    }

    /**
     * Multiplies the vector either by a vector component wise or with 2x2 matrix as an direction vector or 3x3 matrix as a position vector
     * @param {Vec2 | Mat2 | Mat3} vectorOrMatrix
     */
    multiply(vectorOrMatrix) {
        if (vectorOrMatrix instanceof Vec2) {
            this.#x *= vectorOrMatrix.#x;
            this.#y *= vectorOrMatrix.#y;

            return this;
        }

        if (vectorOrMatrix instanceof Mat2) {
            let e = vectorOrMatrix.elements;

            let _x = this.#x * e[0] + this.#y * e[2];
            let _y = this.#x * e[1] + this.#y * e[3];

            this.#x = _x;
            this.#y = _y;

            return this;
        }

        if (vectorOrMatrix instanceof Mat3) {
            let e = vectorOrMatrix.elements;

            let _x = this.#x * e[0] + this.#y * e[3] + e[6];
            let _y = this.#x * e[1] + this.#y * e[4] + e[7];
            // let _w = this.#x * e[2] + this.#y * e[5] + e[8];

            this.#x = _x;
            this.#y = _y;

            return this;
        }

        throw new TypeError(
            "vectorOrMatrix needs to be of type Vec2 | Mat2 | Mat3"
        );
    }
}

class Vec3 {
    #x = 0;
    #y = 0;
    #z = 0;

    constructor(x = 0, y = 0, z = 0) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get z() {
        return this.#z;
    }

    /**
     * Multiplies the vector either by a vector component wise or with 3x3 matrix as an direction vector or 4x4 matrix as a position vector
     * @param {Vec3 | Mat3 | Mat4} vectorOrMatrix
     */
    multiply(vectorOrMatrix) {
        if (vectorOrMatrix instanceof Vec3) {
            this.#x *= vectorOrMatrix.#x;
            this.#y *= vectorOrMatrix.#y;

            return this;
        }

        if (vectorOrMatrix instanceof Mat3) {
            let e = vectorOrMatrix.elements;

            let _x = this.#x * e[0] + this.#y * e[3] + this.#z * e[6];
            let _y = this.#x * e[1] + this.#y * e[4] + this.#z * e[7];
            let _z = this.#x * e[2] + this.#y * e[5] + this.#z * e[8];

            this.#x = _x;
            this.#y = _y;
            this.#z = _z;

            return this;
        }

        if (vectorOrMatrix instanceof Mat4) {
            let e = vectorOrMatrix.elements;

            let _x = this.#x * e[0] + this.#y * e[4] + this.#z * e[8] + e[12];
            let _y = this.#x * e[1] + this.#y * e[5] + this.#z * e[9] + e[13];
            let _z = this.#x * e[2] + this.#y * e[6] + this.#z * e[10] + e[14];
            let _w = this.#x * e[3] + this.#y * e[7] + this.#z * e[11] + e[15];

            if (_w !== 0) {
                _x /= _w;
                _y /= _w;
                _z /= _w;
            }

            this.#x = _x;
            this.#y = _y;
            this.#z = _z;

            return this;
        }

        throw new TypeError(
            "vectorOrMatrix needs to be of type Vec3 | Mat3 | Mat4"
        );
    }

    get length() {
        return Math.sqrt(this.#x ** 2 + this.#y ** 2 + this.#z ** 2);
    }

    normalize() {
        let length = this.length;
        this.#x /= length;
        this.#y /= length;
        this.#z /= length;
        return this;
    }

    clone() {
        return new Vec3(this.#x, this.#y, this.#z);
    }
}

class Mat2 {
    /**
     * Matrix elements in column-major
     */
    #elements = new Float32Array([1, 0, 0, 1]);

    constructor(...elements) {
        this.#elements.set(elements);
    }

    get elements() {
        return this.#elements;
    }

    /**
     * @param {Mat2 | Mat3} matrix
     */
    multiply(matrix) {
        let a = this.#elements;
        let b = new Float32Array(4);

        let other = matrix.elements;

        if (matrix instanceof Mat2) {
            b.set(other);
        } else if (matrix instanceof Mat3) {
            b.set([...other.slice(0, 2), ...other.slice(3, 5)]);
        }

        let result = new Float32Array({ length: 4 });

        for (let col = 0; col < 2; col++) {
            for (let row = 0; row < 2; row++) {
                result[col * 2 + row] =
                    a[0 * 2 + row] * b[col * 2 + 0] +
                    a[1 * 2 + row] * b[col * 2 + 1];
            }
        }

        this.#elements.set(result);

        return this;
    }

    clone() {
        return new Mat2(this.#elements);
    }

    /**
     * @param {...(Mat2|Mat3)} matrix
     */
    static multiply(...matrix) {
        return /**@type {Mat2} */ (
            matrix.reduce(
                /**@param {Mat2} r */ (r, m) => r.multiply(m),
                new Mat2()
            )
        );
    }

    /**
     * @param {Vec2} vector
     */
    static fromScale(vector) {
        let { x, y } = vector;
        return new Mat2(x, 0, 0, y);
    }

    /**
     * @param {number} angle
     */
    static fromRotation(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);

        return new Mat2(cos, sin, -sin, cos);
    }
}

class Mat3 {
    /**
     * Matrix elements in column-majo
     */
    #elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

    constructor(...elements) {
        if (elements.length === 9) {
            this.#elements.set(elements);
        }
    }

    get elements() {
        return this.#elements;
    }

    /**
     *
     * @param {Mat2 | Mat3 | Mat4} matrix
     */
    multiply(matrix) {
        let a = this.#elements;
        let b = new Float32Array(9);

        let other = matrix.elements;

        if (matrix instanceof Mat2) {
            b.set([...other.slice(0, 2), 0, ...other.slice(2, 4), 0, 0, 0, 1]);
        } else if (matrix instanceof Mat3) {
            b.set(matrix.elements);
        } else if (matrix instanceof Mat4) {
            b.set([
                ...other.slice(0, 3),
                ...other.slice(4, 7),
                ...other.slice(8, 11),
            ]);
        }

        let result = new Float32Array({ length: 9 });

        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 3; row++) {
                result[col * 3 + row] =
                    a[0 * 3 + row] * b[col * 3 + 0] +
                    a[1 * 3 + row] * b[col * 3 + 1] +
                    a[2 * 3 + row] * b[col * 3 + 2];
            }
        }

        this.#elements.set(result);

        return this;
    }

    clone() {
        return new Mat3(this.#elements);
    }

    /**
     *
     * @param  {...(Mat2|Mat3|Mat4)} matrix
     */
    static multiply(...matrix) {
        return /**@type {Mat3}*/ (
            matrix.reduce(
                /**@param {Mat3} r*/ (r, m) => r.multiply(m),
                new Mat3()
            )
        );
    }

    /**
     *
     * @param {Vec3} vector
     */
    static fromScale(vector) {
        let { x, y, z } = vector;
        return new Mat3(x, 0, 0, 0, y, 0, 0, 0, z);
    }

    /**
     *
     * @param {Vec3} axis
     * @param {number} angle
     */
    static fromAxisRotation(axis, angle) {
        let v = axis.clone().normalize();

        let { x, y, z } = v;

        let c = Math.cos(angle);
        let s = Math.sin(angle);
        let t = 1 - c;

        let R11 = t * x * x + c;
        let R12 = t * x * y - s * z;
        let R13 = t * x * z + s * y;

        let R21 = t * x * y + s * z;
        let R22 = t * y * y + c;
        let R23 = t * y * z - s * x;

        let R31 = t * x * z - s * y;
        let R32 = t * y * z + s * x;
        let R33 = t * z * z + c;

        return new Mat3(R11, R21, R31, R12, R22, R32, R13, R23, R33);
    }

    /**
     * @param {Vec2} vector
     */
    static fromTranslate(vector) {
        let { x, y } = vector;
        return new Mat3(1, 0, 0, 0, 1, 0, x, y, 1);
    }
}

class Mat4 {
    /**
     * Matrix elements in column-major
     */
    #elements = new Float32Array([
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    ]);

    constructor(...elements) {
        this.#elements.set(elements);
    }

    get elements() {
        return this.#elements;
    }
}

export { Vec2, Vec3, Mat2, Mat3, Mat4 };
