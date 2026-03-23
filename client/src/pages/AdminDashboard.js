import { useEffect, useState } from "react";
import {
  getPendingUsers,
  approveUser,
  rejectUser,
} from "../services/adminService";

import "../styles/admin.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("All");

  // NEW STATES
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");

  const loadUsers = async () => {
    try {
      const data = await getPendingUsers();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Unexpected response:", data);
        setUsers([]);
      }
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 🔐 OPEN MODAL INSTEAD OF DIRECT APPROVE
  const handleApproveClick = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const confirmApprove = async () => {
    if (!adminPassword) {
      alert("Please enter admin password");
      return;
    }

    try {
      await approveUser(selectedUserId, adminPassword); // pass password if backend supports
      setShowModal(false);
      setAdminPassword("");
      setSelectedUserId(null);
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  };

  const handleReject = async (id) => {
    await rejectUser(id);
    loadUsers();
  };

  const toggleExpand = (id) => {
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  const filteredUsers =
    filter === "All" ? users : users.filter((user) => user.role === filter);

  return (
    <div className="admin-container">
      <h2>Pending User Approvals</h2>

      <div className="admin-filter">
        <label>Filter:</label>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Doctor">Doctor</option>
          <option value="Volunteer">Volunteer</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <p>No pending users</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <>
                {/* MAIN ROW */}
                <tr
                  key={user._id}
                  className="clickable-row"
                  onClick={() => toggleExpand(user._id)}
                >
                  <td>{user.name}</td>
                  <td>{user.role}</td>

                  <td>
                    <span className="status pending">
                      {user.verificationStatus}
                    </span>
                  </td>

                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="approve-btn"
                      onClick={() => handleApproveClick(user._id)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleReject(user._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>

                {/* EXPANDED ROW */}
                {expandedUserId === user._id && (
                  <tr className="expanded-row">
                    <td colSpan="4">
                      <div className="expanded-content">
                        <p>
                          <strong>Email:</strong> {user.email}
                        </p>

                        {user.role === "Doctor" && (
                          <>
                            <p>
                              <strong>Specialization:</strong>{" "}
                              {user.doctorInfo?.specialization || "-"}
                            </p>

                            {/* 📄 DOCUMENTS SECTION */}
                            <div className="documents-section">
                              <h4>Documents</h4>

                              {/* SINGLE LICENSE FORMAT */}
                              {user.doctorInfo?.licenseUrl && (
                                <div className="doc-card">
                                  <span>Medical License</span>
                                  <a
                                    href={user.doctorInfo.licenseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="view-btn"
                                  >
                                    View
                                  </a>
                                </div>
                              )}

                              {/* MULTIPLE DOCUMENTS FORMAT */}
                              {user.documents?.length > 0
                                ? user.documents.map((doc, index) => (
                                    <div key={index} className="doc-card">
                                      <span>{doc.name || "Document"}</span>
                                      <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="view-btn"
                                      >
                                        View
                                      </a>
                                    </div>
                                  ))
                                : !user.doctorInfo?.licenseUrl && (
                                    <p className="no-docs">
                                      No documents uploaded
                                    </p>
                                  )}
                            </div>
                          </>
                        )}

                        <p>
                          <strong>User ID:</strong> {user._id}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔐 APPROVAL MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Approval</h3>
            <p>Enter admin password to approve this user:</p>

            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Admin Password"
            />

            <div className="modal-actions">
              <button onClick={confirmApprove} className="approve-btn">
                Confirm
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setAdminPassword("");
                }}
                className="reject-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
