import { Stack } from '@mui/material';
import { intervalToDuration } from 'date-fns';
import { useMemo } from 'react';
import { Picker } from './local-components/Picker';

type SetDate = React.Dispatch<React.SetStateAction<Date | null>>;

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: SetDate;
  setEndDate: SetDate;
}

export const DateRangePicker: React.FC<Props> = (props) => {
  const { startDate, endDate, setStartDate, setEndDate } = props;

  const maxDate = useMemo(() => {
    const dayInMs = 24 * 60 * 60 * 1000;

    if (!startDate) return new Date(0);
    return new Date(startDate.getTime() + 6 * dayInMs);
  }, [startDate]);

  function handleDateChange(type: 'start' | 'end') {
    return (value: Date | null) => {
      if (type === 'start' && value && endDate) {
        const { days } = intervalToDuration({
          start: value,
          end: endDate,
        });

        if (days && days >= 7) setEndDate(null);
      }

      type === 'start' ? setStartDate(value) : setEndDate(value);
    };
  }

  return (
    <Stack direction="row" flexWrap="wrap" gap={2}>
      <Picker
        label="Start date"
        value={startDate}
        handleChange={handleDateChange('start')}
      />
      {startDate && (
        <Picker
          label="End date"
          value={endDate}
          handleChange={handleDateChange('end')}
          minDate={startDate}
          maxDate={maxDate}
        />
      )}
    </Stack>
  );
};
