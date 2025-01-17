import { IoMdClose } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { RxBorderDotted } from "react-icons/rx";

function BookingCard({ booking }) {
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
            {booking.rating}
            <span className="stars">stars</span>
          </p>
          {/* <p className="description">{booking.description}</p> */}
        </div>
        <div className="side-two">
          <div>
            <h5>Price</h5>
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
              <p>{booking.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookingCard;
