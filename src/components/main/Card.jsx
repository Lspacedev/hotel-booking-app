import { useNavigate } from "react-router-dom";
import { setSearchTerm } from "../../app/accomodationsSlice";
import { useDispatch } from "react-redux";
function Card({ img, title }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  function searchCard() {
    dispatch(setSearchTerm({ title }));
    navigation("/results");
  }
  return (
    <div className="Card" onClick={searchCard}>
      <div className="img"></div>
      <div>{title}</div>
    </div>
  );
}
export default Card;
