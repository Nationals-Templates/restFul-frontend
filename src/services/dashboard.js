import API from '../api/axios'

export const getAllUsers = async ()=>{
    try {
        const res = await API.get('/user')
        return res.data
        
    } catch (error) {
        alert('Failed to fetch users')
    }
}

export const deleteUser = async (id) => {
    try {
        const res = await API.delete(`/user/${id}`)
        alert('User deleted successfully')
    } catch (error) {
        alert('Failed to delete user')
    }
}

export const updateUser = async (id, email) =>{
    try {
        const res = await API.put(`/user/${id}`, {email})
        alert('User updated successfully')
        return res.data 
    } catch (error) {
        alert('Unable to update user')
    }
}