
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart)

    const totalPrice = cart.reduce((total, pdr) =>total + pdr.price*(pdr.quantity || 1) , 0);

    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total = total + product.price*product.quantity || 1;
    // }

    return (
        <div>
            <h6>order summary : {cart.length}</h6>
            <p> Items : </p>
            <p> Shipping and Handling : </p>
            <p>Total before tax : </p>
            <p> Estimated tax : </p>
            <h3>Order total : {totalPrice}</h3>
            {
                props.children
            }
            {/* <Button className = "btn-warning">add me</Button> */}

         






        </div>
    );
};

export default Cart; 