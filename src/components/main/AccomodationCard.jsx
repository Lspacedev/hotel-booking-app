import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getStripe from "../../../lib/getStripe";
import { v4 as uuid } from "uuid";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";

function AccomodationCard() {
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

  const { result_id } = useParams();
  const slidesRef = useRef(null);
  const [activeImageNum, setCurrent] = useState(0);

  const storage = getStorage();

  //user id , acccomodation id
  const user = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);

  //const bookings = useSelector((state) => state.accomodations.bookings);
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  //get accomodation based on result_id
  const [accomodation] = accomodations.filter(
    (acccomodation) => acccomodation.id === result_id
  );
  const [isShared, setIsShared] = useState(false);
  const length = accomodation?.images.length;
  const nextSlide = () => {
    setCurrent(activeImageNum === length - 1 ? 0 : activeImageNum + 1);
  };
  const prevSlide = () => {
    setCurrent(activeImageNum === 0 ? length - 1 : activeImageNum - 1);
  };
  const checkInOut = useSelector((state) => state.accomodations.checkInOut);

  async function book() {
    if (user === "") {
      alert("Please Login or Register an account.");
    } else {
      //Check if check in and out dates have been set

      if (JSON.stringify(checkInOut) !== "{}") {
        if (accomodation.bookings.length > 0) {
          //check if date is available
          let isAvailable = checkAvailability(
            checkInOut,
            accomodation.bookings
          );
          if (isAvailable) {
            let booking = {
              bookingId: uuid(),
              userId: user,
              roomId: accomodation.id,
              checkIn: checkInOut.checkIn,
              checkOut: checkInOut.checkOut,
              paid: true,
              status: "pending",
            };
            let bookingConfirmation = window.confirm(
              "You are about to book this accomodation. You'll be taken to a payment gateway. Continue?"
            );

            if (bookingConfirmation) {
              try {
                const accomodationsCollection = collection(
                  db,
                  "admin",
                  "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
                  "accomodations"
                );
                const accomodationRef = doc(accomodationsCollection, result_id);
                await updateDoc(accomodationRef, {
                  bookings: arrayUnion(booking),
                });
              } catch (err) {
                console.log(err);
              }
              let quantity = Math.round(Number(accomodation.price) / 800);
              handleCheckout(quantity);
            }
          } else {
            alert(
              "Room is not available on those dates. Change date or check out our other rooms"
            );
          }
        } else {
          let booking = {
            bookingId: uuid(),
            userId: user,
            roomId: accomodation.id,
            checkIn: checkInOut.checkIn,
            checkOut: checkInOut.checkOut,
            paid: true,
            status: "pending",
          };
          let bookingConfirmation = window.confirm(
            "You are about to book this accomodation. You'll be taken to a payment gateway. Continue?"
          );
          if (bookingConfirmation) {
            try {
              const accomodationsCollection = collection(
                db,
                "admin",
                "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
                "accomodations"
              );
              const accomodationRef = doc(accomodationsCollection, result_id);

              await updateDoc(accomodationRef, {
                bookings: arrayUnion(booking),
              });
              let quantity = Math.round(Number(accomodation.price) / 800);
              handleCheckout(quantity);
            } catch (err) {
              console.log(err);
            }
          }
        }
      } else {
        //if not checkin and out dates have been set alert user
        alert("Please set checkin and checkout dates");
      }
    }
  }
  function checkAvailability(obj, array) {
    let checkIn = new Date(obj.checkIn);
    let checkOut = new Date(obj.checkOut);

    let availability = true;
    array.forEach((booking) => {
      let bookingCheckIn = new Date(booking.checkIn);
      let bookingCheckOut = new Date(booking.checkOut);
      //check if checkout date is within any date range
      if (checkOut > bookingCheckIn && checkOut < bookingCheckOut) {
        availability = false;
      }
      //check if checkin date is within any date range
      if (checkIn > bookingCheckIn && checkIn < bookingCheckOut) {
        availability = false;
      }
      //check if checkin/out date is not before any  date range
      if (checkIn < bookingCheckIn && checkOut > bookingCheckOut) {
        availability = false;
      }
    });

    return availability;
  }
  async function handleCheckout(qty) {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: import.meta.env.VITE_NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: qty,
        },
      ],
      mode: "payment",
      successUrl: `http://localhost:5173/success`,
      cancelUrl: `http://localhost:5173/cancel`,
      customerEmail: "customer@email.com",
    });

    console.warn(error.message);
  }

  function goBack() {
    navigation("/");
  }
  function handleShare() {
    setIsShared(!isShared);
  }
  function printStars(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(0);
    }
    return arr;
  }
  function getReviewer(id) {
    const [user] = users.filter((user) => user.id === id);
    return user;
  }
  console.log({ users, accomodation });
  //if (loading) return <div className="Loading">Loading...</div>;
  return (
    <div className="AccomodationCard">
      <IoMdArrowBack onClick={goBack} className="back" />
      <h3 className="acc-name">{accomodation && accomodation.room_name}</h3>
      <p className="acc-address">{accomodation && accomodation.address}</p>
      <div className="slides" ref={slidesRef}>
        {accomodation &&
          accomodation.images.length > 0 &&
          accomodation.images.map((image, i) => {
            return (
              <div
                className={
                  i === activeImageNum ? "currentSlide active" : "currentSlide"
                }
                key={i}
              >
                {i === activeImageNum && <img src={image} />}
              </div>
            );
          })}
        <button className="prev" onClick={prevSlide}>
          <IoIosArrowBack />
        </button>
        <button className="next" onClick={nextSlide}>
          <IoIosArrowForward />
        </button>
      </div>
      <button className="share-btn" onClick={handleShare}>
        Share
      </button>
      {isShared && <code>{`http://localhost:5173/results/${result_id}`}</code>}
      <div className="accomodation-info">
        <h4>R{accomodation && accomodation.price}</h4>
        <div className="acc-info-section">
          <h5>Description</h5>
          <p>{accomodation && accomodation.description}</p>
        </div>
        <div className="acc-info-section">
          <h5>Amenties</h5>
          <p>{accomodation && accomodation.amenities}</p>
        </div>
        <div className="acc-info-section">
          <h5>Policies</h5>
          <p>{accomodation && accomodation.policies}</p>
        </div>
        <div className="acc-info-section">
          <h5>Reviews</h5>
          <div className="accomodation-reviews">
            {accomodation &&
              accomodation.reviews &&
              accomodation.reviews.map((review, i) => (
                <div key={i} className="review-card">
                  <div className="user-rating">
                    <div className="name-pic">
                      <img
                        src={
                          getReviewer(review.userId) &&
                          typeof getReviewer(review.userId).profilePic ===
                            "undefined"
                            ? "/images/profile.png"
                            : getReviewer(review.userId) &&
                              getReviewer(review.userId).profilePic
                        }
                      />

                      <p>
                        {getReviewer(review.userId) &&
                          getReviewer(review.userId).name}
                      </p>
                    </div>
                    <p>
                      {printStars(review.rating) &&
                        printStars(review.rating).map((elem, i) => (
                          <IoStarSharp key={i} className="star" />
                        ))}
                    </p>
                  </div>

                  <p>{review.reviewText}</p>
                  <p>Reviewed on: {review.date}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="acc-btns">
          <button className="book-btn" onClick={book}>
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
export default AccomodationCard;
