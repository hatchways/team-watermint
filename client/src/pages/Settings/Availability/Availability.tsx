import React, { useState } from 'react';
import { theme } from '../../../themes/theme';
import useStyles from './useStyles';
import {
  Box,
  Typography,
  InputLabel,
  Select,
  Button,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
  InputBase,
} from '@mui/material';
import { Star, Settings, List, CalendarToday, ContentCopy, Add, Delete, DateRangeRounded } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface AvailabilityProps {
  header: string;
}

const InputStyles = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: 'none',
    color: '#0088ff',
    fontSize: 17,
    padding: '5px 26px 5px 0px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 13,
    },
  },
}));

const weekSchedule = [
  { day: 'Sun', id: 0, checked: false },
  { day: 'Mon', id: 1, checked: false },
  { day: 'Tue', id: 2, checked: false },
  { day: 'Wed', id: 3, checked: false },
  { day: 'Thr', id: 4, checked: false },
  { day: 'Fri', id: 5, checked: false },
  { day: 'Sat', id: 6, checked: false },
];

const Availability: React.FC<AvailabilityProps> = () => {
  const [checkbox, setCheckbox] = useState(weekSchedule);

  const handleClick = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) => {
    const newWeekSchedule = [...checkbox];
    newWeekSchedule[i].checked = !newWeekSchedule[i].checked;
    setCheckbox(newWeekSchedule);
  };

  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          pb: 2,
          [theme.breakpoints.down('lg')]: {
            pb: 1,
          },
        }}
      >
        <Button
          sx={{
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            backgroundColor: '#ffffff',
            color: '#000000',
            fontSize: '1.1rem',
            padding: '10px 20px 10px 20px',
            textTransform: 'none',
            transform: 'scale(1.0, 0.85)',
            borderRadius: '10px',
            [theme.breakpoints.down('lg')]: {
              fontSize: '1rem',
              padding: '8px 14px 8px 14px',
              transform: 'scale(1.0, 0.80)',
              borderRadius: '7px',
            },
            '&:hover': {
              backgroundColor: '#ffffff',
            },
          }}
        >
          <DateRangeRounded /> Working Hours
        </Button>
        <Button
          sx={{
            color: '#000000',
            fontSize: '0.95rem',
            border: '1px solid #000000',
            fontWeight: '400',
            padding: '12px 24px 12px 24px',
            textTransform: 'none',
            transform: 'scale(1.0, 0.85)',
            borderRadius: '60px',
            marginLeft: '1rem',
            [theme.breakpoints.down('lg')]: {
              fontSize: '0.90rem',
              padding: '8px 14px 8px 14px',
              transform: 'scale(1.0, 0.85)',
              borderRadius: '40px',
            },
            '&:hover': {
              backgroundColor: '#ffffff',
            },
          }}
        >
          <Add />
          New Schedule
        </Button>
      </Box>
      <Box
        sx={{
          margin: '0 auto',
          borderRadius: '10px',
          boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        }}
      >
        <Box style={{ borderBottom: '1px solid #c9c9c9' }} p={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box mt="2px" ml="7px">
              <Typography
                variant="h5"
                color="inherit"
                lineHeight="95%"
                sx={{ transform: 'scale(1.1, 0.9)' }}
                component="div"
                fontWeight="700"
              >
                Working hours
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                variant="body2"
                sx={{ transform: 'scale(1.1, 0.9)' }}
                fontSize="15px"
                fontWeight="300"
                component="div"
              >
                <Star fontSize="medium" sx={{ color: '#dbb42c', mr: '4px' }} />
                default schedule
              </Typography>
            </Box>
            <Settings fontSize="medium" sx={{ color: '#757677' }} />
          </Box>
          <Box mt={3.5}>
            <Grid container>
              <Grid item lg={1.5} xl={1.5}>
                <InputLabel
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: 14,
                    fontWeight: 500,
                    transform: 'scale(1.1, 0.9)',
                    mb: 2,
                    [theme.breakpoints.between('lg', 'xl')]: {
                      fontSize: 12.5,
                    },
                    [theme.breakpoints.down('lg')]: {
                      fontSize: 11.5,
                    },
                  }}
                  id="event-type"
                >
                  Active on
                </InputLabel>
                <Select labelId="event-type" id="event-type-id" defaultValue={1} input={<InputStyles />}>
                  <MenuItem value={1}>1 Event Type</MenuItem>
                  <MenuItem value={2}>2 Event Type</MenuItem>
                  <MenuItem value={3}>3 Event Type</MenuItem>
                </Select>
              </Grid>
              <Grid item lg={1} xl={1} />
              <Grid item lg={1.5} xl={1.5}>
                <InputLabel
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: 14,
                    fontWeight: 500,
                    transform: 'scale(1.1, 0.9)',
                    mb: 2,
                    [theme.breakpoints.between('lg', 'xl')]: {
                      fontSize: 12.5,
                    },
                    [theme.breakpoints.down('lg')]: {
                      fontSize: 11.5,
                    },
                  }}
                  id="timezone"
                >
                  Time Zone
                </InputLabel>
                <Select labelId="timezone" id="timezone-id" defaultValue={1} input={<InputStyles />}>
                  <MenuItem value={1}>Pacific Time - US & Canada</MenuItem>
                  <MenuItem value={2}>Eastern Time - US & Canada</MenuItem>
                  <MenuItem value={3}>Central Time - US & Canada</MenuItem>
                </Select>
              </Grid>
              <Grid item lg={3} xl={3} />
              <Grid
                item
                lg={5}
                xl={5}
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                sx={{
                  backgroundColor: '#e9e9e9',
                  borderRadius: '5px',
                  height: '40px',
                  marginTop: 2,
                  [theme.breakpoints.down('lg')]: {
                    textAlign: 'left',
                    marginTop: 2,
                    minwidth: '60%',
                  },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    height: '35px',
                    color: '#000000',
                    width: '37%',
                    backgroundColor: '#ffffff',
                    [theme.breakpoints.down('lg')]: {
                      width: '40%',
                      minWidth: '7.0rem',
                    },
                    '&:hover': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                >
                  <List fontSize="small" />
                  <Typography
                    sx={{
                      textTransform: 'none',
                      fontSize: '12.9px',
                      ml: '4px',
                      pt: '2px',
                      transform: 'scale(1.0, 0.9)',
                      [theme.breakpoints.down('xl')]: {
                        fontSize: '12.8px',
                      },
                    }}
                  >
                    List view
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: 'white',
                    fontSize: '14px',
                    height: '35px',
                    color: '#000000',
                    width: '59%',
                    [theme.breakpoints.down('lg')]: {
                      width: '50%',
                      minWidth: '8.8rem',
                    },
                  }}
                  disabled
                >
                  <CalendarToday fontSize="small" />
                  <Typography
                    sx={{
                      textTransform: 'none',
                      fontSize: '12.9px',
                      ml: '4px',
                      pt: '2px',
                      transform: 'scale(1.0, 0.9)',
                    }}
                  >
                    Calendar view
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Grid container>
            <Grid
              item
              xs={12}
              lg={7.5}
              sx={{
                borderRight: '1px solid #c9c9c9',
                p: 3,
                [theme.breakpoints.between('md', 'xl')]: {
                  p: 2,
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  transform: 'scale(1.0, 0.9)',
                  [theme.breakpoints.between('lg', 'xl')]: {
                    fontSize: 14,
                  },
                }}
              >
                Set your weekly hours
              </Typography>

              {checkbox.map((day, i) => (
                <Grid
                  key={i}
                  container
                  style={{ borderBottom: '1px solid #dddddd' }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  pt={1.2}
                  pb={1.2}
                >
                  <Grid item xs={2.2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={checkbox[i].checked}
                          disableRipple
                          onClick={(e) => handleClick(e, i)}
                          color="info"
                          size="small"
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          fontSize="16px"
                          sx={{
                            fontWeight: '700',
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            transform: 'scale(1.0, 0.9)',
                            [theme.breakpoints.between('lg', 'xl')]: {
                              fontSize: '13.5px',
                            },
                          }}
                        >
                          {day.day}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={1} />
                  {day.checked ? (
                    <Grid item xs={7.4} display="flex" alignItems="center" justifyContent="left">
                      <InputBase id="startTime" className={classes.inputBase} placeholder="09:00" />
                      <span>-</span>
                      <InputBase id="endTime" className={classes.inputBase} sx={{ ml: 1 }} placeholder="17:00" />
                      <Delete fontSize="medium" style={{ color: 'grey' }} />
                    </Grid>
                  ) : (
                    <Grid item xs={7.4} display="flex" pt={2.6} pb={2.6} alignItems="center" justifyContent="left">
                      <Typography style={{ color: '#636363', fontSize: '15px' }}>Unavailable</Typography>
                    </Grid>
                  )}
                  <Grid item xs={1}>
                    <Add fontSize="medium" style={{ color: 'grey' }} />
                  </Grid>
                  <Grid item xs={0.4}>
                    <ContentCopy fontSize="small" style={{ color: 'grey' }} />
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              lg={4.5}
              sx={{
                p: 3,
                [theme.breakpoints.down('xl')]: {
                  p: 1.5,
                  textAlign: 'center',
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  transform: 'scale(1.0, 0.9)',
                  [theme.breakpoints.between('lg', 'xl')]: {
                    fontSize: 14,
                  },
                  [theme.breakpoints.down('lg')]: {
                    fontSize: 15,
                  },
                }}
              >
                Add date overrides
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#888888',
                  fontSize: '15px',
                  fontWeight: '300',
                  marginTop: '12px',
                  [theme.breakpoints.between('lg', 'xl')]: {
                    fontSize: '12.5px',
                  },
                  [theme.breakpoints.down('lg')]: {
                    fontSize: 15,
                  },
                }}
                component="div"
              >
                Add dates when your availability changes from your weekly hours
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: '#0088ff',
                  width: '90%',
                  marginLeft: '14px',
                  marginTop: '14px',
                  border: '1px solid #0088ff',
                  fontSize: '15px',
                  transform: 'scale(1.1, 0.8)',
                  fontWeight: '300',
                  textTransform: 'none',
                  borderRadius: '1.7rem',
                  [theme.breakpoints.between('lg', 'xl')]: {
                    fontSize: '13px',
                    transform: 'scale(1.0, 0.9)',
                  },
                  [theme.breakpoints.down('lg')]: {
                    fontSize: 15,
                    width: '50%',
                    mb: 1,
                  },
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    border: '2px solid #046ac4',
                    color: '#046ac4',
                  },
                }}
              >
                Add a date override
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Availability;
