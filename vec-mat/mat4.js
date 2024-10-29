import Mat3 from "./mat3.js";
import {
    validateNumber,
    validateVector3,
    validateArray,
    validateMat3OrMat4,
} from "./validation.js";

import Vec3 from "./vec3.js";

class Mat4 {
    #elements = new Float32Array(16);

    /**
     * @param {...number} elements
     */
    constructor(...elements) {
        if (elements.length) {
            this.elements = elements;
        } else {
            this.#identity();
        }
    }

    get elements() {
        return this.#elements;
    }

    /**
     * Sets the elements of the matrix, elements should be written in row-major
     * @param {Float32Array | number[]} elements matrix elements in row-major
     */
    set elements(elements) {
        validateArray(elements, 16, "elements");

        for (let i = 0; i < 16; i++) {
            validateNumber(elements[i], `Element at index ${i}`);

            let cri = (i % 4) * 4 + Math.floor(i / 4);
            this.#elements[i] = elements[cri];
        }
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
     * @param {Mat4|Mat3} other - The matrix to multiply with.
     * @returns {Mat4} This instance for chaining.
     */
    multiply(other) {
        validateMat3OrMat4(other, "other matrix");

        const otherElements = new Float32Array(16);
        if (other instanceof Mat4) {
            otherElements.set(other.elements);
        } else if (other instanceof Mat3) {
            // Embed Mat3 into Mat4 with last column (0, 0, 0, 1)
            const mat3 = other.elements;
            otherElements.set([
                ...mat3.slice(0, 3),
                0,
                ...mat3.slice(3, 6),
                0,
                ...mat3.slice(6, 9),
                0,
                ...[0, 0, 0],
                1,
            ]);
        }

        const a = this.#elements;
        const b = otherElements;
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

    /**
     * Multiplies matrices returning a new matrix
     * @param  {...(Mat4|Mat3)} matrices
     * @returns {Mat4} Matrix result
     */
    static multiply(...matrices) {
        if (matrices.length < 2) {
            throw new Error(
                "At least two matrices must be provided for multiplication."
            );
        }

        /* this is a bit uggly but the typechecker complains that result is of type Mat3 and Mat4,
    and return type of .reduce is also of type Mat3 or Mat4 */
        return /** @type {Mat4}*/ (
            matrices.reduce(
                /**@param {Mat4} result*/ (result, matrix) => {
                    return result.multiply(matrix);
                },
                new Mat4()
            )
        );
    }

    /**
     * Returns a scaling matrix based on a 3D vector
     * @param {Vec3} vector - 3D vector
     * @returns {Mat4} A new scaling matrix
     */
    static fromScaling(vector) {
        validateVector3(vector);

        const { x, y, z } = vector;

        return new Mat4(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    }

    /**
     * Returns a rotation matrix based on a 3D vector and an angle
     * @param {Vec3} vector - 3D vector representing the rotation axis
     * @param {number} angle - Angle in radians
     * @returns {Mat4} A new rotation matrix
     */
    static fromAxisAngle(vector, angle) {
        validateNumber(angle, "angle");
        validateVector3(vector);

        const { x, y, z } = vector;

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

        return new Mat4(
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
    }

    /**
     * Returns a translation matrix based on a 3D vector
     * @param {Vec3} vector - 3D vector representing the translation
     * @returns {Mat4} A new translation matrix
     */
    static fromTranslation(vector) {
        validateVector3(vector);
        const { x, y, z } = vector;

        return new Mat4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
    }

    /**
     * Creates a view matrix that looks from `position` towards `target` with the given `up` vector.
     * @param {Vec3} position - The position of the camera.
     * @param {Vec3} target - The point to look at.
     * @param {Vec3} up - The up direction vector.
     * @returns {Mat4} A new Mat4 instance representing the look-at transformation.
     */
    static lookAt(position, target, up) {
        validateVector3(position);
        validateVector3(target);
        validateVector3(up);

        const forward = Vec3.subtract(position, target).normalize(); // Z axis (forward)
        const right = Vec3.cross(up, forward).normalize(); // X axis (right)
        const adjustedUp = Vec3.cross(forward, right).normalize(); // Y axis (up)

        const elements = [
            right.x,
            adjustedUp.x,
            forward.x,
            0,
            right.y,
            adjustedUp.y,
            forward.y,
            0,
            right.z,
            adjustedUp.z,
            forward.z,
            0,
            -Vec3.dot(right, position),
            -Vec3.dot(adjustedUp, position),
            -Vec3.dot(forward, position),
            1,
        ];

        return new Mat4(...elements);
    }

    /**
     * Creates a perspective projection matrix.
     *
     * @param {number} fov - The field of view in radians.
     * @param {number} aspectRatio - The aspect ratio of the viewport (width / height).
     * @param {number} near - The near clipping plane.
     * @param {number} far - The far clipping plane.
     * @returns {Mat4} A new Mat4 instance representing the perspective projection matrix.
     */
    static perspective(fov, aspectRatio, near, far) {
        const f = 1.0 / Math.tan(fov / 2);
        const nf = 1 / (near - far);

        return new Mat4(
            f / aspectRatio,
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
            0
        );
    }
    /**
     * Creates an orthographic projection matrix.
     *
     * @param {number} left - The left vertical clipping plane.
     * @param {number} right - The right vertical clipping plane.
     * @param {number} bottom - The bottom horizontal clipping plane.
     * @param {number} top - The top horizontal clipping plane.
     * @param {number} near - The near depth clipping plane.
     * @param {number} far - The far depth clipping plane.
     * @returns {Mat4} A new Mat4 instance representing the orthographic projection matrix.
     */
    static orthographic(left, right, bottom, top, near, far) {
        // Validate all input parameters
        validateNumber(left, "left");
        validateNumber(right, "right");
        validateNumber(bottom, "bottom");
        validateNumber(top, "top");
        validateNumber(near, "near");
        validateNumber(far, "far");

        const rl = right - left;
        const tb = top - bottom;
        const fn = far - near;

        if (rl === 0 || tb === 0 || fn === 0) {
            throw new Error("Invalid orthographic projection parameters.");
        }

        return new Mat4(
            2 / rl,
            0,
            0,
            -(right + left) / rl,
            0,
            2 / tb,
            0,
            -(top + bottom) / tb,
            0,
            0,
            -2 / fn,
            -(far + near) / fn,
            0,
            0,
            0,
            1
        );
    }
}

export default Mat4;
