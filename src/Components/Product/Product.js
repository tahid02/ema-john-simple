

import { Link } from 'react-router-dom';
import './Product.css'

const Product = (props) => {

    // console.log(props.product.key);
    const { name, seller, img, price, stock, key } = props.product;

    const showConfirmed = () => {
        alert('product confirmed ')
    }
    return (
        <section className='product'>
            <div>
                <img src={img} alt="" />
            </div>

            <div className="ms-4">

                {/* <h3 className="product-name"> <Link to={"product/"+key}>{name}</Link> </h3> */}
                {/* <h3 className="product-name">{name} </h3> */}

                <h3 className="product-name"> <a href={"product/" + key}>{name}</a> </h3>

                <p><small> by : {seller}  </small></p>
                <p> ${price} </p>
                <p><small>only lefts {stock}</small></p>

                {
                    props.showaddtoCart ? (

                        <button className='btn btn-primary'
                            onClick={() => props.handleAddProduct(props.product)}
                        >  Buy Now </button>
                    ) : (
                            <button className="btn btn-success" onClick={showConfirmed}>
                                confirm
                            </button>

                        )



                    // props.showaddtoCart && <button className='btn btn-success'
                    //         onClick={() => props.handleAddProduct(props.product)}> Bye Now </button>
                        

                        
                    

                }


            </div>

        </section>
    )

}


export default Product