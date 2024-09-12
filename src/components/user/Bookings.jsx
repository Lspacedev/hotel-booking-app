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
          bookings.push(accomodation);
        }
      });
    }
  });

  return (
    <div className="Bookings">
      <div className="bookings-div">
        {typeof bookings !== "undefined" &&
          bookings.length > 0 &&
          bookings.map((booking, i) => (
            <BookingCard key={i} booking={booking} />
          ))}
      </div>
    </div>
  );
}
export default Bookings;
