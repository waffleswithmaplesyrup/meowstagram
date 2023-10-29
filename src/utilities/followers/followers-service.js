import { getUser } from "../users/users-service";
import { followUserAPI, showFollowsAPI, unfollowUserAPI, showFeedAPI } from "./followers-api";

export async function followUserService(username) {
  const following = await followUserAPI(username, { senderID: getUser().id });
  return following;
}

export async function unfollowUserService(username) {
  await unfollowUserAPI(username, getUser().id);
}

export async function showFollowsService(username) {
  const follow = await showFollowsAPI(username);
  return follow.data;
}

export async function showFeedService(username) {
  const feed = await showFeedAPI(username);
  return feed.data.following;
}