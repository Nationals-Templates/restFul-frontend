import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import './Dashboard.css';
import { deleteUser, getAllUsers, updateUser } from '../services/dashboard';

function Dashboard() {
  const [users, setUsers] = useState([]); // applying changes directly using this setter because it was not used i:e we dont need to refresh the page to see effect 

  useEffect(() => {
    getAllUsers().then((data) => setUsers(data))
  }, []);

  const handleDelete = async(id)=>{
    await deleteUserAPI(id);
    setUsers(users.filter(user=>user.id !== id));
  };
  
  const handleUpdate = async(id, updatedData)=>{
  if(updateUser){
    setUsers(users.map(user=>user.id !== id? updatedUser : user));
  }
};


  return (
    <div className='auth-page'>
      <h1 className='main-heading'>Welcome to the Students Register</h1>
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <div className="user-list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={deleteUser}
            onUpdate={updateUser}
          />
        ))
        }
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
