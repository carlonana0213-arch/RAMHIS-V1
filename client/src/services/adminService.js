const API = "http://localhost:5000/api/admin";

export const getPendingUsers = async () => {
  const res = await fetch(`${API}/pending`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.json();
};

export const approveUser = async (id) => {
  const res = await fetch(`${API}/approve/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.json();
};

export const rejectUser = async (id) => {
  const res = await fetch(`${API}/reject/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.json();
};
