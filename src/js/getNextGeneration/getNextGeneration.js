import { getNumberOfLiveAround } from "../getNumberOfLiveAround/getNumberOfLiveAround";
import getNextCellState from "../getNextCellState/getNextCellState";

export const getNextGeneration = (field) => {
  const result = JSON.parse(JSON.stringify(field));
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      const neighbors = getNumberOfLiveAround(field, x, y);
      const state = field[y][x] !== 0;
      const nextState = getNextCellState(state, neighbors);
      result[y][x] = nextState ? 1 : 0;
    }
  }
  return result;
};
