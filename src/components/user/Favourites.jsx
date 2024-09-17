import FavouriteCard from "./FavouriteCard";
import { useSelector } from "react-redux";

function Favourites() {
  const userId = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  const [user] = users.filter((user) => user.id === userId);
  const favourites = user?.favourites;
  return (
    <div className="Favourites">
      <div className="favourites-div">
        {typeof favourites !== "undefined" &&
          favourites.map((favourite, i) => (
            <FavouriteCard key={i} favourite={favourite}  favourites={favourites}/>
          ))}
      </div>
    </div>
  );
}
export default Favourites;
