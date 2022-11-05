
interface Props {
  text: string | number
  value?: number
  referenceValue: number
}

export const ProfitOrLossText = ({ text, value, referenceValue }: Props) => {
  if (!value) value = typeof text == "number" ? text : parseInt(text);
  const color = value < referenceValue
      ? "text-red-400 dark:text-red-400"
      : "text-green-600 dark:text-green-400";

  return (
    <span
      className={`font-bold ${color}`}
    >
      {text}
    </span>
  );
};
