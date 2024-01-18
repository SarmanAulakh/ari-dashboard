import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found | ari Admin </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant='h3' paragraph>
            Sorry, page not found!
          </Typography>

          <Typography mb={4} sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Button to='/dashboard' size='large' variant='contained' component={RouterLink}>
            Go to Dashboard
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
