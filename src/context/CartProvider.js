import { useState } from 'react';
import { CartContext } from './cartContext';

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item, cantidad) => {

        if (isInCart(item.id)) {
            alert('Ya está en el carrito')
        } else {
            setCart([...cart , {...item, cantidad}])
            console.log('cart', [...cart , {...item, cantidad}]);
        }
    }

    const isInCart = (id) => {
        return cart.some ((item) => item.id === id)
    }

    const clear = () => {
       setCart([])
    }

    return (
        <CartContext.Provider value={{cart, addToCart, clear}}>
            {children}
        </CartContext.Provider>
    )
}