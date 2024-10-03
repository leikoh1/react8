import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
      setEmail(data.email);
      await getProfile(); 
    } else {
      alert("Error en el inicio de sesión.");
    }
  };

  const register = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
      setEmail(data.email);
    } else {
      alert("Error en el registro.");
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setProfile(null);
  };

  const getProfile = async () => {
    if (!token) return;
    const response = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    } else {
      alert("Error al obtener el perfil.");
    }
  };

  useEffect(() => {
    getProfile();
  }, [token]); 

  return (
    <UserContext.Provider
      value={{ login, register, logout, email, token, profile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);