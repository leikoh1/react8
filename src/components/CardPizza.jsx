import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CardPizza = ({
  id,
  img,
  name,
  ingredients,
  price,
  desc,
  showMoreButton = true,
}) => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const añadirAlCarrito = () => {
    const pizzaExistente = cart.find((pizza) => pizza.id === id);

    if (pizzaExistente) {
      setCart(
        cart.map((pizza) =>
          pizza.id === id ? { ...pizza, quantity: pizza.quantity + 1 } : pizza
        )
      );
    } else {
      setCart([...cart, { id, name, price, img, quantity: 1 }]);
    }
  };

  const verDetallesPizza = () => {
    navigate(`/pizza/${id}`);
  };

  return (
    <>
      <div className="card mx-2 my-3 mt-5">
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title fw-light mb-3 fw-bold">{name}</h5>
          <p className="card-text mb-3">{desc}</p>

          <h6 className="fw-light fw-semibold">Ingredientes 🍕</h6>
          <ul className="list-group">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="list-group-item">
                {ingredient}
              </li>
            ))}
          </ul>

          <hr />

          <ul className="list-group list-group-flush text-right">
            <li className="list-group-item ms-auto fw-light">
              <span className="h5 fw-bold green ms-3">Precio: ${price}</span>
            </li>
          </ul>

          <div className="d-flex justify-content-between mt-3">
            {showMoreButton && (
              <button
                className="btn btn-outline-secondary"
                onClick={verDetallesPizza}
              >
                Ver más 👀
              </button>
            )}

            <button className="btn btn-dark" onClick={añadirAlCarrito}>
              Añadir 🛒
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPizza;