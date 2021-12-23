import drawField from "../drawField/drawField";
import { getNextGeneration } from "../getNextGeneration/getNextGeneration";

export const createGameOfLive = (
  el: HTMLElement,
  height: number = 20,
  width: number = 20,
  steep: number = 1000
) => {
  let field: any = Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(0)
  );
  const app = document.createElement("div") as HTMLDivElement;

  const onCellClick = (x: number, y: number, isAlive: boolean): void => {
    field[y][x] = !isAlive;
    drawField(app, field, onCellClick);
  };

  app.setAttribute("id", "app");
  el.insertAdjacentElement("afterbegin", app);

  const button = document.createElement("button");
  button.textContent = "start";
  button.classList.add("btn__switch");
  let timerId: any;

  button.addEventListener("click", () => {
    const makeGameStep = () => {
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
