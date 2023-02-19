interface Props {
  text?: string | number;
  value: number;
  referenceValue: number;
  digits?: number;
}

export const ProfitOrLossText = ({ text, value, referenceValue, digits = 2 }: Props) => {
  let displayText: string;
  if (text) {
    displayText = text.toString();
  } else if (Number.isInteger(value)) {
    displayText = value.toString();
  } else {
    displayText = value.toFixed(digits);
  }
  const color =
    value < referenceValue
      ? "text-red-400 dark:text-red-400"
      : "text-green-600 dark:text-green-400";

  return <span className={`font-bold ${color}`}>{displayText}</span>;
};
