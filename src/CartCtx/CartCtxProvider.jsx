import { useReducer } from 'react'
import { CartCtx } from './CartCtx'

const defaultCartState = {
	items: [],
	totalAmount: 0,
}

const cartReducer = (state, action) => {
    //! Items not stacking
	if (action.type === 'ADD') {
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

		const existingCartItemIndex = state.items.findIndex(item => {
			item.id === action.item.id
		})

		const existingCartItem = state.items[existingCartItemIndex]
		let updatedItems

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			}

			updatedItems = [...state.items]
			updatedItems[existingCartItemIndex] = updatedItem
		} else {
			updatedItems = state.items.concat(action.item)
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		}
	}

    //! Not working removing items
	// if (action.type === 'REMOVE') {
	// 	const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
	// 	const existingItem = state.items[existingCartItemIndex]
	// 	const updatedTotalAmount = state.totalAmount - existingItem.price
	// 	let updatedItems

	// 	updatedItems = state.items.filter(item => item.id !== action.id)

	// 	return {
	// 		items: updatedItems,
	// 		totalAmount: updatedTotalAmount,
	// 	}
	// }

	return defaultCartState
}

export const CartCtxProvider = props => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

	const addItemToCartHandler = item => {
		dispatchCartAction({
			type: 'ADD',
			item: item,
		})
	}
	const removeItemFromCartHandler = id => {
		dispatchCartAction({
			type: 'REMOVE',
			id: id,
		})
	}

	const ctx = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	}

	return <CartCtx.Provider value={ctx}>{props.children}</CartCtx.Provider>
}