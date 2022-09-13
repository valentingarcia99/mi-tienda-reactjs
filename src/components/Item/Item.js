import './Item.css'

const Item = ({title, price, image}) => {
  return (
    <div className='Card'>
        <img width={'200px'} height={'75px'} src={image} alt={title}/>
        <h2>{title}</h2>
        <h3>${price}</h3>
    </div>
  )
}

export default Item