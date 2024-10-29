import Mat2 from "./mat2.js";
import Mat3 from "./mat3.js";
import Mat4 from "./mat4.js";
import Quat from "./quat.js";
import Vec2 from "./vec2.js";
import Vec3 from "./vec3.js";
import Vec4 from "./vec4.js";

/**
 * @param {string} str
 * @param {string} msg
 */
export function validateString(str, msg = "value") {
    if (typeof str !== "string") {
        throw new TypeError(`${msg} must be of type string`);
    }
}

/**
 * @param {number} number
 * @param {string} [msg] msg must be of type number
 *  */
export function validateNumber(number, msg = "value") {
    if (typeof number !== "number") {
        throw new TypeError(`${msg} must be of type number`);
    }
}

/**
 * @param {Vec2 | [number,number]} vector
 * @param {string} [msg]
 *  */
export function validateVector2(vector, msg = "vector") {
    if (!(vector instanceof Vec2)) {
        if (
            !vector.every((n) => typeof n === "number") ||
            vector.length !== 2
        ) {
            throw new TypeError(
                `${msg} must be of type Vec3 or [number,number,number]`
            );
        }
    }
}

/**
 * @param {Vec3 | [number,number,number]} vector
 * @param {string} [msg]
 *  */
export function validateVector3(vector, msg = "vector") {
    if (!(vector instanceof Vec3)) {
        if (
            !vector.every((n) => typeof n === "number") ||
            vector.length !== 3
        ) {
            throw new TypeError(
                `${msg} must be of type Vec3 or [number,number,number]`
            );
        }
    }
}

/**
 * @param {Vec4 | [number,number,number,number]} vector
 * @param {string} [msg]
 *  */
export function validateVector4(vector, msg = "vector") {
    if (!(vector instanceof Vec4)) {
        if (
            !vector.every((n) => typeof n === "number") ||
            vector.length !== 4
        ) {
            throw new TypeError(
                `${msg} must be of type Vec4 or [number,number,number,number]`
            );
        }
    }
}

/**
 * @param {Mat4} mat
 * @param {string} [msg]
 */
export function validateMat4(mat, msg = "matrix") {
    if (!(mat instanceof Mat4)) {
        throw new TypeError(`${msg} must be an instance of Mat4.`);
    }
}
/**
 * @param {Mat4|Mat3} mat
 * @param {string} [msg]
 */
export function validateMat3OrMat4(mat, msg = "matrix") {
    if (!(mat instanceof Mat4) && !(mat instanceof Mat3)) {
        throw new TypeError(`${msg} must be an instance of Mat4 or Mat3.`);
    }
}
/**
 * @param {Mat3} mat
 * @param {string} [msg]
 */
export function validateMat3(mat, msg = "matrix") {
    if (!(mat instanceof Mat3)) {
        throw new TypeError(`${msg} must be an instance of Mat3.`);
    }
}
/**
 * @param {Mat2|Mat3} mat
 * @param {string} [msg]
 */
export function validateMat2OrMat3(mat, msg = "matrix") {
    if (!(mat instanceof Mat2) && !(mat instanceof Mat3)) {
        throw new TypeError(`${msg} must be an instance of Mat2 or Mat3.`);
    }
}
/**
 * @param {Mat2} mat
 * @param {string} [msg]
 */
export function validateMat2(mat, msg = "matrix") {
    if (!(mat instanceof Mat2)) {
        throw new TypeError(`${msg} must be an instance of Mat2.`);
    }
}

/**
 *
 * @param {Quat} quaternion
 * @param {string} [msg='value']
 */
export function validateQuat(quaternion, msg = "value") {
    if (!(quaternion instanceof Quat)) {
        throw new TypeError(`${msg} must be an instance of Quat`);
    }
}

/**
 * @param {Float32Array | number[]} array
 * @param {string} [msg]
 *  */
export function validateArray(array, len = 1, msg = "array") {
    if (!(array instanceof Array || array instanceof Float32Array)) {
        throw new TypeError(`${msg} must be an Array or Float32Array.`);
    }
    if (array.length !== len) {
        throw new RangeError(`${msg} array must have 16 elements.`);
    }
}

/**
 *
 * @param {number} t
 * @param {{msg?:string,min?:number,max?:number}} opt
 */
export function validateRange(t, opt) {
    let min = opt.min ?? 0;
    let max = opt.max ?? 1;
    let msg = opt.msg ?? "value";
    if (t < min || t > max) {
        throw new RangeError(`${msg} must be between ${min} and ${max}`);
    }
}

/**
 * @param {number} value
 * @param {string} msg
 */
export function validateNonZero(value, msg = "value can not be equal to zero") {
    if (value === 0) {
        throw new Error(`${msg}`);
    }
}
/**
 * Returns a Vec3 or {x:number,y:number,z:number}
 * @param {Vec3 | [number,number,number]} vector
 */
export function getVectorComponents3(vector) {
    if (vector instanceof Vec3) {
        return vector;
    }
    return {
        x: vector?.[0] ?? 0,
        y: vector?.[1] ?? 0,
        z: vector?.[2] ?? 0,
    };
}

/**@param {Vec4 | [number,number,number,number]} vector */
export function getVectorComponents4(vector) {
    if (vector instanceof Vec4) return vector;
    return {
        x: vector?.[0] ?? 0,
        y: vector?.[1] ?? 0,
        z: vector?.[2] ?? 0,
        w: vector?.[3] ?? 0,
    };
}
