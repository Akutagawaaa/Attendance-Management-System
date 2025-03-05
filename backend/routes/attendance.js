import express from "express";
import pool from "../db.js"; // ✅ Ensure correct import

const router = express.Router();

// ✅ Fetch attendance records
router.get("/attendance", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM attendance ORDER BY date DESC, time DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
});

// ✅ Mark attendance
router.post("/mark-attendance", async (req, res) => {
  try {
    const { name, email, lab, training, date, time } = req.body;
    const result = await pool.query(
      "INSERT INTO attendance (name, email, lab, training, date, time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, lab, training, date, time]
    );
    res.json({ message: "Attendance recorded successfully!", record: result.rows[0] });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ error: "Failed to save attendance" });
  }
});

export default router;
