import ResultCard from "./ResultCard";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { setSort} from "../../app/accomodationsSlice";
function Results() {
  //const [sort, setSort] = useState("");
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
  const dispatch = useDispatch();

  function handleSort(e){
    dispatch(setSort({by: e.target.value}));
  }

  return (
    <div className="Results">
      <div>
        {searchResults.length} rooms found for {searchTerm}
      </div>
      <div className="sort-map">
        <select name="sort"
                onChange={(e) => handleSort(e)}
               >
          <option></option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
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
