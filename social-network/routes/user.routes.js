const router = require("express").Router();
const auth_control = require("../controlles/auth.control");
const user_control = require("../controlles/user.control");
//const auth_mid = require("../middelwares/mid");

// auth
router.post("/enregistrement", auth_control.inscription);
router.post("/login", auth_control.login);
router.get("/logout", auth_control.logout);
// router.post("/refresh_token", auth_control.generateAccessToken);

//users

router.get("/", user_control.getAllUsers);
router.get("/:id",  user_control.getUser);
router.delete("/:id", user_control.deleteUser);
router.put("/:id",  user_control.updateUser);
router.patch("/follow/:id", user_control.follow);
router.patch("/unfollow/:id",  user_control.unfollow);
router.get("/suggestionsUser", user_control.suggestionsUser);

module.exports = router;