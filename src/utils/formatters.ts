import BigNumber from "bignumber.js";

export const capitalize = (str: string): string => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export function extractParts(
  str: String,
  firstCharacters: number,
  lastCharacters: number,
): String {
  if (str?.length < firstCharacters + lastCharacters) {
    return null;
  }

  let firstPart = str?.slice(0, firstCharacters);

  let lastPart = str?.slice(-lastCharacters);

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

export function isSmaller(
  value: number | null,
  threshold: number,
  roundFactor: number | null = null,
): string {
  if (typeof value !== "number") return "0";
  if (roundFactor != null) {
    value = Number(roundNumber(value, roundFactor));
  }
  if (value >= threshold) return value.toString();
  return `< ${threshold}`;
}

export function nFormatter(num: number | string, digits: number) {
  num = Number(num);
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
}
