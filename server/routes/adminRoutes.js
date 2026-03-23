const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getPendingUsers,
  approveUser,
  rejectUser,
} = require("../controllers/adminController");

router.get("/pending", auth, authorize("Admin"), getPendingUsers);
router.patch("/approve/:id", auth, authorize("Admin"), approveUser);
router.patch("/reject/:id", auth, authorize("Admin"), rejectUser);

module.exports = router;
