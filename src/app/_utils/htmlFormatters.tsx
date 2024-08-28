import { zeroFormatter } from "@/utils/formatters";

export function zeroFormatterHtml(num: number | string, threshold: number) {
  if (typeof num !== "number" && typeof num !== "string") return null;
  const formattedNum = zeroFormatter(num, threshold);
  if (formattedNum.overZeroDigit == 0)
    return formattedNum.num.toLocaleString("en-GB");
  return (
    <>
      0.0
      <sub>{formattedNum.overZeroDigit}</sub>
      {formattedNum.num}
    </>
  );
}
