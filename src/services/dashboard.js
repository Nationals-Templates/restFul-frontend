import API from '../api/axios'

export const getAllUsers = async ()=>{
    try {
        const res = await API.get('/user')
        return res.data
        
    } catch (error) {
        alert('Failed to fetch users')
    }
}

export const deleteBooking = async (id) => {
    try {
        const res = await API.delete(`/booking/delete/${id}`)
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


export const getAllBookings = async()=>{
    try{
        const res = await API.get("/booking/getAllBookings")
        return res.data
        // console.log(res.data)
    } catch(error){
        alert('Failed to fetch bookings')
    }
}

export const updateBooking = async (id, status)=>{
    try{
        const res = await API.patch(`/booking/status/${id}`, {status})
        alert('Booking status updated successfully')
        return res.data
    }catch(error){
        alert('Unable to update booking')
    }
}

export const getBookingsByPlateNumber = async (plateNumber) => {
    try {
      const res = await API.get(`/booking/search?plateNumber=${plateNumber}`);
  
      return res.data;
    } catch (error) {
      console.error('Error fetching bookings by plate number:', error);
      return [];
    }
  };
  