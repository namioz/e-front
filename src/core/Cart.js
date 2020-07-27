import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Layout from './Layout';
import { getCart , removeItem} from './cartHelpers';
import Card from './Card';
import Search from './Search';
import Checkout from './Checkout';


const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false); // 6


    useEffect(() => { //2
        console.log('MAX DEPTH ...');
        setItems(getCart());
      }, [run]);

    // useEffect ( () => { // 2.
    //     setItems(getCart());
    // }, [items]);

    const showItems = items => {
        return(
            <div>
                <h2>Your cart has {`${items.length}`}  items</h2>
                <hr></hr>
                {items.map( (product, i) => (
                <Card
                    key={i} 
                    product={product}
                    showAddToCartButton={false}
                    cartUpdate={true}
                    showRemoveProductButton={true}
                    setRun={setRun} // 3
                    run={run} // 4
                    >
                </Card>) )}
            </div>
        )
    } 

    const noItemMessage = () => (
        <h2>Your cart is empty<br></br> <Link to='/shop'>Continue Shopping</Link></h2>
    )

    return (
        <Layout title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid">

            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemMessage()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr></hr>
                    <Checkout products={items}></Checkout>
                </div>
            </div>

        </Layout>
    )
} 

export default Cart;