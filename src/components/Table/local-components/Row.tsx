import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import { format } from 'date-fns';
import { NasaEntry } from '../../../services/nasa-api';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useRef, useState } from 'react';
import { Note } from './Note';
import debounce from 'lodash.debounce';
import { NasaLocalStorage } from '../../../services/nasa-local-storage';

interface Props {
  entry: NasaEntry;
  colSpan: number;
  defaultNoteValue: string | null;
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
    colSpan,
    defaultNoteValue,
  } = props;

  const [open, setOpen] = useState(!!defaultNoteValue);
  const [note, setNote] = useState(defaultNoteValue);
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    if (debounceRef.current) debounceRef.current.cancel();

    debounceRef.current = debounce(async () => {
      NasaLocalStorage.changeNote(note, name);
    }, 300);

    debounceRef.current();
  }, [note]);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>{format(time, 'dd-MM-yyy hh:mm')}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{String(potentialHazard)}</TableCell>
        <TableCell>{Math.floor(estimatedDiameter)}</TableCell>
        <TableCell>{Math.floor(missDistance) || 'No data'}</TableCell>
        <TableCell>{Math.floor(velocity)}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <Note
        open={open}
        colSpan={colSpan}
        onChange={setNote}
        defaultValue={defaultNoteValue}
      />
    </>
  );
};
