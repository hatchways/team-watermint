import { FormControl, InputBase, InputLabel, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(2.5),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    border: '1px solid #dbdbdb',
    fontSize: 15.5,
    fontStretch: 'expanded',
    width: '100%',
    padding: '15px',
    fontWeight: 400,
  },
}));

interface FormInputProps {
  label: string;

  defaultValue?: any;
  id: string;
  select?: boolean;
  selectOptions?: Array<{ label: string; value: string }> | undefined;
  selectValue?: string;

  [inputProps: string]: any;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  select,
  selectOptions,
  selectValue,
  defaultValue,
  ...rest
}) => {
  return (
    <FormControl sx={{ width: '100%', marginBottom: 2 }} variant="standard">
      <InputLabel
        sx={{
          color: '#000000',
          fontSize: 17.5,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '1.3px',
        }}
        shrink
        htmlFor={id}
      >
        {label}
      </InputLabel>
      {select && selectOptions && selectOptions.length >= 1 ? (
        <Select value={selectValue} input={<StyledInput />} {...rest}>
          {selectOptions?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <StyledInput defaultValue={defaultValue} id={id} {...rest} />
      )}
    </FormControl>
  );
};

export default FormInput;
