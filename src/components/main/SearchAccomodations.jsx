import { useSearchParams, useNavigate } from "react-router-dom";
import { setSearchTerm, setCheckInOut, setGuests } from "../../app/accomodationsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function SearchAccomodations() {
  const [searchInput, setSearchInput] = useState("");
  const [checkInOut, setCheckInCheckOut] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [guests, setGuestsNum] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const dispatch = useDispatch();
  const navigation = useNavigate();


  function handleSearchChange(e) {
    e.preventDefault();
    if (e.target.value.length === 0) {
      //dispatch(submitSearch(""));
      //dispatch(setSearchResults([]));
    }

    setSearchInput(e.target.value);
  }

  function handleCheckInOut(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setCheckInCheckOut((prev) => ({ ...prev, [name]: value }));
  }

  function handleGuestsChange(e) {
    e.preventDefault();
    setGuestsNum(e.target.value);
  }
  function handleSearchSubmit(e) {
    console.log(e)
    e.preventDefault();
    
    //setSearchParams({ search: searchInput });
    dispatch(setSearchTerm({ title: searchInput }));
    if(checkInOut.checkIn !== "" && checkInOut.checkOut !== ""){

      dispatch(setCheckInOut(checkInOut));
    }
    dispatch(setGuests({num: guests}));
    navigation('/results')
   
  }

  return (
    <div className="SearchAccomodations">
       <input type="text" placeholder="Hotel" onChange={handleSearchChange} />
      <label>
        Check in
        <input type="date" name="checkIn" placeholder="" onChange={handleCheckInOut} />
        Check out
        <input type="date" name="checkOut" onChange={handleCheckInOut} />
      </label>
      <input type="number" name="guests" placeholder="guests" onChange={handleGuestsChange}/>
      <input type="submit" onClick={handleSearchSubmit} />
    </div>
  );
}
export default SearchAccomodations;
