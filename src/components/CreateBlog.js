import React, { useState } from 'react'
import BlogServices from './../services/BlogServices'
import PropTypes from 'prop-types'

const CreateBlog = ({ user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [formIsVisible, setFormIsVisible] = useState(false)

  const handleCreateBlog = (e) => {
    e.preventDefault()
    const title = e.target.elements.title.value
    const url = e.target.elements.url.value
    const author = e.target.elements.author.value

    BlogServices.setToken(user.token)
    BlogServices.createBlog({
      title,
      url,
      author
    })
  }

  if (formIsVisible) {
    return (
      <div>
        <form onSubmit={handleCreateBlog}>
          <div>
                        Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
                        Author:
            <input
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
                        URL:
            <input
              type="text"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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