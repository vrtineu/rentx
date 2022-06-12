import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  public compareInHours(start_date: Date, end_date: Date): number {
    const start = this.convertToUtc(start_date);
    const end = this.convertToUtc(end_date);

    return dayjs(end).diff(start, 'hours');
  }

  public convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  public dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const start = this.convertToUtc(start_date);
    const end = this.convertToUtc(end_date);

    return dayjs(end).diff(start, 'days');
  }
}

export { DayjsDateProvider };
