import { getUser } from "../users/users-service";
import { likePostAPI, unlikePostAPI, showAllLikesAPI } from "./likes-api";

export async function likePostService(postID) {
  const newLike = await likePostAPI(postID, { senderID: getUser().id });
  return newLike;
}

export async function unlikePostService(postID) {
  await unlikePostAPI(postID, getUser().id);
}

export async function showAllLikesService(postID) {
  const likes = await showAllLikesAPI(postID);
  return likes.data.likes;
}
