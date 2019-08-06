import React, { useState } from 'react'
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
	if (action.type === 'INC') {
		return state + 1
	} else if (action.type === 'DEC') {
		return state -1
	} else {
		return state
	}
}

const store = createStore(counterReducer)

const Counter = () => {
	return (
		<div>
			Counter Value: { store.getState() }
			<button onClick={ () => store.dispatch({ type: 'INC' }) }> Increment </button>
			<button onClick={ () => store.dispatch({ type: 'DEC' }) }> Decrement </button>
		</div>
	)
}
export default Counter