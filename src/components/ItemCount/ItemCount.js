import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

const ItemCount = ({stock, initialState, setInitialState}) => {

  const { clear } = useContext(CartContext);

    const onAdd = () => {
      if (initialState >= stock) {
        alert("Se alcanzó el stock máximo")
      } 
    else {
        setInitialState(initialState + 1)
      }
    }

    const onRemove = () => {
      if (initialState === 1) {
        return;
      } 
        setInitialState(initialState - 1)
    }
    

  return (
    <div><h2>Cantidad:</h2>
        <h3>{initialState}</h3>
        <div>Stock: {stock}</div>
        <button onClick={onAdd}>+</button>
        <button onClick={onRemove}>-</button>
        <button onClick={clear}>Limpiar carrito</button>
    </div>
  )
}

export default ItemCount