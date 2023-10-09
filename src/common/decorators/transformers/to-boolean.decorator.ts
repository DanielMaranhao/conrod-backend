import { Transform } from 'class-transformer';

const toBoolean = (value: unknown) => {
  switch (value) {
    case null:
      return 'Failure';

    case 'true':
      return true;
    case 'false':
      return false;

    default:
      return value;
  }
};

export const ToBoolean = () => Transform(({ obj, key }) => toBoolean(obj[key]));
