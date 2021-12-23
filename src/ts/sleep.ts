export const sleep = async (x: number) => {
  const time = new Promise((resolve) => {
    setTimeout(resolve, x);
  });
  console.log(time);
};
