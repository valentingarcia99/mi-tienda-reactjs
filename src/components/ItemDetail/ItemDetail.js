import { useState , useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/cartContext"
import Item from "../Item/Item"
import ItemCount from "../ItemCount/ItemCount"

const ItemDetail = ({lista}) => {

  const [initialState, setInitialState] = useState(1);

  const { addToCart } = useContext(CartContext);

  function onAdd (product) {
    addToCart(product, initialState);
  }

    return (
      <div>
        {
            lista.map((product) => (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                <Item
                key={product.id}
                title={product.title} 
                price={product.price} 
                image={product.image} />
                <ItemCount stock={product.stock} initialState={initialState} setInitialState={setInitialState}/>
                <button onClick={() => onAdd(product)}><Link to={'/cart'}>Añadir al carrito</Link></button>
              </div>

            ))
        }
      </div>
    )
  }

export default ItemDetail