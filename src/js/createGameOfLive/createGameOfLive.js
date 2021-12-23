import drawField from "../drawField/drawField";
import { getNextGeneration } from "../getNextGeneration/getNextGeneration";

export const createGameOfLive = (el, height = 20, width = 20, steep = 1000) => {
  let field = Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(0)
  );
  const app = document.createElement("div");

  const onCellClick = (x, y, isAlive) => {
    field[y][x] = !isAlive;
    drawField(app, field, onCellClick);
  };

  app.setAttribute("id", "app");
  el.insertAdjacentElement("afterbegin", app);

  const button = document.createElement("button");
  button.textContent = "start";
  button.classList.add("btn__switch");
  let timerId;

  button.addEventListener("click", () => {
    const makeGameStep = () => {
      console.log("step");
      field = getNextGeneration(field);
      drawField(app, field, onCellClick);
    };
    if (button.textContent === "start") {
      button.textContent = "stop";
      timerId = setInterval(makeGameStep, steep);
    } else {
      button.textContent = "start";
      clearInterval(timerId);
    }
  });

  el.insertAdjacentElement("beforeend", button);

  drawField(app, field, onCellClick);
};
