import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AccomodationCard({ title }) {
  const navigation = useNavigate();

  const { result_id } = useParams();
  const slidesRef = useRef(null);
  const [images, setImages] = useState([]);
  const storage = getStorage();
  const scrollAmount = 100;
  // useEffect(() => {
  //   const imagesRef = ref(storage, result_id);
  //   listAll(imagesRef)
  //     .then((res) => {
  //       res.items.forEach(async (itemRef) => {
  //         const url = await getDownloadURL(itemRef);
  //         // All the items under listRef.
  //         setImages((prev) => [...prev, url]);
  //       });
  //     })
  //     .catch((error) => {
  //       // Uh-oh, an error occurred!
  //     });
  // }, []);

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
      //navigation("/login");
    } else {
      //Check if check in and out dates have been set
      if (JSON.stringify(checkInOut) !== "{}") {
        console.log(accomodation.bookings.length);
        if (accomodation.bookings.length > 0) {
          //check if date is available
          let isAvailable = checkAvailability(
            checkInOut,
            accomodation.bookings
          );
          if (isAvailable) {
            navigation("/checkout");
            let booking = {
              userId: user,
              checkIn: checkInOut.checkIn,
              checkOut: checkInOut.checkOut,
            };
            try {
              const accomodationsCollection = collection(
                db,
                "admin",
                "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
                "accomodations"
              );
              const accomodationRef = doc(accomodationsCollection, result_id);
              console.log(accomodationRef);
              await updateDoc(accomodationRef, {
                bookings: arrayUnion(booking),
              });
              alert("added booking");
            } catch (err) {
              console.log(err);
            }
          } else {
            alert("Room is not available. Checkout our rooms");
          }
        } else {
          let booking = {
            userId: user,
            checkIn: checkInOut.checkIn,
            checkOut: checkInOut.checkOut,
          };
          try {
            const accomodationsCollection = collection(
              db,
              "admin",
              "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
              "accomodations"
            );
            const accomodationRef = doc(accomodationsCollection, result_id);
            console.log(accomodationRef);

            await updateDoc(accomodationRef, {
              bookings: arrayUnion(booking),
            });
            alert("added booking");
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        //if not checkin and out dates have been set alert user
        alert("Please set checkin and checkout dates");
      }
    }
    console.log({ user, result_id, checkInOut, accomodation });
  }
  function checkAvailability(obj, array) {
    let checkIn = new Date(obj.checkIn);
    let checkOut = new Date(obj.checkOut);

    let availability = true;

    array.forEach((booking) => {
      let bookingCheckIn = new Date(booking.checkIn);
      let bookingCheckOut = new Date(booking.checkOut);
      console.log(bookingCheckIn, checkIn);
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

  return (
    <div className="AccomodationCard">
      {JSON.stringify(images)}
      <h3 className="acc-name">Name</h3>
      <p className="acc-address">Address</p>
      <div className="slides" ref={slidesRef}>
        {images.map((image, i) => {
          return (
            <img key={i} className="image" alt="sliderImage" src={image} />
          );
        })}
        <button
          className="prev"
          onClick={() => {
            const container = slidesRef.current;
            container.scrollLeft -= scrollAmount; // Scroll left by the specified amount
          }}
        >
          prev
        </button>
        <button
          className="next"
          onClick={() => {
            const container = slidesRef.current;
            container.scrollLeft += scrollAmount; // Scroll right by the specified amount
          }}
        >
          next
        </button>
      </div>
      <button className="share-btn">Share</button>
      <div className="accomodation-info">
        <h4>Price</h4>
        <div className="acc-info-section">
          <h5>Hotel Facilities</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam cum
            facilis fuga ipsa consectetur atque suscipit totam rem aliquid quas
            delectus velit numquam nemo, culpa asperiores perferendis, eius sint
            placeat?
          </p>
        </div>
        <div className="acc-info-section">
          <h5>Policies</h5>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
            aperiam illo amet et, voluptates possimus itaque rem accusamus
            repudiandae quas dolor vel placeat quis ducimus laudantium. Modi hic
            ea amet?
          </p>
        </div>
        <div className="acc-details">
          <h5>Policies</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            consectetur labore odit quos temporibus quasi dignissimos placeat
            facere atque nam quo nulla quod, possimus nesciunt aut? Aperiam
            soluta amet voluptatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            exercitationem quos repudiandae delectus eaque, autem odit, qui
            facilis fugit odio molestiae, similique voluptatibus nobis molestias
            perferendis magnam nihil velit ea?
          </p>
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
