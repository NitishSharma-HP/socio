import React, { useState, useContext, createContext, useCallback } from 'react';
import { setToken, getToken, deleteToken, setSessionUser, getSessionUser, deleteSessionUser } from '../auth';

//user context
const UserContext = createContext({
  userToken: null,
  userDetails: null,
  setUserToken: () => {},
  setUserDetails: () => {},
  logout: () => {},
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  // Initialize state from localStorage
  const [userToken, setUserTokenState] = useState(() => getToken());
  const [userDetails, setUserDetailsState] = useState(() => {
    const storedUser = getSessionUser();
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // set user token
  const setUserToken = useCallback((token) => {
    setToken(token);
    setUserTokenState(token);
  }, []);

  // set user details
  const setUserDetails = useCallback((name, email, id, userRole) => {
    setSessionUser(name, email, id, userRole);
    setUserDetailsState({ name, email, id, userRole });
  }, []);

  //free localstorage
  const logout = useCallback(() => {
    deleteToken();
    deleteSessionUser();
    setUserTokenState(null);
    setUserDetailsState(null);
  }, []);

  return (
    <UserContext.Provider value={{ userToken, userDetails, setUserToken, setUserDetails, logout }}>
      {children}
    </UserContext.Provider>
  );
};
