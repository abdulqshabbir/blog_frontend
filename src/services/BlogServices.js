import axios from 'axios'

let token = null
let config = {}

const setToken = newToken => {
    token = `bearer ${newToken}`
    config = {
        headers: {Authorization: token}
    }
}

const createBlog = ({ title, author, url}) => {
    if (token) {
        const payload = {
            title, 
            author, 
            url, 
            likes: 0, 
            token
        }
        axios
            .post(`http://localhost:5000/api/blogs`, payload, config)
            .catch(err => console.log(err))
    }
}

const updateLikes = async (blogId, numberOfLikes) => {
    if(token) {
        try {
            const payload = {
                token,
                likes: numberOfLikes
            }
            await axios.put(`http://localhost:5000/api/blogs/${blogId}`, payload, config)
        }   
        catch (e) {
            console.log(e)
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
