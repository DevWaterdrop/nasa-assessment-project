import { TableFooter, TableRow } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { COL_SPAN, ROWS_PER_PAGE } from '../../../constants';
import { PaginationActions } from './PaginationActions';

interface Props {
  page: number;
  count?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Footer: React.FC<Props> = (props) => {
  const { page, count = 0, setPage } = props;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[]}
          colSpan={COL_SPAN}
          count={count}
          rowsPerPage={ROWS_PER_PAGE}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          ActionsComponent={PaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};
