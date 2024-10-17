import { createInitialState, arcballReducer, getRotationMatrix } from "../arcball/index.js";

import { Canvas } from "../canvas/index.js";
import { Mat4, Vec3 } from "../vec-mat/index.js";
import { randFloat, randInt } from "../stockhas/index.js";
import bucket from "../bucket/index.js";
import { Camera } from "../canvas/camera.js";

const canvas = new Canvas(1);

// const saveBtn = document.createElement("button");
// saveBtn.textContent = "save";
// saveBtn.onclick = (e) => {
//   const downloadLink = document.createElement("a");
//   downloadLink.download = "canvas.tiff";
//   canvas.canvas.toBlob((blob) => {
//     if (!blob) return;
//     const url = URL.createObjectURL(blob);
//     downloadLink.href = url;
//     downloadLink.click();
//   });
// };
// document.body.appendChild(saveBtn);

// Initialize the camera
const cameraPosition = new Vec3(0, 0, 5);
const cameraTarget = new Vec3(0, 0, 0);
const cameraUp = new Vec3(0, 1, 0);
const fov = Math.PI / 4; // 45 degrees
const aspectRatio = canvas.width / canvas.height;
const nearPlane = 0.1;
const farPlane = 1000;

const camera = new Camera(
  cameraPosition,
  cameraTarget,
  cameraUp,
  fov,
  aspectRatio,
  nearPlane,
  farPlane
);

let zoom = 1;
camera.setOrthographic(-1 * zoom, 1 * zoom, -1 * zoom, 1 * zoom, 0.1, 1000);

let projectViewMatrix = camera.getViewProjectionMatrix();

// /**@type {Mat4} */
// let projectViewMatrix;
// /**@type {Vec3} */
// let cameraPos;

canvas.attach(document.body);

const ctx = canvas.context;

/**
 * @param {Vec3} pos
 * @param {Vec3} scale
 * @param {Vec3} rotation
 */
function box(pos, scale, rotation) {
  let verts = [
    //Front
    new Vec3(0.5, 0.5, 0.5),
    new Vec3(-0.5, 0.5, 0.5),
    new Vec3(-0.5, -0.5, 0.5),
    new Vec3(0.5, -0.5, 0.5),

    //Back
    new Vec3(0.5, 0.5, -0.5),
    new Vec3(-0.5, 0.5, -0.5),
    new Vec3(-0.5, -0.5, -0.5),
    new Vec3(0.5, -0.5, -0.5),
  ];

  let faces = [
    //Back
    {
      verts: [4, 5, 6, 7],
      normal: new Vec3(0, 0, -1),
      color: "blue",
      center: new Vec3(0, 0, -0.5),
    },
    // //Bottom
    {
      verts: [4, 0, 1, 5],
      normal: new Vec3(0, 1, 0),
      color: "red",
      center: new Vec3(0, 0.5, 0),
    },
    // //Top
    {
      verts: [7, 3, 2, 6],
      normal: new Vec3(0, -1, 0),
      color: "red",
      center: new Vec3(0, -0.5, 0),
    },
    // //Right
    {
      verts: [4, 0, 3, 7],
      normal: new Vec3(1, 0, 0),
      color: "green",
      center: new Vec3(0.5, 0, 0),
    },
    // //Left
    {
      verts: [5, 1, 2, 6],
      normal: new Vec3(-1, 0, 0),
      color: "green",
      center: new Vec3(-0.5, 0, 0),
    },
    //Front
    {
      verts: [0, 1, 2, 3],
      normal: new Vec3(0, 0, 1),
      color: "blue",
      center: new Vec3(0, 0, 0.5),
    },
  ];

  const m = Mat4.clone(projectViewMatrix);
  const mt = Mat4.fromTranslation(pos.x, pos.y, pos.z);
  const mr = Mat4.fromRotationAxisAngle(rotation, rotation.magnitude());
  const ms = Mat4.fromTranslation(scale.x, scale.y, scale.z);

  m.multiply(mt);
  m.multiply(mr);
  m.multiply(ms);

  // pos && m.translate(pos.x, pos.y, pos.z);
  // rotation && m.rotate(rotation);
  // scale && m.scale(scale.x, scale.y, scale.z);

  verts = verts.map((v) => Vec3.transform(v, m));

  faces = faces.map((face) => {
    return {
      ...face,
      center: Vec3.transform(face.center, m),
      normal: Vec3.transform(face.normal, m),
    };
  });

  faces.sort((faceA, faceB) => {
    const dA = faceA.center.distanceTo(cameraPosition);
    const dB = faceB.center.distanceTo(cameraPosition);
    return dB - dA;
  });

  /**@param {CanvasRenderingContext2D} ctx */
  function render(ctx) {
    faces.forEach((face, i) => {
      ctx.fillStyle = face.color;

      ctx.beginPath();
      face.verts.forEach((pi, j) => {
        const vert = verts[pi];
        if (j == 0) {
          ctx.moveTo(vert.x, vert.y);
        } else {
          ctx.lineTo(vert.x, vert.y);
        }
      });

      ctx.closePath();
      ctx.fill();
    });
  }
  return { verts, faces, render };
}

const w = 24;

const boxexAttr = [...Array(w)].map((_, i) => {
  return {
    d: randInt(1, 3) * 8,
  };
});

const camera_y_rot = new bucket(0.5, { duration: 5000 });
const camera_x_rot = new bucket(0.5, { duration: 5000 });

window.addEventListener("pointerdown", (e) => {
  let controller = new AbortController();

  let rot_y = camera_y_rot.value;
  let rot_x = camera_x_rot.value;

  window.addEventListener(
    "mousemove",
    (e) => {
      rot_y += e.movementY / canvas.height;
      rot_x += e.movementX / canvas.width;

      camera_y_rot.write(rot_x * 1);
      camera_x_rot.write(rot_y * 1);
    },
    { signal: controller.signal }
  );

  window.addEventListener("pointerup", (_) => controller.abort(), { once: true });
});

// let zoom = bucket(1, 10000);
// document.body.addEventListener("wheel", (e) => {
//   const newValue = Math.max(0.25, Math.min(3, zoom.value + e.deltaY / 2000));
//   zoom.set(newValue);
// });

function draw(t = 0) {
  localStorage.setItem("t", t.toString());
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  t /= 1000;

  // const projectionMatrix = Mat4.orthographic(0, canvas.height, canvas.height, 0, 0, 2024);
  // const projectionMatrix = new Mat4();
  // projectionMatrix.project(canvas.width, canvas.height, 2024, zoom.value);

  // const mVec = new Vec3(camera_x_rot.value, camera_y_rot.value, 0)
  //   .scale(2)
  //   .subtract(new Vec3(1, 1, 0))
  //   .scale(Math.PI * 1)
  //   .scale(new Vec3(1, 1, 0));

  // cameraPos = new Vec3(0, 0, 1024);
  // const cameraMatrix = new Mat4();

  // cameraMatrix.rotate(new Vec3(0, -mVec.y, 0));
  // cameraMatrix.rotate(new Vec3(mVec.x, 0, 0));

  // const cameraTranslateM = Mat4.fromTranslation(cameraPos.x, cameraPos.y, cameraPos.z);
  // cameraMatrix.multiply(cameraTranslateM);
  // cameraMatrix.translate(cameraPos.x, cameraPos.y, cameraPos.z);

  // const VIEWMATRIX = cameraMatrix.inverse();
  // const VIEWMATRIX = Mat4.invert(cameraMatrix);

  // projectViewMatrix = Mat4.multiply(projectionMatrix, VIEWMATRIX);

  // let projectViewMatrix = camera.getViewProjectionMatrix();

  // const cm = projectViewMatrix.elements[3];
  // cameraPos = new Vec3(cm[0], cm[1], cameraPos.z);

  let boxes = [];
  for (let x = 0; x < w; x++) {
    const xi = x / w;

    const boxAttr = boxexAttr[x];
    const xStep = 32;

    const b = box(
      new Vec3((-w / 2) * xStep + x * xStep + xStep / 2, 0, 0),
      new Vec3(
        boxAttr.d + 2 ** (1 + 4 * Math.sin(xi * Math.PI * 0.5 + t * 4) * 0.5 + 0.5) * 3,
        (Math.cos(xi * Math.PI * 2 + t) * 0.5 + 0.5) * 128 + 16,
        xStep / 2
      ),
      new Vec3(Math.PI * 1 * (x / (w - 1) + t / 4), Math.PI / 2, 0)
    );

    boxes.push(b);
  }

  boxes.sort((bA, bB) => {
    const bAc = bA.faces
      .reduce((sum, face) => {
        return sum.add(face.center);
      }, new Vec3(0, 0, 0))
      .scale(new Vec3(1 / 6, 1 / 6, 1 / 6))
      .distanceTo(cameraPosition);

    const bBc = bB.faces
      .reduce((sum, face) => {
        return sum.add(face.center);
      }, new Vec3(0, 0, 0))
      .scale(new Vec3(1 / 6, 1 / 6, 1 / 6))
      .distanceTo(cameraPosition);

    return bBc - bAc;
  });

  boxes.forEach((b) => b.render(ctx));
}

requestAnimationFrame(draw);

// let arcballState = createInitialState(window.innerWidth, window.innerHeight);

// canvas.canvas.addEventListener("mousedown", (e) => {
//   arcballState = arcballReducer(arcballState, {
//     type: "MOUSE_DOWN",
//     x: e.clientX,
//     y: e.clientY,
//   });
// });

// canvas.canvas.addEventListener("mousemove", (e) => {
//   if (!arcballState.mouseOn) return;

//   arcballState = arcballReducer(arcballState, {
//     type: "MOUSE_MOVE",
//     x: e.clientX,
//     y: e.clientY,
//   });

//   console.log(getRotationMatrix(arcballState));
// });

// canvas.canvas.addEventListener("mouseup", () => {
//   if (!arcballState.mouseOn) return;

//   arcballState = arcballReducer(arcballState, { type: "MOUSE_UP" });
// });
