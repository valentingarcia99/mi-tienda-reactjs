import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/Item/ItemListContainer';
import ItemDetailContainer from './components/ItemDetail/ItemDetailContainer';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {


  return (
    <BrowserRouter>
      <header className="App-header">
        <NavBar/>
      </header>
      <Routes>
        <Route path='/' element={<ItemListContainer/>}/>
        <Route path='detail/:id' element={<ItemDetailContainer/>}/>
        <Route path='category/:categoryName' element={<ItemListContainer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
