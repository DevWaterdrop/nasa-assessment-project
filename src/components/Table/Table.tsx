import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NasaData, NasaEntry } from '../../services/nasa-api';
import { Row } from './local-components/Row';
import { Loading } from './local-components/Loading';
import { Head } from './local-components/Head';
import { Footer } from './local-components/Footer';
import { NasaLocalStorage } from '../../services/nasa-local-storage';
import { COL_SPAN, ROWS_PER_PAGE } from '../../constants';

interface Props {
  data?: NasaData;
  entries?: NasaEntry[];
  isLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const EMPTY_ROW_STYLE: React.CSSProperties = {
  height: 53 * ROWS_PER_PAGE,
};

export const Table: React.FC<Props> = (props) => {
  const { data, entries, isLoading, page, setPage } = props;

  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="Near-earth objects table">
        <Head />
        <TableBody>
          {isLoading && <Loading />}
          {entries ? (
            entries.map((entry) => (
              <Row
                key={entry.name}
                entry={entry}
                defaultNoteValue={NasaLocalStorage.getNoteByName(entry.name)}
              />
            ))
          ) : (
            <TableRow style={EMPTY_ROW_STYLE}>
              <TableCell colSpan={COL_SPAN} />
            </TableRow>
          )}
        </TableBody>
        <Footer count={data?.count} page={page} setPage={setPage} />
      </MuiTable>
    </TableContainer>
  );
};
