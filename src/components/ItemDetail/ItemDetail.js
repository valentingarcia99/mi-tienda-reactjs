import { useState , useContext } from "react"
import Item from "../Item/Item"
import ItemCount from "../ItemCount/ItemCount"
import { Link } from "react-router-dom"

const ItemDetail = ({lista}) => {

  const [initialState, setInitialState] = useState(0);

  const handleClick = () => {
    console.log(initialState);
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
                {initialState < 1 && <ItemCount stock={product.stock} initialState={initialState} setInitialState={setInitialState}/>}
                <button onClick={handleClick}><Link to={'/cart'}>Finalizar mi compra</Link></button>
              </div>

            ))
        }
      </div>
    )
  }

export default ItemDetail