
const bg = {
    backgroundColor:'gray',
    marginBottom:'10px'
}

const ReviewItems = (props) => {
    // console.log(props);
    const {name,quantity,key,price} = props.product
    const removeProduct = props.removeProduct;  
    return (
        <div style={bg}>
            <h4>{name} {key}</h4>
            <p>Quantity {quantity}</p>
            <p>{price}</p>
            <button className="btn btn-warning" onClick={() => removeProduct(key)}>Remove </button>
        </div>
    );
};

export default ReviewItems;