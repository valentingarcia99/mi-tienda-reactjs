import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import data from "../Data/MockData"
import ItemList from "./ItemList"

const ItemListContainer = () => {

  const { categoryName } = useParams();

  const [productList, setProductList] = useState([])

  useEffect (() => {
    if(categoryName){
        const response = data.filter((prod) => prod.category === categoryName);
        setProductList(response);
    }else{
        getProducts.then((response) => {
            setProductList(response);
        })
    }        
},[categoryName])



  const getProducts = new Promise((resolve, reject) => { 
    setTimeout(() => {
        resolve(data);
    }, 100);
});


  return (
    <div className="Body">
    <Link to="/cart">Carrito</Link>
    <ItemList lista={productList}/>
    </div>
  )
}

export default ItemListContainer