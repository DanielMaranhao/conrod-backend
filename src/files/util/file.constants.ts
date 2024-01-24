export const BASE_PATH = 'upload';

export const MaxFileCount = {
  PRODUCT_IMAGES: 5,
} as const satisfies Record<string, number>;

export const FilePath = {
  Products: {
    BASE: 'products',
    IMAGES: 'images',
  },
} as const satisfies Record<string, Record<string, string>>;
