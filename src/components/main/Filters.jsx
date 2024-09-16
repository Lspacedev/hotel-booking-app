import { useSearchParams } from "react-router-dom";
import { setFilters, setSearchResults } from "../../app/accomodationsSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
function Filters() {
  const [filterTerm, setFilterTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const filtersParams = searchParams.get("filters") || "";
  const searchTerm = searchParams.get("search") || "";
  const dispatch = useDispatch();
  function handleAddFilter(e) {
    setFilterTerm(e.target.value);
    dispatch(setFilters({ filter: e.target.value }));
  }
  function getMap() {
    if (searchTerm === "Pretoria") {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229975.8576450544!2d28.033142908237622!3d-25.75824794492457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95619cbec65033%3A0xf66262b07a847b4c!2sPretoria!5e0!3m2!1sen!2sza!4v1726476926002!5m2!1sen!2sza";
    } else if (searchTerm === "Johannesburg") {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57292.40866321166!2d27.998825035681676!3d-26.17143860390959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg!5e0!3m2!1sen!2sza!4v1726476615694!5m2!1sen!2sza";
    } else if (searchTerm === "Cape Town") {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423817.96640452865!2d18.032263996301406!3d-33.913395563198335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc500f8826eed7%3A0x687fe1fc2828aa87!2sCape%20Town!5e0!3m2!1sen!2sza!4v1726476860837!5m2!1sen!2sza";
    } else {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13719959.46917351!2d6.932171531527388!3d-32.908756264319855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c34a689d9ee1251%3A0xe85d630c1fa4e8a0!2sSouth%20Africa!5e0!3m2!1sen!2sza!4v1726476963804!5m2!1sen!2sza";
    }
  }

  return (
    <div className="Filters">
      <iframe src={getMap()} width="200" height="200"></iframe>
      <div>Filter By:</div>
      <div className="filter-section">
        <div className="filter-h">Popular Filters</div>
        {/* <input
          type="checkbox"
          id="Breakfast"
          name="breakfast"
          value="Breakfast"
        />
        <label>Breakfast</label> */}
        {/* <br /> */}
        {/* <input type="checkbox" id="Beds" name="beds" value="Beds" />
        <label>Beds</label>
        <br /> */}
        {/* <input
          type="checkbox"
          id="cancellation"
          name="cancellation"
          value="Cancellation"
        />
        <label>Cancellation</label> */}
      </div>
      <div className="filter-section">
        <div className="filter-h">Room Types</div>
        <input
          type="checkbox"
          id="standard"
          name="standard"
          value="Standard"
          onChange={handleAddFilter}
        />
        <label>Standard</label>
        <br />
        <input
          type="checkbox"
          id="deluxe"
          name="deluxe"
          value="Deluxe"
          onChange={handleAddFilter}
        />
        <label>Deluxe</label>
        <br />
        <input
          type="checkbox"
          id="suite"
          name="suite"
          value="Suite"
          onChange={handleAddFilter}
        />
        <label>Suite</label>
      </div>
    </div>
  );
}
export default Filters;
