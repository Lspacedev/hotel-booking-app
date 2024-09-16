import ResultCard from "./ResultCard";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function Results() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const searchFilters = searchParams.get("filters") || "";
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
      <div>
        {searchResults.length} rooms found for {searchTerm}
      </div>
      <div className="sort-map">
        <select>
          <option>Price</option>
        </select>
      </div>
      {typeof searchResults !== "undefined" && searchResults.length > 0 ? (
        <div className="results-div">
          {searchResults.map((result, i) => (
            <ResultCard key={i} result={result} />
          ))}
        </div>
      ) : (
        <div>
          Accomodation not found
          {/* {typeof accomodations !== "undefined" &&
            accomodations.length > 0 &&
            accomodations.map((accomodation, i) => (
              <ResultCard key={i} result={accomodation} />
            ))} */}
        </div>
      )}
    </div>
  );
}
export default Results;
