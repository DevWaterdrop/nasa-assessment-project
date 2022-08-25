import { Button, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { format, intervalToDuration } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useNasaApi } from '../../hooks/use-nasa-api';
import { DateRangePicker } from '../DateRangePicker';
import { Table } from '../Table';

function getFormatToday() {
  return new Date(format(Date.now(), 'yyyy-MM-dd'));
}

export const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(getFormatToday());
  const [endDate, setEndDate] = useState<Date | null>(getFormatToday());
  const [page, setPage] = useState(0);

  const { data, isFetching } = useNasaApi({ startDate, endDate });

  const isToday = useMemo(() => {
    if (!startDate || !endDate) return false;

    const todayInMs = getFormatToday().getTime();
    const startInMs = startDate.getTime();
    const endInMs = endDate.getTime();

    return startInMs === todayInMs && endInMs === todayInMs;
  }, [startDate, endDate]);

  useEffect(() => {
    setPage(0);
  }, [data]);

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

      if (days && days > 6) setEndDate(null);
    }

    type === 'start' ? setStartDate(value) : setEndDate(value);
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" marginBottom={2}>
        NASA API
      </Typography>
      <Stack marginBottom={2} direction="row" flexWrap="wrap" gap={2}>
        <Button
          onClick={handleTodayClick}
          variant="outlined"
          disabled={isToday}
        >
          Today
        </Button>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />
      </Stack>
      <Table data={data} isLoading={isFetching} setPage={setPage} page={page} />
    </Container>
  );
};
