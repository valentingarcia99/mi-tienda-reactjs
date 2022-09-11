import { useEffect, useState } from "react"
import ItemCount from "./ItemCount"
import data from "./MockData"
import ItemList from "./ItemList"

const ItemListContainer = () => {

  const [productList, setProductList] = useState([])

  useEffect (()=>{
    getProducts.then((response)=>{
      setProductList(response);
    })
  },[])


  const getProducts =  new Promise(()=>{
      setTimeout(() => {
        setProductList(data);
      }, 2000);
    });
  
  const stock = 8

  return (
    <>
    <ItemList lista={productList}/>
    <ItemCount stock={stock}/>
    </>
  )
}

export default ItemListContainer