import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Login from './Login'

afterEach(cleanup)

const authenticatedUser = {
  name: 'Prince Hamilton',
  username: 'princehamilton',
  password: 'prince06'
}

const setAuthenticatedUser = () => {
  return authenticatedUser
}

test('renders content', () => {
  const component = render(< Login setAuthenticatedUser={setAuthenticatedUser} authenticatedUser={authenticatedUser} />)
  expect(component.container).toBeDefined()

  jest.fn()

  component.debug()
})

