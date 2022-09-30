import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { useContext } from "react";
import './NavBar.css'

const NavBar = () => {

    const { cart } = useContext(CartContext);

    return (
        <div className="NavBar">
            <h1><b><Link to={'/'}>Night Market</Link></b></h1>
            <CartWidget />
            <ul className="listaNavBar">
                <li><Link to={'category/Pistol'}>Pistols</Link></li>
                <li><Link to={'category/Rifle'}>Rifles</Link></li>
            </ul>
            <div className='cartIcon'>
                {cart.length > 0 && <p className='totalItem'>{cart.length}</p>}
                <img src='https://cdn-icons-png.flaticon.com/512/2543/2543193.png' height={'50px'}/>
            </div>
        </div>
    )
};

export default NavBar;