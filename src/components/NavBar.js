import logo from '../logo.svg'

const NavBar = () => {
    return (
        <div className="NavBar">
            <h1><b>Tienda</b></h1>
            <img src={logo} className="App-logo" alt="logo" />
            <ul className="listaNavBar">
                <li><a href="">Productos</a></li>
                <li><a href="">Contacto</a></li>
            </ul>
        </div>
    )
};

export default NavBar;