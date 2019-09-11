import React, { useState, useEffect, useRef } from "react";
import { Square } from "./elements";
import * as PIXI from "pixi.js-legacy";

function App(props) {
  const { backgroundColor } = props;
  const pixiContainer = useRef();
  const [app, setApp] = useState(null);

  const initializeElements = app => {
    for (let i = 0; i < 500; i++) {
      const square = new Square(Square.defaultScale, {
        x: (Math.random() * app.view.width) / 2,
        y: (Math.random() * app.view.height) / 2
      });
      app.stage.addChild(square.render());
    }
  };

  const onDragStart = event => {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  };

  const onDragEnd = event => {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  };

  const onDragMove = event => {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.position.set(newPosition.x, newPosition.y);
    }
  };

  useEffect(() => {
    const { width, height } = props;
    const iniTializedApp = new PIXI.Application({
      width,
      height
    });

    setApp(iniTializedApp);
    initializeElements(iniTializedApp);

    pixiContainer.current.appendChild(iniTializedApp.view);
    pixiContainer.current.addEventListener("wheel", event => {
      const isUp = event.deltaY < 0;
      const newPox = isUp ? 0.2 : -0.2;
      iniTializedApp.stage.scale.set(
        iniTializedApp.stage.scale.x + newPox,
        iniTializedApp.stage.scale.y + newPox
      );
    });
    iniTializedApp.stage
      .on("pointerdown", onDragStart)
      .on("pointerup", onDragEnd)
      .on("pointerupoutside", onDragEnd)
      .on("pointermove", onDragMove);

    return () => iniTializedApp.destroy();
  }, []);

  useEffect(() => {
    if (app) {
      app.renderer.backgroundColor = backgroundColor;
    }
  });

  return <div className="pixi" ref={pixiContainer}></div>;
}

export default App;
