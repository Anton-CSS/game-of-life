import drawField from "../drawField/drawField";

export const createGameOfLive = (el, height = 20, width = 20) => {
  const field = Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(0)
  );

  const onCellClick = (x, y, isAlive) => {
    field[y][x] = !isAlive;
    drawField(el, field, onCellClick);
  };
  drawField(el, field, onCellClick);
};
