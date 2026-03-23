const User = require("../models/user");

exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ verificationStatus: "Pending" }).select(
      "-password",
    );

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: "Approved" },
      { new: true },
    );

    res.json({ msg: "User approved", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: "Rejected" },
      { new: true },
    );

    res.json({ msg: "User rejected", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
