import { useState } from "react"

const ItemCount = (props) => {
    const [initialState, setInitialState] = useState(0)

    const suma = () => initialState < props.stock ? setInitialState(initialState + 1) : alert("Se alcanzó el stock máximo")

    const resta = () => initialState > 0 ? setInitialState(initialState - 1) : alert("Error")

  return (
    <div>Productos
        <h3>{initialState}</h3>
        <div>Stock {props.stock}</div>
        <button onClick={suma}>+</button>
        <button onClick={resta}>-</button>
    </div>
  )
}

export default ItemCount