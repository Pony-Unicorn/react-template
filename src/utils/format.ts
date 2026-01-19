// 四舍五入、显示使用，不精确
export const formatDecimal = (value: number, decimalPlaces: number = 4) =>
  parseFloat(value.toFixed(decimalPlaces))

export function formatLargeNumber(num: number): string {
  const units = ['', 'K', 'M', 'B', 'T']
  const order = Math.floor(Math.log10(Math.abs(num)) / 3)

  if (order < 1) return formatDecimal(num, 2).toString()

  const unitNumber = num / Math.pow(10, order * 3)
  return `${formatDecimal(unitNumber, 2)}${units[order]}`
}
