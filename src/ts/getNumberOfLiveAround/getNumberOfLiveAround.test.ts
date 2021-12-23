import { getNumberOfLiveAround } from "./getNumberOfLiveAround";

describe("getNumberOfLiveAround", () => {
  const field: number[][] = [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ];

  test("getNumberOfLiveAround is Function", () => {
    expect(getNumberOfLiveAround).toBeInstanceOf(Function);
    expect(getNumberOfLiveAround).toBeDefined();
    expect(getNumberOfLiveAround).toBeTruthy();
  });

  test("getNumberOfLiveAround return number", () => {
    expect(typeof getNumberOfLiveAround(field, 1, 2)).toBe("number");
  });

  test("return valid number for coordinates inside field", () => {
    expect(getNumberOfLiveAround(field, 1, 1)).toBe(6);
    expect(getNumberOfLiveAround(field, 2, 1)).toBe(5);
    expect(getNumberOfLiveAround(field, 1, 2)).toBe(6);
    expect(getNumberOfLiveAround(field, 2, 2)).toBe(6);
  });

  test("return valid number for field border", () => {
    expect(getNumberOfLiveAround(field, 0, 0)).toBe(1);
    expect(getNumberOfLiveAround(field, 0, 1)).toBe(3);
    expect(getNumberOfLiveAround(field, 0, 2)).toBe(3);
    expect(getNumberOfLiveAround(field, 0, 3)).toBe(3);
    expect(getNumberOfLiveAround(field, 1, 0)).toBe(2);
    expect(getNumberOfLiveAround(field, 2, 0)).toBe(2);
    expect(getNumberOfLiveAround(field, 3, 0)).toBe(2);
    expect(getNumberOfLiveAround(field, 3, 1)).toBe(4);
    expect(getNumberOfLiveAround(field, 3, 2)).toBe(4);
    expect(getNumberOfLiveAround(field, 3, 3)).toBe(3);
  });

  test("return valid number for field outside", () => {
    expect(getNumberOfLiveAround(field, -1, -1)).toBe(0);
    expect(getNumberOfLiveAround(field, -1, 2)).toBe(2);
    expect(getNumberOfLiveAround(field, -1, 3)).toBe(2);
    expect(getNumberOfLiveAround(field, -1, 4)).toBe(1);
    expect(getNumberOfLiveAround(field, -1, 5)).toBe(0);
    expect(getNumberOfLiveAround(field, 4, 4)).toBe(1);
  });
});
