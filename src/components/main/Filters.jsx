function Filters() {
  return (
    <div className="Filters">
      <div>Filter By:</div>
      <div className="filter-section">
        <div className="filter-h">Popular Filters</div>
        <input
          type="checkbox"
          id="Breakfast"
          name="breakfast"
          value="Breakfast"
        />
        <label>Breakfast</label>
        <br />
        <input type="checkbox" id="Beds" name="beds" value="Beds" />
        <label>Beds</label>
        <br />
        <input
          type="checkbox"
          id="cancellation"
          name="cancellation"
          value="Cancellation"
        />
        <label>Cancellation</label>
      </div>
      <div className="filter-section">
        <div className="filter-h">Room Types</div>
        <input type="checkbox" id="standard" name="standard" value="Standard" />
        <label>Standard</label>
        <br />
        <input type="checkbox" id="deluxe" name="deluxe" value="Deluxe" />
        <label>Deluxe</label>
        <br />
        <input type="checkbox" id="suite" name="suite" value="Suite" />
        <label>Suite</label>
      </div>
    </div>
  );
}
export default Filters;
