import React, { useState } from 'react'

const useCounter = () => {
	const [ value, setValue ] = useState(0)

	const increment = () => {
		setValue(value + 1)
	}

	const decrement = () => {
		setValue(value - 1)
	}

	return {
		value,
		increment,
		decrement
	}
}

const Counter = () => {
	const counter = useCounter()

	return (
		<div>
			Counter Value: { counter.value }
			<button onClick={ counter.increment }> Increment </button>
			<button onClick={ counter.decrement }> Decrement </button>
		</div>
	)
}

export default Counter