import PendingCard from "./PendingCard";

function Pending() {
  return (
    <div className="Pending">
      <div className="pending-div">
        <div className="pending-section">
          <h5>Pending</h5>
          <PendingCard />
          <PendingCard />
        </div>
        <div className="cancelled-section">
          <h5>Cancelled</h5>
        </div>
      </div>
    </div>
  );
}
export default Pending;
