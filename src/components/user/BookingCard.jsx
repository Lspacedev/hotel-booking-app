import { IoMdClose } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { RxBorderDotted } from "react-icons/rx";
import { IoStarSharp } from "react-icons/io5";

function BookingCard({ booking }) {
  function printStars(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(0);
    }
    return arr;
  }
  return (
    <div className="BookingCard">
      <div className="img">
        <img src={booking.images[0]} />
      </div>
      <div className="booking-card-info">
        <div className="side-one">
          <h4>{booking.room_name}</h4>
          <p>{booking.hotel_name}</p>
          <p>
            {printStars(booking.rating) &&
              printStars(booking.rating).map((elem, i) => (
                <IoStarSharp key={i} className="star" />
              ))}
          </p>
          {/* <p className="description">{booking.description}</p> */}
        </div>
        <div className="side-two">
          <div>
            <p>R{booking.price}</p>
          </div>
          <div>
            <h5>Status</h5>
            <div className="status">
              {booking.status === "pending" ? (
                <RxBorderDotted className="icon" size={24} color="gray" />
              ) : booking.status === "rejected" ? (
                <IoMdClose className="icon" size={24} color="red" />
              ) : (
                <IoCheckmarkSharp className="icon" size={24} color="green" />
              )}
              {/* <p>{booking.status}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookingCard;
