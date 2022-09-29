import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import moment from 'moment';
import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore";

const Cart = () => {

  const navigate = useNavigate();

  const [order, setOrder] = useState({
    buyer: {
      name: 'Carlos',
      phone: '1120531737',
      email: 'mail@gmail.com'
    },
    items: [],
    total: 0,
    date: '',
  });

  const {cart, removeItem, clear} = useContext(CartContext);
  const db = getFirestore();

    const createOrder = () => {

      setOrder(() => {
        return {
          ...cart,
          items: cart,
          total: cart.reduce((valorPasado, valorActual) => valorPasado + valorActual.price * valorActual.cantidad, 0),
          date: moment().format('DD/MM/YYYY, h:mm:ss a')
        }
      })
        const query = collection(db, 'favorites')
        addDoc(query, order)
          .then(({id}) => {
          console.log(id);
          updateStock();
          alert('Felicidades por tu compra!');
          })
          .catch(() => alert('Tu compra no pudo ser realizada, intentalo más tarde'))
    }

  const updateStock = () => {
    cart.forEach((product) => {
      const queryUpdate = doc(db, 'favorites', product.id);
      updateDoc(queryUpdate, {
        categoryId: product.categoryId,
        title: product.title,
        image: product.image,
        price: product.price,
        stock: product.stock - product.quantity,
      })
        .then(() => {
          if (cart[cart.length - 1].id === product.id) {
            clear();
            navigate('/')
          }
        })
        .catch(() => {
          console.log('Error al actualizar el stock');
        })
    })
  }

  return (
    <div>
        <h1>Carrito</h1>
        {cart.length === 0 ? (
          <>
            <h3>No hay productos en tu carrito</h3>
            <Link to={'/'} style={{color: 'orange'}}><h4>Volver a comprar</h4></Link>
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

        {cart.length > 0 && <div style={{marginTop: '25px'}}>
         <Link to={'/'}><button onClick={createOrder} 
          style={{border: 'solid 2px red', borderRadius: '5px', fontSize: '12px'}}>Finalizar compra</button></Link> 
         <button onClick={clear} 
          style={{border: 'solid 2px red', borderRadius: '5px', fontSize: '12px'}}>Reiniciar</button>
        </div>}
    </div>
  )
}

export default Cart