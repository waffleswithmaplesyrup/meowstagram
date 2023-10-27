export default function ProfilePage () {

  return (
    <div className="w-100 text-center">
      <ProfileHeader />
      <hr />
      <ProfileFeed />
    </div>
  );
}

function ProfileHeader() {
  return (
    <div>
      <img src='' alt="profile pic"/>
      <div>
        <header>
          <p>username</p>
          <button>Edit Profile</button>
        </header>
        <header>
          <p>number of posts</p>
          <p>number of followers</p>
          <p>number of following</p>
        </header>
        <header>
          bio
        </header>
      </div>
    </div>
  );
}

function ProfileFeed() {
  return (
    <div>
      
    </div>
  );
}