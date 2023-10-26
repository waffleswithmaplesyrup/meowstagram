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

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}') RETURNING *;`;
    const data = await pool.query(query);
    const newUser = data.rows[0];
    debug("created new user: %o", req.body);
    const token = createJWT(newUser);
    sendResponse(res, 201, { token: token });
  } catch (err) {
    debug("Error creating: %o", err);

    let status = 500;
    let message = "Internal Server Error";

    if (err.name === "ValidationError") {
      if (err.errors.password.kind === "minlength") {
        status = 400;
        message = "Password is too short. Please input at least 8 characters";
      }
    }
    if (err.code === 11000 && err.keyValue.username) {
      status = 409;
      message = "Username already exists.";
    } else if (err.code === 11000 && err.keyValue.email) {
      status = 409;
      message = "Email already exists.";
    }

    sendResponse(res, status, null, message);
  }
}

async function login(req, res) {
  debug("login user body: %o", req.body);
  try {
    // const user = await User.findOne({ username: req.body.username });

    const query = `SELECT * FROM users WHERE email = '${req.body.email}';`;
    const data = await pool.query(query);
    const user = data.rows[0];
    debug("user", user);

    if (user === null) throw new Error("User does not exist.");
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
    const query = `SELECT * FROM users;`;
    const users = await pool.query(query);
    res.json(users.rows);
    debug("fetch all users successfully");

  } catch (err) {
    console.error(err.message);
  }
}

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    // debug(id);

    const query = `SELECT * FROM users WHERE id = ${id};`;
    const user = await pool.query(query);
    res.json(user);

    debug("fetch user successfully");

  } catch (err) {
    console.error(err.message);
  }
};

async function deactivate(req, res) {
  debug("delete user: %o", req.params);
  try {
    const { id } = req.params;

    const query = `DELETE FROM users WHERE id = ${id} RETURNING *;`;
    await pool.query(query);
    
    debug('User deleted successfully!');
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error deleting account");
  }
}

//* ===== Helper Functions ===== *//

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

module.exports = { 
  signup, 
  login, 
  deactivate, 
  readAll,
  getOne
};