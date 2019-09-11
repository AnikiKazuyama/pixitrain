import { Graphics, utils } from "pixi.js-legacy";

class Square {
  static defaultPosition = { x: 0, y: 0 };
  static defaultScale = { widht: 40, height: 40 };

  constructor(
    scale = Square.defaultScale,
    position = Square.defaultPosition,
    fillColor = "0xff00ff"
  ) {
    this.square = new Graphics();
    this.scale = scale;
    this.sqposition = position;
    this.fillColor = fillColor;

    this.square
      .on("pointerdown", event => this.onDragStart(event))
      .on("pointerup", event => this.onDragEnd(event))
      .on("pointerupoutside", event => this.onDragEnd(event))
      .on("pointermove", event => this.onDragMove(event));
  }

  onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    console.log(event.data);
    this.square.data = event.data;
    this.square.alpha = 0.5;
    this.square.dragging = true;
    // this.dragStartPoint = event.data.getLocalPosition(this.parent);
  }

  onDragEnd(event) {
    this.square.alpha = 1;
    this.square.dragging = false;
    // set the interaction data to null
    this.square.data = null;
    // this.dragStartPoint = event.data.getLocalPosition(this.parent);
  }

  onDragMove(event) {
    if (this.square.dragging) {
      const newPosition = this.square.data.getLocalPosition(this.square.parent);
      this.square.position.x = event.data.global.x;
      this.square.position.y = event.data.global.y;
    }
  }

  render() {
    this.square.interactive = true;
    this.square.buttonMode = true;
    this.square.lineStyle(4, 0xff0000, 1);
    this.square.beginFill(this.fillColor);
    this.square.drawRect(
      this.sqposition.x,
      this.sqposition.y,
      this.scale.widht,
      this.scale.height
    );
    this.square.endFill();

    return this.square;
  }
}

export default Square;
