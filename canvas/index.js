export class Canvas {
  /**@param {number} [pixelRatio] */
  constructor(pixelRatio = 1) {
    this.canvas = document.createElement("canvas");
    let ctx = this.canvas.getContext("2d");

    if (!ctx) {
      throw new DOMException("2d canvas not supported");
    }

    /**@type {CanvasRenderingContext2D} */
    this.context = ctx;
    this.pixelRatio = pixelRatio;

    window.onresize = (e) => {
      this.resize();
    };
  }

  /**
   * @param {HTMLElement} root
   */
  attach(root) {
    root.appendChild(this.canvas);
    this.resize();
  }

  resize() {
    this.canvas.width = this.canvas.clientWidth * this.pixelRatio;
    this.canvas.height = this.canvas.clientHeight * this.pixelRatio;
  }

  get width() {
    return this.canvas.width;
  }
  get height() {
    return this.canvas.height;
  }
}
