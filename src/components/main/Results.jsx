import ResultCard from "./ResultCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { setSort } from "../../app/accomodationsSlice";
function Results() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const searchFilters = searchParams.get("filters") || "";
  const location = useLocation();
  const navigation = useNavigate();
  const { hash, pathname, search } = location;

  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  const searchT =
    useSelector((state) => state.accomodations.searchTerm?.title) || "";

  const searchResults = useSelector(
    (state) => state.accomodations.searchResults
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (search === "") {
      navigation("/");
    }
  }, [searchTerm, location]);

  function handleSort(e) {
    dispatch(setSort({ by: e.target.value }));
  }
  return (
    <div className="Results">
      <div>
        {searchResults.length} rooms found for {searchTerm}
      </div>
      <div className="sort-map">
        <select name="sort" onChange={(e) => handleSort(e)}>
          <option>Sort By Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>
      {searchTerm !== "" &&
      typeof searchResults !== "undefined" &&
      searchResults.length > 0 ? (
        <div className="results-div">
          {searchResults.map((result, i) => (
            <ResultCard key={i} result={result} />
          ))}
        </div>
      ) : (
        <div>Accomodation not found</div>
      )}
    </div>
  );
}
export default Results;
