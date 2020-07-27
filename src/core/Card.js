import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage'
import moment, { updateLocale } from 'moment';
import {addItem, updateItem, removeItem} from './cartHelpers'

const Card = ( ({
    product, 
    showViewProductButtom = true, 
    showAddToCartButton = true,
    cartUpdate = false, 
    showRemoveProductButton = false,
    setRun = f => f, // default value of function
    run = undefined // default value of undefined
}) => {

    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

const showViewButton = (showViewProductButtom) => {
    return(
        showViewProductButtom && (
            <Link to={`/product/${product._id}`} className="mr-2">
                <button className="btn btn-outline-primary mt-2 mb-2">
                    View Product
                 </button>
            </Link>

        )
    )
}

const shouldRedirect = redirect => {
    if(redirect){
        return <Redirect to='/cart'></Redirect>
    }
}

const addToCart = () => {
    addItem(product, () => {
        setRedirect(true)
    })
}

  const showAddToCart = (showAddToCartButton) => {
      return(
        showAddToCartButton && 
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
            Add to Cart
        </button>
      )
  }

  const showRemoveButton = showRemoveProductButton => {
    return(
        showRemoveProductButton && 
      <button onClick={() => {removeItem(product._id);  setRun(!run);}} className="btn btn-outline-danger mt-2 mb-2">
          Remove Product
      </button>
    )
}

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if(event.target.value >= 1){
        updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = cartUpdate => {
      return cartUpdate && 
      <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input 
                type="number" 
                className="form-control" 
                value={count} 
                onChange={handleChange(product._id)}>
            </input>
          </div>
      </div>
  }

  const showStock = (quantity) => {
    return quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> : 
                          <span className="badge badge-primary badge-pill">Out of Stock</span>
  }

    return (
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                <p className ="lead mt-2" >{product.description.substring(0,10)}</p>
                <p className ="black-10">Price: ${product.price}</p>
                <p className ="black-9">Category: {product.category && product.category.name}</p>
                <p className ="black-8"> Added on {moment(product.createdAt).fromNow()}</p>
                    {showStock(product.quantity)}
                    <br></br>
                    {showViewButton(showViewProductButtom)}
                    {showAddToCart(showAddToCartButton)}
                    {showRemoveButton(showRemoveProductButton)}
                    {showCartUpdateOptions(cartUpdate)}
                
                </div>
            </div>
    )
})

export default Card;