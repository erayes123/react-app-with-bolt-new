import { Session } from '../types';

const ENCRYPTION_KEY = 'session-encryption-key';
const IV_LENGTH = 12;
const SALT_LENGTH = 16;

async function getKey(salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(ENCRYPTION_KEY),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptSession(session: Session): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await getKey(salt);
  
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encoder.encode(JSON.stringify(session))
  );

  const encryptedArray = new Uint8Array(encrypted);
  const resultArray = new Uint8Array(salt.length + iv.length + encryptedArray.length);
  resultArray.set(salt, 0);
  resultArray.set(iv, salt.length);
  resultArray.set(encryptedArray, salt.length + iv.length);

  return btoa(String.fromCharCode(...resultArray));
}

export async function decryptSession(encryptedData: string): Promise<Session | null> {
  try {
    const decoder = new TextDecoder();
    const encryptedArray = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    );

    const salt = encryptedArray.slice(0, SALT_LENGTH);
    const iv = encryptedArray.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const data = encryptedArray.slice(SALT_LENGTH + IV_LENGTH);
    
    const key = await getKey(salt);
    
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      data
    );

    return JSON.parse(decoder.decode(decrypted));
  } catch (error) {
    console.error('Failed to decrypt session:', error);
    return null;
  }
}