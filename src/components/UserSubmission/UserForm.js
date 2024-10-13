import React, { useState } from "react";
import axios from "axios";
import "./UserSubmission.css"; // Import the specific CSS file

const UserSubmission = () => {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("social_media_handle", socialHandle);

    // Append each image file to the form data
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      // Send the POST request to the backend
      const response = await axios.post(
        "http://localhost:5000/api/users/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Specify content type for file uploads
          },
        }
      );
      // console.log(response);
      if (response.status === 201) {
        alert("Submission successful! Your details have been uploaded.");
        // Reset form fields after successful submission
        setName("");
        setSocialHandle("");
        setImages([]);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("There was an error submitting your details. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>User Submission Form</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Social Media Handle"
        value={socialHandle}
        onChange={(e) => setSocialHandle(e.target.value)}
        required
      />
      <input type="file" multiple onChange={handleImageChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserSubmission;
