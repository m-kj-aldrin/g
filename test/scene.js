import { Mat4, Vec4 } from "../main.js";

let sM = Mat4.fromScaling([1, 1, 1]);
let rM = Mat4.fromAxisAngle([1, 0, 0], Math.PI / 2);
let tM = Mat4.fromTranslation([0, 0, 0]);

let modelM = Mat4.multiply(tM, rM, sM);

console.log(modelM.toString());

let model_v0 = Vec4.fromTransform([0, 1, 0, 1], modelM);

console.log(model_v0.toString());

console.log(model_v0.length());

