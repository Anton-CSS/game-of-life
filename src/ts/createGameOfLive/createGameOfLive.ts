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
    field[y][x] = isAlive ? 0 : 1;
    drawField(app, field, onCellClick);
  };

  app.setAttribute("id", "app");
  el.insertAdjacentElement("afterbegin", app);

  const button = document.createElement("button");
  button.textContent = "start";
  button.classList.add("btn__switch");

  let timerId: number;

  const gameIsOver = (array: number[][]): boolean => {
    const result = array.some((arr) => arr.some((item) => item === 1));
    return result;
  };

  const makeGameStep = () => {
    if (gameIsOver(field)) {
      field = getNextGeneration(field);
      drawField(app, field, onCellClick);
    } else {
      clearInterval(timerId);
      button.textContent = "start";
    }
  };

  const handlerButton = (speed: number): void => {
    if (button.textContent === "start") {
      button.textContent = "stop";
      timerId = window.setInterval(makeGameStep, speed);
    } else {
      button.textContent = "start";
      clearInterval(timerId);
    }
  };

  const haveDrown = () => {
    window.clearInterval(timerId);
    const newField: any = Array.from({ length: height }).map(() =>
      Array.from({ length: width }).fill(0)
    );

    newField.forEach((array: Array<number>, y: number) => {
      array.forEach((item, x) => {
        if (
          (field[y] && field[y][x] === 0) ||
          (field[y] && field[y][x] === 1)
        ) {
          newField[y][x] = field[y][x];
        }
      });
    });

    field = JSON.parse(JSON.stringify(newField));
    drawField(app, field, onCellClick);
    if (button.textContent === "stop") {
      timerId = window.setInterval(makeGameStep, step);
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
  firstInputNum.setAttribute("min", "5");
  firstInputNum.setAttribute("max", "20");
  firstInputNum.setAttribute("step", "1");
  firstInputNum.setAttribute("placeholder", "width from 5 to 20");

  firstInputNum.addEventListener("input", () => {
    width = Number(firstInputNum.value);
    if (width >= 10 && width <= 50) haveDrown();
  });

  secondInputNum.className = "input__height";
  secondInputNum.setAttribute("type", "number");
  secondInputNum.setAttribute("min", "5");
  secondInputNum.setAttribute("max", "20");
  secondInputNum.setAttribute("step", "1");
  secondInputNum.setAttribute("placeholder", "height from 5 to 20");

  secondInputNum.addEventListener("input", () => {
    height = Number(secondInputNum.value);
    if (height >= 5 && height <= 20) haveDrown();
  });

  thirdInputRange.className = "input__range";
  thirdInputRange.setAttribute("type", "range");
  thirdInputRange.setAttribute("min", "0.5");
  thirdInputRange.setAttribute("max", "2");
  thirdInputRange.setAttribute("step", "0.5");
  thirdInputRange.value = "1";

  thirdInputRange.addEventListener("change", () => {
    step = Number(thirdInputRange.value) * 1000;
    haveDrown();
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
