// src/pages/AdminPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';

function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchReservations();
  }, [filterDate]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const filters = filterDate ? { date: filterDate } : {};
      const data = await adminAPI.getAllReservations(filters);
      setReservations(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) {
      return;
    }

    try {
      await adminAPI.cancelReservation(id);
      fetchReservations();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    if (status === 'confirmed') {
      return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Confirmed</span>;
    }
    return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">Cancelled</span>;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p>Welcome, {user?.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Reservations</h2>
            
            {/* Date Filter */}
            <div>
              <label className="text-gray-700 mr-2">Filter by date:</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              {filterDate && (
                <button
                  onClick={() => setFilterDate('')}
                  className="ml-2 text-blue-500 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-center text-gray-600">Loading reservations...</p>
          ) : reservations.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No reservations found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guests</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservations.map((reservation) => (
                    <tr key={reservation._id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium">{reservation?.user?.name}</div>
                          <div className="text-sm text-gray-500">{reservation?.user?.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {formatDate(reservation.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {reservation.timeSlot}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        Table {reservation?.table?.tableNumber} (Cap: {reservation?.table?.capacity})
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {reservation?.numberOfGuests}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {getStatusBadge(reservation?.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {reservation?.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancel(reservation?._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;