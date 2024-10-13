import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./AdminDashboard.css"; // Import the specific CSS file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const baseURL = "http://localhost:5000"; // Change this if necessary
  const socket = io(baseURL);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/submissions"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();

    socket.on("newUser", () => {
      fetchSubmissions(); // Fetch the latest submissions when a new user is created
    });

    return () => {
      socket.off("newUser"); // Cleanup the event listener
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {users.length === 0 ? (
        <p className="NouserS">No users in the database</p>
      ) : (
        users.map((user, index) => (
          <div key={index} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.social_media_handle}</p>
            {user.images.map((image, i) => {
              return (
                <img key={i} src={`${baseURL}/${image}`} alt={`Upload ${i}`} />
              );
            })}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
