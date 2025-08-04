// wrap middle
export const wrapMiddle = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;

  const start = text.slice(0, maxLength / 2);
  const end = text.slice(-maxLength / 2);
  return `${start}...${end}`;
};
