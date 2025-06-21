import type { ValidationOptions, ValidationArguments } from 'class-validator';
import { registerDecorator } from 'class-validator';
import { parse, isValid } from 'date-fns';

export function IsEndTimeAfter(
  startTimeField: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      name: 'isEndTimeAfter',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(endTime, args: ValidationArguments) {
          const startTime = args.object[startTimeField];
          if (!Boolean(startTime) || !Boolean(endTime)) {
            return true;
          }

          const start = parse(startTime, 'HH:mm', new Date());
          const end = parse(endTime, 'HH:mm', new Date());

          return isValid(start) && isValid(end) && end > start;
        },
        defaultMessage() {
          return `Время окончания должно быть позже времени начала`;
        },
      },
    });
  };
}
