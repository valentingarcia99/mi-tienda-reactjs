import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/Item/ItemListContainer';
import ItemDetailContainer from './components/ItemDetail/ItemDetailContainer';
import { CartProvider } from './context/CartProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart/Cart';


function App() {


  return (
    <CartProvider value={[]}>
      <BrowserRouter>
        <header className="App-header">
          <NavBar/>
        </header>
        <Routes>
          <Route path='/' element={<ItemListContainer/>}/>
          <Route path='detail/:id' element={<ItemDetailContainer/>}/>
          <Route path='category/:categoryName' element={<ItemListContainer/>}/>
          <Route path='cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
