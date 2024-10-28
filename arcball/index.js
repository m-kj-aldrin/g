// import { Quat, Vec3, Mat4 } from "../vec-mat/index.js";

// /**
//  * @typedef {Object} ArcballState
//  * @property {number} width - The width of the viewport.
//  * @property {number} height - The height of the viewport.
//  * @property {number} radius - The radius of the virtual trackball.
//  * @property {Quat} qStart - Initial rotation quaternion.
//  * @property {Quat} qDrag - Current rotation quaternion.
//  * @property {boolean} mouseOn - Flag indicating if mouse is pressed.
//  * @property {Vec3} lastPos - Last mapped position on the sphere.
//  */

// /**
//  * Initial state for the Arcball controller.
//  *
//  * @param {number} width - The width of the viewport.
//  * @param {number} height - The height of the viewport.
//  * @param {number} [radius=1] - The radius of the virtual trackball.
//  * @returns {ArcballState} The initial state object.
//  */
// const createInitialState = (width, height, radius = 1) => ({
//     width,
//     height,
//     radius,
//     qStart: Quat.identity(), // Initial rotation quaternion
//     qDrag: Quat.identity(), // Current rotation quaternion
//     mouseOn: false, // Flag to indicate if mouse is pressed
//     lastPos: new Vec3(), // Last mapped position on the sphere
// });

// /**
//  * Maps 2D screen coordinates to a 3D point on the virtual trackball (sphere).
//  *
//  * @param {number} x - The x-coordinate on the screen.
//  * @param {number} y - The y-coordinate on the screen.
//  * @param {number} width - The width of the viewport.
//  * @param {number} height - The height of the viewport.
//  * @returns {Vec3} The mapped 3D point on the sphere.
//  */
// const mapToSphere = (x, y, width, height) => {
//     // Normalize the x and y coordinates to the range [-1, 1]
//     let _x = (2 * x - width) / width;
//     let _y = (height - 2 * y) / height;
//     // Clamp the values to ensure they are within the sphere's projection
//     _x = Math.min(Math.max(_x, -1), 1);
//     _y = Math.min(Math.max(_y, -1), 1);

//     const vec = new Vec3(_x, _y, 0);

//     // Compute the squared length of the vector
//     // const length2 = vec[0] * vec[0] + vec[1] * vec[1];
//     const length2 = vec.sqMagnitude();

//     if (length2 > 1) {
//         // If the point is outside the sphere, project it onto the sphere
//         vec.normalize();
//         vec.z = 0;
//     } else {
//         // If the point is inside the sphere, compute the z-coordinate on the sphere
//         vec.z = Math.sqrt(1 - length2);
//     }

//     return vec;
// };

// /**
//  * Handles the mouse down event to initiate arcball rotation.
//  *
//  * @param {ArcballState} state - The current state.
//  * @param {number} x - The x-coordinate where the drag starts.
//  * @param {number} y - The y-coordinate where the drag starts.
//  * @returns {ArcballState} The new state after mouse down.
//  */
// const handleMouseDown = (state, x, y) => {
//     const newLastPos = mapToSphere(x, y, state.width, state.height);
//     return {
//         ...state,
//         mouseOn: true,
//         lastPos: newLastPos,
//         qStart: state.qDrag.clone(),
//     };
// };

// /**
//  * Handles the mouse move event to update the rotation based on mouse movement.
//  *
//  * @param {ArcballState} state - The current state.
//  * @param {number} x - The current x-coordinate of the mouse.
//  * @param {number} y - The current y-coordinate of the mouse.
//  * @returns {ArcballState} The new state after mouse move.
//  */
// const handleMouseMove = (state, x, y) => {
//     if (!state.mouseOn) return state;

//     const currPos = mapToSphere(x, y, state.width, state.height);

//     const axis = state.lastPos.cross(currPos);

//     if (axis.magnitude() > 1e-5) {
//         const angle = Math.acos(Math.min(1.0, state.lastPos.dot(currPos)));
//         const deltaQuat = Quat.fromAxisAngle(axis, angle).normalize();
//         const newQDrag = deltaQuat.multiply(state.qStart);

//         return {
//             ...state,
//             qDrag: newQDrag,
//         };
//     }

//     return state;
// };

// /**
//  * Handles the mouse up event to end arcball rotation.
//  *
//  * @param {ArcballState} state - The current state.
//  * @returns {ArcballState} The new state after mouse up.
//  */
// const handleMouseUp = (state) => ({
//     ...state,
//     mouseOn: false,
// });

// /**
//  * Retrieves the current rotation matrix representing the arcball's rotation.
//  *
//  * @param {ArcballState} state - The current state.
//  * @returns {Mat4} The rotation matrix.
//  */
// const getRotationMatrix = (state) => {
//     const rotationMatrix = Mat4.fromRotationQuat(state.qDrag);
//     return rotationMatrix;
// };

// /**
//  * Reducer function to manage Arcball state based on actions.
//  *
//  * @param {ArcballState} state - The current state.
//  * @param {Object} action - The action to perform.
//  * @param {string} action.type - The type of action.
//  * @param {number} [action.x] - The x-coordinate (for mouse events).
//  * @param {number} [action.y] - The y-coordinate (for mouse events).
//  * @returns {ArcballState} The new state after applying the action.
//  */
// const arcballReducer = (state, action) => {
//     switch (action.type) {
//         case "MOUSE_DOWN":
//             return handleMouseDown(state, action.x, action.y);
//         case "MOUSE_MOVE":
//             return handleMouseMove(state, action.x, action.y);
//         case "MOUSE_UP":
//             return handleMouseUp(state);
//         default:
//             return state;
//     }
// };

// export { createInitialState, arcballReducer, getRotationMatrix };
