import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NasaData } from '../../services/nasa-api';
import { Row } from './local-components/Row';
import { Loading } from './local-components/Loading';
import { Head } from './local-components/Head';
import { Footer } from './local-components/Footer';

interface Props {
  data?: NasaData;
  isLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ROWS_PER_PAGE = 10;

const EMPTY_ROW_STYLE: React.CSSProperties = {
  height: 53 * ROWS_PER_PAGE,
};

export const Table: React.FC<Props> = (props) => {
  const { data, isLoading, page, setPage } = props;

  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="Near-earth objects table">
        <Head />
        <TableBody>
          {isLoading && <Loading />}
          {data ? (
            data.entries
              .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
              .map((entry) => <Row key={entry.name} entry={entry} />)
          ) : (
            <TableRow style={EMPTY_ROW_STYLE}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <Footer
          count={data?.count}
          page={page}
          setPage={setPage}
          rowsPerPage={ROWS_PER_PAGE}
        />
      </MuiTable>
    </TableContainer>
  );
};
