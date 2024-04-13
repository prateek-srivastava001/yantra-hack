const express = require("express");
const transcriptController = require("../controllers/transcript_controller");
const router = express.Router();

router.post("/audio", transcriptController.transcript);

module.exports = router;