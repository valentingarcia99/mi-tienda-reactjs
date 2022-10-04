import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import moment from 'moment';
import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2'

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

  const totalPrice = cart.reduce((valorPasado, valorActual) => valorPasado + valorActual.price * valorActual.cantidad, 0)

  const db = getFirestore();

    const createOrder = () => {
        const query = collection(db, 'favorites')
        addDoc(query, order)
          .then(({id}) => {
            console.log(id);
            updateStock();
            Swal.fire({
              color: 'white',
              title: '¡Gracias por tu compra!',
              text: 'Precio total: ' + totalPrice,
              imageUrl: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltc04e4637524166dc/621853fd6be1e66143a66db2/022822_TakeoverCap_Banner.jpg',
              background: 'url(https://t3.ftcdn.net/jpg/04/87/78/10/360_F_487781018_t38p12Uw2cKx2caLRFxEliUDhjPOhy68.jpg)',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
            })
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
    <div className="Body">
        <h1 style={{marginLeft: '10px'}}>Carrito</h1>

        <div className="CartBody">  
          {cart.length === 0 ? (
            <>
              <h3 style={{marginLeft: '10px'}}>No hay productos en tu carrito</h3>
              <Link to={'/'} style={{color: 'white'}}><h4 style={{marginLeft: '10px'}}>Volver a comprar</h4></Link>
            </>  
          ) :
          (cart.map((item) => (
              <div key={item.id} className='CardCart'>
                <h3>{item.title}</h3>
                <img src={item.image} width={'200px'} height={'85px'}/>
                <p>Precio: ${item.price}</p>
                <p>Cantidad: {item.cantidad}</p>
                <button onClick={() => removeItem(item.id)}>Eliminar producto</button>
              </div>)
          ))}
        </div>
        
        {cart.length > 0 && <div style={{margin: '25px 10px'}}>

          <strong>Precio total: ${totalPrice}</strong>

          <div style={{margin: '20px 0px'}}>
            <div>
                <label>Nombre</label>
                <input name='name' type="text" value={order.buyer.name} onChange={handleChange} placeholder="Introduzca su nombre" required/>
            </div>
            <div>
                <label>Telefono</label>
                <input name='phone' type="number" value={order.buyer.phone} onChange={handleChange} placeholder="Introduzca su teléfono" required/>
            </div>
            <div>
                <label>E-mail</label>
                <input name='email' type="email" value={order.buyer.email} onChange={handleChange} placeholder="Introduzca su e-mail" required/>
            </div>
          </div>

          <Link to={'/'}>
          <button onClick={createOrder} style={{border: 'solid 2px black', borderRadius: '5px', fontSize: '16px'}}>Finalizar compra</button>
          </Link>
          <button onClick={clear} style={{border: 'solid 2px black', borderRadius: '5px', fontSize: '16px'}}>Reiniciar</button>

        </div>}     
    </div>
  )
}

export default Cart