import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import getStripe from "../../../lib/getStripe";
import { v4 as uuid } from "uuid";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { LiaBedSolid } from "react-icons/lia";
import { GoPerson } from "react-icons/go";
function AccomodationCard() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const searchT =
    useSelector((state) => state.accomodations.searchTerm?.title) || "";
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
          price: process.env.STRIPE_PRICE_ID,
          quantity: qty,
        },
      ],
      mode: "payment",
      successUrl: `${process.env.CLIENT_URL}/success`,
      cancelUrl: `${process.env.CLIENT_URL}/cancel`,
      customerEmail: "customer@email.com",
    });

    console.warn(error.message);
  }

  function goBack() {
    navigation("/results?search=" + searchT);
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
  function getMap(hotel_name) {
    if (hotel_name === "Pretoria") {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229975.8576450544!2d28.033142908237622!3d-25.75824794492457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95619cbec65033%3A0xf66262b07a847b4c!2sPretoria!5e0!3m2!1sen!2sza!4v1726476926002!5m2!1sen!2sza";
    } else if (hotel_name === "Johannesburg") {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57292.40866321166!2d27.998825035681676!3d-26.17143860390959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg!5e0!3m2!1sen!2sza!4v1726476615694!5m2!1sen!2sza";
    } else if (hotel_name === "Cape Town") {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423817.96640452865!2d18.032263996301406!3d-33.913395563198335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc500f8826eed7%3A0x687fe1fc2828aa87!2sCape%20Town!5e0!3m2!1sen!2sza!4v1726476860837!5m2!1sen!2sza";
    } else {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13719959.46917351!2d6.932171531527388!3d-32.908756264319855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c34a689d9ee1251%3A0xe85d630c1fa4e8a0!2sSouth%20Africa!5e0!3m2!1sen!2sza!4v1726476963804!5m2!1sen!2sza";
    }
  }
  function getRoomPoints(rating) {
    if (rating === "5") {
      return { pts: "5/5", text: "Excellent" };
    }
    if (rating === "4") {
      return { pts: "4/5", text: "Very Good" };
    }
    if (rating === "3") {
      return { pts: "3/5", text: "Good" };
    }
    if (rating === "2") {
      return { pts: "2/5", text: "Average" };
    }
    if (rating === "1") {
      return { pts: "1/5", text: "Not Good" };
    }
  }
  //if (loading) return <div className="Loading">Loading...</div>;
  return (
    <div className="AccomodationCard">
      <IoMdArrowBack onClick={goBack} className="back" />
      <h3 className="acc-name">{accomodation && accomodation.room_name}</h3>
      <div className="acc-address">
        {accomodation && (
          <div className="accomodation-icon">
            <FaLocationDot color="#777737" size={20} />
            <p>{accomodation.address}</p>
          </div>
        )}
      </div>
      <div className="slides-book">
        <div className="slides" ref={slidesRef}>
          {accomodation &&
            accomodation.images.length > 0 &&
            accomodation.images.map((image, i) => {
              return (
                <div
                  className={
                    i === activeImageNum
                      ? "currentSlide active"
                      : "currentSlide"
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
        <div className="book-map">
          <div className="book-card">
            <div className="title">
              {accomodation && (
                <>
                  <div className="text">
                    {getRoomPoints(accomodation.rating).text}
                  </div>
                  <div className="pts">
                    {getRoomPoints(accomodation.rating).pts}
                  </div>
                </>
              )}
            </div>
            <div className="content">
              <p>This room has recieved</p>
              <p>
                {accomodation &&
                  accomodation.rating &&
                  printStars(accomodation.rating).map((elem, i) => (
                    <IoStarSharp key={i} className="star" />
                  ))}
              </p>
            </div>
            <button className="book-btn" onClick={book}>
              Book
            </button>
          </div>
          {accomodation && (
            <iframe
              src={getMap(accomodation.hotel_name)}
              width="250"
              height="200"
            ></iframe>
          )}
        </div>
      </div>
      <button className="share-btn" onClick={handleShare}>
        <CiShare2 className="icon" />
      </button>
      {isShared && (
        <code>{`${process.env.CLIENT_URL}/results/${result_id}`}</code>
      )}
      <div className="accomodation-info">
        <div className="overview">
          <h4>R{accomodation && accomodation.price}</h4>
          <div className="guests-type">
            <div>
              <div className="h">Room Type</div>
              <div className="value">
                <LiaBedSolid />
                {accomodation && accomodation.room_type}
              </div>
            </div>
            <div>
              <div className="h">Guests</div>
              <div className="value">
                <GoPerson />
                {accomodation && accomodation.guests}
              </div>
            </div>
          </div>
        </div>
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
            accomodation.reviews.length > 0 ? (
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
                      <div className="review-name-location">
                        <div className="review-name">
                          {getReviewer(review.userId) &&
                            getReviewer(review.userId).name}
                        </div>
                        <div className="review-city">
                          {accomodation && accomodation.hotel_name}
                        </div>
                      </div>
                    </div>
                    <p>
                      {printStars(review.rating) &&
                        printStars(review.rating).map((elem, i) => (
                          <IoStarSharp key={i} className="star" />
                        ))}
                    </p>
                  </div>
                  <p>
                    Reviewed on:{" "}
                    {accomodation &&
                      review &&
                      new Date(review.date).toDateString()}
                  </p>
                  <p>{review.reviewText}</p>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "start" }}>
                No reviews yet for this accomodation
              </div>
            )}
          </div>
        </div>

        <div className="acc-btns"></div>
      </div>
    </div>
  );
}
export default AccomodationCard;
