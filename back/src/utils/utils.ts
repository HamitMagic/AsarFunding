export function extractNumbers(str: string): number {
  const matches = str.match(/\d+/);
  return matches ? Number(matches[0]) : 0;
}
