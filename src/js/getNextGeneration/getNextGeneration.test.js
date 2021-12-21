import { getNextGeneration } from "./getNextGeneration";

describe("getNextGeneration", () => {
  it("getNextGeneration is function", () => {
    expect(getNextGeneration).toBeInstanceOf(Function);
  });
  it("returns newState", () => {
    expect(
      getNextGeneration([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ])
    ).toEqual([
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ]);
  });
  it("square always is alive", () => {
    expect(
      getNextGeneration([
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ])
    ).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]);
  });
  it("periodic figure always is alive", () => {
    expect(
      getNextGeneration([
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ])
    ).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it("returns completely new state", () => {
    const oldState = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const newState = getNextGeneration(oldState);
    expect(newState).not.toBe(oldState);
    expect(newState[0] !== oldState[0]).toBe(true);
    expect(newState[1] !== oldState[1]).toBe(true);
  });
});
