import { validateVector3, validateMat4 } from "../../vec-mat/validation.js";
import { Mat4, Vec3 } from "../../vec-mat/index.js";
import Camera from "../../camera/index.js";

/**
 * Represents a 3D box with vertices and faces, and provides a method to render it on a 2D canvas.
 *
 * @class
 */
class Box {
    /**
     * The array of vertices defining the box.
     * @type {Vec3[]}
     */
    #vertices;

    /**
     * The array of faces defining the box, each face is an array of vertex indices.
     * @type {number[][]}
     */
    #faces;

    /**
     * The size of the box along each axis.
     * @type {Vec3}
     */
    #size;

    /**
     * The position of the box in 3D space.
     * @type {Vec3}
     */
    #position;

    /**
     * Creates a new Box instance.
     *
     * @constructor
     * @param {Vec3} [size=new Vec3(1, 1, 1)] - The dimensions of the box along the X, Y, and Z axes.
     * @param {Vec3} [position=new Vec3(0, 0, 0)] - The position of the box's center in 3D space.
     * @throws {TypeError} If either `size` or `position` is not an instance of `Vec3`.
     */
    constructor(size = new Vec3(1, 1, 1), position = new Vec3(0, 0, 0)) {
        validateVector3(size, "size must be an instance of Vec3");
        validateVector3(position, "position must be an instance of Vec3");

        this.#size = size.clone();
        this.#position = position.clone();

        this.#initializeVertices();
        this.#initializeFaces();
    }

    /**
     * Initializes the vertices of the box based on its size and position.
     *
     */
    #initializeVertices() {
        const halfSize = new Vec3(
            this.#size.x / 2,
            this.#size.y / 2,
            this.#size.z / 2
        );

        this.#vertices = [
            // Front face
            new Vec3(-halfSize.x, -halfSize.y, halfSize.z).add(this.#position),
            new Vec3(halfSize.x, -halfSize.y, halfSize.z).add(this.#position),
            new Vec3(halfSize.x, halfSize.y, halfSize.z).add(this.#position),
            new Vec3(-halfSize.x, halfSize.y, halfSize.z).add(this.#position),

            // Back face
            new Vec3(-halfSize.x, -halfSize.y, -halfSize.z).add(this.#position),
            new Vec3(halfSize.x, -halfSize.y, -halfSize.z).add(this.#position),
            new Vec3(halfSize.x, halfSize.y, -halfSize.z).add(this.#position),
            new Vec3(-halfSize.x, halfSize.y, -halfSize.z).add(this.#position),
        ];
    }

    /**
     * Initializes the faces of the box using indices into the vertices array.
     *
     * Each face is defined as an array of three indices (triangles).
     *
     */
    #initializeFaces() {
        this.#faces = [
            // Front face
            [0, 1, 2],
            [0, 2, 3],

            // Right face
            [1, 5, 6],
            [1, 6, 2],

            // Back face
            [5, 4, 7],
            [5, 7, 6],

            // Left face
            [4, 0, 3],
            [4, 3, 7],

            // Top face
            [3, 2, 6],
            [3, 6, 7],

            // Bottom face
            [4, 5, 1],
            [4, 1, 0],
        ];
    }

    /**
     * Renders the box onto a 2D canvas context using the provided camera for projection.
     *
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of an HTML5 canvas.
     * @param {Camera} camera - The camera instance used for view transformation and projection.
     * @throws {TypeError} If `ctx` is not an instance of `CanvasRenderingContext2D` or if `camera` is not an instance of `Camera`.
     */
    render(ctx, camera) {
        if (!(ctx instanceof CanvasRenderingContext2D)) {
            throw new TypeError(
                "ctx must be an instance of CanvasRenderingContext2D"
            );
        }
        if (
            typeof camera !== "object" ||
            !camera.project ||
            !camera.getViewMatrix
        ) {
            throw new TypeError("camera must be an instance of Camera");
        }

        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;

        // Get the view matrix from the camera
        const viewMatrix = camera.getViewMatrix();

        // Transform vertices using the view matrix
        const transformedVertices = this.#vertices.map((vertex) => {
            const transformed = vertex.clone().transform(viewMatrix);
            return transformed;
        });

        // Project transformed vertices to 2D using the camera's project method
        const projectedVertices = transformedVertices.map((vertex) =>
            camera.project(vertex, canvasWidth, canvasHeight)
        );

        // Clear the canvas before rendering
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Set rendering styles
        ctx.strokeStyle = "#000000"; // Black lines
        ctx.fillStyle = "rgba(0, 150, 255, 0.3)"; // Semi-transparent blue fill
        ctx.lineWidth = 2;

        // Draw each face
        this.#faces.forEach((face) => {
            ctx.beginPath();
            const firstVertex = projectedVertices[face[0]];
            ctx.moveTo(firstVertex.x, firstVertex.y);

            for (let i = 1; i < face.length; i++) {
                const vertex = projectedVertices[face[i]];
                ctx.lineTo(vertex.x, vertex.y);
            }

            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        });
    }

    /**
     * Returns a string representation of the box's size and position.
     *
     * @returns {string} A string formatted as "Box(Size: Vec3(x, y, z), Position: Vec3(x, y, z))".
     */
    toString() {
        return `Box(Size: ${this.#size.toString()}, Position: ${this.#position.toString()})`;
    }
}

export default Box;
