import React from "react";
import logo from "../assets/img/pizza.jpg";

const Header = () => {
  const headerStyle = {
    backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "300px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
  };

  return (
    <div style={headerStyle}>
      <h1>Pizzería Mamma Mia!</h1>
      <p>Tenemos las mejores pizzas que podrás encontrar</p>
    </div>
  );
};

export default Header;