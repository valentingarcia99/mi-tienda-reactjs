import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "./ItemDetail"
import data from "../Data/MockData"

const ItemDetailContainer = () => {

  const {id} = useParams();

  const [productDetail, setProductDetail] = useState([])

  useEffect(() => {
    getProducts.then((response) => {
      setProductDetail(response)
    })
  }, [])
  

  const getProducts = new Promise((resolve)=>{
    setTimeout(() => {
      resolve(data.filter(prod => prod.id === id))
    }, 100);
  }) 
  


  return (
    <ItemDetail lista={productDetail}/>
  )
}

export default ItemDetailContainer