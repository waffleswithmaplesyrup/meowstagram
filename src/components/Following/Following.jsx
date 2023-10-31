
import FollowingCard from "./FollowingCard";

export default function Following({ following }) {
  
  return (
    <div className="d-flex col text-center justify-content-around pt-5 w-100">
      {
        following.length === 0 ? <p>404 no frens found :(</p> :
        following?.map(user => <FollowingCard key={user.id} user={user}/>)
      }
    </div>
  );
}