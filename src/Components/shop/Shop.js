
import fakeData from "../../fakeData";
import { useState } from "react";
import './Shop.css'

import Product from '../Product/Product'
import Cart from "../cart/Cart";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Shop = () => {

    
    // const first10 = fakeData.slice(0, 10)
    document.title='shop more'

    const [products, setProducts] = useState([])
    // console.log(products);
    const [loading,setLoading] = useState(true)

    const [cart, setCart] = useState([])

    useEffect( ()=> {

        fetch('https://arcane-caverns-46811.herokuapp.com/products')
        // fetch('https://floating-castle-39415.herokuapp.com/products')
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data =>{
            setLoading(false);
            setProducts(data)
        })
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
    
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        // console.log(products, productKeys )
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

    }, [])




    const handleAddProduct = (product) => {
        // console.log('product added',product);
        const toBeAddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey) // ei product ta already add kora hoyece kina ta check kora hocce

        let count = 1;
        let newCart;


        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey) // ei product cara onno product gulo nea hocce
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }

        setCart(newCart)
        addToDatabaseCart(product.key, count)

    }




    return (
        <section className='shop-container'>
            <div className="product-container">
                {/* {
                    products.length === 0 && <p  style={{color:'red',fontSize:'300px'}}> {loading} </p>
                } */}
                {   loading ? <img src={`https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif`} alt=""/> :
                    products.map(product => <Product
                        showaddtoCart={true}
                        handleAddProduct={handleAddProduct}
                        key={product.key}
                        product={product} />)

                }
            </div>

            <div className="cart-container">
                <h4>hello all </h4>
                <Cart cart={cart}>
                    <Link to="/review"> <button  className="btn btn-success"> review order</button> </Link>
                </Cart>
            </div>
        </section>
    )
}



export default Shop