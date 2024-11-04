import { Mat4, Vec3 } from "./index.js";

class Camera {
  #position;
  #lookAt;

  /**
   * Creates a new Camera.
   * @param {Vec3} position - The position of the camera.
   * @param {Vec3} lookAt - The point the camera is looking at.
   */
  constructor(position = new Vec3(0, 0, 0), lookAt = new Vec3(0, 0, -1)) {
    if (!(position instanceof Vec3) || !(lookAt instanceof Vec3)) {
      throw new TypeError("position and lookAt must be instances of Vec3");
    }
    this.#position = position;
    this.#lookAt = lookAt;
  }

  /**
   * Gets the position of the camera.
   * @returns {Vec3} The position.
   */
  get position() {
    return this.#position.clone();
  }

  /**
   * Sets the position of the camera.
   * @param {Vec3} position - The new position.
   */
  set position(position) {
    if (!(position instanceof Vec3)) {
      throw new TypeError("position must be an instance of Vec3");
    }
    this.#position = position;
  }

  /**
   * Gets the lookAt point of the camera.
   * @returns {Vec3} The lookAt point.
   */
  get lookAtPoint() {
    return this.#lookAt.clone();
  }

  /**
   * Sets the lookAt point of the camera.
   * @param {Vec3} lookAt - The new lookAt point.
   */
  set lookAtPoint(lookAt) {
    if (!(lookAt instanceof Vec3)) {
      throw new TypeError("lookAt must be an instance of Vec3");
    }
    this.#lookAt = lookAt;
  }

  /**
   * Computes the view matrix for the camera.
   * @returns {Mat4} The view matrix.
   */
  getViewMatrix() {
    const up = new Vec3(0, 1, 0); // Default up vector
    return Mat4.lookAt(this.#position, this.#lookAt, up);
  }
}

class OrthographicCamera extends Camera {
  #left;
  #right;
  #bottom;
  #top;
  #near;
  #far;
  #aspect = 1;

  /**
   * Creates a new OrthographicCamera.
   * @param {Vec3} position - The position of the camera.
   * @param {Vec3} lookAt - The point the camera is looking at.
   * @param {number} left - Left boundary of the orthographic projection.
   * @param {number} right - Right boundary of the orthographic projection.
   * @param {number} bottom - Bottom boundary of the orthographic projection.
   * @param {number} top - Top boundary of the orthographic projection.
   * @param {number} near - Near clipping plane.
   * @param {number} far - Far clipping plane.
   */
  constructor(
    position = new Vec3(0, 0, 0),
    lookAt = new Vec3(0, 0, -1),
    left = -1,
    right = 1,
    bottom = -1,
    top = 1,
    near = 0.1,
    far = 1000,
    aspect = 1
  ) {
    super(position, lookAt);
    this.#left = left;
    this.#right = right;
    this.#bottom = bottom;
    this.#top = top;
    this.#near = near;
    this.#far = far;
    this.#aspect = aspect;
  }

  // Getters and setters for orthographic projection parameters
  get left() {
    return this.#left;
  }

  set left(left) {
    this.#left = left;
  }

  get right() {
    return this.#right;
  }

  set right(right) {
    this.#right = right;
  }

  get bottom() {
    return this.#bottom;
  }

  set bottom(bottom) {
    this.#bottom = bottom;
  }

  get top() {
    return this.#top;
  }

  set top(top) {
    this.#top = top;
  }

  get near() {
    return this.#near;
  }

  set near(near) {
    this.#near = near;
  }

  get far() {
    return this.#far;
  }

  set far(far) {
    this.#far = far;
  }

  /**
   * Computes the orthographic projection matrix.
   * @returns {Mat4} The orthographic projection matrix.
   */
  getProjectionMatrix() {
    return Mat4.orthographic(
      this.#left,
      this.#right,
      this.#bottom,
      this.#top,
      this.#near,
      this.#far,
      this.#aspect
    );
  }

  /**
   * Computes the view-projection matrix by multiplying the projection and view matrices.
   * @returns {Mat4} The combined view-projection matrix.
   */
  getViewProjectionMatrix() {
    const projection = this.getProjectionMatrix();
    const view = this.getViewMatrix();

    return Mat4.multiply(projection, view);
  }

  /**
   * @param {Vec3} point
   * @param {Mat4} viewPortMatrix
   */
  project(point, viewPortMatrix) {
    let m = this.getViewProjectionMatrix();
    return point.multiply(viewPortMatrix.multiply(m));
  }
}

export { Camera, OrthographicCamera };
