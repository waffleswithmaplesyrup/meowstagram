const debug = require("debug")("meowstagram:backend:controllers:commentsCtrl");
const sendResponse = require("../config/sendResponseHelper");

const pool = require('../config/database');

// const { getUser } = require("../../src/utilities/users/users-service");


async function createNewComment(req, res) {
  
  try {

    debug("req.body: %o", req.body);
    debug("req.params: %o", req.params);

    const { content, senderID } = req.body;
    // const { userID } = req.params;
    const { postID } = req.params;
    // const senderID = getUser().id;
    const query = `INSERT INTO comments (content, post_id, sender_id) VALUES ($1, $2, $3) RETURNING *;`;
    const newComment = await pool.query(query, [content, postID, senderID]);
    res.json(newComment.rows);

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
    sendResponse(res, 500, null, "Error saving comment");
  }
}

module.exports = {
  createNewComment,


};