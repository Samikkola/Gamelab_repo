
//LocalSotoragen käyttöön liittyvät funktiot
// Käyttäjätiedot tallennetaan localStorageen kirjautumisen jälkeen
export interface AuthUser {
    id: number;
    email: string;
    username: string;
  }
  
  const USER_KEY = "user";
  
  export const setUser = (user: AuthUser) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };
  
  export const getUser = (): AuthUser | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  };
  
  export const clearUser = () => {
    localStorage.removeItem(USER_KEY);
  };
  
  export const isLoggedIn = (): boolean => {
    const user = getUser();
    return !!(user && user.id && user.username);
  };