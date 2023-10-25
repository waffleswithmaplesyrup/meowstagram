export default function Suggested () {
  return (
    <div>
      <p>Suggested For You</p>
      <SuggestedCard />
    </div>
  );
}

function SuggestedCard () {

  return (
    <div>
      <img src='' alt='new friend'/>
      <p>new friend username</p>
      <button>Follow</button>
    </div>
  );
}