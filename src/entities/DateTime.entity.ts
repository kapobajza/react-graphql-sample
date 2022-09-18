import { injectable } from 'tsyringe';
import { DateTime } from 'luxon';

export interface IDateTimeEntity {
  getUTCDate(date?: string): string;
}

@injectable()
export class DateTimeEntity implements IDateTimeEntity {
  getUTCDate(date?: string | undefined): string {
    return DateTime.now().toUTC().toISO();
  }
}
