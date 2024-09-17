import SearchAccomodations from "./SearchAccomodations";
function ShowCase() {
  return (
    <div className="ShowCase">
      <div className="showcase-img">
        <img src="images/showcase1.jpg" />
      </div>

      <h3>Find affordable, quality hotels.</h3>
      <SearchAccomodations />
      <div className="showcase-bottom"></div>
    </div>
  );
}
export default ShowCase;
