import Quat from "./quat.js";
import Vec3 from "./vec3.js";

/**
 * Represents a 4x4 matrix in a right-handed coordinate system.
 */
class Mat4 {
    /**
     * Creates a new Mat4 instance.
     * @param {Float32Array | number[]} [elements=new Float32Array(16).fill(0)] - Optional array of 16 elements in column-major order.
     */
    constructor(elements = new Float32Array(16).fill(0)) {
        this.fromArray(elements);
        // if (!(elements instanceof Float32Array) && !Array.isArray(elements)) {
        //     throw new TypeError(
        //         'Parameter "elements" must be a Float32Array or an array of numbers.'
        //     );
        // }

        // if (elements.length !== 16) {
        //     throw new Error(
        //         'Parameter "elements" must have exactly 16 elements.'
        //     );
        // }

        // // this.elements = new Float32Array(16);
        // for (let i = 0; i < 16; i++) {
        //     this.elements[i] = elements[i] || 0;
        // }
    }

    /**
     * Sets the elements of the matrix. Elements should be provided in column-major order.
     * @param {...number} elements - 16 numerical elements in column-major order.
     * @returns {Mat4} This instance for chaining.
     */
    set(...elements) {
        if (elements.length !== 16) {
            throw new Error(
                'Method "set" requires exactly 16 numerical arguments.'
            );
        }

        for (let i = 0; i < 16; i++) {
            if (typeof elements[i] !== "number") {
                throw new TypeError(`Element at index ${i} is not a number.`);
            }
            this.elements[i] = elements[i];
        }
        return this;
    }

    /**
     * Resets this matrix to the identity matrix.
     * @returns {Mat4} This instance for chaining.
     */
    identity() {
        this.elements.fill(0);
        this.elements[0] = 1;
        this.elements[5] = 1;
        this.elements[10] = 1;
        this.elements[15] = 1;
        return this;
    }

    /**
     * Creates a clone of this matrix.
     * @returns {Mat4} A new Mat4 instance with the same elements.
     */
    clone() {
        return new Mat4(this.elements.slice());
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
     * Premultiplies this matrix by another Mat4.
     * @param {Mat4} other - The matrix to premultiply with.
     * @returns {Mat4} This instance for chaining.
     */
    premultiply(other) {
        if (!(other instanceof Mat4)) {
            throw new TypeError(
                'Parameter "other" must be an instance of Mat4.'
            );
        }

        const a = other.elements;
        const b = this.elements;
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
     * Multiplies this matrix by a scalar.
     * @param {number} scalar - The scalar to multiply with.
     * @returns {Mat4} This instance for chaining.
     */
    multiplyScalar(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }

        for (let i = 0; i < 16; i++) {
            this.elements[i] *= scalar;
        }
        return this;
    }

    /**
     * Transposes this matrix.
     * @returns {Mat4} This instance for chaining.
     */
    transpose() {
        const e = this.elements;
        let tmp;

        tmp = e[1];
        e[1] = e[4];
        e[4] = tmp;

        tmp = e[2];
        e[2] = e[8];
        e[8] = tmp;

        tmp = e[3];
        e[3] = e[12];
        e[12] = tmp;

        tmp = e[6];
        e[6] = e[9];
        e[9] = tmp;

        tmp = e[7];
        e[7] = e[13];
        e[13] = tmp;

        tmp = e[11];
        e[11] = e[14];
        e[14] = tmp;

        return this;
    }

    /**
     * Inverts this matrix. Throws an error if the matrix is not invertible.
     * @returns {Mat4} This instance for chaining.
     */
    invert() {
        const m = this.elements;
        const inv = new Float32Array(16);

        inv[0] =
            m[5] * m[10] * m[15] -
            m[5] * m[11] * m[14] -
            m[9] * m[6] * m[15] +
            m[9] * m[7] * m[14] +
            m[13] * m[6] * m[11] -
            m[13] * m[7] * m[10];

        inv[4] =
            -m[4] * m[10] * m[15] +
            m[4] * m[11] * m[14] +
            m[8] * m[6] * m[15] -
            m[8] * m[7] * m[14] -
            m[12] * m[6] * m[11] +
            m[12] * m[7] * m[10];

        inv[8] =
            m[4] * m[9] * m[15] -
            m[4] * m[11] * m[13] -
            m[8] * m[5] * m[15] +
            m[8] * m[7] * m[13] +
            m[12] * m[5] * m[11] -
            m[12] * m[7] * m[9];

        inv[12] =
            -m[4] * m[9] * m[14] +
            m[4] * m[10] * m[13] +
            m[8] * m[5] * m[14] -
            m[8] * m[6] * m[13] -
            m[12] * m[5] * m[10] +
            m[12] * m[6] * m[9];

        inv[1] =
            -m[1] * m[10] * m[15] +
            m[1] * m[11] * m[14] +
            m[9] * m[2] * m[15] -
            m[9] * m[3] * m[14] -
            m[13] * m[2] * m[11] +
            m[13] * m[3] * m[10];

        inv[5] =
            m[0] * m[10] * m[15] -
            m[0] * m[11] * m[14] -
            m[8] * m[2] * m[15] +
            m[8] * m[3] * m[14] +
            m[12] * m[2] * m[11] -
            m[12] * m[3] * m[10];

        inv[9] =
            -m[0] * m[9] * m[15] +
            m[0] * m[11] * m[13] +
            m[8] * m[1] * m[15] -
            m[8] * m[3] * m[13] -
            m[12] * m[1] * m[11] +
            m[12] * m[3] * m[9];

        inv[13] =
            m[0] * m[9] * m[14] -
            m[0] * m[10] * m[13] -
            m[8] * m[1] * m[14] +
            m[8] * m[2] * m[13] +
            m[12] * m[1] * m[10] -
            m[12] * m[2] * m[9];

        inv[2] =
            m[1] * m[6] * m[15] -
            m[1] * m[7] * m[14] -
            m[5] * m[2] * m[15] +
            m[5] * m[3] * m[14] +
            m[13] * m[2] * m[7] -
            m[13] * m[3] * m[6];

        inv[6] =
            -m[0] * m[6] * m[15] +
            m[0] * m[7] * m[14] +
            m[4] * m[2] * m[15] -
            m[4] * m[3] * m[14] -
            m[12] * m[2] * m[7] +
            m[12] * m[3] * m[6];

        inv[10] =
            m[0] * m[5] * m[15] -
            m[0] * m[7] * m[13] -
            m[4] * m[1] * m[15] +
            m[4] * m[3] * m[13] +
            m[12] * m[1] * m[7] -
            m[12] * m[3] * m[5];

        inv[14] =
            -m[0] * m[5] * m[14] +
            m[0] * m[6] * m[13] +
            m[4] * m[1] * m[14] -
            m[4] * m[2] * m[13] -
            m[12] * m[1] * m[6] +
            m[12] * m[2] * m[5];

        inv[3] =
            -m[1] * m[6] * m[11] +
            m[1] * m[7] * m[10] +
            m[5] * m[2] * m[11] -
            m[5] * m[3] * m[10] -
            m[9] * m[2] * m[7] +
            m[9] * m[3] * m[6];

        inv[7] =
            m[0] * m[6] * m[11] -
            m[0] * m[7] * m[10] -
            m[4] * m[2] * m[11] +
            m[4] * m[3] * m[10] +
            m[8] * m[2] * m[7] -
            m[8] * m[3] * m[6];

        inv[11] =
            -m[0] * m[5] * m[11] +
            m[0] * m[7] * m[9] +
            m[4] * m[1] * m[11] -
            m[4] * m[3] * m[9] -
            m[8] * m[1] * m[7] +
            m[8] * m[3] * m[5];

        inv[15] =
            m[0] * m[5] * m[10] -
            m[0] * m[6] * m[9] -
            m[4] * m[1] * m[10] +
            m[4] * m[2] * m[9] +
            m[8] * m[1] * m[6] -
            m[8] * m[2] * m[5];

        const det =
            m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];

        if (det === 0) {
            throw new Error(
                "Matrix is not invertible because the determinant is zero."
            );
        }

        const invDet = 1 / det;
        for (let i = 0; i < 16; i++) {
            this.elements[i] = inv[i] * invDet;
        }

        return this;
    }

    /**
     * Calculates the determinant of this matrix.
     * @returns {number} The determinant of the matrix.
     */
    determinant() {
        const m = this.elements;

        return (
            m[0] * m[5] * m[10] * m[15] -
            m[0] * m[5] * m[11] * m[14] -
            m[0] * m[9] * m[6] * m[15] +
            m[0] * m[9] * m[7] * m[14] +
            m[0] * m[13] * m[6] * m[11] -
            m[0] * m[13] * m[7] * m[10] -
            m[4] * m[1] * m[10] * m[15] +
            m[4] * m[1] * m[11] * m[14] +
            m[4] * m[9] * m[2] * m[15] -
            m[4] * m[9] * m[3] * m[14] -
            m[4] * m[13] * m[2] * m[11] +
            m[4] * m[13] * m[3] * m[10] +
            m[8] * m[1] * m[6] * m[15] -
            m[8] * m[1] * m[7] * m[14] -
            m[8] * m[5] * m[2] * m[15] +
            m[8] * m[5] * m[3] * m[14] +
            m[8] * m[13] * m[2] * m[7] -
            m[8] * m[13] * m[3] * m[6] -
            m[12] * m[1] * m[6] * m[11] +
            m[12] * m[1] * m[7] * m[10] +
            m[12] * m[5] * m[2] * m[11] -
            m[12] * m[5] * m[3] * m[10] -
            m[12] * m[9] * m[2] * m[7] +
            m[12] * m[9] * m[3] * m[6]
        );
    }

    /**
     * Applies scaling using a Vec3 and returns this matrix for chaining.
     * @param {Vec3} vector - The scaling vector.
     * @returns {Mat4} This instance for chaining.
     */
    scale(vector) {
        if (!(vector instanceof Vec3)) {
            throw new TypeError(
                'Parameter "vector" must be an instance of Vec3.'
            );
        }

        const s = vector.toArray();
        this.elements[0] *= s[0];
        this.elements[5] *= s[1];
        this.elements[10] *= s[2];
        return this;
    }

    /**
     * Applies translation using a Vec3 and returns this matrix for chaining.
     * @param {Vec3} vector - The translation vector.
     * @returns {Mat4} This instance for chaining.
     */
    translate(vector) {
        if (!(vector instanceof Vec3)) {
            throw new TypeError(
                'Parameter "vector" must be an instance of Vec3.'
            );
        }

        const x = vector.x;
        const y = vector.y;
        const z = vector.z;

        this.elements[12] +=
            this.elements[0] * x + this.elements[4] * y + this.elements[8] * z;
        this.elements[13] +=
            this.elements[1] * x + this.elements[5] * y + this.elements[9] * z;
        this.elements[14] +=
            this.elements[2] * x + this.elements[6] * y + this.elements[10] * z;
        this.elements[15] +=
            this.elements[3] * x + this.elements[7] * y + this.elements[11] * z;

        return this;
    }

    /**
     * Rotates the matrix around a given axis by the given angle (in radians) and returns this matrix for chaining.
     * @param {number} angle - The rotation angle in radians.
     * @param {Vec3} axis - The axis to rotate around.
     * @returns {Mat4} This instance for chaining.
     */
    rotate(angle, axis) {
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }
        if (!(axis instanceof Vec3)) {
            throw new TypeError(
                'Parameter "axis" must be an instance of Vec3.'
            );
        }

        const x = axis.x;
        const y = axis.y;
        const z = axis.z;
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

        const rot = new Mat4([
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
            1,
        ]);

        this.multiply(rot);
        return this;
    }

    /**
     * Rotates the matrix using a quaternion and returns this matrix for chaining.
     * @param {Quat} quaternion - The quaternion to rotate by.
     * @returns {Mat4} This instance for chaining.
     */
    rotateByQuaternion(quaternion) {
        if (!(quaternion instanceof Quat)) {
            throw new TypeError(
                'Parameter "quaternion" must be an instance of Quat.'
            );
        }

        const rotMatrix = new Mat4();
        rotMatrix.setFromQuaternion(quaternion);
        this.multiply(rotMatrix);
        return this;
    }

    /**
     * Applies rotation around the X-axis by the given angle (in radians) and returns this matrix for chaining.
     * @param {number} angle - The rotation angle in radians.
     * @returns {Mat4} This instance for chaining.
     */
    rotateX(angle) {
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }

        const s = Math.sin(angle);
        const c = Math.cos(angle);

        const rot = new Mat4([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);

        this.multiply(rot);
        return this;
    }

    /**
     * Applies rotation around the Y-axis by the given angle (in radians) and returns this matrix for chaining.
     * @param {number} angle - The rotation angle in radians.
     * @returns {Mat4} This instance for chaining.
     */
    rotateY(angle) {
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }

        const s = Math.sin(angle);
        const c = Math.cos(angle);

        const rot = new Mat4([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);

        this.multiply(rot);
        return this;
    }

    /**
     * Applies rotation around the Z-axis by the given angle (in radians) and returns this matrix for chaining.
     * @param {number} angle - The rotation angle in radians.
     * @returns {Mat4} This instance for chaining.
     */
    rotateZ(angle) {
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }

        const s = Math.sin(angle);
        const c = Math.cos(angle);

        const rot = new Mat4([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

        this.multiply(rot);
        return this;
    }

    /**
     * Sets this matrix as a look-at matrix and returns this instance for chaining.
     * @param {Vec3} eye - The position of the eye.
     * @param {Vec3} target - The position to look at.
     * @param {Vec3} up - The up direction.
     * @returns {Mat4} This instance for chaining.
     */
    lookAt(eye, target, up) {
        if (!(eye instanceof Vec3)) {
            throw new TypeError('Parameter "eye" must be an instance of Vec3.');
        }
        if (!(target instanceof Vec3)) {
            throw new TypeError(
                'Parameter "target" must be an instance of Vec3.'
            );
        }
        if (!(up instanceof Vec3)) {
            throw new TypeError('Parameter "up" must be an instance of Vec3.');
        }

        const z = eye.clone().subtract(target).normalize();
        const x = up.clone().cross(z).normalize();
        const y = z.clone().cross(x).normalize();

        this.set(
            x.x,
            y.x,
            z.x,
            0,
            x.y,
            y.y,
            z.y,
            0,
            x.z,
            y.z,
            z.z,
            0,
            -Vec3.dot(x, eye),
            -Vec3.dot(y, eye),
            -Vec3.dot(z, eye),
            1
        );

        return this;
    }

    /**
     * Composes this matrix from position, quaternion, and scale and returns this instance for chaining.
     * @param {Vec3} position - The position vector.
     * @param {Quat} quaternion - The rotation quaternion.
     * @param {Vec3} scale - The scale vector.
     * @returns {Mat4} This instance for chaining.
     */
    compose(position, quaternion, scale) {
        if (!(position instanceof Vec3)) {
            throw new TypeError(
                'Parameter "position" must be an instance of Vec3.'
            );
        }
        if (!(quaternion instanceof Quat)) {
            throw new TypeError(
                'Parameter "quaternion" must be an instance of Quat.'
            );
        }
        if (!(scale instanceof Vec3)) {
            throw new TypeError(
                'Parameter "scale" must be an instance of Vec3.'
            );
        }

        const x = quaternion.x,
            y = quaternion.y,
            z = quaternion.z,
            w = quaternion.w;
        const sx = scale.x,
            sy = scale.y,
            sz = scale.z;

        this.elements[0] = (1 - 2 * (y * y + z * z)) * sx;
        this.elements[1] = 2 * (x * y + z * w) * sx;
        this.elements[2] = 2 * (x * z - y * w) * sx;
        this.elements[3] = 0;

        this.elements[4] = 2 * (x * y - z * w) * sy;
        this.elements[5] = (1 - 2 * (x * x + z * z)) * sy;
        this.elements[6] = 2 * (y * z + x * w) * sy;
        this.elements[7] = 0;

        this.elements[8] = 2 * (x * z + y * w) * sz;
        this.elements[9] = 2 * (y * z - x * w) * sz;
        this.elements[10] = (1 - 2 * (x * x + y * y)) * sz;
        this.elements[11] = 0;

        this.elements[12] = position.x;
        this.elements[13] = position.y;
        this.elements[14] = position.z;
        this.elements[15] = 1;

        return this;
    }

    /**
     * Decomposes this matrix into position, quaternion, and scale.
     * @param {Vec3} position - The vector to store the position.
     * @param {Quat} quaternion - The quaternion to store the rotation.
     * @param {Vec3} scale - The vector to store the scale.
     * @returns {Mat4} This instance for chaining.
     */
    decompose(position, quaternion, scale) {
        if (!(position instanceof Vec3)) {
            throw new TypeError(
                'Parameter "position" must be an instance of Vec3.'
            );
        }
        if (!(quaternion instanceof Quat)) {
            throw new TypeError(
                'Parameter "quaternion" must be an instance of Quat.'
            );
        }
        if (!(scale instanceof Vec3)) {
            throw new TypeError(
                'Parameter "scale" must be an instance of Vec3.'
            );
        }

        // Extract position
        position.fromArray([
            this.elements[12],
            this.elements[13],
            this.elements[14],
        ]);

        // Extract scale
        const sx = Math.hypot(
            this.elements[0],
            this.elements[1],
            this.elements[2]
        );
        const sy = Math.hypot(
            this.elements[4],
            this.elements[5],
            this.elements[6]
        );
        const sz = Math.hypot(
            this.elements[8],
            this.elements[9],
            this.elements[10]
        );
        scale.fromArray([sx, sy, sz]);

        // Extract rotation
        const rotMatrix = this.clone();
        rotMatrix.elements[0] /= sx;
        rotMatrix.elements[1] /= sx;
        rotMatrix.elements[2] /= sx;

        rotMatrix.elements[4] /= sy;
        rotMatrix.elements[5] /= sy;
        rotMatrix.elements[6] /= sy;

        rotMatrix.elements[8] /= sz;
        rotMatrix.elements[9] /= sz;
        rotMatrix.elements[10] /= sz;

        quaternion.setFromRotationMatrix(rotMatrix);
        return this;
    }

    /**
     * Sets the position component of this matrix and returns this instance for chaining.
     * @param {Vec3} position - The position vector.
     * @returns {Mat4} This instance for chaining.
     */
    setPosition(position) {
        if (!(position instanceof Vec3)) {
            throw new TypeError(
                'Parameter "position" must be an instance of Vec3.'
            );
        }

        this.elements[12] = position.x;
        this.elements[13] = position.y;
        this.elements[14] = position.z;
        return this;
    }

    /**
     * Checks if this matrix equals another matrix.
     * @param {Mat4} other - The matrix to compare with.
     * @returns {boolean} True if matrices are equal, false otherwise.
     */
    equals(other) {
        if (!(other instanceof Mat4)) {
            return false;
        }

        for (let i = 0; i < 16; i++) {
            if (this.elements[i] !== other.elements[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Sets this matrix to a perspective projection matrix and returns this instance for chaining.
     * @param {number} fov - Field of view in radians.
     * @param {number} aspect - Aspect ratio.
     * @param {number} near - Near clipping plane.
     * @param {number} far - Far clipping plane.
     * @returns {Mat4} This instance for chaining.
     */
    makePerspective(fov, aspect, near, far) {
        if (
            typeof fov !== "number" ||
            typeof aspect !== "number" ||
            typeof near !== "number" ||
            typeof far !== "number"
        ) {
            throw new TypeError(
                'Parameters "fov", "aspect", "near", and "far" must be numbers.'
            );
        }

        const f = 1.0 / Math.tan(fov / 2);
        this.elements.fill(0);
        this.elements[0] = f / aspect;
        this.elements[5] = f;
        this.elements[10] = (far + near) / (near - far);
        this.elements[11] = -1;
        this.elements[14] = (2 * far * near) / (near - far);
        return this;
    }

    /**
     * Sets this matrix to an orthographic projection matrix and returns this instance for chaining.
     * @param {number} left - Left vertical clipping plane.
     * @param {number} right - Right vertical clipping plane.
     * @param {number} top - Top horizontal clipping plane.
     * @param {number} bottom - Bottom horizontal clipping plane.
     * @param {number} near - Near clipping plane.
     * @param {number} far - Far clipping plane.
     * @returns {Mat4} This instance for chaining.
     */
    makeOrthographic(left, right, top, bottom, near, far) {
        if (
            typeof left !== "number" ||
            typeof right !== "number" ||
            typeof top !== "number" ||
            typeof bottom !== "number" ||
            typeof near !== "number" ||
            typeof far !== "number"
        ) {
            throw new TypeError(
                'Parameters "left", "right", "top", "bottom", "near", and "far" must be numbers.'
            );
        }

        this.elements.fill(0);
        this.elements[0] = 2 / (right - left);
        this.elements[5] = 2 / (top - bottom);
        this.elements[10] = -2 / (far - near);
        this.elements[12] = -(right + left) / (right - left);
        this.elements[13] = -(top + bottom) / (top - bottom);
        this.elements[14] = -(far + near) / (far - near);
        this.elements[15] = 1;
        return this;
    }

    /**
     * Converts this matrix to an array.
     * @returns {number[]} An array of 16 elements in column-major order.
     */
    toArray() {
        return Array.from(this.elements);
    }

    /**
     * Sets the elements of this matrix from an array. Elements should be in column-major order.
     * @param {number[]} array - An array of 16 numerical elements.
     * @returns {Mat4} This instance for chaining.
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
            this.elements[i] = array[i];
        }
        return this;
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
                str += this.elements[col * 4 + row].toFixed(2) + " ";
            }
            str += "|\n";
        }
        return str;
    }

    /**
     * Sets this matrix from a quaternion and returns this instance for chaining.
     * @param {Quat} quaternion - The quaternion to set from.
     * @returns {Mat4} This instance for chaining.
     */
    setFromQuaternion(quaternion) {
        if (!(quaternion instanceof Quat)) {
            throw new TypeError(
                'Parameter "quaternion" must be an instance of Quat.'
            );
        }

        const x = quaternion.x,
            y = quaternion.y,
            z = quaternion.z,
            w = quaternion.w;

        const xx = x * x;
        const yy = y * y;
        const zz = z * z;
        const xy = x * y;
        const xz = x * z;
        const yz = y * z;
        const wx = w * x;
        const wy = w * y;
        const wz = w * z;

        this.elements[0] = 1 - 2 * (yy + zz);
        this.elements[1] = 2 * (xy + wz);
        this.elements[2] = 2 * (xz - wy);
        this.elements[3] = 0;

        this.elements[4] = 2 * (xy - wz);
        this.elements[5] = 1 - 2 * (xx + zz);
        this.elements[6] = 2 * (yz + wx);
        this.elements[7] = 0;

        this.elements[8] = 2 * (xz + wy);
        this.elements[9] = 2 * (yz - wx);
        this.elements[10] = 1 - 2 * (xx + yy);
        this.elements[11] = 0;

        this.elements[12] = 0;
        this.elements[13] = 0;
        this.elements[14] = 0;
        this.elements[15] = 1;

        return this;
    }

    /**
     * Static method to create a 4x4 identity matrix.
     * @returns {Mat4} A new identity Mat4 instance.
     */
    static identity() {
        return new Mat4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }

    /**
     * Static method to multiply two Mat4 matrices and return a new Mat4.
     * @param {Mat4} m1 - The first matrix.
     * @param {Mat4} m2 - The second matrix.
     * @returns {Mat4} A new Mat4 instance representing the product.
     */
    static multiply(m1, m2) {
        if (!(m1 instanceof Mat4) || !(m2 instanceof Mat4)) {
            throw new TypeError(
                'Parameters "m1" and "m2" must be instances of Mat4.'
            );
        }

        const a = m1.elements;
        const b = m2.elements;
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

        return new Mat4(result);
    }

    /**
     * Static method to multiply a Mat4 by a scalar and return a new Mat4.
     * @param {Mat4} matrix - The matrix to multiply.
     * @param {number} scalar - The scalar to multiply with.
     * @returns {Mat4} A new Mat4 instance representing the scaled matrix.
     */
    static multiplyScalar(matrix, scalar) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        if (typeof scalar !== "number") {
            throw new TypeError('Parameter "scalar" must be a number.');
        }

        const result = new Float32Array(16);
        for (let i = 0; i < 16; i++) {
            result[i] = matrix.elements[i] * scalar;
        }
        return new Mat4(result);
    }

    /**
     * Static method to transpose a Mat4 and return a new Mat4.
     * @param {Mat4} matrix - The matrix to transpose.
     * @returns {Mat4} A new Mat4 instance representing the transposed matrix.
     */
    static transpose(matrix) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }

        const m = matrix.elements;
        const result = new Float32Array(16);

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                result[row * 4 + col] = m[col * 4 + row];
            }
        }

        return new Mat4(result);
    }

    /**
     * Static method to invert a Mat4 and return a new Mat4. Throws an error if the matrix is not invertible.
     * @param {Mat4} matrix - The matrix to invert.
     * @returns {Mat4} A new Mat4 instance representing the inverted matrix.
     */
    static invert(matrix) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }

        const inv = new Mat4(matrix.elements.slice());
        inv.invert();
        return inv;
    }

    /**
     * Static method to calculate the determinant of a Mat4.
     * @param {Mat4} matrix - The matrix to calculate the determinant of.
     * @returns {number} The determinant of the matrix.
     */
    static determinant(matrix) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }

        return matrix.determinant();
    }

    /**
     * Static method to apply scaling to a Mat4 using a Vec3 and return a new Mat4.
     * @param {Mat4} matrix - The matrix to scale.
     * @param {Vec3} vector - The scaling vector.
     * @returns {Mat4} A new Mat4 instance representing the scaled matrix.
     */
    static scale(matrix, vector) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        if (!(vector instanceof Vec3)) {
            throw new TypeError(
                'Parameter "vector" must be an instance of Vec3.'
            );
        }

        const scaled = matrix.clone();
        scaled.scale(vector);
        return scaled;
    }

    /**
     * Static method to apply translation to a Mat4 using a Vec3 and return a new Mat4.
     * @param {Mat4} matrix - The matrix to translate.
     * @param {Vec3} vector - The translation vector.
     * @returns {Mat4} A new Mat4 instance representing the translated matrix.
     */
    static translate(matrix, vector) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        if (!(vector instanceof Vec3)) {
            throw new TypeError(
                'Parameter "vector" must be an instance of Vec3.'
            );
        }

        const translated = matrix.clone();
        translated.translate(vector);
        return translated;
    }

    /**
     * Static method to rotate a Mat4 around a given axis by the given angle and return a new Mat4.
     * @param {Mat4} matrix - The matrix to rotate.
     * @param {number} angle - The rotation angle in radians.
     * @param {Vec3} axis - The axis to rotate around.
     * @returns {Mat4} A new Mat4 instance representing the rotated matrix.
     */
    static rotate(matrix, angle, axis) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }
        if (!(axis instanceof Vec3)) {
            throw new TypeError(
                'Parameter "axis" must be an instance of Vec3.'
            );
        }

        const rotated = matrix.clone();
        rotated.rotate(angle, axis);
        return rotated;
    }

    /**
     * Static method to rotate a Mat4 using a quaternion and return a new Mat4.
     * @param {Mat4} matrix - The matrix to rotate.
     * @param {Quat} quaternion - The quaternion to rotate by.
     * @returns {Mat4} A new Mat4 instance representing the rotated matrix.
     */
    static rotateByQuaternion(matrix, quaternion) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        if (!(quaternion instanceof Quat)) {
            throw new TypeError(
                'Parameter "quaternion" must be an instance of Quat.'
            );
        }

        const rotated = matrix.clone();
        rotated.rotateByQuaternion(quaternion);
        return rotated;
    }

    /**
     * Static method to rotate a Mat4 around the X-axis by the given angle and return a new Mat4.
     * @param {Mat4} matrix - The matrix to rotate.
     * @param {number} angle - The rotation angle in radians.
     * @returns {Mat4} A new Mat4 instance representing the rotated matrix.
     */
    static rotateX(matrix, angle) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }

        const rotated = matrix.clone();
        rotated.rotateX(angle);
        return rotated;
    }

    /**
     * Static method to rotate a Mat4 around the Y-axis by the given angle and return a new Mat4.
     * @param {Mat4} matrix - The matrix to rotate.
     * @param {number} angle - The rotation angle in radians.
     * @returns {Mat4} A new Mat4 instance representing the rotated matrix.
     */
    static rotateY(matrix, angle) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }

        const rotated = matrix.clone();
        rotated.rotateY(angle);
        return rotated;
    }

    /**
     * Static method to rotate a Mat4 around the Z-axis by the given angle and return a new Mat4.
     * @param {Mat4} matrix - The matrix to rotate.
     * @param {number} angle - The rotation angle in radians.
     * @returns {Mat4} A new Mat4 instance representing the rotated matrix.
     */
    static rotateZ(matrix, angle) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        if (typeof angle !== "number") {
            throw new TypeError('Parameter "angle" must be a number.');
        }

        const rotated = matrix.clone();
        rotated.rotateZ(angle);
        return rotated;
    }

    /**
     * Static method to create a rotation matrix from a quaternion.
     * @param {Quat} quaternion - The quaternion to create the rotation matrix from.
     * @returns {Mat4} A new Mat4 instance representing the rotation matrix.
     */
    static fromQuaternion(quaternion) {
        if (!(quaternion instanceof Quat)) {
            throw new TypeError(
                'Parameter "quaternion" must be an instance of Quat.'
            );
        }

        const rotMatrix = new Mat4();
        rotMatrix.setFromQuaternion(quaternion);
        return rotMatrix;
    }

    /**
     * Static method to create a look-at matrix.
     * @param {Vec3} eye - The position of the eye.
     * @param {Vec3} target - The position to look at.
     * @param {Vec3} up - The up direction.
     * @returns {Mat4} A new Mat4 instance representing the look-at matrix.
     */
    static lookAt(eye, target, up) {
        if (!(eye instanceof Vec3)) {
            throw new TypeError('Parameter "eye" must be an instance of Vec3.');
        }
        if (!(target instanceof Vec3)) {
            throw new TypeError(
                'Parameter "target" must be an instance of Vec3.'
            );
        }
        if (!(up instanceof Vec3)) {
            throw new TypeError('Parameter "up" must be an instance of Vec3.');
        }

        const matrix = new Mat4();
        matrix.lookAt(eye, target, up);
        return matrix;
    }

    /**
     * Static method to compose a transformation matrix from position, quaternion, and scale.
     * @param {Vec3} position - The position vector.
     * @param {Quat} quaternion - The rotation quaternion.
     * @param {Vec3} scale - The scale vector.
     * @returns {Mat4} A new Mat4 instance representing the composed matrix.
     */
    static compose(position, quaternion, scale) {
        if (!(position instanceof Vec3)) {
            throw new TypeError(
                'Parameter "position" must be an instance of Vec3.'
            );
        }
        if (!(quaternion instanceof Quat)) {
            throw new TypeError(
                'Parameter "quaternion" must be an instance of Quat.'
            );
        }
        if (!(scale instanceof Vec3)) {
            throw new TypeError(
                'Parameter "scale" must be an instance of Vec3.'
            );
        }

        const matrix = new Mat4();
        matrix.compose(position, quaternion, scale);
        return matrix;
    }

    /**
     * Static method to decompose a transformation matrix into position, quaternion, and scale.
     * @param {Mat4} matrix - The matrix to decompose.
     * @param {Vec3} position - The vector to store the position.
     * @param {Quat} quaternion - The quaternion to store the rotation.
     * @param {Vec3} scale - The vector to store the scale.
     * @returns {Mat4} The original matrix instance.
     */
    static decompose(matrix, position, quaternion, scale) {
        if (!(matrix instanceof Mat4)) {
            throw new TypeError(
                'Parameter "matrix" must be an instance of Mat4.'
            );
        }
        if (!(position instanceof Vec3)) {
            throw new TypeError(
                'Parameter "position" must be an instance of Vec3.'
            );
        }
        if (!(quaternion instanceof Quat)) {
            throw new TypeError(
                'Parameter "quaternion" must be an instance of Quat.'
            );
        }
        if (!(scale instanceof Vec3)) {
            throw new TypeError(
                'Parameter "scale" must be an instance of Vec3.'
            );
        }

        matrix.decompose(position, quaternion, scale);
        return matrix;
    }

    /**
     * Static method to create a perspective projection matrix.
     * @param {number} fov - Field of view in radians.
     * @param {number} aspect - Aspect ratio.
     * @param {number} near - Near clipping plane.
     * @param {number} far - Far clipping plane.
     * @returns {Mat4} A new Mat4 instance representing the perspective projection matrix.
     */
    static makePerspective(fov, aspect, near, far) {
        if (
            typeof fov !== "number" ||
            typeof aspect !== "number" ||
            typeof near !== "number" ||
            typeof far !== "number"
        ) {
            throw new TypeError(
                'Parameters "fov", "aspect", "near", and "far" must be numbers.'
            );
        }

        const matrix = new Mat4();
        matrix.makePerspective(fov, aspect, near, far);
        return matrix;
    }

    /**
     * Static method to create an orthographic projection matrix.
     * @param {number} left - Left vertical clipping plane.
     * @param {number} right - Right vertical clipping plane.
     * @param {number} top - Top horizontal clipping plane.
     * @param {number} bottom - Bottom horizontal clipping plane.
     * @param {number} near - Near clipping plane.
     * @param {number} far - Far clipping plane.
     * @returns {Mat4} A new Mat4 instance representing the orthographic projection matrix.
     */
    static makeOrthographic(left, right, top, bottom, near, far) {
        if (
            typeof left !== "number" ||
            typeof right !== "number" ||
            typeof top !== "number" ||
            typeof bottom !== "number" ||
            typeof near !== "number" ||
            typeof far !== "number"
        ) {
            throw new TypeError(
                'Parameters "left", "right", "top", "bottom", "near", and "far" must be numbers.'
            );
        }

        const matrix = new Mat4();
        matrix.makeOrthographic(left, right, top, bottom, near, far);
        return matrix;
    }

    /**
     * Static method to create a Mat4 from an array of 16 elements in column-major order.
     * @param {number[]} array - An array of 16 numerical elements.
     * @returns {Mat4} A new Mat4 instance.
     */
    static fromArray(array) {
        if (!Array.isArray(array) && !(array instanceof Float32Array)) {
            throw new TypeError(
                'Parameter "array" must be an array of numbers.'
            );
        }

        if (array.length !== 16) {
            throw new Error('Parameter "array" must have exactly 16 elements.');
        }

        return new Mat4(array);
    }

    /**
     * Static method to check if two Mat4 matrices are equal.
     * @param {Mat4} m1 - The first matrix.
     * @param {Mat4} m2 - The second matrix.
     * @returns {boolean} True if matrices are equal, false otherwise.
     */
    static equals(m1, m2) {
        if (!(m1 instanceof Mat4) || !(m2 instanceof Mat4)) {
            return false;
        }

        for (let i = 0; i < 16; i++) {
            if (m1.elements[i] !== m2.elements[i]) {
                return false;
            }
        }
        return true;
    }
}

export default Mat4;
