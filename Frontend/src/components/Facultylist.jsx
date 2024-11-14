import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserTie, FaEdit, FaTrash, FaPlus, FaEnvelope } from "react-icons/fa";

const Facultylist = () => {
  const apiUrl = "http://localhost:5000/api/faculty";
  const [faculty, setFaculty] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(apiUrl);
      setFaculty(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${apiUrl}/${editing}`, formData);
        setEditing(null);
      } else {
        await axios.post(apiUrl, formData);
      }
      setFormData({ name: "", email: "", department: "" });
      fetchFaculty();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const handleEdit = (faculty) => {
    setEditing(faculty._id);
    setFormData({
      name: faculty.name,
      email: faculty.email,
      department: faculty.department,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-semibold text-center mb-10 text-purple-800">
        Faculty Management System
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-purple-50 rounded-lg p-8 shadow-xl border border-purple-300"
      >
        <div className="relative mb-4">
          <FaUserTie className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-4 pl-12 border border-purple-300 rounded-full text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition ease-in-out duration-150"
          />
        </div>
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-4 pl-12 border border-purple-300 rounded-full text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition ease-in-out duration-150"
          />
        </div>
        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          className="w-full p-4 border border-purple-300 rounded-full text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition ease-in-out duration-150 mb-6"
        />
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-3 rounded-full hover:bg-purple-800 text-lg font-semibold flex items-center justify-center gap-2 transition duration-200"
        >
          {editing ? (
            <FaEdit className="text-xl" />
          ) : (
            <FaPlus className="text-xl" />
          )}
          {editing ? "Update Faculty" : "Add Faculty"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((member) => (
          <div
            key={member._id}
            className="bg-white shadow-lg p-6 rounded-2xl border border-purple-200 transition hover:shadow-2xl"
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-purple-700 mb-1">
                {member.name}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-2 text-purple-600">
                <FaEnvelope className="text-purple-400" />
                <p>{member.email}</p>
              </div>
              <p className="text-purple-500 mt-2">
                Department: <span className="font-medium">{member.department}</span>
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleEdit(member)}
                className="flex-1 bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 text-sm flex items-center justify-center gap-2 transition duration-200"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-full hover:bg-red-700 text-sm flex items-center justify-center gap-2 transition duration-200"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facultylist;
