import { useEffect, useState } from 'react';
import './Dashboard.css';
import { getAllBookings, updateBooking, getBookingsByPlateNumber, deleteBooking } from '../services/dashboard';

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  useEffect(() => {
    getAllBookings().then((data) => setBookings(data));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim()) {
        const filtered = await getBookingsByPlateNumber(searchTerm);
        setBookings(filtered);
      } else {
        const all = await getAllBookings();
        setBookings(all);
      }
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    await deleteBooking(id);
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const handleUpdate = async (id, updatedStatus) => {
    const updatedBooking = await updateBooking(id, updatedStatus);
    setBookings(bookings.map((booking) => (booking.id === id ? updatedBooking : booking)));
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className='auth-page'>
      <h1 className='main-heading'>Welcome to the Admin Dashboard</h1>
      <div className="dashboard-container">
        <h2>Booked Slots</h2>

        <input
          type="text"
          placeholder="Search by plate number..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="search-input"
        />

        <table className="booking-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Plate Number</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.fullName}</td>
                <td>{booking.email}</td>
                <td>{booking.plateNumber}</td>
                <td>{booking.entryTime}</td> {/* Adjust format if needed */}
                <td>{booking.exitTime}</td>  {/* Adjust format if needed */}
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) => handleUpdate(booking.id, e.target.value)}
                  >
                    <option value="pending">pending</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(booking.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
