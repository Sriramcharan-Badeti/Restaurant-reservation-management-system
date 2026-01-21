// // src/pages/CustomerPage.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import CreateReservation from '../components/Customer/CreateReservation';
// import MyReservations from '../components/Customer/MyReservations';

// function CustomerPage() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const handleReservationCreated = () => {
//     // Trigger refresh of reservations list
//     setRefreshTrigger(prev => prev + 1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">Restaurant Reservations</h1>
//             <p className="text-gray-600">Welcome, {user?.name}!</p>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Create Reservation Form */}
//           <div>
//             <CreateReservation onReservationCreated={handleReservationCreated} />
//           </div>

//           {/* My Reservations List */}
//           <div>
//             <MyReservations refreshTrigger={refreshTrigger} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerPage;




// src/pages/CustomerPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CreateReservation from '../components/Customer/CreateReservation';
import MyReservations from '../components/Customer/MyReservations';
import './CustomerPage.css'; // New CSS file

function CustomerPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReservationCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="bauhaus-page-container">
      {/* Background Shapes (Consistent with Login) */}
      <div className="bauhaus-background">
        <div className="shape circle-red"></div>
        <div className="shape square-blue"></div>
        <div className="shape triangle-yellow"></div>
      </div>

      {/* Bauhaus Header */}
      <header className="bauhaus-header">
        <div className="header-content">
          <div className="header-branding">
            <div className="mini-shapes">
              <div className="s-circle"></div>
              <div className="s-square"></div>
            </div>
            <h1 className="header-title">Reservations</h1>
          </div>
          <div className="user-nav">
            <div className="user-info">
              <span className="user-name">{user?.name || 'Guest'}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Logout
              <div className="btn-line"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="bauhaus-main">
        <div className="content-grid">
          <section className="form-section">
            <CreateReservation onReservationCreated={handleReservationCreated} />
          </section>
          <section className="list-section">
            <MyReservations refreshTrigger={refreshTrigger} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default CustomerPage;