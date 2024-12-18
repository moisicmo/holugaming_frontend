import { Slider, Typography } from '@mui/material';

interface Props {
  label: string;
  value: number[];
  handleSelect: (value: number[]) => void;
  error?: boolean;
  helperText?: string;
}
export const RangeComponent = (props: Props) => {
  const { label, value, handleSelect, error, helperText } = props;

  const handleChange2 = (_: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;
    handleSelect(newValue as number[]);
  };

  const marks = Array.from({ length: 15 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  return (
    <div style={{paddingLeft:'10px'}}>
      {label}
      <Slider value={value} onChange={handleChange2} step={1} min={1} max={15} marks={marks} />
      {error && (
        <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }}>
          {helperText}
        </Typography>
      )}
    </div>
  );
};
