import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useQuery } from 'react-query';
import { NasaAPI } from '../../services/nasa_api';
import { Table } from '../Table';

export const App: React.FC = () => {
  const { data, isFetching } = useQuery(['today'], () => NasaAPI.getToday(), {
    refetchOnWindowFocus: false,
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" marginBottom={2}>
        NASA API
      </Typography>
      <Table data={data} isLoading={isFetching} />
    </Container>
  );
};
