import { validateVector3, validateNumber, validateString } from "../vec-mat/validation.js";
import { Mat4, Vec2, Vec3, Vec4 } from "../main.js";

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
   * @type {number|null}
   */
  #fov;

  /**
   * The near clipping plane distance (used for perspective projection).
   * @type {number|null}
   */
  #near;

  /**
   * The far clipping plane distance (used for perspective projection).
   * @type {number|null}
   */
  #far;

  /**
   * The type of projection: 'perspective' or 'orthographic'.
   * @type {string}
   */
  #projectionType;

  /**
   * Parameters for orthographic projection.
   * @type {Object|null}
   */
  #orthoParams;

  /**
   * Creates a new Camera instance.
   *
   * @constructor
   * @param {Vec3} [position=new Vec3(0, 0, 0)] - The initial position of the camera.
   * @param {Vec3} [target=new Vec3(0, 0, -1)] - The initial target point the camera is looking at.
   * @param {"perspective"|"orthographic"} [projectionType='perspective'] - The type of projection: 'perspective' or 'orthographic'.
   * @param {Object} [projectionParams] - The parameters for the projection.
   * @param {number} [projectionParams.fov=Math.PI / 4] - The field of view in radians (for perspective).
   * @param {number} [projectionParams.near=0.1] - The near clipping plane (for perspective).
   * @param {number} [projectionParams.far=1000] - The far clipping plane (for perspective).
   * @param {number} [projectionParams.left=-10] - The left clipping plane (for orthographic).
   * @param {number} [projectionParams.right=10] - The right clipping plane (for orthographic).
   * @param {number} [projectionParams.bottom=-10] - The bottom clipping plane (for orthographic).
   * @param {number} [projectionParams.top=10] - The top clipping plane (for orthographic).
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
      const { fov = Math.PI / 4, near = 0.1, far = 1000 } = projectionParams;
      validateNumber(fov, "fov must be a number");
      validateNumber(near, "near must be a number");
      validateNumber(far, "far must be a number");
      if (near <= 0 || far <= near) {
        throw new Error("Invalid near and far plane distances.");
      }
      this.#fov = fov;
      this.#near = near;
      this.#far = far;
      this.#orthoParams = null;
    } else if (projectionType === "orthographic") {
      const {
        left = -10,
        right = 10,
        bottom = -10,
        top = 10,
        near = 0.1,
        far = 1000,
      } = projectionParams;
      ["left", "right", "bottom", "top", "near", "far"].forEach((param) => {
        if (projectionParams[param] !== undefined) {
          validateNumber(projectionParams[param], `${param} must be a number`);
        }
      });
      if (right === left || top === bottom || far === near) {
        throw new Error("Invalid orthographic projection parameters.");
      }
      this.#orthoParams = { left, right, bottom, top, near, far };
      this.#fov = null;
      this.#near = null;
      this.#far = null;
    } else {
      throw new TypeError("projectionType must be either 'perspective' or 'orthographic'");
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
      const { fov = Math.PI / 4, near = 0.1, far = 1000 } = projectionParams;
      validateNumber(fov, "fov must be a number");
      validateNumber(near, "near must be a number");
      validateNumber(far, "far must be a number");
      if (near <= 0 || far <= near) {
        throw new Error("Invalid near and far plane distances.");
      }
      this.#fov = fov;
      this.#near = near;
      this.#far = far;
      this.#orthoParams = null;
    } else if (newType === "orthographic") {
      const {
        left = -10,
        right = 10,
        bottom = -10,
        top = 10,
        near = 0.1,
        far = 1000,
      } = projectionParams;
      ["left", "right", "bottom", "top", "near", "far"].forEach((param) => {
        if (projectionParams[param] !== undefined) {
          validateNumber(projectionParams[param], `${param} must be a number`);
        }
      });
      if (right === left || top === bottom || far === near) {
        throw new Error("Invalid orthographic projection parameters.");
      }
      this.#orthoParams = { left, right, bottom, top, near, far };
      this.#fov = null;
      this.#near = null;
      this.#far = null;
    } else {
      throw new TypeError("projectionType must be either 'perspective' or 'orthographic'");
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
   * @param {number} aspectRatio - The aspect ratio of the viewport (width / height).
   * @returns {Mat4} The projection matrix.
   */
  getProjectionMatrix(aspectRatio) {
    if (this.#projectionType === "perspective") {
      return Mat4.perspective(this.#fov, aspectRatio, this.#near, this.#far);
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
    const direction = Vec3.subtract(this.#target, this.#position).normalize();

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
    this.#near = 0.1;
    this.#far = 1000;
    this.#orthoParams = null;
    return this;
  }

  /**
   * Transforms a 3D point to screen space coordinates.
   *
   * @param {Vec3} point - The 3D point to transform.
   * @param {number} canvasWidth - The width of the canvas in pixels.
   * @param {number} canvasHeight - The height of the canvas in pixels.
   * @returns {Vec2} The 2D screen space coordinates.
   * @throws {TypeError} If inputs are of incorrect types.
   * @throws {Error} If the perspective divide cannot be performed.
   */
  transformToScreen(point, canvasWidth, canvasHeight) {
    validateVector3(point, "point must be an instance of Vec3");
    validateNumber(canvasWidth, "canvasWidth must be a number");
    validateNumber(canvasHeight, "canvasHeight must be a number");

    const aspectRatio = canvasWidth / canvasHeight;

    // Get view and projection matrices
    const viewMatrix = this.getViewMatrix();
    const projectionMatrix = this.getProjectionMatrix(aspectRatio);

    // Combine Projection * View matrices
    const vpMatrix = Mat4.multiply(projectionMatrix, viewMatrix);

    const ndc = point.clone().transform(vpMatrix);

    // Map NDC to screen coordinates
    const screenX = ((ndc.x + 1) / 2) * canvasWidth;
    const screenY = ((1 - ndc.y) / 2) * canvasHeight; // Invert Y for screen space

    return new Vec2(screenX, screenY);
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
      )}, Near: ${this.#near.toFixed(2)}, Far: ${this.#far.toFixed(2)}) )`;
    } else if (this.#projectionType === "orthographic") {
      const { left, right, bottom, top, near, far } = this.#orthoParams;
      return `Camera(Position: ${this.#position.toString()}, Target: ${this.#target.toString()}, Projection: Orthographic (Left: ${left}, Right: ${right}, Bottom: ${bottom}, Top: ${top}, Near: ${near}, Far: ${far}) )`;
    } else {
      return `Camera(Position: ${this.#position.toString()}, Target: ${this.#target.toString()}, Projection: Unknown)`;
    }
  }
}

export default Camera;
