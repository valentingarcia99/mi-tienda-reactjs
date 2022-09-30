import { useState , useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/cartContext"
import Item from "../Item/Item"
import ItemCount from "../ItemCount/ItemCount"

const ItemDetail = ({product}) => {

  const [initialState, setInitialState] = useState(0);

  const { addToCart } = useContext(CartContext);

  function onAdd (product) {
    addToCart(product, initialState);
  }

    return (
              <div className="Card" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Item
                key={product.id}
                title={product.title} 
                price={product.price} 
                image={product.image} />
                <ItemCount stock={product.stock} initialState={initialState} setInitialState={setInitialState}/>
                {initialState > 0 && <button onClick={() => onAdd(product)}><Link to={'/cart'}>Añadir al carrito</Link></button>}
              </div>
            )
  }

export default ItemDetail