// import { Mat3, Mat4, Quat, Vec2, Vec3, Vec4 } from "../main.js";

import Mat4 from "../vec-mat/mat4.js";

let m0 = Mat4.fromTranslation(1,2,3)

console.log(m0.toString());


// let gr = Quat.fromAxisAngle(new Vec3(0, 1, 0), Math.PI / 2);
// gr.toRotationMatrix()
// let qr = Quat.fromAxisAngle(new Vec3(0, 1, 0), Math.PI / 2);

// // let m = qr.toRotationMatrix();
// let m0 = Mat4.identity()
//     .translate(new Vec3(10, 0, 0))
//     .multiply(qr.toRotationMatrix());

// let m1 = Mat4.identity().translate(new Vec3(10, 0, 0)).rotate(qr);

// // console.log(m.toString());

// let v3_0 = new Vec3(1, 0, 0).transform(m0);
// let v3_1 = new Vec3(1, 0, 0).transform(m1);

// // console.log(rot_mat.toString());

// console.log(v3_0.toString());
// console.log(v3_1.toString());
