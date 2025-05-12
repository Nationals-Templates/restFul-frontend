import { useState } from 'react';
import './UserCard.css';

function UserCard({ user, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = () => {
    onUpdate(user.id, email );
    setIsEditing(false);
  };

  return (
    <div className="user-card">
      {isEditing ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <p>{user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
}

export default UserCard;
