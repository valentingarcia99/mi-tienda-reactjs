import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';



function App() {


  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <main className="Body">
        <ItemListContainer stock={10}/>
      </main>
    </div>
  );
}

export default App;
