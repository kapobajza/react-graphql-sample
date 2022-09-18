import { injectable } from 'tsyringe';
import { DateTime } from 'luxon';

export interface IDateTimeEntity {
  getUTCDate(date?: string): string;
}

@injectable()
export class DateTimeEntity implements IDateTimeEntity {
  getUTCDate(date?: string | undefined): string {
    return (date ? DateTime.fromISO(date) : DateTime.now()).toUTC().toISO();
  }
}
