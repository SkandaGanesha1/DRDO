import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS for Dashboard

const Dashboard = () => {
  const handleLogout = () => {
    // Firebase logout logic can go here
    // For example:
    // firebase.auth().signOut().then(() => {
    //   console.log("Logged out successfully");
    // });
  };

  return (
    <div className="dashboard">
      <div className="header">
        <div className="logo">
          <img src="https://via.placeholder.com/50" alt="Logo" />
          <h1>Ministry Dashboard</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="navbar">
        <Link to="/home">Home</Link>
        <Link to="#drdo">DRDO</Link>
        <Link to="/careers">Careers</Link>
        <Link to="#contact">Contact Us</Link>
      </div>

      <div className="content">
        <h1>Welcome to the Ministry Dashboard</h1>
        <p>Explore the latest updates and information through the navigation menu above.</p>
      </div>
    </div>
  );
};

export default Dashboard;
