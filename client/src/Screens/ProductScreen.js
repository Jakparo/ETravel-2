import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productAction';
import  url  from '../icons/return.svg'
function ProductScreen(props){

    const[ qty, setQty ] = useState(1);
    const productDetails = useSelector(state => state.productDetails );
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            // 
        }
    }, []);

    const handleAddToCart = ()=>{
        props.history.push("/cart/"+ props.match.params.id + "?qty=" + qty);
    }

    return (
    <div >
        <div>
            <p className="back-to-home">
                <span>
                    <Link to="/"> <img src={url} width={32} height={32}/></Link>
                </span>
            </p>
        </div>    
        {loading? <div>Loading...</div>:
        error? <div>{error}</div>:
        (
            <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="product"></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            <p>{product.continent}</p>
                        </li>
                        {/* <li>
                            {product.rating} starts 
                        </li> */}
                        <li>
                            <p>${product.price}</p>
                        </li>
                        <li>
                            <h4>Description:</h4>
                            <div>
                                {product.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Price: {product.price}
                        </li>
                        <li>
                            Status: {product.countInStock > 0? "In Stock":"Unavailable"}
                        </li>
                        <li>
                            Qty: <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                                {[...Array(product.countInStock).keys()].map(x=>
                                    <option key={x+1} value={x+1}>{x+1}</option>    
                                )}
                            </select>
                        </li>
                        <li>
                            {  product.countInStock> 0 && <button onClick={handleAddToCart} 
                            className="button">Add to Cart</button>
                            } 
                        </li>
                    </ul>
                </div>
            </div>
        )
            } 
    </div>
    )  
}

export default ProductScreen;