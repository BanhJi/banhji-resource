const axios = require('axios')
// const URL = require('@/apiUrl')

// List
module.exports.addUser = async (data)=> { 
    try {
        const response = await axios.post('/api/user',data)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getUser = async (data)=> { 
    try {
        const response = await axios.get('/api/user',data)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.deleteGuide = async (id,type)=> { 
    try {
        const response = await axios.post('/api/deletpost',{id: id,type:type})
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.updateUser = async (data)=> { 
    try {
        const response = await axios.post('/api/updateuser',data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.deleteUser = async (id,type)=> { 
    try {
        const response = await axios.post('/api/deleteuser',{id: id,type:type})
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}