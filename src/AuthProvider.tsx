import { Auth0Provider } from '@auth0/auth0-react';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={redirectUri}>
      {children}
    </Auth0Provider>
  );
};