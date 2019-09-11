import React, { useState, Fragment } from "react";
import { utils } from "pixi.js-legacy";
import { App as PixiApp } from "./pixi";
import Color from "./helpers/Color";

function App() {
  const [backgroudColor, setBackgroundColor] = useState("black");
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
