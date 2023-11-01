import { getUser } from "../users/users-service";
import { bookmarkPostAPI, removeBookmarkAPI, showAllBookmarksAPI, showAllUserBookmarksAPI } from "./bookmarks-api";

export async function bookmarkostService(postID) {
  const newBookmark = await bookmarkPostAPI(postID, { userID: getUser().id });
  return newBookmark;
}

export async function removeBookmarkService(postID) {
  await removeBookmarkAPI(postID, getUser().id);
}

export async function showAllBookmarksService(postID) {
  const bookmarks = await showAllBookmarksAPI(postID);
  return bookmarks.data.bookmarks;
}

export async function showAllUserBookmarksService() {
  const bookmarks = await showAllUserBookmarksAPI(getUser().id);
  return bookmarks.data.bookmarks;
}