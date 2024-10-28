// import { Mat4, Vec3, Quat } from "../vec-mat/index.js"; // Ensure the correct path

// /**
//  * Represents a camera in a 3D scene.
//  */
// export class Camera {
//   /**
//    * Creates a new Camera instance.
//    * @param {Vec3} position - The position of the camera in world space.
//    * @param {Vec3} target - The point the camera is looking at.
//    * @param {Vec3} up - The up direction for the camera.
//    * @param {number} fov - Field of view in radians.
//    * @param {number} aspect - Aspect ratio (width / height).
//    * @param {number} near - Near clipping plane.
//    * @param {number} far - Far clipping plane.
//    */
//   constructor(
//     position = new Vec3(0, 0, 0),
//     target = new Vec3(0, 0, -1),
//     up = new Vec3(0, 1, 0),
//     fov = Math.PI / 4,
//     aspect = 16 / 9,
//     near = 0.1,
//     far = 1000
//   ) {
//     this.position = position;
//     this.target = target;
//     this.up = up;

//     this.viewMatrix = new Mat4();
//     this.projectionMatrix = Mat4.perspective(fov, aspect, near, far);
//     this.updateViewMatrix();
//   }

//   /**
//    * Updates the view matrix based on the current position, target, and up vector.
//    */
//   updateViewMatrix() {
//     this.viewMatrix = Camera.lookAt(this.position, this.target, this.up);
//   }

//   /**
//    * Sets the camera's position.
//    * @param {Vec3} position - The new position of the camera.
//    */
//   setPosition(position) {
//     this.position = position;
//     this.updateViewMatrix();
//   }

//   /**
//    * Sets the camera's target.
//    * @param {Vec3} target - The new target point the camera is looking at.
//    */
//   setTarget(target) {
//     this.target = target;
//     this.updateViewMatrix();
//   }

//   /**
//    * Sets the camera's up vector.
//    * @param {Vec3} up - The new up direction for the camera.
//    */
//   setUp(up) {
//     this.up = up;
//     this.updateViewMatrix();
//   }

//   /**
//    * Sets the camera's projection to perspective.
//    * @param {number} fov - Field of view in radians.
//    * @param {number} aspect - Aspect ratio.
//    * @param {number} near - Near clipping plane.
//    * @param {number} far - Far clipping plane.
//    */
//   setPerspective(fov, aspect, near, far) {
//     this.projectionMatrix = Mat4.perspective(fov, aspect, near, far);
//   }

//   /**
//    * Sets the camera's projection to orthographic.
//    * @param {number} left - Left clipping plane.
//    * @param {number} right - Right clipping plane.
//    * @param {number} bottom - Bottom clipping plane.
//    * @param {number} top - Top clipping plane.
//    * @param {number} near - Near clipping plane.
//    * @param {number} far - Far clipping plane.
//    */
//   setOrthographic(left, right, bottom, top, near, far) {
//     this.projectionMatrix = Mat4.orthographic(left, right, bottom, top, near, far);
//   }

//   /**
//    * Returns the combined view-projection matrix.
//    * @returns {Mat4} The combined view-projection matrix.
//    */
//   getViewProjectionMatrix() {
//     return Mat4.multiply(this.projectionMatrix, this.viewMatrix);
//   }

//   /**
//    * Moves the camera by a given offset.
//    * @param {Vec3} offset - The offset to move the camera by.
//    */
//   translate(offset) {
//     this.position = this.position.add(offset);
//     this.updateViewMatrix();
//   }

//   /**
//    * Rotates the camera around a given axis by a specified angle.
//    * @param {Vec3} axis - The axis to rotate around.
//    * @param {number} angle - The angle in radians.
//    */
//   rotate(axis, angle) {
//     const rotationQuat = Quat.fromAxisAngle(axis, angle);
//     const rotationMat = Mat4.fromRotationQuat(rotationQuat);
//     // const newDirection = rotationMat.multiplyVector(this.target.subtract(this.position));
//     const newDirection = Vec3.subtract(this.target, this.position).transform(rotationMat);
//     this.target = this.position.add(newDirection);
//     this.updateViewMatrix();
//   }

//   /**
//    * Static method to create a lookAt view matrix.
//    * @param {Vec3} eye - The position of the camera.
//    * @param {Vec3} target - The target point the camera is looking at.
//    * @param {Vec3} up - The up direction.
//    * @returns {Mat4} The view matrix.
//    */
//   static lookAt(eye, target, up) {
//     const zAxis = eye.subtract(target).normalize(); // Forward
//     const xAxis = Vec3.cross(up, zAxis).normalize(); // Right
//     const yAxis = Vec3.cross(zAxis, xAxis).normalize(); // Up

//     const viewMatrix = new Mat4([
//       xAxis.x,
//       yAxis.x,
//       zAxis.x,
//       0,
//       xAxis.y,
//       yAxis.y,
//       zAxis.y,
//       0,
//       xAxis.z,
//       yAxis.z,
//       zAxis.z,
//       0,
//       -Vec3.dot(xAxis, eye),
//       -Vec3.dot(yAxis, eye),
//       -Vec3.dot(zAxis, eye),
//       1,
//     ]);

//     return viewMatrix;
//   }
// }
