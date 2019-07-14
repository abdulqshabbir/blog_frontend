import axios from 'axios'

const createBlog = ({ title, author, url}) => {
    if (window.localStorage.getItem('token')) {
        const username = window.localStorage.getItem('username')
        const token = window.localStorage.getItem('token')
        const id = window.localStorage.getItem('id')
        const payload = {username, token, id, likes: 0}

        axios
            .request({
                method: 'POST',
                url: `http://localhost:5000/api/blogs`,
                headers: {
                    'Authorization': `bearer ${token}`
                },
                data: JSON.stringify(payload)
            })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
}

export default {
    createBlog: createBlog
}
