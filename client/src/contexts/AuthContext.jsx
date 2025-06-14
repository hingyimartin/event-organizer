import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // Friss token kérés
      const tokenResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/refresh`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!tokenResponse.ok) {
        setUser(null);
        setLoading(false);
        return;
      }

      const tokenData = await tokenResponse.json();
      setAccessToken(tokenData.accessToken);

      // User lekérés új access tokennel
      const userResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/me`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${tokenData.accessToken}`,
          },
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('User fetch error', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (creadentials) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creadentials),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return data.message;
    }
    setUser(data.user);
    setAccessToken(data.accessToken);
  };

  const logout = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/logout`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );
    const data = await response.json();

    setUser(null);
    setAccessToken(null);

    if (response.ok) {
      return data.message;
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
