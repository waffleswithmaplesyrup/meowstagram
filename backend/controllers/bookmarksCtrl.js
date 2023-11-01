const debug = require("debug")("meowstagram:backend:controllers:bookmarksCtrl");
const sendResponse = require("../config/sendResponseHelper");

const pool = require('../config/database');

async function bookmarkPost(req, res) {
  
  try {

    debug("req.body: %o", req.body);
    debug("req.params: %o", req.params);

    const { userID } = req.body;
    const { postID } = req.params;

    //* check if user already bookmark post
    const queryCheck = `SELECT * FROM bookmarks WHERE post_id = $1 AND user_id = $2`;
    const check = await pool.query(queryCheck, [postID, userID]);
    // debug("check", check.rowCount);

    if (check.rowCount === 0) {
      const query = `INSERT INTO bookmarks (post_id, user_id) VALUES ($1, $2) RETURNING *;`;
      const newBookmark = await pool.query(query, [postID, userID]);
      // debug(newLike.rows[0]);
      res.json(newBookmark.rows[0]);
    } else {
      throw new Error("You have already bookmarked the post. Time to remove.");
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
    sendResponse(res, 500, null, "Error bookmarking post");
  }
}

async function removeBookmark(req, res) {
  try {

    debug("see req.params: %o", req.params);
    const { postID, userID } = req.params;

    const query = `DELETE FROM bookmarks WHERE post_id = $1 AND user_id = $2 RETURNING *;`;
    await pool.query(query, [postID, userID]);

    debug('Post removed from bookmarks successfully!');
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, null, "Error removing post from bookmarks");
  }
}

//* get all bookmarks from a post
async function showBookmarks(req, res) {
  try {
    const { postID } = req.params;
    const query = `SELECT bookmarks.id, post_id, user_id, username, profile_pic FROM bookmarks LEFT JOIN users ON users.id = bookmarks.user_id WHERE post_id = $1;`;
    const data = await pool.query(query, [postID]);
    const bookmarks = data.rows;
    sendResponse(res, 200, { bookmarks });
    debug("fetch all bookmarks from a post successfully");
  } catch (err) {
    sendResponse(res, 500, null, "Error getting all bookmarks");
  }
}

//* get all bookmarks from a user
async function showUserBookmarks(req, res) {
  try {
    const { userID } = req.params;
    const query = `SELECT bookmarks.id, posts.id, photo, caption, posts.date_posted, username, profile_pic FROM bookmarks LEFT JOIN posts on posts.id = bookmarks.post_id RIGHT JOIN users on users.id = posts.user_id WHERE bookmarks.user_id = $1;`;
    const data = await pool.query(query, [userID]);
    const bookmarks = data.rows;
    sendResponse(res, 200, { bookmarks });
    debug("fetch all bookmarks from a user successfully");
  } catch (err) {
    sendResponse(res, 500, null, "Error getting all bookmarks");
  }
}



module.exports = {
  bookmarkPost,
  removeBookmark,
  showBookmarks,
  showUserBookmarks
};