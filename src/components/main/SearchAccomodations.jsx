import { useSearchParams, useNavigate } from "react-router-dom";
import {
  setSearchTerm,
  setCheckInOut,
  setGuests,
  setTags,
} from "../../app/accomodationsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function SearchAccomodations() {
  const [searchInput, setSearchInput] = useState("");
  const [checkInOut, setCheckInCheckOut] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [guests, setGuestsNum] = useState(1);
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
    e.preventDefault();
    dispatch(setTags({ type: "RESET", filter: "" }));

    if (searchInput === "") {
      alert("Please enter hotel destination to search");
      return;
    }

    //setSearchParams({ search: searchInput });
    dispatch(setSearchTerm({ title: searchInput }));
    if (checkInOut.checkIn !== "" && checkInOut.checkOut !== "") {
      dispatch(setCheckInOut(checkInOut));
    }
    dispatch(setGuests({ num: guests }));
    navigation("/results");
  }

  return (
    <div className="SearchAccomodations">
      <input type="text" placeholder="Hotel" onChange={handleSearchChange} />
      <label>
        <input
          type="date"
          name="checkIn"
          placeholder="Check in"
          onChange={handleCheckInOut}
        ></input>
      </label>

      <label>
        <input
          type="date"
          name="checkOut"
          placeholder="Check out"
          onChange={handleCheckInOut}
        />
      </label>
      <input
        type="number"
        name="guests"
        max="15"
        min="1"
        placeholder="Guests"
        onChange={handleGuestsChange}
      />
      <input type="submit" value="Search" onClick={handleSearchSubmit} />
    </div>
  );
}
export default SearchAccomodations;
