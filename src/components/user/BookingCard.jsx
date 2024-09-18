import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

function BookingCard({ booking }) {
  const [images, setImages] = useState([]);

  const storage = getStorage();
  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, booking.id);

      let results = await listAll(imagesRef);
      let urlPromises = results.items.map((imageRef) =>
        getDownloadURL(imageRef)
      );

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setImages(urls);
    };
    loadImages();
  }, []);
  return (
    <div className="BookingCard">
      <div className="img">
        <img src={images[0]} />
      </div>
      <div className="booking-card-info">
        <div className="side-one">
          <h4>{booking.room_name}</h4>
          <h6>{booking.hotel_name}</h6>
          <p>{booking.rating}</p>
          <p>{booking.description}</p>
        </div>
        <div className="side-two">
          <h5>Price</h5>
          <p>R{booking.price}</p>
          <h5>Status</h5>
          <p>{booking.status}</p>
        </div>
      </div>
    </div>
  );
}
export default BookingCard;
