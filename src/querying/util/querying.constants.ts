export const MAX_PAGE_SIZE = 100;
export const MAX_PAGE_NUMBER = 25;

export const DefaultPageSize = {
  USER: 10,
  ORDER: 5,
  CATEGORY: 30,
  PRODUCT: 20,
} as const satisfies Record<string, number>;
