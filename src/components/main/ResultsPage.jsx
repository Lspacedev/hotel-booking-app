import Nav from "./Nav";
import SearchAccomodations from "./SearchAccomodations";
import Footer from "./Footer";
import SearchAccomodationsResults from "./searchAccomodationsResults";
import NavPath from "./NavPath";
import Filters from "./Filters";
import Results from "./Results";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useParams, Outlet } from "react-router-dom";
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
  useEffect(() => {
    //if there is no sub page(:result_name)
    if (searchT !== "") {
      if (guestsNum !== "") {
        setSearchParams({ search: searchT, guests: guestsNum });
      }else{
      setSearchParams({ search: searchT });
      }
    
    }

  }, [searchT, guestsNum]);

  useEffect(() => {
    console.log({ searchTerm, accomodations });
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
      if(guestsN !=='') {
        console.log(guestsN)
        let filteredAccomodationsGuests = filteredAccomodations.filter((accomodation) =>
          accomodation.guests === guestsN);
        console.log(filteredAccomodationsGuests)
        dispatch(setSearchResults(filteredAccomodationsGuests));

      }else {
        dispatch(setSearchResults(filteredAccomodations));
      }
    }

    return () => {
      //setSearchResults([]);
    };
  }, [searchTerm,guestsN, accomodations, dispatch]);

  return (
    <div className="ResultsPage">
      <Nav />
      <div className="search-div">
        <SearchAccomodationsResults />
      </div>
      <NavPath>
        <a href="#">Test</a>/<a href="#">Test</a>/<a href="#">Test</a>
      </NavPath>
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
