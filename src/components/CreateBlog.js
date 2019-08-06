import React, { useState } from 'react'
import BlogServices from './../services/BlogServices'
import PropTypes from 'prop-types'
import useField from './../hooks/useField'

const CreateBlog = ({ user }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [formIsVisible, setFormIsVisible] = useState(false)

  const handleCreateBlog = (e) => {
    e.preventDefault()
    // set user token for authentication
    BlogServices.setToken(user.token)

    // send a post request to /api/blogs to create a new blog
    BlogServices.createBlog({
      title: e.target.elements.title.value,
      url: e.target.elements.url.value,
      author: e.target.elements.author.value
    })

    // clear input fields
    title.clear()
    author.clear()
    url.clear()
  }

  if (formIsVisible) {
    return (
      <div>
        <form onSubmit={handleCreateBlog}>
          <div>
                        Title:
            <input
              type={title.type}
              name="title"
              value={title.value}
              onChange={title.onChange}
            />
          </div>
          <div>
                        Author:
            <input
              type={author.type}
              name="author"
              value={author.value}
              onChange={author.onChange}
            />
          </div>
          <div>
                        URL:
            <input
              type={url.type}
              name="url"
              value={url.value}
              onChange={url.onChange}
            />
          </div>
          <button type="submit"> Create Blog </button>
        </form>
      </div>
    )
  } else {
    return (
      <button onClick={() => setFormIsVisible(true)}> New Blog </button>
    )
  }


}

export default CreateBlog

CreateBlog.propTypes = {
  user: PropTypes.object.isRequired
}