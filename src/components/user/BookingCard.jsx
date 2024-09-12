function BookingCard({ booking }) {
  return (
    <div className="BookingCard">
      <div className="img"></div>
      <div className="booking-card-info">
        <div className="side-one">
          <h4>{booking.room_name}</h4>
          <h6>{booking.hotel_name}</h6>
          <p>{booking.rating}</p>
          <p>{booking.description}</p>
        </div>
        <div className="side-two">
          <p>{booking.price}</p>
          <p>{booking.status}</p>
        </div>
      </div>
    </div>
  );
}
export default BookingCard;
