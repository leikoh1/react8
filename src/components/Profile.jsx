import React from "react";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { email, logout } = useUser();

  return (
    <div className="container my-5">
      <h2>Perfil de Usuario</h2>
      <p>Email: {email}</p>
      <button className="btn btn-danger" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;