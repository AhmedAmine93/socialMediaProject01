const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controlles/chat.control");
const { checkUser, requireAuth} = require("../middelwares/mid");

const router = express.Router();

router.route("/").post(requireAuth, accessChat);
router.route("/").get(requireAuth, fetchChats);
router.route("/group").post(requireAuth, createGroupChat);
router.route("/rename").put(requireAuth, renameGroup);
router.route("/groupremove").put(requireAuth, removeFromGroup);
router.route("/groupadd").put(requireAuth, addToGroup);

module.exports = router;