import axios from 'axios'

let token = null
let config = {}

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}


const createBlog = async ({ title, author, url }) => {
  if (token) {
    const payload = { title, author, url, likes: 0, token }
    try {
      const response = await axios.post('http://localhost:5000/api/blogs', payload, config)
      return response.data
    } catch (exception) {
      console.error(exception)
    }
  }
  else {
    return null
  }
}

// returns a particular blogs updated like count as a number
const updateLikes = async (blogId, numberOfLikes) => {
  if(token) {
    try {
      const payload = {
        token,
        likes: numberOfLikes
      }
      const response = await axios.put(`http://localhost:5000/api/blogs/${blogId}`, payload, config)
      return response.data
    }
    catch (e) {
      console.log(e)
      return null
    }
  }
}

const deleteBlog = async (blogId) => {
  if (token) {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogId}`, config)
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  createBlog,
  setToken,
  updateLikes,
  deleteBlog
}
