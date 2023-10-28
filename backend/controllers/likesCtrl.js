const debug = require("debug")("meowstagram:backend:controllers:likesCtrl");
const sendResponse = require("../config/sendResponseHelper");

const pool = require('../config/database');

async function likePost(req, res) {
  
  try {

    debug("req.body: %o", req.body);
    debug("req.params: %o", req.params);

    const { senderID } = req.body;
    const { postID } = req.params;

    //* check if sender already liked post
    const queryCheck = `SELECT * FROM likes WHERE post_id = $1 AND sender_id = $2`;
    const check = await pool.query(queryCheck, [postID, senderID]);
    // debug("check", check.rowCount);

    if (check.rowCount === 0) {
      const query = `INSERT INTO likes (post_id, sender_id) VALUES ($1, $2) RETURNING *;`;
      const newLike = await pool.query(query, [postID, senderID]);
      // debug(newLike.rows[0]);
      res.json(newLike.rows[0]);
    } else {
      throw new Error("You have already liked the post. Time to unlike.");
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
    sendResponse(res, 500, null, "Error saving like");
  }
}

async function unlikePost(req, res) {
  try {

    debug("see req.params: %o", req.params);
    const { postID, senderID } = req.params;

    const query = `DELETE FROM likes WHERE post_id = $1 AND sender_id = $2 RETURNING *;`;
    await pool.query(query, [postID, senderID]);

    debug('Post unliked successfully!');
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error unliking post");
  }
}

//* get all likes from a post
async function showLikes(req, res) {
  try {
    const { postID } = req.params;
    const query = `SELECT likes.id, post_id, sender_id, username, profile_pic FROM likes LEFT JOIN users ON users.id = likes.sender_id WHERE post_id = $1;`;
    const data = await pool.query(query, [postID]);
    const likes = data.rows;
    sendResponse(res, 200, { likes });
    debug("fetch all likes from a post successfully");
  } catch (err) {
    sendResponse(res, 500, null, "Error getting all likes");
  }
}



module.exports = {
  likePost,
  unlikePost,
  showLikes
};