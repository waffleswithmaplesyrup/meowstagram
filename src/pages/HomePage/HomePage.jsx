import Following from "../../components/Following/Following";
import Suggested from "../../components/Suggested/Suggested";
import Feed from "../../components/Feed/Feed";
import Footer from "../../components/Footer/Footer";

export default function HomePage () {

  return (
    <>
      <div className="w-50 text-center">
        <Following />
        <hr />
        <Feed />
      </div>
      <div>
        <Suggested />
        <Footer />
      </div>
    </>
  );
}