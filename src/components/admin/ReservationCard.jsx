function ReservationCard() {
  return (
    <div className="ReservationCard">
      <h7>Hotel Name</h7>
      <h6>Room Name</h6>
      <p>User Name</p>
      <div className="checkin-out">
        <div>
          <p>Check in</p>
          <h8>date</h8>
        </div>
        <div>
          <p>Check Out</p>
          <h8>date</h8>
        </div>
      </div>
      <div className="status-date">
        <div>
          <p>Status</p>
          <h8>paid</h8>
        </div>
        <div>
          <p>Date</p>
          <h8>date</h8>
        </div>
      </div>
      <div className="v-btn">
        <button>View</button>
      </div>
    </div>
  );
}
export default ReservationCard;
