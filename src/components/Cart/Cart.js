import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import moment from 'moment';
import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore";

const Cart = () => {

  const navigate = useNavigate();
  const {cart, removeItem, clear} = useContext(CartContext);

  const [order, setOrder] = useState({
    buyer: {
      name: '',
      phone: '',
      email: '',
    },
    items: cart,
    total: cart.reduce((valorPasado, valorActual) => valorPasado + valorActual.price * valorActual.cantidad, 0),
    date: moment().format('DD/MM/YYYY, h:mm:ss a'),
  });

  const db = getFirestore();

    const createOrder = () => {
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
      const queryUpdate = doc(db, 'items', product.id);
      updateDoc(queryUpdate, {
        categoryId: product.categoryId,
        title: product.title,
        image: product.image,
        price: product.price,
        stock: product.stock - product.cantidad,
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

  const handleChange = (e) => {
    setOrder({
      ...order,
      buyer: {
        ...order.buyer,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <div>
        <h1 style={{marginLeft: '10px'}}>Carrito</h1>
        {cart.length === 0 ? (
          <>
            <h3>No hay productos en tu carrito</h3>
            <Link to={'/'} style={{color: 'orange'}}><h4>Volver a comprar</h4></Link>
          </>  
        ) : 
        (cart.map((item) => (
            <div key={item.id} className='CardCart'>
               <h3>{item.title}</h3>
               <img src={item.image} width={'200px'}/>
               <p>Precio: {item.price}</p>
               <p>Cantidad: {item.cantidad}</p>
               <button onClick={() => removeItem(item.id)}>Eliminar producto</button>
            </div>)
        ))}

        {cart.length > 0 && <div style={{marginTop: '25px'}}>

          <div style={{margin: '20px 10px'}}>
            <div>
                <label><b>Nombre </b></label>
                <input name='name' type="text" value={order.buyer.name} onChange={handleChange} required/>
            </div>
            <div>
                <label><b>Telefono </b></label>
                <input name='phone' type="number" value={order.buyer.phone} onChange={handleChange} required/>
            </div>
            <div>
                <label><b>E-mail </b></label>
                <input name='email' type="email" value={order.buyer.email} onChange={handleChange} required/>
            </div>
          </div>

          <Link to={'/'}>
            <button onClick={createOrder} style={{border: 'solid 2px black', borderRadius: '5px', fontSize: '16px', marginLeft: '10px'}}>Finalizar compra</button>
          </Link>
            <button onClick={clear} style={{border: 'solid 2px black', borderRadius: '5px', fontSize: '16px', marginLeft: '5px'}}>Reiniciar</button>

        </div>}     
    </div>
  )
}

export default Cart