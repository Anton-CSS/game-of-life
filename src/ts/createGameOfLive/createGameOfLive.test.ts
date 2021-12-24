import { createGameOfLive } from "./createGameOfLive";
import { sleep } from "../sleep";

describe("createGameOfLive", () => {
  let el: any;
  const step = 1000;

  beforeEach(() => {
    el = document.createElement("div") as HTMLDivElement;
    createGameOfLive(el, 20, 20, step);
  });

  const clickCell = (x: number, y: number): void => {
    el.querySelector(`.cell[data-y="${y}"][data-x="${x}"]`).click();
  };

  const isCellAlive = (x: number, y: number): boolean =>
    el
      .querySelector(`.cell[data-y="${y}"][data-x="${x}"]`)
      .classList.contains("cell__alive");

  it("createGameOfLive is a function", () => {
    expect(createGameOfLive).toBeInstanceOf(Function);
  });

  it("createGameOfLive renders initial field", () => {
    expect(el.querySelector(".field")).toBeTruthy();
    expect(el.querySelector(".field").querySelectorAll(".cell").length).toBe(
      400
    );
  });

  it("render button (and toggles is state on click)", () => {
    const button = el.querySelector(".btn__switch");
    expect(button).toBeTruthy();
    expect(button.textContent).toBe("start");
    button.click();
    expect(button.textContent).toBe("stop");
  });

  it("changes cell status on cell click", () => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    expect(
      el
        .querySelector(`.cell[data-y="${y}"][data-x="${x}"]`)
        .classList.contains("cell__alive")
    ).toBe(false);
    el.querySelector(`.cell[data-y="${y}"][data-x="${x}"]`).click();
    expect(
      el
        .querySelector(`.cell[data-y="${y}"][data-x="${x}"]`)
        .classList.contains("cell__alive")
    ).toBe(true);
  });

  it("it changes field state over time (runs game loop) and stops it", async () => {
    clickCell(2, 1);
    clickCell(2, 2);
    clickCell(2, 3);

    expect(isCellAlive(2, 1)).toBe(true);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(2, 3)).toBe(true);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(1, 2)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(3, 2)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);

    el.querySelector(".btn__switch").click();

    await sleep(step);

    expect(isCellAlive(1, 2)).toBe(false);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(3, 2)).toBe(false);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(2, 1)).toBe(true);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(2, 3)).toBe(true);
    expect(isCellAlive(3, 3)).toBe(false);

    await sleep(step);

    expect(isCellAlive(2, 1)).toBe(true);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(2, 3)).toBe(true);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(1, 2)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(3, 2)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);

    el.querySelector(".btn__switch").click();

    await sleep(step * 2);
    expect(isCellAlive(2, 1)).toBe(false);
    expect(isCellAlive(2, 2)).toBe(false);
    expect(isCellAlive(2, 3)).toBe(false);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(1, 2)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(3, 2)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);
  });
});
