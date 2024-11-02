import { Canvas } from "../canvas/index.js";
import { Mat4, Vec2, Vec3 } from "../main.js";
import { OrthographicCamera } from "../vec-mat/camera.js";

let canvas = new Canvas();
canvas.attach(document.body);

let zoom = 1;

let ortho = new OrthographicCamera(
  new Vec3(0, 0, 10),
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

console.log(screenPoint.toString());

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
 * @param {Vec3} p
 * @param {number} s
 * @returns
 */
function square(p, s) {
  let verts = [new Vec3(-1, -1, 0), new Vec3(-1, 1, 0), new Vec3(1, 1, 0), new Vec3(1, -1, 0)];

  let modelMatrix = Mat4.fromTranslation(p);

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {(v:Vec3)=>Vec2} projector
   */
  function render(ctx, projector) {
    let projectedVerts = verts.map((v) => projector(v.multiply(modelMatrix).scalarMultiply(s)));

    // console.log(projectedVerts.join("  "));

    ctx.beginPath();
    ctx.moveTo(projectedVerts[0].x, projectedVerts[0].y);
    projectedVerts.slice(1).forEach((v) => {
      ctx.lineTo(v.x, v.y);
    });
    ctx.closePath();
    ctx.fill();
  }

  return {
    render,
  };
}

let sq0 = square(new Vec3(0, 0, 0), 0.5);

// let projector = (v, p, w) => () =>
//     project(v, p, w)(viewMatrix, projectionMatrix, viewPortMatrix, worldPoint);

sq0.render(canvas.context, (v) => project(viewMatrix, projectionMatrix, viewPortMatrix, v));
