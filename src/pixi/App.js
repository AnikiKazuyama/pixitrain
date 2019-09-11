import React, { useState, useEffect, useRef } from "react";
import { Square } from "./elements";
import * as PIXI from "pixi.js-legacy";

function App(props) {
  const { backgroundColor } = props;
  const pixiContainer = useRef();
  const [app, setApp] = useState(null);

  const initializeElements = app => {
    for (let i = 0; i < 10; i++) {
      const square = new Square(Square.defaultScale, {
        x: Math.random() * app.screen.width,
        y: Math.random() * app.screen.height
      });
      app.stage.addChild(square.render());
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
