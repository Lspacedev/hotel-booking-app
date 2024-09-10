function PendingCard() {
  return (
    <div className="PendingCard">
      <h6>Hotel Name</h6>
      <p>You reserved room_name on date and paid on date</p>
      <div className="pending-btns">
        <button>Pay</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}
export default PendingCard;
