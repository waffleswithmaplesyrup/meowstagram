import Following from "../../components/Following/Following";
import Suggested from "../../components/Suggested/Suggested";
import Feed from "../../components/Feed/Feed";

export default function HomePage () {

  return (
    <div>
      <Following />
      <Suggested />
      <Feed />
    </div>
  );
}