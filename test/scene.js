import { Vec2, Vec3, Vec4, Mat2, Mat3, Mat4, Quat } from "../main.js";

let angle = Math.PI / 2;

let v0 = new Vec3(1, 0, 0);

let sM_0 = Mat3.fromScaling(new Vec3(1, 1, 1));
let rM_0 = Quat.fromAxisAngle(new Vec3(0, 0, 1), angle).toMat3();
let tM_0 = Mat4.fromTranslation(new Vec3(0, 0, 0));

let transformMatrix_0 = Mat4.multiply(tM_0, rM_0, sM_0);

let transformedV0 = Vec3.fromTransform(v0, transformMatrix_0);

console.log(transformedV0.toString());

let v2_0 = new Vec2(1, 0);

let sM_1 = Mat2.fromScaling(new Vec2(1, 1));
let rM_1 = Mat2.fromRotation(angle);
let tM_1 = Mat3.fromTranslation(new Vec2(0, 0));

let transformMatrix_1 = Mat3.multiply(sM_1, rM_1, tM_1);

let transformedV2_0 = v2_0.transform(transformMatrix_1);

// console.log(rM_1);

console.log(transformedV2_0.toString());
