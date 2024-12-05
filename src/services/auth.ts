import { UserManager, UserManagerSettings } from 'oidc-client-ts';
import { setSession, removeSession } from '../utils/session';

const settings: UserManagerSettings = {
  authority: import.meta.env.VITE_IDENTITY_SERVER_URL,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: `${window.location.origin}/callback`,
  response_type: 'code',
  scope: 'openid profile email',
  post_logout_redirect_uri: window.location.origin,
};

const userManager = new UserManager(settings);

export const loginWithSSO = async () => {
  try {
    await userManager.signinRedirect();
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const handleCallback = async () => {
  try {
    const user = await userManager.signinRedirectCallback();
    await setSession({
      token: user.access_token,
      user: {
        id: user.profile.sub,
        roles: user.profile.role || [],
      },
    });
    return user;
  } catch (error) {
    console.error('Callback handling failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await removeSession();
    await userManager.signoutRedirect();
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};