import { LinearProgress, TableCell, TableRow } from '@mui/material';

const ROW_STYLE: React.CSSProperties = {
  position: 'relative',
};

const CELL_STYLE: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  left: 0,
  top: 0,
};

export const Loading: React.FC = () => (
  <TableRow style={ROW_STYLE}>
    <TableCell padding="none" colSpan={6} style={CELL_STYLE}>
      <LinearProgress />
    </TableCell>
  </TableRow>
);
