import sendRequest from "../send-request/send-request";

const BASE_URL = "/api/followers";


export function followUserAPI(username, senderID) {
  return sendRequest(`${BASE_URL}/${username}/new`, "POST", senderID);
}

export function unfollowUserAPI(username, senderID) {
  return sendRequest(`${BASE_URL}/${username}/${senderID}`, "DELETE");
}

export function showFollowsAPI(username) {
  return sendRequest(`${BASE_URL}/${username}`);
}

export function showFeedAPI(username) {
  return sendRequest(`${BASE_URL}/${username}/feed`);
}