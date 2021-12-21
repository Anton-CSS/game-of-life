export default function getNextCellState(state, neighbors) {
  if (state === false && neighbors === 3) {
    return true;
  }
  return state === true && (neighbors === 2 || neighbors === 3);
}
