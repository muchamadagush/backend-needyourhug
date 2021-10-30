const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/users");
const auth = require("../middlewares/auth");

router
  .get("/", auth, userControllers.getUser)
  .patch("/phone", auth, userControllers.updatePhoneUser)
  .patch("/username", auth, userControllers.updateUsernameUser)
  .patch("/bio", auth, userControllers.updateBioUser)
  .patch("/avatar", auth, userControllers.updateAvatarUser)
  .get("/user", auth, userControllers.getUserProfile)
  .get("/user/:id", auth, userControllers.getUserById)
  .patch("/role/:id", auth, userControllers.updateRoleUser)
  .get("/psikolog", auth, userControllers.getPsikolog)
  .delete("/psikolog/:id", auth, userControllers.deletePsikolog)
  .get("/users/:role", auth, userControllers.getUSerByRole)

module.exports = router;
