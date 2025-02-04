export const extractFromText = (text: string, regex: RegExp) =>
  text.match(regex)[0];
