import { Mat4, Vec3 } from "../main.js";

class Camera {
    #position;
    #target;

    constructor(position = new Vec3(0, 0, 0), target = new Vec3(0, 0, -1)) {
        this.#position = position;
        this.#target = target;
    }

    get position() {
        return this.#position;
    }

    set position(newPosition) {
        this.#position = newPosition;
    }

    get target() {
        return this.#target;
    }

    set target(newTarget) {
        this.#target = newTarget;
    }

    /**
     * Calculate and return the view matrix
     */
    getViewMatrix() {
        return Mat4.lookAt(this.#position, this.#target, new Vec3(0, 1, 0));
    }
}

export default Camera;
