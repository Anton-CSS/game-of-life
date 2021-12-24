import drawField from "../drawField/drawField";
import { getNextGeneration } from "../getNextGeneration/getNextGeneration";

export const createGameOfLive = (
  el: HTMLElement,
  height = 20,
  width = 20,
  step = 1000
) => {
  let field: any = Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(0)
  );
  const app = document.createElement("div") as HTMLDivElement;

  const onCellClick = (x: number, y: number, isAlive: boolean): void => {
    field[y][x] = !isAlive;
    drawField(app, field, onCellClick);
  };

  const startGame = (): void => {
    field = Array.from({ length: height }).map(() =>
      Array.from({ length: width }).fill(0)
    );
    drawField(app, field, onCellClick);
  };

  app.setAttribute("id", "app");
  el.insertAdjacentElement("afterbegin", app);

  const button = document.createElement("button");
  button.textContent = "start";
  button.classList.add("btn__switch");

  let timerId: any;

  const handlerButton = (speed: number): void => {
    const makeGameStep = () => {
      field = getNextGeneration(field);
      drawField(app, field, onCellClick);
    };
    if (button.textContent === "start") {
      button.textContent = "stop";
      timerId = setInterval(makeGameStep, speed);
    } else {
      button.textContent = "start";
      clearInterval(timerId);
      field = Array.from({ length: height }).map(() =>
        Array.from({ length: width }).fill(0)
      );
      drawField(app, field, onCellClick);
    }
  };
  button.addEventListener("click", () => {
    handlerButton(step);
  });

  const firstInputNum: HTMLInputElement = document.createElement("input");
  const secondInputNum: HTMLInputElement = document.createElement("input");
  const thirdInputRange: HTMLInputElement = document.createElement("input");

  firstInputNum.className = "input__width";
  firstInputNum.setAttribute("type", "number");
  firstInputNum.setAttribute("min", "10");
  firstInputNum.setAttribute("max", "50");
  firstInputNum.setAttribute("step", "1");

  firstInputNum.addEventListener("input", () => {
    width = Number(firstInputNum.value);
    startGame();
  });

  secondInputNum.className = "input__height";
  secondInputNum.setAttribute("type", "number");
  secondInputNum.setAttribute("min", "10");
  secondInputNum.setAttribute("max", "50");
  secondInputNum.setAttribute("step", "1");

  secondInputNum.addEventListener("input", () => {
    height = Number(secondInputNum.value);
    startGame();
  });

  thirdInputRange.className = "input__range";
  thirdInputRange.setAttribute("type", "range");
  thirdInputRange.setAttribute("min", "1");
  thirdInputRange.setAttribute("max", "5");
  thirdInputRange.setAttribute("step", "1");

  thirdInputRange.addEventListener("change", () => {
    step = Number(thirdInputRange.value) * 1000;
  });

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  wrapper.insertAdjacentElement("beforeend", firstInputNum);
  wrapper.insertAdjacentElement("beforeend", secondInputNum);
  el.insertAdjacentElement("beforeend", wrapper);
  el.insertAdjacentElement("beforeend", thirdInputRange);
  el.insertAdjacentElement("beforeend", button);
  drawField(app, field, onCellClick);
};
