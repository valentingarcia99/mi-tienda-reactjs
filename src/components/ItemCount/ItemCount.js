const ItemCount = ({stock, initialState, setInitialState}) => {

    const onAdd = () => {
      if (initialState >= stock) {
        alert("Se alcanzó el stock máximo")
      } 
    else {
        setInitialState(initialState + 1)
      }
    }

    const onRemove = () => {
      if (initialState === 0) {
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
    </div>
  )
}

export default ItemCount