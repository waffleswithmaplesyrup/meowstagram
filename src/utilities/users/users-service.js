import { showFollowsService } from "../followers/followers-service";
import { signUpAPI, loginAPI, getAllUsersAdminAPI, getAllUsersAPI, deleteUserAPI, uploadToS3API, updateProfilePicAPI, updateUserBioAPI, getLoggedInUserAPI, deactivateUserAPI, searchUsersAPI } from "./users-api";

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

export async function getAllUsersAdminService() {
  const users = await getAllUsersAdminAPI(getUser().permissions);
  return users;
}

export async function deactivateUserService(userID, action) {
  const user = await deactivateUserAPI(userID, action, getUser().permissions);
  return user;
}

export async function getSuggestedUsersService() {
  const users = await getAllUsersAPI();
  const following = await showFollowsService(getUser().username);

  const alreadyFollowing = following.following?.map(user => user.recipient_id);
  // console.log(alreadyFollowing);

  const unshuffled = users.filter(user => {
    if (!alreadyFollowing.includes(user.id) && user.id !== getUser().id) {
      return user;
    }
  });

  const suggested = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return suggested.slice(0, 3);
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

export async function searchUsersService(keyword) {
  const users = await searchUsersAPI(keyword);
  return users.data.users;
}