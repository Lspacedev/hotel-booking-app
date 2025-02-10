import BookingCard from "./BookingCard";
import { useSelector } from "react-redux";

function Bookings() {
  const user = useSelector((state) => state.user.currentUser);
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  let bookings = [];
  accomodations.forEach((accomodation) => {
    if (accomodation.bookings.length > 0) {
      accomodation.bookings.forEach((booking) => {
        if (booking.userId === user) {
          bookings.push({ ...accomodation, status: booking.status });
        }
      });
    }
  });

  return (
    <div className="Bookings">
      <div className="bookings-div">
        {typeof bookings !== "undefined" && bookings.length > 0 ? (
          bookings.map((booking, i) => (
            <div className="booking-card-div" key={i}>
              <span>{i + 1}</span>
              <BookingCard booking={booking} />
            </div>
          ))
        ) : (
          <div>You currently have no bookings.</div>
        )}
      </div>
    </div>
  );
}
export default Bookings;
