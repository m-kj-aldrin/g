import { Mat3, Mat4, Vec2, Vec3 } from "../main.js";

let v2_01 = new Vec2(1, 1);
let v2_02 = new Vec2(100, 500);

let v2_03 = v2_01.add(v2_02);

console.log(v2_01.toString());
console.log(v2_02.toString());
console.log(v2_03.toString());

let m3_00 = new Mat3();

console.log(m3_00.toString());
