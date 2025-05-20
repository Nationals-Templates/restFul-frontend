import { useEffect, useState } from 'react';
import './Dashboard.css';
import {
  getAllBookings,
  updateBooking,
  getBookingsByPlateNumber,
} from '../services/dashboard';

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  useEffect(() => {
    fetchAllBookings();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim()) {
        const filtered = await getBookingsByPlateNumber(searchTerm);
        setBookings(filtered);
        setCurrentPage(1);
      } else {
        fetchAllBookings();
      }
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchAllBookings = async () => {
    const all = await getAllBookings();
    setBookings(all);
  };

  const handleUpdate = async (id, updatedStatus) => {
    const updatedBooking = await updateBooking(id, updatedStatus);
    if (updatedBooking) {
      setBookings(bookings.map((booking) => (booking.id === id ? updatedBooking : booking)));
    }
  };

  // Filter by email or plate number based on search term (case insensitive)
  const filteredBookings = bookings.filter((booking) => {
    const emailMatch = booking.user?.email.toLowerCase().includes(searchTerm.toLowerCase());
    const plateMatch = booking.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return emailMatch || plateMatch;
  });

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
      <h1 className='main-heading'>Welcome to the  XWZ Admin Dashboard</h1>
      <div className="dashboard-container">
        <h2>Booked Slots</h2>

        <input
          type="text"
          placeholder="Search by plate number or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <table className="booking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Plate Number</th>
              <th>Parking Name</th>
              <th>Entry Time</th>
              <th>Status</th>
              <th>Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.user?.fullName || 'N/A'}</td>
                <td>{booking.plateNumber}</td>
                <td>{booking.parking?.parkingName || 'N/A'}</td>
                <td>{booking.entryTime ? new Date(booking.entryTime).toLocaleString() : 'N/A'}</td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) => handleUpdate(booking.id, e.target.value)}
                  >
                    <option value="pending">pending</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                    <option value="completed">completed</option>
                  </select>
                </td>
                <td>{booking.amountPaid ? `$${booking.amountPaid.toFixed(2)}` : '$0.00'}</td>
              </tr>
            ))}
          </tbody>
        </table>

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
