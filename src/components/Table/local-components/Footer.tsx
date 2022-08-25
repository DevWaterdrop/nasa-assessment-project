import { TableFooter, TableRow } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { PaginationActions } from './PaginationActions';

interface Props {
  page: number;
  colSpan: number;
  rowsPerPage?: number;
  count?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Footer: React.FC<Props> = (props) => {
  const { page, count = 0, rowsPerPage = 10, colSpan, setPage } = props;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[]}
          colSpan={colSpan}
          count={count}
          rowsPerPage={rowsPerPage}
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
