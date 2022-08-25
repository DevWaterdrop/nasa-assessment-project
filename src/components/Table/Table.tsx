import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NasaData } from '../../services/nasa_api';
import { Row } from './local-components/Row';
import { Loading } from './local-components/Loading';
import { Head } from './local-components/Head';

interface Props {
  data?: NasaData;
  isLoading: boolean;
}

const EMPTY_ROW_STYLE: React.CSSProperties = {
  height: 53 * 9,
};

export const Table: React.FC<Props> = (props) => {
  const { data, isLoading } = props;

  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="Near-earth objects table">
        <Head />
        <TableBody>
          {isLoading && <Loading />}
          {data ? (
            data.entries
              .slice(0, 10)
              .map((entry) => <Row key={entry.name} entry={entry} />)
          ) : (
            <TableRow style={EMPTY_ROW_STYLE}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
