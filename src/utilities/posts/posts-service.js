import { 
  viewAllUserPostsAPI, 
  viewOnePostAPI, 
  createNewPostAPI, 
  deleteOnePostAPI 
} from "./posts-api";

export async function viewAllUserPostsService(username) {
  const allPosts = await viewAllUserPostsAPI(username);
  return allPosts.data.posts;
}

export async function viewOnePostService(username, postID) {
  const post = await viewOnePostAPI(username, postID);
  return post.data.post[0];
}

export async function createNewPostService(userID, postData) {
  const newPost = await createNewPostAPI(userID, postData);
  return newPost;
}

export async function deleteOnePostService(postID) {
  await deleteOnePostAPI(postID);
}