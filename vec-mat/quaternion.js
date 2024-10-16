import { Mat4 } from "./matrix4.js";
import { Vec3 } from "./vector3.js";

/**
 * Represents a quaternion used for 3D rotations.
 */
export class Quat {
    /**
     * @param {number} [x=0] The X component.
     * @param {number} [y=0] The Y component.
     * @param {number} [z=0] The Z component.
     * @param {number} [w=0] The W component (scalar part).
     */
    constructor(x = 0, y = 0, z = 0, w = 0) {
        /** @type {number} */
        this.x = x;

        /** @type {number} */
        this.y = y;

        /** @type {number} */
        this.z = z;

        /** @type {number} */
        this.w = w;

        this.normalize();
    }

    /**
     * Normalizes this quaternion (mutates).
     * @returns {this}
     */
    normalize() {
        const len = this.length();
        if (len === 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
        } else {
            const invLen = 1 / len;
            this.x *= invLen;
            this.y *= invLen;
            this.z *= invLen;
            this.w *= invLen;
        }
        return this;
    }

    /**
     * Multiplies this quaternion by another quaternion (mutates).
     * @param {Quat} q The quaternion to multiply with.
     * @returns {this}
     */
    multiply(q) {
        const x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y;
        const y = this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x;
        const z = this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w;
        const w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z;

        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    /**
     * Conjugates this quaternion (mutates).
     * @returns {this}
     */
    conjugate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        // w remains the same
        return this;
    }

    /**
     * Inverts this quaternion (mutates).
     * @returns {this}
     * @throws {Error} If the quaternion has zero length.
     */
    invert() {
        const lenSq = this.lengthSquared();
        if (lenSq === 0) {
            throw new Error("Cannot invert a quaternion with zero length.");
        }
        const invLenSq = 1 / lenSq;
        this.conjugate().scale(invLenSq);
        return this;
    }

    /**
     * Scales this quaternion by a scalar (mutates).
     * @param {number} scalar The scalar to multiply with.
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
     * Calculates the length (norm) of the quaternion.
     * @returns {number}
     */
    length() {
        return Math.hypot(this.x, this.y, this.z, this.w);
    }

    /**
     * Calculates the squared length of the quaternion.
     * @returns {number}
     */
    lengthSquared() {
        return (
            this.x * this.x +
            this.y * this.y +
            this.z * this.z +
            this.w * this.w
        );
    }

    /**
     * Retrieves the rotation angle in radians.
     * @returns {number}
     */
    angle() {
        return 2 * Math.acos(this.w);
    }

    /**
     * Retrieves the rotation axis.
     * @returns {Vec3}
     */
    axis() {
        const sinThetaOverTwoSq = 1 - this.w * this.w;
        if (sinThetaOverTwoSq <= 0) return new Vec3(1, 0, 0); // Arbitrary axis
        const invSinThetaOverTwo = 1 / Math.sqrt(sinThetaOverTwoSq);
        return new Vec3(
            this.x * invSinThetaOverTwo,
            this.y * invSinThetaOverTwo,
            this.z * invSinThetaOverTwo
        );
    }

    /**
     * Converts the quaternion to Euler angles.
     * @param {string} [order='XYZ'] Rotation order.
     * @returns {{ x: number, y: number, z: number }}
     * @throws {Error} If the rotation order is not supported.
     */
    toEuler(order = "XYZ") {
        const x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;
        let heading, attitude, bank;

        switch (order) {
            case "XYZ":
                const test = x * y + z * w;
                if (test > 0.499) {
                    heading = 2 * Math.atan2(x, w);
                    attitude = Math.PI / 2;
                    bank = 0;
                } else if (test < -0.499) {
                    heading = -2 * Math.atan2(x, w);
                    attitude = -Math.PI / 2;
                    bank = 0;
                } else {
                    const sqx = x * x;
                    const sqy = y * y;
                    const sqz = z * z;
                    heading = Math.atan2(
                        2 * y * w - 2 * x * z,
                        1 - 2 * sqy - 2 * sqz
                    );
                    attitude = Math.asin(2 * test);
                    bank = Math.atan2(
                        2 * x * w - 2 * y * z,
                        1 - 2 * sqx - 2 * sqz
                    );
                }
                break;
            // Other orders can be implemented similarly
            default:
                throw new Error(`Rotation order ${order} not supported.`);
        }

        return { x: bank, y: heading, z: attitude };
    }

    /**
     * Converts the quaternion to a rotation matrix.
     * @returns {Mat4}
     */
    toRotationMatrix() {
        return Mat4.fromRotationQuat(this);
    }

    /**
     * Clones the quaternion.
     * @returns {Quat}
     */
    clone() {
        return new Quat(this.x, this.y, this.z, this.w);
    }

    /**
     * Checks if this quaternion equals another within an epsilon.
     * @param {Quat} q The quaternion to compare with.
     * @param {number} [epsilon=1e-10] The tolerance for comparison.
     * @returns {boolean}
     */
    equals(q, epsilon = 1e-10) {
        return (
            Math.abs(this.x - q.x) < epsilon &&
            Math.abs(this.y - q.y) < epsilon &&
            Math.abs(this.z - q.z) < epsilon &&
            Math.abs(this.w - q.w) < epsilon
        );
    }

    /**
     * Converts the quaternion to an array.
     * @returns {number[]}
     */
    toArray() {
        return [this.x, this.y, this.z, this.w];
    }

    /**
     * Returns a string representation of the quaternion.
     * @returns {string}
     */
    toString() {
        return `Quaternion(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    // Static Class Methods

    /**
     * Creates an identity quaternion.
     * @returns {Quat}
     */
    static identity() {
        return new Quat(0, 0, 0, 1);
    }

    /**
     * Creates a quaternion from an axis and angle.
     * @param {Vec3} axis The rotation axis.
     * @param {number} angle Angle in radians.
     * @returns {Quat}
     */
    static fromAxisAngle(axis, angle) {
        const halfAngle = angle / 2;
        const s = Math.sin(halfAngle);
        return new Quat(
            axis.x * s,
            axis.y * s,
            axis.z * s,
            Math.cos(halfAngle)
        );
    }

    /**
     * Creates a quaternion from Euler angles.
     * @param {number} x Rotation around X axis in radians.
     * @param {number} y Rotation around Y axis in radians.
     * @param {number} z Rotation around Z axis in radians.
     * @param {string} [order='XYZ'] Rotation order.
     * @returns {Quat}
     * @throws {Error} If the rotation order is not supported.
     */
    static fromEuler(x, y, z, order = "XYZ") {
        const c1 = Math.cos(x / 2);
        const c2 = Math.cos(y / 2);
        const c3 = Math.cos(z / 2);
        const s1 = Math.sin(x / 2);
        const s2 = Math.sin(y / 2);
        const s3 = Math.sin(z / 2);

        let q;

        switch (order) {
            case "XYZ":
                q = new Quat(
                    s1 * c2 * c3 + c1 * s2 * s3,
                    c1 * s2 * c3 - s1 * c2 * s3,
                    c1 * c2 * s3 + s1 * s2 * c3,
                    c1 * c2 * c3 - s1 * s2 * s3
                );
                break;
            // Implement other rotation orders if needed
            default:
                throw new Error(`Rotation order ${order} not supported.`);
        }

        return q;
    }

    /**
     * Performs spherical linear interpolation between two quaternions.
     * @param {Quat} q1 The start quaternion.
     * @param {Quat} q2 The end quaternion.
     * @param {number} t Interpolation factor between 0 and 1.
     * @returns {Quat}
     */
    static slerp(q1, q2, t) {
        let cosHalfTheta =
            q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;

        if (Math.abs(cosHalfTheta) >= 1.0) {
            // q1 and q2 are the same
            return q1.clone();
        }

        if (cosHalfTheta < 0) {
            q2 = new Quat(-q2.x, -q2.y, -q2.z, -q2.w);
            cosHalfTheta = -cosHalfTheta;
        }

        const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

        let ratioA, ratioB;

        if (Math.abs(sinHalfTheta) < 0.001) {
            ratioA = 1 - t;
            ratioB = t;
        } else {
            const halfTheta = Math.acos(cosHalfTheta);
            ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
            ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        }

        return new Quat(
            q1.x * ratioA + q2.x * ratioB,
            q1.y * ratioA + q2.y * ratioB,
            q1.z * ratioA + q2.z * ratioB,
            q1.w * ratioA + q2.w * ratioB
        );
    }

    /**
     * Creates a quaternion from a rotation matrix.
     * @param {Mat4} m The rotation matrix.
     * @returns {Quat}
     */
    static fromRotationMatrix(m) {
        const e = m.elements;
        const m11 = e[0],
            m12 = e[1],
            m13 = e[2];
        const m21 = e[4],
            m22 = e[5],
            m23 = e[6];
        const m31 = e[8],
            m32 = e[9],
            m33 = e[10];

        const trace = m11 + m22 + m33;
        let x, y, z, w;

        if (trace > 0) {
            const s = 0.5 / Math.sqrt(trace + 1.0);
            w = 0.25 / s;
            x = (m32 - m23) * s;
            y = (m13 - m31) * s;
            z = (m21 - m12) * s;
        } else if (m11 > m22 && m11 > m33) {
            const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            w = (m32 - m23) / s;
            x = 0.25 * s;
            y = (m12 + m21) / s;
            z = (m13 + m31) / s;
        } else if (m22 > m33) {
            const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            w = (m13 - m31) / s;
            x = (m12 + m21) / s;
            y = 0.25 * s;
            z = (m23 + m32) / s;
        } else {
            const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            w = (m21 - m12) / s;
            x = (m13 + m31) / s;
            y = (m23 + m32) / s;
            z = 0.25 * s;
        }

        return new Quat(x, y, z, w);
    }

    /**
     * Multiplies two quaternions and returns a new quaternion.
     * @param {Quat} q1 The first quaternion.
     * @param {Quat} q2 The second quaternion.
     * @returns {Quat}
     */
    static multiply(q1, q2) {
        const x = q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y;
        const y = q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x;
        const z = q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w;
        const w = q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z;
        return new Quat(x, y, z, w);
    }

    /**
     * Normalizes a quaternion and returns a new normalized quaternion.
     * @param {Quat} q The quaternion to normalize.
     * @returns {Quat}
     */
    static normalize(q) {
        const len = q.length();
        if (len === 0) return new Quat(0, 0, 0, 1);
        const invLen = 1 / len;
        return new Quat(q.x * invLen, q.y * invLen, q.z * invLen, q.w * invLen);
    }

    /**
     * Conjugates a quaternion and returns a new conjugated quaternion.
     * @param {Quat} q The quaternion to conjugate.
     * @returns {Quat}
     */
    static conjugate(q) {
        return new Quat(-q.x, -q.y, -q.z, q.w);
    }

    /**
     * Inverts a quaternion and returns a new inverted quaternion.
     * @param {Quat} q The quaternion to invert.
     * @returns {Quat}
     * @throws {Error} If the quaternion has zero length.
     */
    static invert(q) {
        const lenSq = q.lengthSquared();
        if (lenSq === 0) {
            throw new Error("Cannot invert a quaternion with zero length.");
        }
        const conjugate = Quat.conjugate(q);
        const invLenSq = 1 / lenSq;
        return Quat.scale(conjugate, invLenSq);
    }

    /**
     * Scales a quaternion by a scalar and returns a new scaled quaternion.
     * @param {Quat} q The quaternion to scale.
     * @param {number} scalar The scalar to multiply with.
     * @returns {Quat}
     */
    static scale(q, scalar) {
        return new Quat(q.x * scalar, q.y * scalar, q.z * scalar, q.w * scalar);
    }
}
