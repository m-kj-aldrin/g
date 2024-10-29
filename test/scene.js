import ArcBallCamera from "../camera/arcball-camera.js";
import Camera from "../camera/index.js";
import Box from "../canvas/geo/Box.js";
import { Vec2, Vec3, Vec4, Mat2, Mat3, Mat4, Quat, Canvas } from "../main.js";

let angle = Math.PI / 2;

let v2_0 = new Vec2(1, 0);

let sM_0 = Mat2.fromScaling(new Vec2(1, 1));
let rM_0 = Mat2.fromRotation(angle);
let tM_0 = Mat3.fromTranslation(new Vec2(0, 0));

let transformMatrix_0 = Mat3.multiply(sM_0, rM_0, tM_0);

let transformedV2_0 = v2_0.transform(transformMatrix_0);

console.log(transformedV2_0.toString());

let v3_0 = new Vec3(1, 0, 0);

let sM_1 = Mat3.fromScaling(new Vec3(1, 1, 1));
let rM_1 = Quat.fromAxisAngle(new Vec3(0, 0, 1), angle).toMat3();
let tM_1 = Mat4.fromTranslation(new Vec3(0, 0, 0));

let transformMatrix_1 = Mat4.multiply(tM_1, rM_1, sM_1);

let transformedV3_0 = Vec3.fromTransform(v3_0, transformMatrix_1);

console.log(transformedV3_0.toString());

// Direction vector, w = 0
let v4_0 = new Vec4(1, 0, 0, 0);

let sM_2 = Mat4.fromScaling(new Vec3(1, 1, 1));
let rM_2 = Quat.fromAxisAngle(new Vec3(0, 0, 1), angle).toMat3();
let tM_2 = Mat4.fromTranslation(new Vec3(1, 0, 0));

let transformMatrix_2 = Mat4.multiply(sM_2, rM_2, tM_2);

let transformedV4_0 = Vec4.fromTransform(v4_0, transformMatrix_2);

console.log(transformedV4_0.toString());

// console.log(camera_viewMatrix.toString());

// let arcBallCamera = new ArcBallCamera(new Vec3(0, 0, 0), 5);
// arcBallCamera.rotate(Math.PI / 2, 0);
// let arcBall_viewMatrix = arcBallCamera.getViewMatrix();

// console.log(arcBall_viewMatrix.toString());

// let test_matrix = Mat4.fromAxisAngle(new Vec3(0, 0, 1), Math.PI / 2);

// let test_v = Vec3.fromTransform(new Vec3(1, 0, 0), test_matrix);

// console.log(test_matrix.toString());
// console.log(test_v.toString());

let camera = new Camera(new Vec3(0, 0, 5), new Vec3(0, 0, 0));
camera.rotate(new Vec3(1, 0, 0), Math.PI / 4);

let canvas = new Canvas();
canvas.attach(document.body);

let box0 = new Box(new Vec3(128, 128, 128), new Vec3(0, 0, 0));

box0.render(canvas.context, camera);
