import React, { useState, useEffect, Fragment } from "react";
import { utils } from "pixi.js-legacy";
import { App as PixiApp } from "./pixi";
import Color from "./helpers/Color";

function App() {
  const [backgroudColor, setBackgroundColor] = useState("black");
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", event => console.log(event));
  });
  return (
    <Fragment>
      <PixiApp width={640} height={640} backgroundColor={backgroudColor} />
      <button
        onClick={() =>
          setBackgroundColor(utils.string2hex(Color.getRandomColor()))
        }
      >
        Change background color
      </button>
    </Fragment>
  );
}

export default App;
