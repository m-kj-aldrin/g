import Mat4 from "./mat4.js";
import Vec3 from "./vec3.js";
import Vec4 from "./vec4.js";

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
 * @param {Float32Array | number[]} array
 * @param {string} [msg]
 *  */
export function validateArray(array, msg = "array") {
    if (!(array instanceof Array || array instanceof Float32Array)) {
        throw new TypeError(`${msg} must be an Array or Float32Array.`);
    }
    if (array.length !== 16) {
        throw new RangeError(`${msg} array must have 16 elements.`);
    }
}

/**@param {Vec4 | [number,number,number,number]} vector */
export function getVectorComponents4(vector) {
    if (vector instanceof Vec4) {
        return vector;
    }
    return {
        x: vector?.[0] ?? 0,
        y: vector?.[1] ?? 0,
        z: vector?.[2] ?? 0,
        w: vector?.[3] ?? 0,
    };
}
