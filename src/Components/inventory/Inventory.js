import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProduct = () => {
        
        const product = {}
       
        fetch('https://arcane-caverns-46811.herokuapp.com/addProduct',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify( product )
        })
        .then( res => console.log(res))
        .catch(err => console.log(err))
    }
    return (
        <div>
            <p><span>name</span><input type="text"/></p>
            <p><span>price:</span><input type="number"/></p>
            <p><span>quantity:</span><input type="number"/></p>
            <p><span>product image</span><input type="file"/> </p>
            <button onClick={handleAddProduct}>Add Product </button>
        </div>
    );
};

export default Inventory;