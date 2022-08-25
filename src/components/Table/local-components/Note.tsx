import { Collapse, TableCell, TableRow, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { COL_SPAN } from '../../../constants';

interface Props {
  open: boolean;
  onChange: (value: string) => unknown;
  defaultValue: string | null;
}

const CELL_STYLE: React.CSSProperties = {
  paddingBottom: 0,
  paddingTop: 0,
};
const FIELD_STYLE: React.CSSProperties = {
  width: '100%',
};

export const Note: React.FC<Props> = (props) => {
  const { open, onChange, defaultValue } = props;

  return (
    <TableRow>
      <TableCell style={CELL_STYLE} colSpan={COL_SPAN}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <TextField
              style={FIELD_STYLE}
              label="Note"
              multiline
              rows={2}
              placeholder="Quick note"
              defaultValue={defaultValue}
              onChange={(event) => {
                onChange(event.target.value);
              }}
            />
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
