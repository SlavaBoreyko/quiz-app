export const calcResultPoints = (
  answersArr: number[],
  value: number,
  sumPoints: number | undefined,
) => {
  // sumPoints has to calculate when add addTest from Admin
  if (sumPoints) {
    const resultPoints = Math.round(
      (100 *
        (answersArr.reduce((partialSum, a) => partialSum + a, 0) + value)) /
        sumPoints,
    );
    return resultPoints;
  } else return 0;
};
