import axios from 'axios'

/*
    user [Object] has shape: {username: String, token: String, id: String}
*/

let token = null
let config = {}

const setToken = token => {
    token = `bearer ${token}`
    config = {
        headers: { Authorization: token }
    }
}


const useResource = ( BASE_URL ) => {
    /* CUSTOM hook:
        1. Use url in arguement to 'build' an endpoint made of BASE_URL + id (for update, delete)
        2. Create 4 functions:
            a. getAllResources
            b. createResource
            c. updateResource
            d. deleteResource
    */
    const getAll = async () => {
        try {
            const res = await axios.get(`${BASE_URL}`)
            return res.data
        } catch (e) {
            console.log(e)
        }
    }

    const deleteResource = async (userToken, resourceId) => {
        console.log(userToken)
        setToken(userToken)
        if (token) {
            try {
                await axios.delete(`${BASE_URL}/${resourceId}`, config)
            } catch(e) {
                console.log(e)
            }
        }
    }


    const resourceService = {
        getAll,
        deleteResource
    }

    return resourceService
}

export default useResource