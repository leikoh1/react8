import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { contador } from "../utils/contador";

const Navbar = () => {
  const { calcularTotal } = useCart();
  const total = calcularTotal();
  const { token, logout } = useUser(); 

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black text-white">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Pizzería Mamma Mia
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  🍕 Home
                </Link>
              </li>
              {token ? ( 
                <>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link active">
                      👤 Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link active btn btn-link"
                      onClick={logout} 
                    >
                      🔓 Logout
                    </button>
                  </li>
                </>
              ) : ( 
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link active">
                      🔐 Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link active">
                      🔐 Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <Link to="/cart" className="nav-link">
              🛒 Total: ${contador(total)} {}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;