export const sleep = async (x) => {
  const time = new Promise((resolve) => {
    setTimeout(resolve, x);
  });
  return time;
};
