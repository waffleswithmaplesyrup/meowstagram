import sendRequest from "../send-request/send-request";

const BASE_URL = "/api/users";

export function signUpAPI(userData) {
  return sendRequest(`${BASE_URL}/signup`, "POST", userData);
}

export function loginAPI(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export async function deleteUserAPI(userID) {
  return sendRequest(`${BASE_URL}/${userID}`, "DELETE");
}