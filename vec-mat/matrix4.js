import { Quat } from "./quaternion.js";
import { Vec3 } from "./vector3.js";
import { Vec4 } from "./vector4.js";

/**
 * Represents a 4x4 matrix used for 3D transformations.
 */
export class Mat4 {
    /**
     * Creates a new Mat4 instance.
     * @param {number[] | Float32Array | Float64Array} [elements] - An array of 16 numbers representing the matrix elements.
     * @throws {Error} If the provided elements array does not contain exactly 16 elements.
     */
    constructor(elements) {
        if (elements) {
            if (elements.length !== 16) {
                throw new Error("Mat4 must have 16 elements.");
            }
            /** @type {Float32Array} */
            this.elements = new Float32Array(elements);
        } else {
            this.elements = new Float32Array(16);
            this.identity();
        }
    }

    /**
     * Multiplies this matrix by another matrix, mutating the instance.
     * @param {Mat4} m - The matrix to multiply with.
     * @returns {this} The mutated matrix.
     */
    multiply(m) {
        const a = this.elements;
        const b = m.elements;
        const result = new Float32Array(16);

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                result[row * 4 + col] =
                    a[row * 4] * b[col] +
                    a[row * 4 + 1] * b[col + 4] +
                    a[row * 4 + 2] * b[col + 8] +
                    a[row * 4 + 3] * b[col + 12];
            }
        }

        this.elements = result;
        return this;
    }

    /**
     * Transforms a Vec4 by this matrix, mutating the instance.
     * @param {Vec4} v - The vector to transform.
     * @returns {this} The mutated matrix.
     */
    multiplyVector(v) {
        const e = this.elements;
        // Assuming Vec4 is mutable and has x, y, z, w properties
        const x = e[0] * v.x + e[1] * v.y + e[2] * v.z + e[3] * v.w;
        const y = e[4] * v.x + e[5] * v.y + e[6] * v.z + e[7] * v.w;
        const z = e[8] * v.x + e[9] * v.y + e[10] * v.z + e[11] * v.w;
        const w = e[12] * v.x + e[13] * v.y + e[14] * v.z + e[15] * v.w;

        v.x = x;
        v.y = y;
        v.z = z;
        v.w = w;

        return this;
    }

    /**
     * Transforms a Vec3 by this matrix, mutating the instance.
     * @param {Vec3} v - The vector to transform.
     * @param {number} [w=1] - The w component.
     * @returns {this} The mutated matrix.
     */
    multiplyVec3(v, w = 1) {
        const e = this.elements;
        // Assuming Vec3 is mutable and has x, y, z properties
        const x = e[0] * v.x + e[1] * v.y + e[2] * v.z + e[3] * w;
        const y = e[4] * v.x + e[5] * v.y + e[6] * v.z + e[7] * w;
        const z = e[8] * v.x + e[9] * v.y + e[10] * v.z + e[11] * w;

        v.x = x;
        v.y = y;
        v.z = z;

        return this;
    }

    /**
     * Transposes the matrix, mutating the instance.
     * @returns {this} The mutated matrix.
     */
    transpose() {
        const e = this.elements;
        let temp;

        temp = e[1];
        e[1] = e[4];
        e[4] = temp;

        temp = e[2];
        e[2] = e[8];
        e[8] = temp;

        temp = e[3];
        e[3] = e[12];
        e[12] = temp;

        temp = e[6];
        e[6] = e[9];
        e[9] = temp;

        temp = e[7];
        e[7] = e[13];
        e[13] = temp;

        temp = e[11];
        e[11] = e[14];
        e[14] = temp;

        return this;
    }

    /**
     * Inverts the matrix, mutating the instance.
     * @returns {this} The mutated matrix.
     * @throws {Error} If the matrix is non-invertible.
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
            throw new Error("Non-invertible matrix.");
        }

        const invDet = 1 / det;

        for (let i = 0; i < 16; i++) {
            inv[i] *= invDet;
        }

        this.elements = inv;
        return this;
    }

    /**
     * Calculates the determinant of the matrix.
     * @returns {number} The determinant value.
     */
    determinant() {
        const m = this.elements;

        const m00 = m[0],
            m01 = m[1],
            m02 = m[2],
            m03 = m[3];
        const m10 = m[4],
            m11 = m[5],
            m12 = m[6],
            m13 = m[7];
        const m20 = m[8],
            m21 = m[9],
            m22 = m[10],
            m23 = m[11];
        const m30 = m[12],
            m31 = m[13],
            m32 = m[14],
            m33 = m[15];

        const subFactor00 = m22 * m33 - m32 * m23;
        const subFactor01 = m21 * m33 - m31 * m23;
        const subFactor02 = m21 * m32 - m31 * m22;
        const subFactor03 = m20 * m33 - m30 * m23;
        const subFactor04 = m20 * m32 - m30 * m22;
        const subFactor05 = m20 * m31 - m30 * m21;

        const detCof00 = +(
            m11 * subFactor00 -
            m12 * subFactor01 +
            m13 * subFactor02
        );
        const detCof01 = -(
            m10 * subFactor00 -
            m12 * subFactor03 +
            m13 * subFactor04
        );
        const detCof02 = +(
            m10 * subFactor01 -
            m11 * subFactor03 +
            m13 * subFactor05
        );
        const detCof03 = -(
            m10 * subFactor02 -
            m11 * subFactor04 +
            m12 * subFactor05
        );

        return (
            m00 * detCof00 + m01 * detCof01 + m02 * detCof02 + m03 * detCof03
        );
    }

    /**
     * Gets an element by row and column.
     * @param {number} row - Zero-based row index (0-3).
     * @param {number} col - Zero-based column index (0-3).
     * @returns {number} The value at the specified row and column.
     */
    getElement(row, col) {
        return this.elements[row * 4 + col];
    }

    /**
     * Sets an element by row and column.
     * @param {number} row - Zero-based row index (0-3).
     * @param {number} col - Zero-based column index (0-3).
     * @param {number} value - The value to set.
     */
    setElement(row, col, value) {
        this.elements[row * 4 + col] = value;
    }

    /**
     * Decomposes the matrix into translation, rotation, and scale components.
     * @returns {{ translation: Vec3, rotation: Quat, scale: Vec3 }}
     */
    decompose() {
        const e = this.elements;

        // Extract translation
        const translation = new Vec3(e[12], e[13], e[14]);

        // Extract scale factors
        const scaleX = new Vec3(e[0], e[4], e[8]).magnitude();
        const scaleY = new Vec3(e[1], e[5], e[9]).magnitude();
        const scaleZ = new Vec3(e[2], e[6], e[10]).magnitude();
        const scale = new Vec3(scaleX, scaleY, scaleZ);

        // Remove scaling from the matrix
        const mRotation = new Mat4(this.elements);
        mRotation.elements[0] /= scaleX;
        mRotation.elements[1] /= scaleY;
        mRotation.elements[2] /= scaleZ;
        mRotation.elements[4] /= scaleX;
        mRotation.elements[5] /= scaleY;
        mRotation.elements[6] /= scaleZ;
        mRotation.elements[8] /= scaleX;
        mRotation.elements[9] /= scaleY;
        mRotation.elements[10] /= scaleZ;

        // Extract rotation quat
        const rotation = Quat.fromRotationMatrix(mRotation);

        return { translation, rotation, scale };
    }

    /**
     * Checks if this matrix equals another matrix within an epsilon.
     * @param {Mat4} m - The matrix to compare with.
     * @param {number} [epsilon=1e-10] - The tolerance for comparison.
     * @returns {boolean} True if matrices are equal within the epsilon, false otherwise.
     */
    equals(m, epsilon = 1e-10) {
        for (let i = 0; i < 16; i++) {
            if (Math.abs(this.elements[i] - m.elements[i]) >= epsilon) {
                return false;
            }
        }
        return true;
    }

    /**
     * Converts the matrix to an array.
     * @returns {number[]} An array of 16 numbers representing the matrix elements.
     */
    toArray() {
        return Array.from(this.elements);
    }

    /**
     * Returns a string representation of the matrix.
     * @returns {string} A formatted string representing the matrix.
     */
    toString() {
        const e = this.elements;
        return `Mat4(\n  ${e[0]}, ${e[1]}, ${e[2]}, ${e[3]},\n  ${e[4]}, ${e[5]}, ${e[6]}, ${e[7]},\n  ${e[8]}, ${e[9]}, ${e[10]}, ${e[11]},\n  ${e[12]}, ${e[13]}, ${e[14]}, ${e[15]}\n)`;
    }

    /**
     * Sets this matrix to the identity matrix, mutating the instance.
     * @returns {this} The mutated matrix.
     */
    identity() {
        this.elements.set([
            1,
            0,
            0,
            0, //
            0,
            1,
            0,
            0, //
            0,
            0,
            1,
            0, //
            0,
            0,
            0,
            1,
        ]);
        return this;
    }

    // Static Methods

    /**
     * Creates a new identity matrix.
     * @returns {Mat4} A new Mat4 instance representing the identity matrix.
     */
    static identity() {
        return new Mat4([
            1,
            0,
            0,
            0, //
            0,
            1,
            0,
            0, //
            0,
            0,
            1,
            0, //
            0,
            0,
            0,
            1,
        ]);
    }

    /**
     * Creates a new matrix by multiplying two matrices.
     * @param {Mat4} a - The first matrix.
     * @param {Mat4} b - The second matrix.
     * @returns {Mat4} A new Mat4 instance representing the product.
     */
    static multiply(a, b) {
        const result = new Float32Array(16);
        const ae = a.elements;
        const be = b.elements;

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                result[row * 4 + col] =
                    ae[row * 4] * be[col] +
                    ae[row * 4 + 1] * be[col + 4] +
                    ae[row * 4 + 2] * be[col + 8] +
                    ae[row * 4 + 3] * be[col + 12];
            }
        }

        return new Mat4(result);
    }

    /**
     * Creates a new transposed matrix from the given matrix.
     * @param {Mat4} m - The matrix to transpose.
     * @returns {Mat4} A new transposed Mat4 instance.
     */
    static transpose(m) {
        const e = m.elements;
        return new Mat4([
            e[0],
            e[4],
            e[8],
            e[12],
            e[1],
            e[5],
            e[9],
            e[13],
            e[2],
            e[6],
            e[10],
            e[14],
            e[3],
            e[7],
            e[11],
            e[15],
        ]);
    }

    /**
     * Creates a new inverted matrix from the given matrix.
     * @param {Mat4} m - The matrix to invert.
     * @returns {Mat4} A new inverted Mat4 instance.
     * @throws {Error} If the matrix is non-invertible.
     */
    static invert(m) {
        const inverted = Mat4.clone(m).invert();
        return inverted;
    }

    /**
     * Creates a clone of the given matrix.
     * @param {Mat4} m - The matrix to clone.
     * @returns {Mat4} A new Mat4 instance that is a clone of the given matrix.
     */
    static clone(m) {
        return new Mat4(m.elements);
    }

    /**
     * Creates a rotation matrix from a quat.
     * @param {Quat} q - The quat to create the rotation matrix from.
     * @returns {Mat4} A new Mat4 instance representing the rotation.
     */
    static fromRotationQuat(q) {
        const x = q.x,
            y = q.y,
            z = q.z,
            w = q.w;
        const xx = x * x,
            yy = y * y,
            zz = z * z;
        const xy = x * y,
            xz = x * z,
            yz = y * z;
        const wx = w * x,
            wy = w * y,
            wz = w * z;

        return new Mat4([
            1 - 2 * (yy + zz),
            2 * (xy - wz),
            2 * (xz + wy),
            0,
            2 * (xy + wz),
            1 - 2 * (xx + zz),
            2 * (yz - wx),
            0,
            2 * (xz - wy),
            2 * (yz + wx),
            1 - 2 * (xx + yy),
            0,
            0,
            0,
            0,
            1,
        ]);
    }

    /**
     * Creates a rotation matrix from an axis and angle.
     * @param {Vec3} axis - The axis to rotate around.
     * @param {number} angle - The rotation angle in radians.
     * @returns {Mat4} A new Mat4 instance representing the rotation.
     */
    static fromRotationAxisAngle(axis, angle) {
        return Mat4.fromRotationQuat(Quat.fromAxisAngle(axis, angle));
    }

    /**
     * Creates a rotation matrix from Euler angles.
     * @param {number} x - Rotation around X axis in radians.
     * @param {number} y - Rotation around Y axis in radians.
     * @param {number} z - Rotation around Z axis in radians.
     * @param {string} [order='XYZ'] - The rotation order.
     * @returns {Mat4} A new Mat4 instance representing the rotation.
     */
    static fromRotationEuler(x, y, z, order = "XYZ") {
        return Mat4.fromRotationQuat(Quat.fromEuler(x, y, z, order));
    }

    /**
     * Creates a scaling matrix.
     * @param {number} sx - Scaling factor in X.
     * @param {number} sy - Scaling factor in Y.
     * @param {number} sz - Scaling factor in Z.
     * @returns {Mat4} A new Mat4 instance representing the scaling.
     */
    static fromScale(sx, sy, sz) {
        return new Mat4([
            sx,
            0,
            0,
            0, //
            0,
            sy,
            0,
            0, //
            0,
            0,
            sz,
            0, //
            0,
            0,
            0,
            1,
        ]);
    }

    /**
     * Creates a translation matrix.
     * @param {number} tx - Translation in X.
     * @param {number} ty - Translation in Y.
     * @param {number} tz - Translation in Z.
     * @returns {Mat4} A new Mat4 instance representing the translation.
     */
    static fromTranslation(tx=0, ty=0, tz=0) {
        return new Mat4([
            1,
            0,
            0,
            tx, //
            0,
            1,
            0,
            ty, //
            0,
            0,
            1,
            tz, //
            0,
            0,
            0,
            1,
        ]);
    }

    /**
     * Creates a perspective projection matrix.
     * @param {number} fov - Field of view in radians.
     * @param {number} aspect - Aspect ratio.
     * @param {number} near - Near clipping plane.
     * @param {number} far - Far clipping plane.
     * @returns {Mat4} A new Mat4 instance representing the perspective projection.
     */
    static perspective(fov, aspect, near, far) {
        const f = 1 / Math.tan(fov / 2);
        const nf = 1 / (near - far);

        return new Mat4([
            f / aspect,
            0,
            0,
            0,
            0,
            f,
            0,
            0,
            0,
            0,
            (far + near) * nf,
            2 * far * near * nf,
            0,
            0,
            -1,
            0,
        ]);
    }

    /**
     * Creates an orthographic projection matrix.
     * @param {number} left - Left clipping plane.
     * @param {number} right - Right clipping plane.
     * @param {number} bottom - Bottom clipping plane.
     * @param {number} top - Top clipping plane.
     * @param {number} near - Near clipping plane.
     * @param {number} far - Far clipping plane.
     * @returns {Mat4} A new Mat4 instance representing the orthographic projection.
     */
    static orthographic(left, right, bottom, top, near, far) {
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);

        return new Mat4([
            -2 * lr,
            0,
            0,
            (left + right) * lr,
            0,
            -2 * bt,
            0,
            (top + bottom) * bt,
            0,
            0,
            2 * nf,
            (far + near) * nf,
            0,
            0,
            0,
            1,
        ]);
    }
}
