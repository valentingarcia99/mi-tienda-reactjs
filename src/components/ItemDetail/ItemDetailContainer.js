import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "./ItemDetail"
import { doc, getFirestore, getDoc } from 'firebase/firestore'

const ItemDetailContainer = () => {

  const {id} = useParams();
  const db = getFirestore();
  
  const [productDetail, setProductDetail] = useState([])

  const getProduct = () => {
    const queryDoc = doc(db, 'items', id)

    getDoc(queryDoc)
      .then((res) => {
        setProductDetail({id: res.id, ...res.data()})
      })
  }
  
  useEffect(() => {
    getProduct();
  }, [])

  return (
    <ItemDetail product={productDetail}/>
  )
}

export default ItemDetailContainer