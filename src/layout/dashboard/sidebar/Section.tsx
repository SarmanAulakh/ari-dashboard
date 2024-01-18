import React from 'react';
import { NavLink as NavLinkBase } from 'react-router-dom';
import { Box, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Item {
  title: string;
  path: string;
  icon: React.ReactElement;
}

interface SectionProps {
  data: Item[];
  [key: string]: any;
}

export default function Section({ data = [], ...other }: SectionProps) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map(({ title, path, icon }) => (
          <StyledNavItem
            key={title}
            component={NavLinkBase}
            to={path}
            sx={{
              '&.active': {
                color: 'text.primary',
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightBold',
              },
            }}
          >
            <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
            <ListItemText disableTypography primary={title} />
          </StyledNavItem>
        ))}
      </List>
    </Box>
  );
}

/* <ListItemButton disableGutters {...props} />) */

const StyledNavItem = styled(ListItemButton)<{
  component: React.ElementType
  to: string
}>(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// const NavLink = React.forwardRef<any, any>((props, ref) => (
//   <NavLinkBase
//     ref={ref}
//     to={props.to}
//     className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
//   >
//     {props.children}
//   </NavLinkBase>
// ));