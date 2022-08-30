import CartWidget from './CartWidget';

const NavBar = () => {
    return (
        <div className="NavBar">
            <h1><b>Tienda</b></h1>
            <CartWidget />
            <ul className="listaNavBar">
                <li><a href="">Productos</a></li>
                <li><a href="">Contacto</a></li>
            </ul>
        </div>
    )
};

export default NavBar;