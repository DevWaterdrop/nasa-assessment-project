import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { intervalToDuration } from 'date-fns';
import { useMemo } from 'react';
import { getFormatToday } from '../../utils/get-format-today';
import { DateRangePicker } from '../DateRangePicker';

type SetDate = React.Dispatch<React.SetStateAction<Date | null>>;

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: SetDate;
  setEndDate: SetDate;
}

export const Control: React.FC<Props> = (props) => {
  const { startDate, endDate, setStartDate, setEndDate } = props;

  const isToday = useMemo(() => {
    if (!startDate || !endDate) return false;

    const todayInMs = getFormatToday().getTime();
    const startInMs = startDate.getTime();
    const endInMs = endDate.getTime();

    return startInMs === todayInMs && endInMs === todayInMs;
  }, [startDate, endDate]);

  function handleTodayClick() {
    const today = getFormatToday();

    setStartDate(today);
    setEndDate(today);
  }

  function handleDateChange(type: 'start' | 'end', value: Date | null) {
    if (type === 'start' && value && endDate) {
      // Limitation of API – if difference more than 6 days => 400 error
      const { days } = intervalToDuration({
        start: value,
        end: endDate,
      });

      if (days && days > 6) setEndDate(value);
    }

    type === 'start' ? setStartDate(value) : setEndDate(value);
  }

  return (
    <Stack marginBottom={2} direction="row" flexWrap="wrap" gap={2}>
      <Button onClick={handleTodayClick} variant="outlined" disabled={isToday}>
        Today
      </Button>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
      />
    </Stack>
  );
};
