import { signUpAPI, loginAPI, deleteUserAPI, uploadToS3API, updateProfilePicAPI, updateUserBioAPI, getLoggedInUserAPI } from "./users-api";

export async function signUpService(userData) {
  const data = await signUpAPI(userData);
  localStorage.setItem("token", data.data.token);
  return getUser();
}

export async function loginService(credentials) {
  const data = await loginAPI(credentials);
  localStorage.setItem("token", data.data.token);
  return getUser();
}

export async function logOutService() {
  localStorage.removeItem("token");
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (token === null) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token === null ? null : JSON.parse(atob(token.split(".")[1])).user;
}

export async function deleteUserService() {
  await deleteUserAPI();
  localStorage.removeItem("token");
}

export async function uploadToS3Service(imgFormData) {
  const data = await uploadToS3API(imgFormData);
  const imgURL = data.imageURLs[0];
  return imgURL;
}

export async function updateProfilePicService(profilePic) {
  // console.log("profile pic uploaded:", profilePic);
  const editedPic = await updateProfilePicAPI(getUser().id, profilePic);
  return editedPic;
}

export async function updateUserBioService(updatedBio) {
  const editedBio = await updateUserBioAPI(getUser().id, updatedBio);
  return editedBio;
}

//* after changing user info, refetch new getUser()
export async function getLoggedInUserService() {
  const data = await getLoggedInUserAPI(getUser().id);
  localStorage.removeItem("token");
  localStorage.setItem("token", data.data.token);

  return getUser();
}