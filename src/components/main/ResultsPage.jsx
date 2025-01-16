import Nav from "./Nav";
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
  const dispatch = useDispatch();
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  const searchT =
    useSelector((state) => state.accomodations.searchTerm?.title) || "";
  const guestsNum =
    useSelector((state) => state.accomodations.guests?.num) || "";
  const tags = useSelector((state) => state.accomodations.tags?.tags);

  const sort = useSelector((state) => state.accomodations.sort?.by) || "";
  useEffect(() => {
    //if there is no sub page(:result_name)
    if (searchT !== "") {
      if (guestsNum !== "") {
        if (tags !== "" && typeof tags !== "undefined") {
          setSearchParams({
            search: searchT,
            guests: guestsNum,
            filters: tags,
          });
        } else {
          setSearchParams({ search: searchT, guests: guestsNum });
        }
      } else if (tags !== "" && typeof tags !== "undefined") {
        setSearchParams({
          search: searchT,
          filters: tags,
        });
      } else {
        setSearchParams({ search: searchT });
      }
    }
    if (searchTerm !== "") {
    }
  }, [searchT, guestsNum, tags]);

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
      if (guestsNum !== "") {
        let filteredAccomodationsGuests = filteredAccomodations.filter(
          (accomodation) => Number(accomodation.guests) >= Number(guestsNum)
        );
        dispatch(setSearchResults(filteredAccomodationsGuests));
      } else {
        dispatch(setSearchResults(filteredAccomodations));
      }

      if (tags && tags.length > 0) {
        let filteredAccomodationsFilter = [];
        tags.map((tag) => {
          let arr = filteredAccomodations.filter(
            (accomodation) => accomodation.room_type === tag
          );

          filteredAccomodationsFilter = filteredAccomodationsFilter.concat(arr);
        });
        console.log();
        dispatch(setSearchResults(filteredAccomodationsFilter));
      }
      if (sort === "low") {
        let arr = [...filteredAccomodations];
        let sorted = arr.sort((a, b) => a.price - b.price);
        dispatch(setSearchResults(sorted));
      }
      if (sort === "high") {
        let arr = [...filteredAccomodations];
        let sorted = arr.sort((a, b) => b.price - a.price);
        dispatch(setSearchResults(sorted));
      }
    }

    return () => {
      setSearchResults([]);
    };
  }, [searchTerm, guestsNum, accomodations, sort, tags, dispatch]);

  return (
    <div className="ResultsPage">
      <Nav />
      <div className="search-div">
        <SearchAccomodationsResults />
      </div>
      {searchTerm !== "" && typeof result_id === "undefined" && (
        <NavPath>
          <Link to="/" className="link">
            Home
          </Link>
          <div className="arrow">{">"}</div>

          <Link to={`/results?search=${searchTerm}`} className="link">
            {searchTerm}
          </Link>
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
