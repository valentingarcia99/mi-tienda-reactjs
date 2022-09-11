import CartWidget from './CartWidget';

const NavBar = () => {
    return (
        <div className="NavBar">
            <h1><b>Tienda</b></h1>
            <CartWidget />
            <ul className="listaNavBar">
                <li>Productos</li>
                <li>Contacto</li>
            </ul>
        </div>
    )
};

export default NavBar;