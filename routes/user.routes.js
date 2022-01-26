const router = require("express").Router();
const auth_control = require("../controlles/auth.control");
const user_control = require("../controlles/user.control");


// auth
router.post("/", auth_control.inscription);
router.post("/login", auth_control.login);
router.get("/logout", auth_control.logout);


//users

router.get("/page-principale", user_control.getAllUsers);
router.get("/:id",  user_control.getUser);
router.delete("/:id", user_control.deleteUser);
router.put("/:id",  user_control.updateUser);
router.patch("/follow/:id", user_control.follow);
router.patch("/unfollow/:id", user_control.unfollow);
router.get("/suggestionsUser", user_control.suggestionsUser);

module.exports = router;