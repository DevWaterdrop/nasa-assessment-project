import { TableCell, TableRow } from '@mui/material';
import { format } from 'date-fns';
import { NasaEntry } from '../../../services/nasa-api';

interface Props {
  entry: NasaEntry;
}

export const Row: React.FC<Props> = (props) => {
  const {
    entry: {
      name,
      time,
      potentialHazard,
      missDistance,
      estimatedDiameter,
      velocity,
    },
  } = props;

  return (
    <TableRow key={name}>
      <TableCell>{format(time, 'dd-MM-yyy hh:mm')}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{String(potentialHazard)}</TableCell>
      <TableCell>{Math.floor(estimatedDiameter)}</TableCell>
      <TableCell>{Math.floor(missDistance) || 'No data'}</TableCell>
      <TableCell>{Math.floor(velocity)}</TableCell>
    </TableRow>
  );
};
