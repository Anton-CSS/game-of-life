export default function getNextCellState(state: boolean, neighbors: number) {
  if (state === false && neighbors === 3) {
    return true;
  }
  return state === true && (neighbors === 2 || neighbors === 3);
}
