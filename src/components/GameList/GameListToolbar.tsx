import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
import { CiSearch } from 'react-icons/ci';
import { FiTrash2 } from 'react-icons/fi';
import { BsFilter } from 'react-icons/bs';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.shadows[11],
  },
  '& fieldset': {
    borderWidth: '1px !important',
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

export default function UserListToolbar({ numSelected, filterName, onFilterName }: any) {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component='div' variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder='Search game...'
          startAdornment={
            <InputAdornment position='start'>
              <CiSearch style={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <FiTrash2 />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <BsFilter />
          </IconButton>
        </Tooltip>
      )} */}
    </StyledRoot>
  );
}
