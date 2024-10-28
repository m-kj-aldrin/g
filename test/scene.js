import { Vec2, Vec3, Vec4, Mat2, Mat3, Mat4, Quat } from "../main.js";

let v0 = new Vec3(1, 0, 0);

let sM = Mat4.fromScaling(new Vec3(1, 1, 1));
let rM = Quat.fromAxisAngle(new Vec3(0, 0, 1), Math.PI / 2).toMat3();
let tM = Mat4.fromTranslation(new Vec3(0, 0, 0));

let transformMatrix = Mat4.multiply(tM, rM, sM);

let transformedV0 = Vec3.fromTransform(v0, transformMatrix);

console.log(transformedV0.toString());
