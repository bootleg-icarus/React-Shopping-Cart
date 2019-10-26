import { ADD_ITEM,SUB_ITEM,SUB_QUANTITY,ADD_QUANTITY} from './action-types/cart-actions'

export const addToCart= (id)=>{
    return{
        type: ADD_ITEM,
        id
    }
}
export const addToCartMongo = (id) => {
    console.log(id);
    return (dispatch) =>{
        dispatch(addToCart(id.id));
        return fetch('http://localhost:3002/post-data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }).then(response => {
            response.json().then( data => console.log('after api & json', data))
        })
    }
}
export const removeItem=(id)=>{
    return{
        type: SUB_ITEM,
        id
    }
}
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}
export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        id
    }
}