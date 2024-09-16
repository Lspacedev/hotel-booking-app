import SearchAccomodations from "./SearchAccomodations";
function ShowCase() {
  return (
    <div className="ShowCase">
      <div className="showcase-img">
        <img src="images/showcase1.jpg" />
      </div>
      <div className="showcase-bottom"></div>
      <h3>Find affordable, quality hotels.</h3>
      <SearchAccomodations />
    </div>
  );
}
export default ShowCase;
