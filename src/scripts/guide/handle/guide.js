import axios from "axios";

const addGuide = async (data)=> { 
    try {
        const response = await axios.post('/api/post',data)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
const getGuide = async (data)=> { 
    try {
        const response = await axios.get('/api/post', { params: data })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
const deleteGuide = async (id,type)=> { 
    try {
        const response = await axios.post('/api/deletpost',{id: id,type:type})
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
const updateGuide = async (data)=> { 
    try {
        const response = await axios.post('/api/updatepost',data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

const addType = async (data) => {
    try {
        const response = await axios.post('/api/addtype',data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
const getType = async (data) => {
    try {
        const response = await axios.get('/api/getype',data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
const updateType = async (data) => {
    try {
        const response = await axios.post('/api/updatetype',data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
const getOneType = async (data) => {
    try {
        const response = await axios.get('/api/getonetype',{ params: data })
        return response
    } catch (error) {
        window.console.error(error)
    }
}

export {
    getGuide,
    addGuide,
    deleteGuide,
    addType,
    getType,
    getOneType,
    updateType,
    updateGuide
    
}