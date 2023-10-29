import sendRequest from "../send-request/send-request";

const BASE_URL = "/api/users";

export function signUpAPI(userData) {
  return sendRequest(`${BASE_URL}/signup`, "POST", userData);
}

export function loginAPI(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function getAllUsersAPI() {
  return sendRequest(`${BASE_URL}/readAll`);
}

export async function deleteUserAPI(userID) {
  return sendRequest(`${BASE_URL}/${userID}`, "DELETE");
}

export function uploadToS3API(imgFormData) {
  return sendRequest(`${BASE_URL}/new/upload`, "POST", imgFormData, true);
}

export function updateProfilePicAPI(userID, profilePic) {
  return sendRequest(`${BASE_URL}/${userID}/updatePic`, "PATCH", profilePic);
}

export function updateUserBioAPI(userID, updatedBio) {
  return sendRequest(`${BASE_URL}/${userID}/updateBio`, "PATCH", updatedBio);
}

export function getLoggedInUserAPI(userID) {
  return sendRequest(`${BASE_URL}/${userID}`);
}