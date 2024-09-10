import AccCard from "./AccCard";
import AddAccomodation from "./AddAccomodation";

function Accomodations() {
  return (
    <div className="Accomodations">
      <AddAccomodation />
      <div className="accomodations-div">
        <AccCard />
        <AccCard />
        <AccCard />
      </div>
    </div>
  );
}
export default Accomodations;
