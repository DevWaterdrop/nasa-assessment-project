import { format } from 'date-fns';

export function getFormatToday() {
  return new Date(format(Date.now(), 'yyyy-MM-dd'));
}
