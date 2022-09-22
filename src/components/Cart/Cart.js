import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

const Cart = () => {

    const {cart, removeItem} = useContext(CartContext);

  return (
    <div>
        <h1>Carrito</h1>
        {cart.length === 0 ? (
          <>
            <h2>No hay productos en tu carrito</h2>
            <Link to={'/'} style={{color: 'black'}}><h2>Volver a comprar</h2></Link>
          </>  
        ) : 
        (cart.map((item) => (
            <div key={item.id}>
               <h3>{item.title}</h3>
               <img src={item.image} width={'200px'}/>
               <p>Precio: {item.price}</p>
               <p>Cantidad: {item.cantidad}</p>
               <button onClick={() => removeItem(item.id)}>Eliminar producto</button>
            </div>)
        ))}
    </div>
  )
}

export default Cart