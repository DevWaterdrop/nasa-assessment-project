import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNasaApi } from '../../hooks/use-nasa-api';
import { getFormatToday } from '../../utils/get-format-today';
import { Control } from '../Control';
import { Table } from '../Table';

export const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(getFormatToday());
  const [endDate, setEndDate] = useState<Date | null>(getFormatToday());
  const [page, setPage] = useState(0);

  const { data, isFetching } = useNasaApi({ startDate, endDate });

  useEffect(() => {
    setPage(0);
  }, [data]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" marginBottom={2}>
        NASA API
      </Typography>
      <Control
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <Table data={data} isLoading={isFetching} setPage={setPage} page={page} />
    </Container>
  );
};
