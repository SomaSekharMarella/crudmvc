import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserGraduate,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEnvelope,
} from "react-icons/fa";

const Studentlist = () => {
  const apiUrl = "http://localhost:5000/api/students";
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(apiUrl);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
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
      setFormData({ name: "", email: "", grade: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditing(student._id);
    setFormData({
      name: student.name,
      email: student.email,
      grade: student.grade,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-semibold text-center mb-10 text-blue-800">
        Student Management System
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-blue-50 rounded-lg p-8 shadow-xl border border-blue-300"
      >
        <div className="relative mb-4">
          <FaUserGraduate className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-4 pl-12 border border-blue-300 rounded-full text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
          />
        </div>
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-4 pl-12 border border-blue-300 rounded-full text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
          />
        </div>
        <input
          type="text"
          placeholder="Grade"
          value={formData.grade}
          onChange={(e) =>
            setFormData({ ...formData, grade: e.target.value })
          }
          className="w-full p-4 border border-blue-300 rounded-full text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150 mb-6"
        />
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded-full hover:bg-blue-800 text-lg font-semibold flex items-center justify-center gap-2 transition duration-200"
        >
          {editing ? (
            <FaEdit className="text-xl" />
          ) : (
            <FaPlus className="text-xl" />
          )}
          {editing ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white shadow-lg p-6 rounded-2xl border border-blue-200 transition hover:shadow-2xl"
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-blue-700 mb-1">
                {student.name}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-2 text-blue-600">
                <FaEnvelope className="text-blue-400" />
                <p>{student.email}</p>
              </div>
              <p className="text-blue-500 mt-2">
                Grade: <span className="font-medium">{student.grade}</span>
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleEdit(student)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 text-sm flex items-center justify-center gap-2 transition duration-200"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={() => handleDelete(student._id)}
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

export default Studentlist;
