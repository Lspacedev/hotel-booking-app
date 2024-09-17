import { useSearchParams } from "react-router-dom";
import {
  setSearchTerm,
  setCheckInOut,
  setGuests,
} from "../../app/accomodationsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
function SearchAccomodationsResults() {
  const [searchInput, setSearchInput] = useState("");
  const [checkInOut, setCheckInCheckOut] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [guests, setGuestsNum] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const dispatch = useDispatch();

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
    e.preventDefault();

    //setSearchParams({ search: searchInput });
    dispatch(setSearchTerm({ title: searchInput }));
    if (checkInOut.checkIn !== "" && checkInOut.checkOut !== "") {
      dispatch(setCheckInOut(checkInOut));
    }
    dispatch(setGuests({ num: guests }));
  }

  return (
    <div className="SearchAccomodationsResults">
      <input type="text" placeholder="Hotel" onChange={handleSearchChange} />
      <label>
        Checkin
        <input type="date" name="checkIn" onChange={handleCheckInOut} />
        Checkout
        <input type="date" name="checkOut" onChange={handleCheckInOut} />
      </label>
      <input
        type="number"
        name="guests"
        placeholder="Guests"
        onChange={handleGuestsChange}
      />
      <input type="submit" onClick={handleSearchSubmit} />
    </div>
  );
}
export default SearchAccomodationsResults;
