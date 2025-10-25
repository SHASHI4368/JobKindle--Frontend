export const separateThousandsByComma = (num: number | string): string => {
  // Handle null, undefined, or empty string
  if (num === null || num === undefined || num === "") {
    return "";
  }

  // Convert to number if it's a string
  const numValue = typeof num === "string" ? parseFloat(num) : num;

  // Handle NaN
  if (isNaN(numValue)) {
    return "";
  }

  // Handle zero
  if (numValue === 0) {
    return "0";
  }

  // Split into integer and decimal parts
  const parts = numValue.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return with decimal part if it exists
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};
