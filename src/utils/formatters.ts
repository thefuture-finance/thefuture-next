import BigNumber from "bignumber.js";

export const capitalize = (str: string): string => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export function extractParts(
  str: String,
  firstCharacters: number,
  lastCharacters: number,
): String {
  if (str.length < firstCharacters + lastCharacters) {
    return "String is too short for the specified lengths.";
  }

  let firstPart = str.slice(0, firstCharacters);

  let lastPart = str.slice(-lastCharacters);

  return `${firstPart}...${lastPart}`;
}

export function countZeroFractionDigits(num: number) {
  const fractionalPart = BigNumber(num).toFixed().split(".")[1];
  if (!fractionalPart) return 0; // Return 0 if there's no fractional part
  let stop = false;
  return fractionalPart.split("").reduce((acc, current) => {
    if (current !== "0" || stop) {
      stop = true;
      return acc;
    }
    acc += 1;
    return acc;
  }, 0);
}

export function roundNumber(
  num: number | any,
  scale: number,
  withZeros: boolean = false,
) {
  if (typeof num !== "number") return null;
  if (withZeros) {
    scale += countZeroFractionDigits(num);
  }
  return BigNumber(
    Math.round((num + Number.EPSILON) * Math.pow(10, scale)) /
      Math.pow(10, scale),
  ).toFixed(scale);
}

export function roundPrice(
  num: number | any,
  thresholdScale: number = 2,
  scale: number = 4,
  threshold: number = 1,
) {
  if (typeof num !== "number") return null;
  const splittedNum = BigNumber(num).toFixed().split(".");
  if (Number(splittedNum[0]) > threshold) {
    return roundNumber(num, thresholdScale);
  }
  return roundNumber(num, scale, true);
}
