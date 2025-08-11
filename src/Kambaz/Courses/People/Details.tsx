import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FormControl, Form } from "react-bootstrap";
import * as client from "../../Account/client";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (!uid) return;
    const fetched = await client.findUserById(uid);
    setUser(fetched);
    setName(`${fetched.firstName || ""} ${fetched.lastName || ""}`);
  };

  useEffect(() => {
    fetchUser();
  }, [uid]);

  const saveUser = async () => {
    const [firstName, lastName] = name.trim().split(" ");
    const updatedUser = { ...user, firstName, lastName };
    const saved = await client.updateUser(updatedUser);
    setUser(saved);
    setEditing(false);
    navigate(-1);
  };

  const deleteUser = async (id: string) => {
    await client.deleteUser(id);
    navigate(-1);
  };

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />

      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}

        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}

        {editing && (
          <>
            <FormControl
              className="mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveUser()}
            />
            <FormControl
              type="email"
              className="mb-2"
              value={user.email || ""}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Form.Select
              className="mb-2"
              value={user.role || ""}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </Form.Select>
          </>
        )}
      </div>

      {!editing && (
        <>
          <b>Email:</b> <span>{user.email}</span> <br />
          <b>Role:</b> <span>{user.role}</span> <br />
        </>
      )}

      <b>Login ID:</b> <span>{user.loginId}</span> <br />
      <b>Section:</b> <span>{user.section}</span> <br />
      <b>Total Activity:</b> <span>{user.totalActivity}</span>

      <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary float-start me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
