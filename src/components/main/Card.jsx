import { useNavigate } from "react-router-dom";
import {
  setSearchTerm,
  setTags,
  setGuests,
} from "../../app/accomodationsSlice";
import { useDispatch } from "react-redux";
function Card({ title, url, room_number }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  function searchCard() {
    dispatch(setTags({ type: "RESET", filter: "" }));
    dispatch(setGuests({ num: "" }));
    dispatch(setSearchTerm({ title }));
    navigation("/results");
  }
  return (
    <div className="Card" onClick={searchCard}>
      <div className="img">
        <img src={url} />
      </div>
      <div className="title">{title}</div>
      {room_number && (
        <div className="room-number">{room_number + " rooms"}</div>
      )}
    </div>
  );
}
export default Card;
