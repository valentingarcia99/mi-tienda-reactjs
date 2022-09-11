import { useEffect, useState } from "react"
import ItemDetail from "./ItemDetail"
import data from "./MockData"

const ItemDetailContainer = () => {

  const [productDetail, setProductDetail] = useState([])

  useEffect(() => {
    getProducts.then((response) => {
      setProductDetail(response)
    })
  }, [])
  

  const getProducts = new Promise((resolve)=>{
    setTimeout(() => {
      resolve(data.filter(prod => prod.id === '2'))
    }, 2000);
  }) 
  


  return (
    <ItemDetail lista={productDetail}/>
  )
}

export default ItemDetailContainer