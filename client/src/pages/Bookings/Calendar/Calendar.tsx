import { PickersDay, StaticDatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { Request } from '../../../interface/RequestApiData';

interface Props {
  requests: Request[];
}

export default function Calendar({ requests }: Props): JSX.Element {
  const initialDate = new Date();
  const highlightedDays = requests.map((request) => new Date(request.start).toDateString());

  return (
    <StaticDatePicker
      displayStaticWrapperAs="desktop"
      value={initialDate}
      readOnly={true}
      views={['day']}
      showDaysOutsideCurrentMonth={true}
      onChange={() => {
        null;
      }}
      renderInput={(params) => <TextField {...params} />}
      renderDay={(day, _value, DayComponentProps) => {
        if (!day) return <PickersDay {...DayComponentProps} selected={false} />;
        const isSelected = !DayComponentProps.outsideCurrentMonth && highlightedDays.includes(day.toDateString());
        return <PickersDay {...DayComponentProps} selected={isSelected ? true : false} />;
      }}
    />
  );
}
