export const extractFromText = (text: string, regex: RegExp) => {
  const matches = text.match(regex);
  const lastIndex = matches.length - 1;
  return matches[lastIndex];
};
