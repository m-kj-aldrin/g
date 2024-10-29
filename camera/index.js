// import { validateVector3, validateNumber } from "../vec-mat/validation.js";
// import Mat4 from "../vec-mat/mat4.js";
// import Vec3 from "../vec-mat/vec3.js";

// /**
//  * Represents a camera in a 3D space, defining its position, target, and projection parameters.
//  *
//  * @class
//  */
// class Camera {
//     /**
//      * The position of the camera in 3D space.
//      * @type {Vec3}
//      */
//     #position;

//     /**
//      * The target point the camera is looking at in 3D space.
//      * @type {Vec3}
//      */
//     #target;

//     /**
//      * The field of view of the camera in radians.
//      * @type {number}
//      */
//     #fov;

//     /**
//      * The distance from the viewer to the projection plane.
//      * @type {number}
//      */
//     #viewerDistance;

//     /**
//      * Creates a new Camera instance.
//      *
//      * @constructor
//      * @param {Vec3} [position=new Vec3(0, 0, 0)] - The initial position of the camera.
//      * @param {Vec3} [target=new Vec3(0, 0, -1)] - The initial target point the camera is looking at.
//      * @param {number} [fov=Math.PI / 4] - The field of view in radians.
//      * @param {number} [viewerDistance=5] - The distance from the viewer to the projection plane.
//      * @throws {TypeError} If `position` or `target` is not an instance of `Vec3`, or if `fov`/`viewerDistance` is not a number.
//      */
//     constructor(
//         position = new Vec3(0, 0, 0),
//         target = new Vec3(0, 0, -1),
//         fov = Math.PI / 4,
//         viewerDistance = 5
//     ) {
//         validateVector3(position, "position must be an instance of Vec3");
//         validateVector3(target, "target must be an instance of Vec3");
//         validateNumber(fov, "fov must be a number");
//         validateNumber(viewerDistance, "viewerDistance must be a number");

//         this.#position = position.clone();
//         this.#target = target.clone();
//         this.#fov = fov;
//         this.#viewerDistance = viewerDistance;
//     }

//     /**
//      * Gets the position of the camera.
//      *
//      * @type {Vec3}
//      * @readonly
//      */
//     get position() {
//         return this.#position.clone();
//     }

//     /**
//      * Sets the position of the camera.
//      *
//      * @param {Vec3} newPosition - The new position to set.
//      * @returns {Camera} This instance for chaining.
//      * @throws {TypeError} If `newPosition` is not an instance of `Vec3`.
//      */
//     set position(newPosition) {
//         validateVector3(newPosition, "newPosition must be an instance of Vec3");
//         this.#position = newPosition.clone();
//     }

//     /**
//      * Gets the target point the camera is looking at.
//      *
//      * @type {Vec3}
//      * @readonly
//      */
//     get target() {
//         return this.#target.clone();
//     }

//     /**
//      * Sets the target point the camera is looking at.
//      *
//      * @param {Vec3} newTarget - The new target point to set.
//      * @returns {Camera} This instance for chaining.
//      * @throws {TypeError} If `newTarget` is not an instance of `Vec3`.
//      */
//     set target(newTarget) {
//         validateVector3(newTarget, "newTarget must be an instance of Vec3");
//         this.#target = newTarget.clone();
//     }

//     /**
//      * Gets the field of view of the camera in radians.
//      *
//      * @type {number}
//      * @readonly
//      */
//     get fov() {
//         return this.#fov;
//     }

//     /**
//      * Sets the field of view of the camera in radians.
//      *
//      * @param {number} newFov - The new field of view to set.
//      * @returns {Camera} This instance for chaining.
//      * @throws {TypeError} If `newFov` is not a number.
//      */
//     set fov(newFov) {
//         validateNumber(newFov, "newFov must be a number");
//         this.#fov = newFov;
//     }

//     /**
//      * Gets the viewer distance from the projection plane.
//      *
//      * @type {number}
//      * @readonly
//      */
//     get viewerDistance() {
//         return this.#viewerDistance;
//     }

//     /**
//      * Calculates and returns the view matrix based on the current position and target.
//      *
//      * The view matrix transforms world coordinates to camera (view) coordinates.
//      *
//      * @returns {Mat4} The view matrix representing the camera's transformation.
//      */
//     getViewMatrix() {
//         const up = new Vec3(0, 1, 0); // World up vector
//         return Mat4.lookAt(this.#position, this.#target, up);
//     }

//     /**
//      * Moves the camera by a specified offset.
//      *
//      * @param {Vec3} offset - The offset to move the camera by.
//      * @returns {Camera} This instance for chaining.
//      * @throws {TypeError} If `offset` is not an instance of `Vec3`.
//      */
//     move(offset) {
//         validateVector3(offset, "offset must be an instance of Vec3");

//         this.#position.add(offset);
//         this.#target.add(offset);
//         return this;
//     }

//     /**
//      * Rotates the camera around a specified axis by a given angle.
//      *
//      * @param {Vec3} axis - The axis to rotate around.
//      * @param {number} angle - The angle in radians to rotate.
//      * @returns {Camera} This instance for chaining.
//      * @throws {TypeError} If `axis` is not an instance of `Vec3` or if `angle` is not a number.
//      */
//     rotate(axis, angle) {
//         validateVector3(axis, "axis must be an instance of Vec3");
//         validateNumber(angle, "angle must be a number");

//         // Calculate the direction vector from position to target
//         const direction = Vec3.subtract(
//             this.#target,
//             this.#position
//         ).normalize();

//         // Create a rotation matrix
//         const rotationMatrix = Mat4.fromAxisAngle(axis, angle);

//         // Rotate the direction vector
//         direction.transform(rotationMatrix);

//         // Update the target position based on the rotated direction
//         this.#target = Vec3.add(this.#position, direction);

//         return this;
//     }

//     /**
//      * Resets the camera to the default position, target, and projection parameters.
//      *
//      * @returns {Camera} This instance for chaining.
//      */
//     reset() {
//         this.#position = new Vec3(0, 0, 0);
//         this.#target = new Vec3(0, 0, -1);
//         this.#fov = Math.PI / 4;
//         this.#viewerDistance = 5;
//         return this;
//     }

//     /**
//      * Returns a string representation of the camera's position, target, and projection parameters.
//      *
//      * @returns {string} A string formatted as "Camera(Position: Vec3(x, y, z), Target: Vec3(x, y, z), FOV: value, ViewerDistance: value)".
//      */
//     toString() {
//         return `Camera(Position: ${this.#position.toString()}, Target: ${this.#target.toString()}, FOV: ${this.#fov.toFixed(
//             2
//         )}, ViewerDistance: ${this.#viewerDistance.toFixed(2)})`;
//     }
// }

// export default Camera;

import {
    validateVector3,
    validateNumber,
    validateString,
} from "../vec-mat/validation.js";
import Mat4 from "../vec-mat/mat4.js";
import Vec3 from "../vec-mat/vec3.js";

/**
 * Represents a camera in a 3D space, defining its position, target, and projection parameters.
 *
 * @class
 */
class Camera {
    /**
     * The position of the camera in 3D space.
     * @type {Vec3}
     */
    #position;

    /**
     * The target point the camera is looking at in 3D space.
     * @type {Vec3}
     */
    #target;

    /**
     * The field of view of the camera in radians (used for perspective projection).
     * @type {number}
     */
    #fov;

    /**
     * The distance from the viewer to the projection plane (used for perspective projection).
     * @type {number}
     */
    #viewerDistance;

    /**
     * The type of projection: 'perspective' or 'orthographic'.
     * @type {string}
     */
    #projectionType;

    /**
     * Parameters for orthographic projection.
     * @type {Object}
     */
    #orthoParams;

    /**
     * Creates a new Camera instance.
     *
     * @constructor
     * @param {Vec3} [position=new Vec3(0, 0, 0)] - The initial position of the camera.
     * @param {Vec3} [target=new Vec3(0, 0, -1)] - The initial target point the camera is looking at.
     * @param {string} [projectionType='perspective'] - The type of projection: 'perspective' or 'orthographic'.
     * @param {Object} [projectionParams] - The parameters for the projection.
     * @param {number} [projectionParams.fov=Math.PI / 4] - The field of view in radians (for perspective).
     * @param {number} [projectionParams.viewerDistance=5] - The viewer distance (for perspective).
     * @param {number} [projectionParams.left=-10] - The left clipping plane (for orthographic).
     * @param {number} [projectionParams.right=10] - The right clipping plane (for orthographic).
     * @param {number} [projectionParams.bottom=-10] - The bottom clipping plane (for orthographic).
     * @param {number} [projectionParams.top=10] - The top clipping plane (for orthographic).
     * @param {number} [projectionParams.near=0.1] - The near clipping plane.
     * @param {number} [projectionParams.far=100] - The far clipping plane.
     * @throws {TypeError} If parameters are of incorrect types.
     */
    constructor(
        position = new Vec3(0, 0, 0),
        target = new Vec3(0, 0, -1),
        projectionType = "perspective",
        projectionParams = {}
    ) {
        validateVector3(position, "position must be an instance of Vec3");
        validateVector3(target, "target must be an instance of Vec3");
        validateString(projectionType, "projectionType must be a string");

        this.#position = position.clone();
        this.#target = target.clone();
        this.#projectionType = projectionType;

        if (projectionType === "perspective") {
            const { fov = Math.PI / 4, viewerDistance = 5 } = projectionParams;
            validateNumber(fov, "fov must be a number");
            validateNumber(viewerDistance, "viewerDistance must be a number");
            this.#fov = fov;
            this.#viewerDistance = viewerDistance;
            this.#orthoParams = null;
        } else if (projectionType === "orthographic") {
            const {
                left = -10,
                right = 10,
                bottom = -10,
                top = 10,
                near = 0.1,
                far = 100,
            } = projectionParams;
            ["left", "right", "bottom", "top", "near", "far"].forEach(
                (param) => {
                    if (projectionParams[param] !== undefined) {
                        validateNumber(
                            projectionParams[param],
                            `${param} must be a number`
                        );
                    }
                }
            );
            this.#orthoParams = { left, right, bottom, top, near, far };
            this.#fov = null;
            this.#viewerDistance = null;
        } else {
            throw new TypeError(
                "projectionType must be either 'perspective' or 'orthographic'"
            );
        }
    }

    /**
     * Gets the position of the camera.
     *
     * @type {Vec3}
     * @readonly
     */
    get position() {
        return this.#position.clone();
    }

    /**
     * Sets the position of the camera.
     *
     * @param {Vec3} newPosition - The new position to set.
     * @returns {Camera} This instance for chaining.
     * @throws {TypeError} If `newPosition` is not an instance of `Vec3`.
     */
    set position(newPosition) {
        validateVector3(newPosition, "newPosition must be an instance of Vec3");
        this.#position = newPosition.clone();
    }

    /**
     * Gets the target point the camera is looking at.
     *
     * @type {Vec3}
     * @readonly
     */
    get target() {
        return this.#target.clone();
    }

    /**
     * Sets the target point the camera is looking at.
     *
     * @param {Vec3} newTarget - The new target point to set.
     * @returns {Camera} This instance for chaining.
     * @throws {TypeError} If `newTarget` is not an instance of `Vec3`.
     */
    set target(newTarget) {
        validateVector3(newTarget, "newTarget must be an instance of Vec3");
        this.#target = newTarget.clone();
    }

    /**
     * Gets the projection type of the camera.
     *
     * @type {string}
     * @readonly
     */
    get projectionType() {
        return this.#projectionType;
    }

    /**
     * Sets the projection type of the camera.
     *
     * @param {string} newType - The new projection type: 'perspective' or 'orthographic'.
     * @param {Object} [projectionParams] - The parameters for the projection.
     * @returns {Camera} This instance for chaining.
     * @throws {TypeError} If `newType` is invalid or parameters are incorrect.
     */
    setProjection(newType, projectionParams = {}) {
        validateString(newType, "newType must be a string");

        if (newType === "perspective") {
            const { fov = Math.PI / 4, viewerDistance = 5 } = projectionParams;
            validateNumber(fov, "fov must be a number");
            validateNumber(viewerDistance, "viewerDistance must be a number");
            this.#fov = fov;
            this.#viewerDistance = viewerDistance;
            this.#orthoParams = null;
        } else if (newType === "orthographic") {
            const {
                left = -10,
                right = 10,
                bottom = -10,
                top = 10,
                near = 0.1,
                far = 100,
            } = projectionParams;
            ["left", "right", "bottom", "top", "near", "far"].forEach(
                (param) => {
                    if (projectionParams[param] !== undefined) {
                        validateNumber(
                            projectionParams[param],
                            `${param} must be a number`
                        );
                    }
                }
            );
            this.#orthoParams = { left, right, bottom, top, near, far };
            this.#fov = null;
            this.#viewerDistance = null;
        } else {
            throw new TypeError(
                "projectionType must be either 'perspective' or 'orthographic'"
            );
        }

        this.#projectionType = newType;
        return this;
    }

    /**
     * Calculates and returns the view matrix based on the current position and target.
     *
     * The view matrix transforms world coordinates to camera (view) coordinates.
     *
     * @returns {Mat4} The view matrix representing the camera's transformation.
     */
    getViewMatrix() {
        const up = new Vec3(0, 1, 0); // World up vector
        return Mat4.lookAt(this.#position, this.#target, up);
    }

    /**
     * Calculates and returns the projection matrix based on the current projection type and parameters.
     *
     * @returns {Mat4} The projection matrix.
     */
    getProjectionMatrix() {
        if (this.#projectionType === "perspective") {
            // For perspective, we can define aspect ratio externally when needed
            // Here, we just return a perspective matrix with default aspect ratio 1
            // The actual aspect ratio will be handled during transformation
            const aspectRatio = 1; // Placeholder, should be adjusted during usage
            const near = this.#viewerDistance;
            const far = this.#viewerDistance + 100; // Arbitrary far plane
            return Mat4.perspective(this.#fov, aspectRatio, near, far);
        } else if (this.#projectionType === "orthographic") {
            const { left, right, bottom, top, near, far } = this.#orthoParams;
            return Mat4.orthographic(left, right, bottom, top, near, far);
        } else {
            throw new Error("Unsupported projection type");
        }
    }

    /**
     * Moves the camera by a specified offset.
     *
     * @param {Vec3} offset - The offset to move the camera by.
     * @returns {Camera} This instance for chaining.
     * @throws {TypeError} If `offset` is not an instance of `Vec3`.
     */
    move(offset) {
        validateVector3(offset, "offset must be an instance of Vec3");

        this.#position.add(offset);
        this.#target.add(offset);
        return this;
    }

    /**
     * Rotates the camera around a specified axis by a given angle.
     *
     * @param {Vec3} axis - The axis to rotate around.
     * @param {number} angle - The angle in radians to rotate.
     * @returns {Camera} This instance for chaining.
     * @throws {TypeError} If `axis` is not an instance of `Vec3` or if `angle` is not a number.
     */
    rotate(axis, angle) {
        validateVector3(axis, "axis must be an instance of Vec3");
        validateNumber(angle, "angle must be a number");

        // Calculate the direction vector from position to target
        const direction = Vec3.subtract(
            this.#target,
            this.#position
        ).normalize();

        // Create a rotation matrix
        const rotationMatrix = Mat4.fromAxisAngle(axis, angle);

        // Rotate the direction vector
        const rotatedDirection = direction.clone().transform(rotationMatrix);

        // Update the target position based on the rotated direction
        this.#target = Vec3.add(this.#position, rotatedDirection);

        return this;
    }

    /**
     * Resets the camera to the default position, target, and projection parameters.
     *
     * @returns {Camera} This instance for chaining.
     */
    reset() {
        this.#position = new Vec3(0, 0, 0);
        this.#target = new Vec3(0, 0, -1);
        this.#projectionType = "perspective";
        this.#fov = Math.PI / 4;
        this.#viewerDistance = 5;
        this.#orthoParams = null;
        return this;
    }

    /**
     * Transforms a 3D or 4D point to screen space coordinates.
     *
     * @param {Vec3|number[]} point - The point to transform. Can be a Vec3 or an array of 4 numbers.
     * @param {number} canvasWidth - The width of the canvas in pixels.
     * @param {number} canvasHeight - The height of the canvas in pixels.
     * @returns {Object} The transformed point with `x` and `y` screen coordinates.
     * @throws {TypeError} If inputs are of incorrect types.
     */
    transformToScreen(point, canvasWidth, canvasHeight) {
        // Validate inputs
        if (point instanceof Vec3) {
            // Extract x, y, z using getters and append w=1
            point = [point.x, point.y, point.z, 1];
        } else if (Array.isArray(point) && point.length === 4) {
            // Ensure all elements are numbers
            if (!point.every((component) => typeof component === "number")) {
                throw new TypeError(
                    "All elements in the point array must be numbers"
                );
            }
            point = [...point];
        } else {
            throw new TypeError(
                "point must be a Vec3 or an array of 4 numbers"
            );
        }

        validateNumber(canvasWidth, "canvasWidth must be a number");
        validateNumber(canvasHeight, "canvasHeight must be a number");

        // Get view and projection matrices
        const viewMatrix = this.getViewMatrix();
        const projectionMatrix = this.getProjectionMatrix();

        // Combine view and projection matrices
        const vpMatrix = Mat4.multiply(viewMatrix, projectionMatrix);

        // Transform the point using the combined VP matrix
        const transformed = [
            vpMatrix.elements[0] * point[0] +
                vpMatrix.elements[4] * point[1] +
                vpMatrix.elements[8] * point[2] +
                vpMatrix.elements[12] * point[3],
            vpMatrix.elements[1] * point[0] +
                vpMatrix.elements[5] * point[1] +
                vpMatrix.elements[9] * point[2] +
                vpMatrix.elements[13] * point[3],
            vpMatrix.elements[2] * point[0] +
                vpMatrix.elements[6] * point[1] +
                vpMatrix.elements[10] * point[2] +
                vpMatrix.elements[14] * point[3],
            vpMatrix.elements[3] * point[0] +
                vpMatrix.elements[7] * point[1] +
                vpMatrix.elements[11] * point[2] +
                vpMatrix.elements[15] * point[3],
        ];

        // Perspective division (only if perspective projection)
        if (this.#projectionType === "perspective") {
            if (transformed[3] === 0) {
                throw new Error(
                    "W component is zero during perspective division."
                );
            }
            transformed[0] /= transformed[3];
            transformed[1] /= transformed[3];
            transformed[2] /= transformed[3];
        }

        // Normalize device coordinates to range [-1, 1]
        const ndc = {
            x: transformed[0],
            y: transformed[1],
            z: transformed[2],
        };

        // Map to screen coordinates
        const screenX = ((ndc.x + 1) / 2) * canvasWidth;
        const screenY = ((1 - ndc.y) / 2) * canvasHeight; // Invert Y for screen space

        return { x: screenX, y: screenY };
    }

    /**
     * Returns a string representation of the camera's position, target, and projection parameters.
     *
     * @returns {string} A string formatted as "Camera(Position: Vec3(x, y, z), Target: Vec3(x, y, z), Projection: Type, Params: ...)".
     */
    toString() {
        if (this.#projectionType === "perspective") {
            return `Camera(Position: ${this.#position.toString()}, Target: ${this.#target.toString()}, Projection: Perspective (FOV: ${this.#fov.toFixed(
                2
            )}, ViewerDistance: ${this.#viewerDistance.toFixed(2)}) )`;
        } else if (this.#projectionType === "orthographic") {
            const { left, right, bottom, top, near, far } = this.#orthoParams;
            return `Camera(Position: ${this.#position.toString()}, Target: ${this.#target.toString()}, Projection: Orthographic (Left: ${left}, Right: ${right}, Bottom: ${bottom}, Top: ${top}, Near: ${near}, Far: ${far}) )`;
        } else {
            return `Camera(Position: ${this.#position.toString()}, Target: ${this.#target.toString()}, Projection: Unknown)`;
        }
    }
}

export default Camera;
