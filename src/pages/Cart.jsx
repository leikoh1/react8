import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Cart = () => {
  const { cart, incrementar, decrementar, removerPizza, calcularTotal } =
    useCart(); 
  const { token } = useUser(); 
  const [mensajeExito, setMensajeExito] = useState(""); 
  const [error, setError] = useState(""); 

  const pagar = async () => {
    setMensajeExito(""); 
    setError(""); 
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(
          `Error al realizar el pago: ${
            errorData.message || response.statusText
          }`
        );
      }

      
      const data = await response.json();
      setMensajeExito("Compra realizada con éxito!"); 
    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <div className="container my-5">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((pizza) => (
            <div
              key={pizza.id}
              className="card mb-3"
              style={{ maxWidth: "540px" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={pizza.img}
                    className="img-fluid rounded-start"
                    alt={pizza.name}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{pizza.name}</h5>
                    <p className="card-text">Precio: ${pizza.price}</p>
                    <p className="card-text">Cantidad: {pizza.quantity}</p>
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => incrementar(pizza.id)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => decrementar(pizza.id)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removerPizza(pizza.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <h3>Total: ${calcularTotal()}</h3>

          {}
          {mensajeExito && (
            <div className="alert alert-success">{mensajeExito}</div>
          )}

          {}
          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn btn-primary" onClick={pagar} disabled={!token}>
            Pagar
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;