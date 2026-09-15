export const extractFromText = (text: string, regex: RegExp) => {
  const match = text.match(regex);
  if (!match) {
    throw new Error(`Text "${text}" does not match regex "${regex}"`);
  }

  return match[0];
};
