import { LinearProgress, TableCell, TableRow } from '@mui/material';
import { COL_SPAN } from '../../../constants';

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
    <TableCell padding="none" colSpan={COL_SPAN} style={CELL_STYLE}>
      <LinearProgress />
    </TableCell>
  </TableRow>
);
