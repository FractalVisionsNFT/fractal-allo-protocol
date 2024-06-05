export function formatDecimalNumber(
  value: number,
  decimals = 18,
  decPlaces = 4,
  withK = true
) {
  const dec_number = 10 ** decimals;
  const decimalValue = (value / dec_number).toFixed(decPlaces);
  const convertedValue = Number(decimalValue);

  return convertedValue;
}
