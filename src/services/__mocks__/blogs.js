const blogs = [
    {
        title: 'I looovee to sleep. ',
        author: 'Princey',
        url: 'prince.com',
        likes: 1,
        user: {
            username: 'princehamilton',
            name: 'Prince Hamilton',
            id: '5d2c25bce0f66d194a432690'
        },
        id: '5d2dcc8184b9aec11dc62077'
    },
    {
        title: 'Programming is the best!',
        author: 'Abdul',
        url: 'abdul.com',
        likes: 2,
        user: {
        username: 'abdulqshabbir',
        name: 'Abdul Shabbir',
        id: '5d2dcd6584b9aec11dc6207b'
        },
        id: '5d2dce2284b9aec11dc6207e'
    }
]

const fetchBlogs = () => {
    return Promise.resolve(blogs)
}

export default {
    fetchBlogs
}