import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { bgBlur } from 'src/utils/cssStyles';
import { RiMenu2Fill } from 'react-icons/ri';

import AccountPopover from './AccountPopover';

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => {
  const bg = bgBlur({ color: theme.palette.background.default });

  return {
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    },
    backdropFilter: bg.backdropFilter,
    WebkitBackdropFilter: bg.WebkitBackdropFilter,
    backgroundColor: bg.backgroundColor,
  }
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

interface Props {
  onOpenNav: () => void;
}

export default function Header({ onOpenNav }: Props) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <RiMenu2Fill />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction='row'
          alignItems='center'
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
