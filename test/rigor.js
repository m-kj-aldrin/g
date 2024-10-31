import * as vec from "../vec-mat/vector-operations.js";
import * as mat from "../vec-mat/matrix-operations.js";

function create_vec2(x = 0, y = 0) {
  return new Float32Array([x, y]);
}

function create_mat3() {
  return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
}

function create_mat3_translation(tx = 0, ty = 0) {
  return new Float32Array([1, 0, 0, 0, 1, 0, tx, ty, 1]);
}

function create_mat3_scaling(sx = 0, sy = 0) {
  return new Float32Array([sx, 0, 0, 0, sy, 0, 0, 0, 1]);
}

let m3_scaling = create_mat3_scaling(10, 0.5);
let m3_translation = create_mat3_translation(1, 3);
let m3_transform_matrix = mat.multiply_by_matrix(m3_scaling, m3_translation, 3);

let v2_0 = create_vec2(1, 0);
let v2_transformed = vec.multiply_by_matrix(v2_0, m3_transform_matrix);

console.log(vec.vector_repr(v2_transformed, "Vec2"));
