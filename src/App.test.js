import React from 'react'
import App from './App'
import { render, waitForElement, prettyDOM } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import blogServices from jest.mock('./services/__mocks__/blogs')

let app

describe('<App />', () => {
    beforeAll(() => {
        app = render(< App />)
    })
    test('Login form is rendered if no user is logged in', async () => {
        const loginForm = await waitForElement(() => app.container.querySelector('.login'))
        const blogs = app.container.querySelector('.blog')
        expect(loginForm).toBeDefined()
        expect(loginForm).toHaveTextContent(/Log in/i)
        expect(blogs).toBe(null)
    })

    test('Blogs are displayed if user is logged in', async () => {
        const testUser = {
            id: '5d2c25bce0f66d194a432690',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByaW5jZWhhbWlsdG9uIiwiaWQiOiI1ZDJjMjViY2UwZjY2ZDE5NGE0MzI2OTAiLCJpYXQiOjE1NjQzMDA3MTZ9.G2AHop-OPu61OW-EhEBp0AUcfrvjg8gZFUq2EgcHsuQ',
            username: 'princehamilton'
        }
        window.localStorage.setItem('id', testUser.id)
        window.localStorage.setItem('token', testUser.token)
        window.localStorage.setItem('username', testUser.username)
        blogServices.fetchBlogs()
        app = render( <App /> )

        console.log(prettyDOM(app))
    })

})

/*
1. Import componet to test, render, waitForElemnt
2. Render the Application without a simulated user in the mockLocalStorage
3. Fetch mockBlogs
4. Re-render application and query for class 'login'
5. Check to make sure login element is defined
6. Check to make sure an element with className 'blog' is not defined
 */