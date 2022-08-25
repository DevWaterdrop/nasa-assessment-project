import { Stack } from '@mui/material';
import { useMemo } from 'react';
import { Picker } from './local-components/Picker';

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (type: 'start' | 'end', value: Date | null) => unknown;
}

export const DateRangePicker: React.FC<Props> = (props) => {
  const { startDate, endDate, onDateChange } = props;

  const maxDate = useMemo(() => {
    const dayInMs = 24 * 60 * 60 * 1000;

    if (!startDate) return new Date(0);
    return new Date(startDate.getTime() + 6 * dayInMs);
  }, [startDate]);

  function handleDateChange(type: 'start' | 'end') {
    return (value: Date | null) => onDateChange(type, value);
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
