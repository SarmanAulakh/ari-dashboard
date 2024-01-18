import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';

interface Props {
  disabledLink?: boolean;
  sx?: any;
}

const Logo = ({ disabledLink = false, sx}: Props) => {
  const logo = (
    <Box
      component="img"
      src="/assets/logo.png"
      sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
};

export default Logo;