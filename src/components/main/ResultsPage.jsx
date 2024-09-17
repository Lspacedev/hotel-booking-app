import Nav from "./Nav";
import SearchAccomodations from "./SearchAccomodations";
import Footer from "./Footer";
import SearchAccomodationsResults from "./searchAccomodationsResults";
import NavPath from "./NavPath";
import Filters from "./Filters";
import Results from "./Results";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useParams, Outlet, Link } from "react-router-dom";
import { useEffect } from "react";

import { setSearchResults } from "../../app/accomodationsSlice";

function ResultsPage() {
  const { result_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const guestsN = searchParams.get("guests") || "";
  const filterTerm = searchParams.get("filters") || "";
  const dispatch = useDispatch();
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  const searchT =
    useSelector((state) => state.accomodations.searchTerm?.title) || "";
  const guestsNum =
    useSelector((state) => state.accomodations.guests?.num) || "";
  const filters = useSelector((state) => state.accomodations.filters?.filter);

  const sort =
  useSelector((state) => state.accomodations.sort?.by) || "";
  useEffect(() => {
    //if there is no sub page(:result_name)
    if (searchT !== "") {
      if (guestsNum !== "") {
        if (filters !== "" && typeof filters !== "undefined") {
          setSearchParams({
            search: searchT,
            guests: guestsNum,
            filters: filters,
          });
        } else {
          setSearchParams({ search: searchT, guests: guestsNum });
        }
      } else if (filters !== "" && typeof filters !== "undefined") {
        setSearchParams({
          search: searchT,
          filters: filters,
        });
      } else {
        setSearchParams({ search: searchT });
      }
    }
    if (searchTerm !== "") {
    }
  }, [searchT, guestsNum, filters]);

  useEffect(() => {
    if (
      searchTerm.length > 0 &&
      typeof accomodations !== "undefined" &&
      accomodations.length > 0
    ) {
      let filteredAccomodations = accomodations.filter(
        (accomodation) =>
          accomodation.hotel_name
            .toLowerCase()
            .match(searchTerm.toLowerCase()) ||
          accomodation.room_type.toLowerCase().match(searchTerm.toLowerCase())
      );
      if (guestsN !== "") {
        console.log(guestsN);
        let filteredAccomodationsGuests = filteredAccomodations.filter(
          (accomodation) => accomodation.guests === guestsN
        );
        console.log(filteredAccomodationsGuests);
        dispatch(setSearchResults(filteredAccomodationsGuests));
      } else {
        dispatch(setSearchResults(filteredAccomodations));
      }
      if (filterTerm !== "") {
        let filteredAccomodationsFilter = filteredAccomodations.filter(
          (accomodation) => accomodation.room_type === filterTerm
        );

        dispatch(setSearchResults(filteredAccomodationsFilter));
      } else {
        dispatch(setSearchResults(filteredAccomodations));
      }
    
        if(sort === "low"){
          let arr = [...filteredAccomodations];
          let sorted = arr.sort((a,b)=> a.price - b.price);
          dispatch(setSearchResults(sorted));
        }
        if(sort === "high"){
          let arr = [...filteredAccomodations];
          let sorted = arr.sort((a,b)=> b.price - a.price);
          dispatch(setSearchResults(sorted));

        }
    
    }

    return () => {
      //setSearchResults([]);
    };
  }, [searchTerm, guestsN, accomodations, sort, filterTerm, dispatch]);

  return (
    <div className="ResultsPage">
      <Nav />
      <div className="search-div">
        <SearchAccomodationsResults />
      </div>
      {searchTerm !== "" && (
        <NavPath>
          <Link to="/">Home</Link> /
          <Link to={`/results?search=${searchTerm}`}>{searchTerm}</Link>
        </NavPath>
      )}
      {result_id !== "" && typeof result_id !== "undefined" ? (
        <Outlet />
      ) : (
        <div className="results-main">
          <Filters />
          <Results />
        </div>
      )}

      <Footer />
    </div>
  );
}
export default ResultsPage;
