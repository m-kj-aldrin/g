import {
    multiply_by_matrix,
    multiply_by_scalar,
} from "../vec-mat/vector-operations.js";

let v3 = new Float32Array([1, 2, 3]);

function scaling(s) {
    let mat44 = new Float32Array([
        s,
        0,
        0,
        0,
        0,
        s,
        0,
        0,
        0,
        0,
        s,
        0,
        0,
        0,
        0,
        1,
    ]);
    return mat44;
}

let v3_scaled = multiply_by_matrix(v3, scaling(10), true);
v3_scaled = multiply_by_scalar(v3_scaled, -1);

// console.log(v3);
console.log(v3_scaled);
