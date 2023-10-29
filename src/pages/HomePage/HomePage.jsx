import { useEffect, useState } from "react";

import { showFollowsService } from "../../utilities/followers/followers-service";
import { getUser } from "../../utilities/users/users-service";

import Following from "../../components/Following/Following";
import Suggested from "../../components/Suggested/Suggested";
import Feed from "../../components/Feed/Feed";
import Footer from "../../components/Footer/Footer";

export default function HomePage () {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchUserFollowList = async () => {
      const data = await showFollowsService(getUser().username);
      setFollowing(data.following);
    };
    fetchUserFollowList();
  }, []);


  return (
    <>
      <div className="w-50 text-center">
        <Following following={following} />
        <hr />
        <Feed />
      </div>
      <div>
        <Suggested following={following} />
        <Footer />
      </div>
    </>
  );
}