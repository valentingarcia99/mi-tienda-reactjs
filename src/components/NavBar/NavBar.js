import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="NavBar">
            <h1><b><Link to={'/'}>Night Market</Link></b></h1>
            <CartWidget />
            <ul className="listaNavBar">
                <li><Link to={'category/Pistol'}>Pistols</Link></li>
                <li><Link to={'category/Rifle'}>Rifles</Link></li>
            </ul>
        </div>
    )
};

export default NavBar;