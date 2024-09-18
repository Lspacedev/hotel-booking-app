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

function AccomodationCard() {
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

  const { result_id } = useParams();
  const slidesRef = useRef(null);
  const [images, setImages] = useState([]);
  const [activeImageNum, setCurrent] = useState(0);
  const [isShared, setIsShared] = useState(false);
  const length = images.length;
  const nextSlide = () => {
    setCurrent(activeImageNum === length - 1 ? 0 : activeImageNum + 1);
  };
  const prevSlide = () => {
    setCurrent(activeImageNum === 0 ? length - 1 : activeImageNum - 1);
  };

  const storage = getStorage();
  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, result_id);

      let result = await listAll(imagesRef);
      let urlPromises = result.items.map((imageRef) =>
        getDownloadURL(imageRef)
      );

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages().finally(() => setLoading(false));
      setImages(urls);
    };
    loadImages();
  }, []);

  //user id , acccomodation id
  const user = useSelector((state) => state.user.currentUser);
  //const bookings = useSelector((state) => state.accomodations.bookings);
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  //get accomodation based on result_id
  const [accomodation] = accomodations.filter(
    (acccomodation) => acccomodation.id === result_id
  );
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
            alert("Room is not available. Checkout our rooms");
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
  if (loading) return <div className="Loading">Loading...</div>;

  return (
    <div className="AccomodationCard">
      <IoMdArrowBack onClick={goBack} className="back" />
      <h3 className="acc-name">{accomodation && accomodation.room_name}</h3>
      <p className="acc-address">{accomodation && accomodation.address}</p>
      <div className="slides" ref={slidesRef}>
        {images.map((image, i) => {
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
          {accomodation &&
            accomodation.reviews.map((review, i) => (
              <div key={i}>
                <h5>{review.rating}</h5>
                <h5>{review.reviewText}</h5>
                <p>Reviewed on: {review.date}</p>
              </div>
            ))}
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
