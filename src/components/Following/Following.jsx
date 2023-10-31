
import FollowingCard from "./FollowingCard";

export default function Following({ following }) {

  let randomFive;

  if (following.length > 0) {
    randomFive = following
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value).slice(0, 5);
  }
  
  return (
    <div className="d-flex col text-center justify-content-around pt-5 m-auto" style={{width: "600px"}}>
      {
        following.length === 0 ? <p>404 no frens found :(</p> :
        randomFive?.map(user => <FollowingCard key={user.id} user={user}/>)
      }
    </div>
  );
}