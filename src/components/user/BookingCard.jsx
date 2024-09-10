function BookingCard() {
  return (
    <div className="BookingCard">
      <div className="img"></div>
      <div className="booking-card-info">
        <div className="side-one">
          <h4>Room Name</h4>
          <h6>Location</h6>
          <p>Rating</p>
          <p>Description</p>
        </div>
        <div className="side-two">
          <p>Price</p>
          <p>Status</p>
        </div>
      </div>
    </div>
  );
}
export default BookingCard;
