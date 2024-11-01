import { Mat3, Mat4, Vec2, Vec3 } from "../main.js";

let m3_00 = Mat3.fromScaling(new Vec2(10, 100));
let m3_01 = Mat3.fromTranslation(new Vec2(2, 1));

let m3_model_matrix = Mat3.multiply(m3_00, m3_01);

let v2 = new Vec2(0, 0);

let v2_transformed = v2.clone().multiply(m3_model_matrix);

console.log(v2_transformed.toString());

console.log(v2_transformed.dot(v2_transformed));
