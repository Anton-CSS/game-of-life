import { getNumberOfLiveAround } from "./getNumberOfLiveAround/getNumberOfLiveAround";

const field = [
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
];

console.log(getNumberOfLiveAround(field, 1, 1));
