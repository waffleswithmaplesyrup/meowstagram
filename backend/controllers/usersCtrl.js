const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const debug = require("debug")("meowstagram:backend:controllers:usersCtrl");
const sendResponse = require("../config/sendResponseHelper");

const pool = require('../config/database');

const SALT_ROUNDS = 6;

async function signup(req, res) {
  try {
    // const newUser = await User.create(req.body);

    const { username, email, password } = req.body

    if (password.length < 8) throw new Error("Password is too short. Please input at least 8 characters");
    
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;";
    const data = await pool.query(query, [username, email, hashedPassword]);
    const newUser = data.rows[0];
    debug("created new user: %o", req.body);
    const token = createJWT(newUser);
    sendResponse(res, 201, { token: token });
  } catch (err) {
    debug("Error creating: %o", err);

    let status = 500;
    let message = "Internal Server Error";

    if (err.code === '23505' && err.constraint === 'users_username_key') {
      status = 409;
      message = "Username already exists.";
    } else if (err.code === '23505' && err.constraint === 'users_email_key') {
      status = 409;
      message = "Email already exists.";
    }

    sendResponse(res, status, null, message);
  }
}

async function login(req, res) {
  debug("login user body: %o", req.body);
  try {
    const query = "SELECT * FROM users WHERE email = $1;";
    const data = await pool.query(query, [req.body.email]);
    const user = data.rows[0];
    debug("user", user);

    if (user.permissions === "deactivated") throw new Error("User account was taken down for violating terms of use.");
    if (user === undefined) throw new Error("User does not exist.");
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Incorrect password!");
    const token = createJWT(user);
    sendResponse(res, 200, { token: token });
  } catch (err) {
    debug("Error creating: %o", err);
    let status = 401;
    let message = "Unauthorised";

    if (err.message === "User does not exist.") {
      status = 404;
      message = err.message;
    }
    if (err.message === "Incorrect password!") {
      status = 401;
      message = err.message;
    }
    sendResponse(res, status, null, message);
  }
}

async function readAll(req, res) {
  try {
    const query = `SELECT id, username, profile_pic FROM users WHERE permissions = 'ok';`;
    const users = await pool.query(query);
    res.json(users.rows);
    debug("fetch all users successfully");

  } catch (err) {
    console.error(err.message);
  }
}

async function readAllAdmin(req, res) {
  try {
    const query = `SELECT * FROM users WHERE permissions != 'admin';`;
    const users = await pool.query(query);
    res.json(users.rows);
    debug("fetch all users successfully");

    sendResponse(res, 200);
  } catch (err) {
    console.error(err.message);
  }
}

async function deactivateUser(req, res) {
  const { userID } = req.params;
  const { permissions } = req.body;

  try {
    
    debug("userID", userID);
    debug("body", permissions);

    const query = "UPDATE users SET permissions = $1 WHERE users.id = $2";
    await pool.query(query, [permissions, userID]);

    sendResponse(res, 200);
  } catch (err) {
    console.error(err.message);
  }
}

async function getOne (req, res) {
  try {
    const { id } = req.params;
    // debug(id);

    const query = `SELECT * FROM users WHERE id = $1;`;
    const data = await pool.query(query, [id]);
    const user = data.rows[0];
    const token = createJWT(user);
  
    sendResponse(res, 200, { token: token });

    debug("fetch user successfully");

  } catch (err) {
    console.error(err.message);
  }
}

async function del(req, res) {
  debug("delete user: %o", req.params);
  try {
    const { id } = req.params;

    const query = `DELETE FROM users WHERE id = $1 RETURNING *;`;
    await pool.query(query, [id]);
    
    debug('User deleted successfully!');
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error deleting account");
  }
}

async function updateUserBio(req, res) {
  try {

    debug("see req.params: %o", req.params);
    const { id } = req.params;
    const { bio } = req.body;

    const query = `UPDATE users SET bio = $1 WHERE id = $2 RETURNING *;`;
    await pool.query(query, [bio, id]);

    debug('Bio updated successfully!');
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error updating bio");
  }
}

const AWS_S3_OBJECT_URL = process.env.AWS_S3_OBJECT_URL;

function uploadImg(req, res) {
  debug("files received: %o", req.files);
  const { files } = req;
  const imgURLs = files.map((file) => {
    return `${AWS_S3_OBJECT_URL}/${file.processedImage.key}`;
  });
  debug("image converted to url:", imgURLs);
  res
    .status(201)
    .json({ message: "Image successfully uploaded to S3", imageURLs: imgURLs });
}

async function updateUserPic(req, res) {
  try {

    debug("see req.params: %o", req.params);
    const { id } = req.params;
    const { profile_pic } = req.body;
    debug("profile pic:", profile_pic);
    const query = `UPDATE users SET profile_pic = $1 WHERE id = $2 RETURNING *;`;
    await pool.query(query, [profile_pic, id]);

    debug('Profile pic updated successfully!');
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error updating profile pic");
  }
}

//* ===== Helper Functions ===== *//

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

module.exports = { 
  signup, 
  login, 
  del, 
  readAllAdmin,
  deactivateUser,
  readAll,
  getOne, 
  updateUserBio,
  uploadImg,
  updateUserPic
};