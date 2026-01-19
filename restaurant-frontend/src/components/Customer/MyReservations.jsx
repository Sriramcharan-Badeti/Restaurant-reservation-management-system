// src/components/Customer/MyReservations.jsx
import { useState, useEffect } from 'react';
import { reservationAPI } from '../../services/api';

function MyReservations({ refreshTrigger }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReservations();
  }, [refreshTrigger]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationAPI.getMyReservations();
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
      await reservationAPI.cancel(id);
      fetchReservations(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-600">Loading reservations...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {reservations.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          No reservations found. Create your first reservation above!
        </p>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation._id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    Table {reservation.table.tableNumber}
                  </h3>
                  <p className="text-gray-600">{formatDate(reservation.date)}</p>
                  <p className="text-gray-600">Time: {reservation.timeSlot}</p>
                  <p className="text-gray-600">
                    Guests: {reservation.numberOfGuests}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Capacity: {reservation.table.capacity} people
                  </p>
                </div>
                <button
                  onClick={() => handleCancel(reservation._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReservations;