const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({msg: "test router working!"}))

module.exports = router;