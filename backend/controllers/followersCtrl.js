const debug = require("debug")("meowstagram:backend:controllers:followersCtrl");
const sendResponse = require("../config/sendResponseHelper");

const pool = require('../config/database');

async function followUser(req, res) {
  
  try {

    debug("req.body: %o", req.body);
    debug("req.params: %o", req.params);

    const { senderID } = req.body;
    const { username } = req.params;

    const recipientData = await pool.query("SELECT id FROM users WHERE username = $1;", [username]);
    const recipientID = recipientData.rows[0].id;

    //* check if sender already followed recipient
    const queryCheck = `SELECT * FROM followers WHERE recipient_id = $1 AND follower_id = $2`;
    const check = await pool.query(queryCheck, [recipientID, senderID]);
    // debug("check", check.rowCount);

    if (check.rowCount === 0) {
      const query = `INSERT INTO followers (recipient_id, follower_id) VALUES ($1, $2) RETURNING *;`;
      const youFollowing = await pool.query(query, [recipientID, senderID]);
      res.json(youFollowing.rows[0]);
    } else {
      throw new Error("You have already followed this user. Time to unfollow?");
    }

  } catch (err) {
    debug("Error saving: %o", err);
    if (err.name === "ValidationError") {
      const errors = {};
      debug("Error saving errors:", err.errors);
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      const errorMessage = Object.keys(errors)[0];
      return sendResponse(res, 400, null, errors[errorMessage]);
    }
    sendResponse(res, 500, null, "Error following this user.");
  }
}

async function unfollowUser(req, res) {
  try {

    debug("see req.params: %o", req.params);
    const { username, senderID } = req.params;


    const recipientData = await pool.query("SELECT id FROM users WHERE username = $1;", [username]);
    const recipientID = recipientData.rows[0].id;

    const query = `DELETE FROM followers WHERE recipient_id = $1 AND follower_id = $2 RETURNING *;`;
    await pool.query(query, [recipientID, senderID]);

    debug('User unfollowed successfully!');
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error unfollowing user.");
  }
}

//* get all followers and following or a user
async function showfollows(req, res) {
  try {
    const { username } = req.params;

    const senderData = await pool.query("SELECT id FROM users WHERE username = $1;", [username]);
    const senderID = senderData.rows[0].id;

    debug("senderID", senderID);

    const queryFollowing = `SELECT recipient_id, username, profile_pic FROM followers LEFT JOIN users ON users.id = recipient_id WHERE follower_id = $1;`;
    const dataFollowing = await pool.query(queryFollowing, [senderID]);
    const following = dataFollowing.rows;

    const queryFollowers = `SELECT follower_id, username, profile_pic FROM followers LEFT JOIN users ON users.id = follower_id WHERE recipient_id = $1;`;
    const dataFollowers = await pool.query(queryFollowers, [senderID]);
    const followers = dataFollowers.rows;

    // debug(following);
    sendResponse(res, 200, { following, followers });
    debug("fetch all follows successfully");
  } catch (err) {
    sendResponse(res, 500, null, "Error getting follows");
  }
}

async function showFeed(req, res) {
  try {
    const { username } = req.params;

    const senderData = await pool.query("SELECT id FROM users WHERE username = $1;", [username]);
    const senderID = senderData.rows[0].id;

    debug("senderID", senderID);

    const queryFollowing = `SELECT recipient_id, username, profile_pic, posts.id, photo, caption, date_posted, status FROM followers LEFT JOIN users ON users.id = recipient_id LEFT JOIN posts ON posts.user_id = followers.recipient_id WHERE follower_id = $1;`;
    const dataFollowing = await pool.query(queryFollowing, [senderID]);
    const following = dataFollowing.rows;

    // debug(following);
    sendResponse(res, 200, { following });
    debug("fetch feed successfully");
  } catch (err) {
    sendResponse(res, 500, null, "Error getting feed posts");
  }
}


module.exports = {
  followUser,
  unfollowUser,
  showfollows,
  showFeed
};