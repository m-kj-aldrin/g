import { Canvas } from "../canvas/index.js";
import { Mat2, Mat4, Vec2, Vec3 } from "../main.js";
import { OrthographicCamera } from "../vec-mat/camera.js";

let canvas = new Canvas();
canvas.attach(document.body);

let zoom = 3;

let ortho = new OrthographicCamera(
  new Vec3(5, 5, 5),
  new Vec3(0, 0, 0),
  -zoom,
  zoom,
  -zoom,
  zoom,
  0.1,
  100,
  canvas.width / canvas.height
);

/**
 * @param {Mat4} view
 * @param {Mat4} projection
 * @param {Mat4} viewport
 * @param {Vec3} worldPoint
 */
function project(view, projection, viewport, worldPoint) {
  let m = Mat4.multiply(viewport, projection, view);
  let projected = worldPoint.multiply(m);
  return new Vec2(projected.x, projected.y);
}

let viewMatrix = ortho.getViewMatrix();
let projectionMatrix = ortho.getProjectionMatrix();
let viewPortMatrix = Mat4.viewport(canvas.width, canvas.height);

let m = Mat4.multiply(viewPortMatrix, projectionMatrix, viewMatrix);

let worldPoint = new Vec3(0, 0, 0);

let screenPoint = project(viewMatrix, projectionMatrix, viewPortMatrix, worldPoint);

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Vec2} point
 */

function render_circle(ctx, point) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// render_circle(canvas.context, screenPoint);

/**
 *
 * @param {Object} o
 * @param {Vec3} [o.p]
 * @param {number} [o.s]
 * @param {Vec3} [o.color]
 * @returns
 */
function square(o) {
  o = {
    p: new Vec3(),
    s: 1,
    color: new Vec3(128, 128, 128),
    ...o,
  };

  let verts = [new Vec3(-1, -1, 0), new Vec3(-1, 1, 0), new Vec3(1, 1, 0), new Vec3(1, -1, 0)];

  let modelMatrix = Mat4.fromTranslation(o.p);

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {OrthographicCamera} camera
   */
  function render(ctx, camera) {
    let projectedVerts = verts.map((v) => {
      return camera.project(v.multiply(modelMatrix).scalarMultiply(o.s), viewPortMatrix);
    });

    // console.log(projectedVerts.join("  "));

    ctx.fillStyle = `rgb(${o.color.x},${o.color.y},${o.color.z})`;
    ctx.beginPath();
    ctx.moveTo(projectedVerts[0].x, projectedVerts[0].y);
    projectedVerts.slice(1).forEach((v) => {
      ctx.lineTo(v.x, v.y);
    });
    ctx.closePath();
    ctx.fill();
  }

  return {
    p: o.p,
    render,
  };
}

let squares = [
  square({ p: new Vec3(0, 0, 1), color: new Vec3(192, 32, 32) }),
  square({ p: new Vec3(0, 0, 0), color: new Vec3(32, 192, 32) }),
  square({ p: new Vec3(0, 0, -1), color: new Vec3(32, 32, 192) }),
];

function render(t = 0) {
  t /= 1000;

  let rotMat = Mat4.fromAxisRotation(new Vec3(0, 1, 0), 0.01);
  ortho.position = ortho.position.multiply(rotMat);

  canvas.context.clearRect(0, 0, canvas.width, canvas.height);

  squares
    .sort((a, b) => b.p.distanceTo(ortho.position) - a.p.distanceTo(ortho.position))
    .forEach((sq) => {
      sq.render(canvas.context, ortho);
    });

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
