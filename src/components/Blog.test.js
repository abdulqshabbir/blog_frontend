import React from 'react'
import { render, cleanup, fireEvent, waitForElement, getByText } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'


let component, mockHandler
const user = {
    token: '111',
    userForToken: {
        username: 'princehamilton',
        name: 'Prince Hamilton'
    }
}

const blog = {
    id: '111',
    title: 'I love programming!',
    author: 'Abdul Shabbr',
    url: 'abdul.com'
}

describe('< Blog />', () => {

    afterEach(cleanup)

    beforeEach(() => {
        component = render( < Blog blog={blog} user={user} />)
        mockHandler = jest.fn()
    })

    test('by default, only some of the blog is shown', () => {
        const partBlog = component.getByTestId('full-blog-hidden')
        expect(partBlog).toBeDefined()
    })

    test('when clicked, blog becomes fully visible', async () => {
        const div = component.getByTestId('full-blog-hidden')
        expect(div).toHaveTextContent(/written by/i)
        fireEvent.click(div)
        const newDiv = await waitForElement(() => component.getByTestId('full-blog-shown'))
        expect(newDiv).toHaveTextContent(/Link to full blog article/i)
    })

})