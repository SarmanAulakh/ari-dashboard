import { useAuth0 } from '@auth0/auth0-react';
import { Box, CircularProgress } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from 'src/theme';
import { token } from 'src/utils/token';
import DashboardLayout from './layout/dashboard';
import DashboardAppPage from './pages/Dashboard';
import Page404 from './pages/Page404';
import { ProtectedRoute } from './router/ProtectedRoute';

export default function App() {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  token.setAccessTokenSilently(getAccessTokenSilently);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider>
      <Routes>
        <Route path='/' element={<ProtectedRoute component={DashboardLayout} />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/callback" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardAppPage />} />
          <Route path='/dashboard/:gameId' element={<>Game ID</>} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </ThemeProvider>
  );
}
