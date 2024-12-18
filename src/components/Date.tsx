import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from 'react';

interface DateProps {
  onlyDate: boolean;
  date: Date;
  title: string;
  onChange: (value: Date | null) => void;
  error?: boolean;
  helperText?: string;
  maxDate?: Date;
  minDate?: Date;
  disabled?: boolean;
}

export const ComponentDate = (props: DateProps) => {
  const {
    onlyDate,
    date,
    title,
    onChange,
    error = false,
    helperText,
    maxDate,
    minDate = new Date(), // establece la fecha mínima en hoy por defecto
    disabled,
  } = props;

  const handleTimeChange = (value: Date | null) => {
    if (value) {
      const minutes = value.getMinutes();
      if (minutes % 30 !== 0) {
        const roundedMinutes = Math.round(minutes / 30) * 30;
        value.setMinutes(roundedMinutes);
        onChange(value);
      } else {
        onChange(value);
      }
    } else {
      onChange(null);
    }
  };

  useEffect(() => {
    onChange(date);
  }, [date]);

  return (
    <>
      <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
        {onlyDate ? (
          <DatePicker
            value={dayjs(date)}
            label={title}
            onChange={(v) => handleTimeChange(v ? v.toDate() : null)}
            maxDate={maxDate ? dayjs(maxDate) : undefined}
            minDate={dayjs(minDate).startOf('day')} // establece el mínimo en el inicio del día de hoy
            disabled={disabled}
            slotProps={{
              popper: {
                sx: {
                  zIndex: 9999,
                },
              },
            }}
            sx={{
              display: 'flex',
              padding: '0px',
              margin: '0px',
              '& label.Mui-focused': {
                color: 'black',
              },
              '& label:not(.Mui-focused)': {
                color: 'black',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                height: 'fit-content',
                '& fieldset': { borderColor: '#2F3746' },
                '&:hover fieldset': { borderColor: '#0B815A' },
              },
            }}
          />
        ) : (
          <TimePicker
            ampm={false}
            minTime={dayjs().set('hour', 8).minute(0)}
            maxTime={dayjs().set('hour', 21).minute(0)}
            value={dayjs(date)}
            label={title}
            onChange={(v) => handleTimeChange(v ? v.toDate() : null)}
            minutesStep={30}
            slotProps={{
              popper: {
                sx: {
                  zIndex: 9999,
                },
              },
            }}
            sx={{
              display: 'flex',
              padding: '0px',
              margin: '0px',
              '& label.Mui-focused': {
                color: 'black',
              },
              '& label:not(.Mui-focused)': {
                color: 'black',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                height: 'fit-content',
                '& fieldset': { borderColor: '#2F3746' },
                '&:hover fieldset': { borderColor: '#0B815A' },
              },
            }}
          />
        )}
      </LocalizationProvider>
      {error && (
        <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }}>
          {helperText}
        </Typography>
      )}
    </>
  );
};
