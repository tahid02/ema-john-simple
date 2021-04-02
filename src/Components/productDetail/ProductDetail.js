

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData'; not using from local  after mongodb
import Product from '../Product/Product';

const ProductDetail = () => {

   const {productKey} =  useParams()
   const [product, setProduct] =  useState([])

   useEffect( () => {
        fetch(`https://arcane-caverns-46811.herokuapp.com/product/${productKey}`)
        .then(res => res.json())
        .then(data => setProduct(data))
   },[productKey])

    // const product = fakeData.find( pd => pd.key === productKey)
    document.title = 'product detail'
    // console.log(product)


    return (
        <div>
           {productKey} this is the clicked product details 
           <div>
               <Product showaddtoCart = {false} product={product}> </Product>
           </div>
        </div>
    );
};

export default ProductDetail;