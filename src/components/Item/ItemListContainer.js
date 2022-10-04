import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemList from "./ItemList"
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore'

const ItemListContainer = () => {

  const { categoryName } = useParams();

  const [productList, setProductList] = useState([])

  const getProducts = () => {
    const db = getFirestore();
    const querySnapshot = collection(db, 'items')

    if (categoryName) {
      const queryFilter = query(querySnapshot, where('categoryId', '==', categoryName));

      getDocs(queryFilter).then((response) => {
        const data = response.docs.map((product) => {
          return {id: product.id, ...product.data()};
        })
        setProductList(data)
        })

    } else {

      getDocs(querySnapshot).then((response) => {
        const data = response.docs.map((product) => {
          return {id: product.id, ...product.data()};
        })
        setProductList(data)
        })
      }
      
  }

  useEffect (() => {
    getProducts()    
  },[categoryName])

  return (
    <div className="Body">
    <ItemList lista={productList}/>
    </div>
  )
}

export default ItemListContainer