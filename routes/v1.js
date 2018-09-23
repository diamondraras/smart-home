const express = require("express");
const router = express.Router();

const UserController = require("./../controllers/UserController");
const PostController = require("../controllers/PostController");
const ProfilController = require("../controllers/ProfilController");

const HomeController = require("../controllers/HomeController");
const ActuatorController = require("./../controllers/ActuatorController");
const AccountController = require("./../controllers/AccountController");

const HistoryController = require("../controllers/HistoryController");

const passport = require("passport");

const path = require("path");

//Role validator
const role = require("./../middleware/role");

//File Uploader
const upload = require("../middleware/upload");

require("./../middleware/passport")(passport);
//**** Static routes ****/
router.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({
    status: "success",
    message: "Parcel Pending API",
    data: { version_number: "v1.0.0" }
  });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  HomeController.getMyFriendsPost
);

//User Routing
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController.get
);
router.get(
  "/users/all",
  passport.authenticate("jwt", { session: false }),
  UserController.getAll
);
router.post("/users", UserController.create);
router.post("/users/login", UserController.login);
router.post(
  "/users/get",
  passport.authenticate("jwt", { session: false }),
  UserController.getSingle
);
router.put(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController.update
);
router.delete(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController.remove
);

//Session Manager
router.get(
  "/users/session/destroy",
  passport.authenticate("jwt", { session: false }),
  UserController.removeRefreshToken
)

//Profil Routing
router.get(
  "/users/profil",
  passport.authenticate("jwt", { session: false }),
  ProfilController.getMyProfil
);
router.get(
  "/users/profil/getClapList",
  passport.authenticate("jwt", { session: false }),
  ProfilController.getMyClapList
);
router.get(
  "/users/profil/getFollowingList",
  passport.authenticate("jwt", { session: false }),
  ProfilController.getMyFollowingList
);
router.get(
  "/users/profil/getFollowerList",
  passport.authenticate("jwt", { session: false }),
  ProfilController.getMyFollowerList
);

router.post(
  "/users/profil/photo",
  passport.authenticate("jwt", { session: false }),
  upload.fields([{ name: "file", maxCount: 1 }]),
  ProfilController.updateMyPhoto
);

router.put(
  "/users/profil",
  passport.authenticate("jwt", { session: false }),
  ProfilController.updateMyProfil
);
router.put(
  "/users/follow",
  passport.authenticate("jwt", { session: false }),
  ProfilController.addToMyFollowingList
); // C
router.put(
  "/users/clap/add",
  passport.authenticate("jwt", { session: false }),
  ProfilController.addMyClap
); // C

router.delete(
  "/users/unfollow",
  passport.authenticate("jwt", { session: false }),
  ProfilController.removeFromMyFollowingList
); // D
router.delete(
  "/users/clap/remove",
  passport.authenticate("jwt", { session: false }),
  ProfilController.removeMyClap
); // D

//POST Routing
router.get(
  "/users/posts",
  passport.authenticate("jwt", { session: false }),
  PostController.getAllByUser
);
router.post(
  "/users/posts",
  passport.authenticate("jwt", { session: false }),
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "content" },
    { name: "title" },
    { name: "hashtag" },
    { name: "postType" },
    { name: "thumbnail", maxcount: 1 }
  ]),
  PostController.create
);

router.post(
  "/users/multiple/posts",
  passport.authenticate("jwt", { session: false }),
  upload.fields([
    { name: "file", maxCount: 500 },
    { name: "content" },
    { name: "title" },
    { name: "hashtag" },
    { name: "postType" },
    { name: "thumbnail", maxcount: 500 }
  ]),
  PostController.createMultiple
);

router.put(
  "/users/posts",
  passport.authenticate("jwt", { session: false }),
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "postId" },
    { name: "content" },
    { name: "title" },
    { name: "hashtag" },
    { name: "postType" },
    { name: "thumbnail", maxcount: 1 }
  ]),
  PostController.update
);
router.delete(
  "/users/posts",
  passport.authenticate("jwt", { session: false }),
  PostController.remove
);
// Get a single post
router.get(
  "/users/posts/:post_id",
  passport.authenticate("jwt", { session: false }),
  PostController.get
);
router.post(
  "/users/posts/share",
  passport.authenticate("jwt", { session: false }),
  PostController.shareMe
);

//********* API DOCUMENTATION **********
router.use(
  "/docs",
  express.static(path.join(__dirname, "/../public/docs"))
);

//********** Actuators ******************/
router.post(
  "/switch/turn_on",
  ActuatorController.switchOn
);

//********** Accounts *******************/
router.post(
  "/account/sync",
  AccountController.sync
);

//********** Dev *******************/
router.post(
  "/dev/history/generate",
  HistoryController.generateDate
);


module.exports = router;
