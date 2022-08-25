import { LinearProgress, TableCell, TableRow } from '@mui/material';

interface Props {
  colSpan: number;
}

const ROW_STYLE: React.CSSProperties = {
  position: 'relative',
};
const CELL_STYLE: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  left: 0,
  top: 0,
};

export const Loading: React.FC<Props> = (props) => {
  const { colSpan } = props;

  return (
    <TableRow style={ROW_STYLE}>
      <TableCell padding="none" colSpan={colSpan} style={CELL_STYLE}>
        <LinearProgress />
      </TableCell>
    </TableRow>
  );
};
