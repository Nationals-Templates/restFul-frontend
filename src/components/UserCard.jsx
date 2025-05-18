import { useState } from 'react';
import './UserCard.css';

function UserCard({ user, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(user.status);

  const handleUpdate = () => {
    onUpdate(user.id, status );
    setIsEditing(false);
  };

  return (
    <div className="user-card">
    {isEditing ? (
      <>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="user-input"
        />
        <div className="card-buttons">
          <button  className='edit'onClick={handleUpdate}>Save</button>
          <button  className='delete' onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </>
    ) : (
      <>
        <p className="user-email">{user.email}</p>
        <p className="user-email">{user.phone}</p>
        <p className="user-email">{user.plateNumber}</p>
        <p className="user-email">{user.bookingDate}</p>
        <p className="user-email">{user.status}</p>
        <div className="card-buttons">
          <button className='edit'onClick={() => setIsEditing(true)}>Accept</button>
          <button className='delete'onClick={() => onDelete(user.id)}>Reject</button>
        </div>
      </>
    )}
  </div>
  
  );
}

export default UserCard;
