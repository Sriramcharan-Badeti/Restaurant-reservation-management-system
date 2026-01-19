// src/pages/CustomerPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CreateReservation from '../components/Customer/CreateReservation';
import MyReservations from '../components/Customer/MyReservations';

function CustomerPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReservationCreated = () => {
    // Trigger refresh of reservations list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Restaurant Reservations</h1>
            <p className="text-gray-600">Welcome, {user?.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Reservation Form */}
          <div>
            <CreateReservation onReservationCreated={handleReservationCreated} />
          </div>

          {/* My Reservations List */}
          <div>
            <MyReservations refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;