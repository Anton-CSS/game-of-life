export const getNumberOfLiveAround = (field, x, y) => {
  let result = 0;
  if (y - 1 >= 0 && y - 1 < field.length) {
    result += field[y - 1][x - 1] ?? 0;
    result += field[y - 1][x] ?? 0;
    result += field[y - 1][x + 1] ?? 0;
  }
  if (y >= 0 && y < field.length) {
    result += field[y][x - 1] ?? 0;
    result += field[y][x + 1] ?? 0;
  }
  if (y + 1 >= 0 && y + 1 < field.length) {
    result += field[y + 1][x - 1] ?? 0;
    result += field[y + 1][x] ?? 0;
    result += field[y + 1][x + 1] ?? 0;
  }

  return result;
};
