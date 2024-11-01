import { Mat3, Mat4, Quat, Vec2, Vec3 } from "../main.js";

let v3_00 = new Vec3(1, 0, 0);

let quat_00 = Quat.fromAxisRotation(new Vec3(0, 0, 1), Math.PI / 2);

let m4_rot = quat_00.toRotationMatrix();

let v3_transformed = v3_00.multiply(m4_rot);

console.log(v3_transformed.toString());
