export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  token: string;
}

const USER_STORAGE_KEY = 'user';
const TEMP_USER_STORAGE_KEY = 'tempUser';

export function getStoredUser(): UserData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: UserData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store user data:', error);
  }
}

export function clearStoredUser(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear user data:', error);
  }
}

export function getToken(): string | null {
  const user = getStoredUser();
  return user?.token || null;
}

export function getTempUser(): Partial<UserData> | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(TEMP_USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setTempUser(user: Partial<UserData>): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(TEMP_USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store temp user data:', error);
  }
}

export function clearTempUser(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(TEMP_USER_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear temp user data:', error);
  }
}

