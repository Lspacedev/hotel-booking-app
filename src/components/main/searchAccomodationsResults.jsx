import { useSearchParams, useParams, useNavigate } from "react-router-dom";
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
  const [guests, setGuestsNum] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const { result_id } = useParams();
  const navigation = useNavigate();

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
    if (
      searchInput === "" &&
      checkInOut.checkIn === "" &&
      checkInOut.checkOut === "" &&
      guests == 0
    ) {
      alert("No inputs entered");
    } else {
      //setSearchParams({ search: searchInput });
      if (searchInput !== "") {
        dispatch(setSearchTerm({ title: searchInput }));
        if (result_id !== "" && typeof result_id !== "undefined") {
          // alert("Results set");
        }
      } else {
        // alert("Please enter hotel destination to search");
        // return;
      }
      if (checkInOut.checkIn !== "" && checkInOut.checkOut !== "") {
        dispatch(setCheckInOut(checkInOut));
        alert("Added check in and check out dates");
      }
      if (guests !== 0) {
        dispatch(setGuests({ num: guests }));
      }
    }
  }

  return (
    <div className="SearchAccomodationsResults">
      <input type="text" placeholder="Hotel" onChange={handleSearchChange} />
      <label>
        <div>CheckIn</div>
        <input type="date" name="checkIn" onChange={handleCheckInOut} />
      </label>
      <label>
        <div>CheckOut</div>
        <input type="date" name="checkOut" onChange={handleCheckInOut} />
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
export default SearchAccomodationsResults;
