import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import { ADD_ITEM,SUB_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING,SUB_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Shoe1', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:1100,img:Item1},
        {id:2,title:'Shoe2', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:800,img: Item2},
        {id:3,title:'Shoe3', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:1200,img: Item3},
        {id:4,title:'Shoe4', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:2600,img:Item4},
        {id:5,title:'Shoe5', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:1600,img: Item5},
        {id:6,title:'Shoe6', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:900,img: Item6}
    ],
    addedItems:[],
    total: 0
}

const cartReducer= (state = initState,action)=>{   
    switch(action.type){
        case ADD_ITEM:
            let addedItem = state.items.find(item=> item.id === action.id)          
            let existed_item= state.addedItems.find(item=> action.id === item.id)
            if(existed_item)
            {
                addedItem.quantity += 1 
                    return{
                    ...state,
                        total: state.total + addedItem.price 
                    }
            }
            else{
                addedItem.quantity = 1;            
                let newTotal = state.total + addedItem.price             
                return{
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total : newTotal
                }            
            }

        case SUB_ITEM :
            let itemToRemove= state.addedItems.find(item=> action.id === item.id)
            let new_items = state.addedItems.filter(item=> action.id !== item.id)        
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            console.log(itemToRemove)
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }

        case ADD_QUANTITY:
            addedItem = state.items.find(item=> item.id === action.id)
            addedItem.quantity += 1 
            newTotal = state.total + addedItem.price
            return{
                ...state,
                total: newTotal
            }

        case SUB_QUANTITY:
            addedItem = state.items.find(item=> item.id === action.id) 
    
            if(addedItem.quantity === 1){
                let new_items = state.addedItems.filter(item=>item.id !== action.id)
                let newTotal = state.total - addedItem.price
                return{
                    ...state,
                    addedItems: new_items,
                    total: newTotal
                }
            }
            else {
                addedItem.quantity -= 1
                let newTotal = state.total - addedItem.price
                return{
                    ...state,
                    total: newTotal
                }
            }

        case ADD_SHIPPING:
            return{
                ...state,
                total: state.total + 60
            }
            
        case SUB_SHIPPING:
            return{
                ...state,
                total: state.total - 60
            }

        default:
            return state;
    }   
}
export default cartReducer