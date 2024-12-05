import { Session } from '../types';
import { encryptSession, decryptSession } from './crypto';

const SESSION_KEY = 'app_session';

export const setSession = async (session: Session) => {
  try {
    const encryptedSession = await encryptSession(session);
    localStorage.setItem(SESSION_KEY, encryptedSession);
  } catch (error) {
    console.error('Failed to set session:', error);
    throw error;
  }
};

export const getSession = async (): Promise<Session | null> => {
  try {
    const encryptedSession = localStorage.getItem(SESSION_KEY);
    if (!encryptedSession) return null;
    return await decryptSession(encryptedSession);
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
};

export const removeSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const hasRole = async (role: string): Promise<boolean> => {
  const session = await getSession();
  return session?.user.roles.includes(role) || false;
};