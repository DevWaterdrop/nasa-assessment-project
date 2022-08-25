import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import { ROWS_PER_PAGE } from '../../constants';
import { useNasaApi } from '../../hooks/use-nasa-api';
import { getFormatToday } from '../../utils/get-format-today';
import { BarChart } from '../BarChart';
import { Control } from '../Control';
import { Table } from '../Table';

export const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(getFormatToday());
  const [endDate, setEndDate] = useState<Date | null>(getFormatToday());
  const [page, setPage] = useState(0);

  const { data, isFetching } = useNasaApi({ startDate, endDate });

  const slicedEntries = useMemo(() => {
    return data?.entries.slice(
      page * ROWS_PER_PAGE,
      page * ROWS_PER_PAGE + ROWS_PER_PAGE
    );
  }, [page, data]);

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
      <Table
        data={data}
        isLoading={isFetching}
        setPage={setPage}
        page={page}
        entries={slicedEntries}
      />
      {slicedEntries && (
        <Box marginTop={5}>
          <Typography variant="h4" component="h2">
            Bar Chart
          </Typography>
          <BarChart entries={slicedEntries} />
        </Box>
      )}
    </Container>
  );
};
