const db = require("../models");
const passport = require("passport");
require("../config/passport");
const bcrypt = require("bcryptjs");

module.exports = app => {
  app.post("/api/sign-in", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. Passwords will be auto hashed and stored securely.
  app.post("/api/sign-up", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    let { twitterURL, linkedinURL, githubURL } = req.body;

    if (twitterURL === "") {
      twitterURL = null;
    }

    if (linkedinURL === "") {
      linkedinURL = null;
    }

    if (githubURL === "") {
      githubURL = null;
    }

    await db.User.create({
      email,
      password,
      firstName,
      lastName,
      twitterURL,
      linkedinURL,
      githubURL
    });

    try {
      res.redirect(307, "/api/sign-in");
    } catch (error) {
      res.status(401).json(error);
    }
  });

  // Route for logging user out.
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/sign-in");
  });

  // Route for getting some data about our user to be used client side.
  app.get("/api/user_data", async (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.status(404).json({});
    } else {
      // Otherwise send back the user's email and id
      const userData = await db.User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password"] }
      });

      res.status(200).json(userData);
    }
  });

  // Route for updating the user's information.
  app.put("/api/user_data", async (req, res) => {
    if (!req.user) {
      return;
    }

    const updatedUser = {};

    const {
      email,
      password,
      firstName,
      lastName,
      twitterURL,
      linkedinURL,
      githubURL,
      bio,
      profilePic
    } = req.body;

    if (email !== "") {
      updatedUser.email = email;
    }

    if (password !== "") {
      updatedUser.password = bcrypt.hashSync(password, 10);
    }

    if (firstName !== "") {
      updatedUser.firstName = firstName;
    }

    if (lastName !== "") {
      updatedUser.lastName = lastName;
    }

    if (twitterURL !== "") {
      updatedUser.twitterURL = twitterURL;
    }

    if (linkedinURL !== "") {
      updatedUser.linkedinURL = linkedinURL;
    }

    if (githubURL !== "") {
      updatedUser.githubURL = githubURL;
    }

    if (bio !== "") {
      updatedUser.bio = bio;
    }

    if (profilePic !== "") {
      updatedUser.profilePic = profilePic;
    }

    const updatedInfo = await db.User.update(updatedUser, {
      where: { id: req.user.id }
    });

    try {
      res.status(200).json(updatedInfo);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.delete("/api/user_data", async (req, res) => {
    const deleteUser = await db.User.destroy({
      where: { id: req.user.id }
    });

    try {
      res.status(200).json(deleteUser);
    } catch (error) {
      res.status(401).json(error);
    }
  });
};
