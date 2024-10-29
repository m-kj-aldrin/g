import { Quat, Vec3 } from "../main.js";
import Camera from "./index.js";

class ArcBallCamera extends Camera {
    #distance;
    #rotation;

    constructor(target = new Vec3(0, 0, 0), distance = 10) {
        super();
        super.target = target;

        this.#distance = distance;
        this.#rotation = new Quat(); // Initial rotation (identity)

        this.#updatePosition();
    }

    /**
     * Rotate the camera around the target based on input deltas
     * @param {number} deltaX
     * @param {number} deltaY
     */
    rotate(deltaX, deltaY) {
        const rotationX = Quat.fromAxisAngle(new Vec3(0, 1, 0), deltaX);
        const rotationY = Quat.fromAxisAngle(new Vec3(1, 0, 0), deltaY);
        this.#rotation = rotationX.multiply(this.#rotation).multiply(rotationY);

        this.#updatePosition();
    }

    /**
     * Calculate position based on current rotation, target, and distance
     */
    #updatePosition() {
        const unitPosition = Vec3.fromTransform(
            new Vec3(0, 0, 1),
            this.#rotation.toMat3()
        );

        this.position = unitPosition
            .multiplyScalar(this.#distance)
            .add(super.target);
    }

    /**
     *
     * @override
     * @param {Vec3} newTarget
     */
    set target(newTarget) {
        super.target = newTarget;
        this.#updatePosition();
    }

    set distance(newDistance) {
        this.#distance = newDistance;
        this.#updatePosition(); // Recalculate position based on new distance
    }

    get distance() {
        return this.#distance;
    }
}

export default ArcBallCamera;
