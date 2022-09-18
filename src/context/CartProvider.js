import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);

    const addToCart = (item, cantidad) => {
        setCart([...cart] , {item, cantidad})
    }

  return (
    <div>
        <CartContext.Provider value={{cart, addToCart}}>
            {children}
        </CartContext.Provider>
    </div>
  )
}

export default CartProvider