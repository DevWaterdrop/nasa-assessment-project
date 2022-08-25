import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
  value: Date | null;
  handleChange: (value: Date | null) => void;
  minDate?: any;
  maxDate?: any;
  label: string;
}

export const Picker: React.FC<Props> = (props) => {
  const { value, handleChange, minDate, maxDate, label } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        inputFormat="dd/MM/yyyy"
        label={label}
        value={value}
        onChange={(newValue) => {
          handleChange(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} onKeyDown={(e) => e.preventDefault()} />
        )}
        minDate={minDate}
        maxDate={maxDate}
      />
    </LocalizationProvider>
  );
};
