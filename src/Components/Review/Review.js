import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import fakeData from "../../fakeData";
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../cart/Cart";
import ReviewItems from "../reviewitems/ReviewItems";
import giffyImage from "../../images/giphy.gif"




const Review = () => {

    const [cart, setCart] = useState([])
    const [happyImage,setHappyImage] = useState(false)
    const history = useHistory()

    const removeProduct = (productKey) => {
        console.log('i am removed', productKey)
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        let saveCart = getDatabaseCart();
        let productKeys = Object.keys(saveCart);
        console.log('get cart', productKeys);

        fetch('https://arcane-caverns-46811.herokuapp.com/productsByKeys',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify( productKeys )
        })
        .then( res => res.json())
        .then( data => setCart( data) )
        .catch(err => console.log(err))
    

        // const cartProducts = productKeys.map(key => {
        //     let product = fakeData.find(pd => pd.key === key);
        //     product.quantity = saveCart[key]; // putting value of the certain key to the respective product object
        //     return product;
        // })
        // console.log(cartProducts);
        // setCart(cartProducts)
    }, [])

    const handleProceedCheckout = () => {
        history.push('/shipment')
    }


    const thankYou = <img src={giffyImage} alt="Thank you for purchasing"/>
    return (
        <div className="row">

            {/* <h3>this is review section</h3>
            <div> total ordered product : {cart.length}</div> */}
            <div className="col-md-7 m-3">
                {
                    cart.map(item => <ReviewItems product={item} removeProduct={removeProduct}></ReviewItems>)
                }
                {
                    happyImage && thankYou
                }
            </div>

            <div className="col-md-4">
                
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="btn btn-success">proceed checkout</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;