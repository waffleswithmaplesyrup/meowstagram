import { useEffect, useState } from "react";
import { showFeedService } from "../../utilities/followers/followers-service";
import { getUser } from "../../utilities/users/users-service";
import FeedCard from "./FeedCard";


export default function Feed () {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const data = await showFeedService(getUser().username); 
      setFeed(data);
    };
    fetchFeed();
  }, []);

  return (
    <div>
      {
        feed.length === 0 ? <p>Start following frens to see their posts!</p>
        :
        feed?.map(post => <FeedCard key={post.id} post={post} />)
      }
    </div>
  );
}