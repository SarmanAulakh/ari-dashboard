import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Box, CircularProgress } from '@mui/material';
import React, { ComponentType } from 'react';

interface ProtectedRouteProps {
  component: ComponentType;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    ),
  });

  return <Component />;
};
