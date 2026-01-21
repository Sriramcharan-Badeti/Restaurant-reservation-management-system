// src/components/Customer/CreateReservation.jsx
import { useState } from 'react';
import { reservationAPI } from '../../services/api';

function CreateReservation({ onReservationCreated }) {
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    numberOfGuests: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '12:00-14:00',
    '14:00-16:00',
    '18:00-20:00',
    '20:00-22:00'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await reservationAPI.create(formData);
      setSuccess('Reservation created successfully!');
      setFormData({ date: '', timeSlot: '', numberOfGuests: '' });

      // Notify parent to refresh list
      if (onReservationCreated) {
        onReservationCreated();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date as minimum
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    //   <div className="bg-white p-6 rounded-lg shadow-md">
    //     <h2 className="text-2xl font-bold mb-4">Create New Reservation</h2>

    // {error && (
    //   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    //     {error}
    //   </div>
    // )}

    // {success && (
    //   <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
    //     {success}
    //   </div>
    // )}

    // <form onSubmit={handleSubmit}>
    //   <div className="mb-4">
    //     <label className="block text-gray-700 mb-2">Date</label>
    //     <input
    //       type="date"
    //       name="date"
    //       value={formData.date}
    //       onChange={handleChange}
    //       min={getTomorrowDate()}
    //       required
    //       className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    //     />
    //   </div>

    //   <div className="mb-4">
    //     <label className="block text-gray-700 mb-2">Time Slot</label>
    //     <select
    //       name="timeSlot"
    //       value={formData.timeSlot}
    //       onChange={handleChange}
    //       required
    //       className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    //     >
    //       <option value="">Select a time slot</option>
    //       {timeSlots.map((slot) => (
    //         <option key={slot} value={slot}>
    //           {slot}
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   <div className="mb-6">
    //     <label className="block text-gray-700 mb-2">Number of Guests</label>
    //     <input
    //       type="number"
    //       name="numberOfGuests"
    //       value={formData.numberOfGuests}
    //       onChange={handleChange}
    //       min="1"
    //       max="10"
    //       required
    //       className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    //       placeholder="e.g., 4"
    //     />
    //   </div>

    //       <button
    //         type="submit"
    //         disabled={loading}
    //         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
    //       >
    //         {loading ? 'Creating...' : 'Create Reservation'}
    //       </button>
    //     </form>
    //   </div>
    //
    // Inside return statement
    <div className="bauhaus-card form-card">
      <div className="card-accent-red"></div>
      <h2 className="card-title">Book a Table</h2>
      {/* Update inputs to use the .form-input and .form-group classes from your Login.css */}
        {/* ... same logic ... */}
        

        <form onSubmit={handleSubmit}>
          {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={getTomorrowDate()}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Time Slot</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Number of Guests</label>
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              min="1"
              max="10"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="e.g., 4"
            />
          </div>
          <button type="submit" className="submit-button primary-yellow">
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
    </div>
  );



}

export default CreateReservation;