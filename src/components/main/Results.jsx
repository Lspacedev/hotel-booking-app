import ResultCard from "./ResultCard";
import { useSelector } from "react-redux";

function Results() {
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  const searchT =
    useSelector((state) => state.accomodations.searchTerm?.title) || "";

  const searchResults = useSelector(
    (state) => state.accomodations.searchResults
  );

  return (
    <div className="Results">
      <div>3 rooms found in Location</div>
      <div className="sort-map">
        <select>
          <option>Price</option>
        </select>
        <button className="show-map-btn">Show map</button>
      </div>
      {typeof searchResults !== "undefined" && searchResults.length > 0 ? (
        <div className="results-div">
          {searchResults.map((result, i) => (
            <ResultCard key={i} result={result} />
          ))}
        </div>
      ) : (
        <div>
          {typeof accomodations !== "undefined" &&
            accomodations.length > 0 &&
            accomodations.map((accomodation, i) => (
              <ResultCard key={i} result={accomodation} />
            ))}
        </div>
      )}
    </div>
  );
}
export default Results;
