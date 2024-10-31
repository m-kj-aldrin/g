import { Mat2, Mat3, Mat4, Vec2, Vec3 } from "../main.js";

// let v2_0 = new Vec2(1, 1);
// let m2_scale_0 = Mat2.fromScale(new Vec2(10, 100));
// let m3_0 = new Mat3(1, 0, 0, 0, 1, 0, 10, 100, 0);

// v2_0.multiply(m2_scale_0).multiply(m3_0);

// console.log(v2_0);

// let v3_0 = new Vec3(1, 1, 0);
// let m3_1 = new Mat3(1, 0, 0, 0, 10, 0, 0, 0, 1);
// let m4_0 = new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 0);

// v3_0.multiply(m4_0).multiply(m3_1);

// console.log(v3_0);

// let v2_0 = new Vec2(1, 0);
// let m2_rot_0 = Mat2.fromRotation(Math.PI / 2);

// v2_0.multiply(m2_rot_0);

// console.log(v2_0);

// let v3_0 = new Vec3(1, 0, 0);
// let m3_rot_0 = Mat3.fromAxisRotation(new Vec3(0, 0, 1), Math.PI / 4);
// let m3_scale_0 = Mat3.fromScale(new Vec3(10, 100, 1));

// let m3_modelMatrix_0 = new Mat3().multiply(m3_scale_0).multiply(m3_rot_0);

// v3_0.multiply(m3_modelMatrix_0);

// console.log(v3_0);

// let v2_0 = new Vec2(1, 1);
// let m2_scale_0 = Mat2.fromScale(new Vec2(10, 100));
// let m3_translate_0 = Mat3.fromTranslate(new Vec2(1, 2));

// let m3_modelMatrix_1 = Mat3.multiply(m3_translate_0, m2_scale_0);

// v2_0.multiply(m3_modelMatrix_1);

// console.log(v2_0);

// // console.log(m3_modelMatrix_1.elements);

let m2_00 = Mat2.fromScaling(new Vec2(50, 1));
let m2_01 = Mat2.fromRotation(Math.PI / 4);
let m3_00 = Mat3.fromTranslation(new Vec2(300, -50));

let m2_model_matrix = Mat3.multiply(m3_00, m2_01, m2_00);

console.log(m2_00.toString());

console.log(m2_model_matrix.toString());

let v2_00 = new Vec2(1, 0);
let v2_00_transformed = v2_00.clone().multiply(m2_model_matrix);

console.log(v2_00_transformed.toString());

let v3_00 = new Vec3(1,2,3).multiply(m3_00)

console.log(v3_00.toString());

