import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { selectAllGames, fetchGameListAsync } from 'src/redux/slice/gameSlice';
import GameList from 'src/components/GameList/GameList';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function DashboardAppPage() {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const { getAccessTokenSilently } = useAuth0();

  const status = useSelector((state: any) => state.game.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGameListAsync(getAccessTokenSilently) as any);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | ari Admin </title>
      </Helmet>

      <Container maxWidth='xl'>
        <Typography variant='h4' sx={{ mb: 5 }}>
          👋 Hi, Welcome back
        </Typography>
        <GameList games={games || []} />
      </Container>
    </>
  );
}
