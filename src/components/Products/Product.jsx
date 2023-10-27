export const Product = props => {
	const path = props.path

	const addToCart = () => {
		props.collectAddedToCart(props)
	}

	return (
		<div className='flex flex-col max-w-[250px] mx-3 my-3 py-5 px-3 bg-white rounded-xl'>
			<img className='h-[200px] rounded-xl' src={path} alt='product' />

			<p className='text-slate-700 mt-5 text-2xl font-bold'>{props.name}</p>

			<p
				className={`${
					props.price === 'Indyvidual pricing' ? 'text-red-600' : 'text-purple-500'
				} mt-1 text-lg font-semibold`}>
				${props.price}
			</p>
			<p className='text-slate-700 italic'>{props.content}</p>
			<button
				onClick={addToCart}
				disabled={props.price === 'Indyvidual pricing' ? true : false}
				className={`${
					props.price === 'Indyvidual pricing' ? 'bg-red-600 hover:border-red-600' : 'hover:border-white'
				} mt-5 self-center text-white `}>
				{props.price === 'Indyvidual pricing' ? 'Contact' : 'Add to Cart'}
			</button>
		</div>
	)
}
