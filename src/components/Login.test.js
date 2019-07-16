import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

const Login = () => <p>Hello world</p>

test('renders content', () => {
    const component = render(<Login />)
    expect(component).toHaveTextContent('Hello world')
})