import ReservationCard from "./ReservationCard";

function Reservations() {
  return (
    <div className="Reservations">
      <div className="reservations-div">
        <div className="pending-section">
          <h5>Pending</h5>
          <ReservationCard />
          <ReservationCard />
        </div>
        <div className="approved-section">
          <h5>Approved</h5>
        </div>
        <div className="cancelled-section">
          <h5>Cancelled</h5>
        </div>
      </div>
    </div>
  );
}
export default Reservations;
