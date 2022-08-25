import { TableCell, TableHead, TableRow } from '@mui/material';

export const Head: React.FC = () => (
  <TableHead>
    <TableRow>
      <TableCell width="125px">Date</TableCell>
      <TableCell width="200px">Name</TableCell>
      <TableCell>Potential Hazard</TableCell>
      <TableCell>Estimated Diameter (m)</TableCell>
      <TableCell>Miss Distance (km)</TableCell>
      <TableCell>Velocity (km/h)</TableCell>
    </TableRow>
  </TableHead>
);
