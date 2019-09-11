import { Graphics, utils } from "pixi.js-legacy";

class Square {
  static defaultPosition = { x: 0, y: 0 };
  static defaultScale = { widht: 10, height: 10 };

  constructor(
    scale = Square.defaultScale,
    position = Square.defaultPosition,
    fillColor = "0xff00ff"
  ) {
    this.square = new Graphics();
    this.scale = scale;
    this.position = position;
    this.fillColor = fillColor;

    this.square
      .on("pointerdown", this.onDragStart)
      .on("pointerup", this.onDragEnd)
      .on("pointerupoutside", this.onDragEnd)
      .on("pointermove", this.onDragMove);
  }

  onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  onDragEnd(event) {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  }

  onDragMove(event) {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.position.set(newPosition.x, newPosition.y);
    }
  }

  render() {
    this.square.interactive = true;
    this.square.buttonMode = true;
    this.square.lineStyle(4, 0xff0000, 1);
    this.square.beginFill(this.fillColor);
    this.square.drawRect(0, 0, this.scale.widht, this.scale.height);
    this.square.position.set(this.position.x, this.position.y);
    this.square.endFill();

    return this.square;
  }
}

export default Square;
