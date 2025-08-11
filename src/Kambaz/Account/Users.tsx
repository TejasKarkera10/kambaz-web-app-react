import { useState, useEffect } from "react";
import * as client from "./client";
import PeopleTable from "../Courses/People/Table";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    try {
      const allUsers = await client.findAllUsers();
      console.log("Fetched all users", allUsers);
      setUsers(allUsers);
    } catch (err) {
      console.error("fetchUsers error:", err);
    }
  };

  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    setName(""); // clear name filter when role changes
    try {
      if (selectedRole) {
        const filteredUsers = await client.findUsersByRole(selectedRole);
        console.log("Users filtered by role", selectedRole, filteredUsers);
        setUsers(filteredUsers);
      } else {
        fetchUsers();
      }
    } catch (err) {
      console.error("filterUsersByRole error:", err);
    }
  };

  const filterUsersByName = async (searchName: string) => {
    setName(searchName);
    setRole(""); // clear role filter when name changes
    try {
      if (searchName) {
        const filteredUsers = await client.findUsersByPartialName(searchName);
        console.log("Users filtered by name", searchName, filteredUsers);
        setUsers(filteredUsers);
      } else {
        fetchUsers();
      }
    } catch (err) {
      console.error("filterUsersByName error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
const createUser = async () => {
  const username = `newuser${Date.now()}`;
  const user = await client.createUser({
    firstName: "New",
    lastName: `User${users.length + 1}`,
    username,
    loginId: username, // ✅ add this line
    password: "password123",
    email: `email${users.length + 1}@neu.edu`,
    section: "S101",
    role: "STUDENT",
  });
  setUsers([...users, user]);
};

  return (
    <div>
            <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>

      {/* Name filter input */}
      <FormControl
        type="text"
        placeholder="Search people"
        value={name}
        onChange={(e) => filterUsersByName(e.target.value)}
        className="float-start w-25 me-2 wd-filter-by-name"
      />

      {/* Role dropdown */}
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <div style={{ clear: "both", marginTop: "1rem" }}></div>

      <PeopleTable users={users} />
    </div>
  );
}
