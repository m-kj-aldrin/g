import {
    createInitialState,
    arcballReducer,
    getRotationMatrix,
} from "../arcball/index.js";

let arcballState = createInitialState(window.innerWidth, window.innerHeight);

const canvas = document.querySelector("canvas");

canvas.addEventListener("mousedown", (e) => {
    arcballState = arcballReducer(arcballState, {
        type: "MOUSE_DOWN",
        x: e.clientX,
        y: e.clientY,
    });
});

canvas.addEventListener("mousemove", (e) => {
    if (!arcballState.mouseOn) return;

    arcballState = arcballReducer(arcballState, {
        type: "MOUSE_MOVE",
        x: e.clientX,
        y: e.clientY,
    });

    console.log(getRotationMatrix(arcballState));
});

canvas.addEventListener("mouseup", () => {
    if (!arcballState.mouseOn) return;

    arcballState = arcballReducer(arcballState, { type: "MOUSE_UP" });
});
