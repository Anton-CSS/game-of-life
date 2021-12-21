import { createGameOfLive } from "./createGameOfLive";

describe("createGameOfLive", () => {
  let el;
  beforeEach(() => {
    el = document.createElement("div");
    createGameOfLive(el);
  });

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
    const button = el.querySelector("button");
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
});
