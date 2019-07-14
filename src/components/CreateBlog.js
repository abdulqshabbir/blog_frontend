import React, { useState } from 'react'
import BlogServices from './../services/BlogServices'

const CreateBlog = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = (e) => {
        e.preventDefault()
        const title = e.target.elements.title.value
        const url = e.target.elements.url.value
        const author = e.target.elements.author.value
        
        console.log(title, url, author)
        
        BlogServices.createBlog({
            title,
            url,
            author
        })
    }

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
                <button type="submit">Create Blog</button>
            </form>
        </div>
    )
}

export default CreateBlog