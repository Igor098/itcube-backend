import type { ValidationOptions, ValidationArguments } from 'class-validator';
import { registerDecorator } from 'class-validator';
import { parse, isValid } from 'date-fns';

export function IsTime(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      name: 'isTime',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
          if (typeof value !== 'string') {
            return false;
          }
          const parsed = parse(value, 'HH:mm', new Date());
          return isValid(parsed);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} должно быть в формате HH:mm`;
        },
      },
    });
  };
}
