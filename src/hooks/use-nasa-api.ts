import { useQuery } from 'react-query';
import { NasaAPI } from '../services/nasa-api';

interface Props {
  startDate: Date | null;
  endDate: Date | null;
}

const QUERY_OPTIONS = {
  keepPreviousData: true,
  refetchOnWindowFocus: false,
};

export const useNasaApi = (props: Props) => {
  const { startDate, endDate } = props;

  const { data, isFetching } = useQuery(
    [startDate, endDate],
    ({ signal }) => NasaAPI.getByDate({ signal, startDate, endDate }),
    QUERY_OPTIONS
  );

  return { data, isFetching };
};
