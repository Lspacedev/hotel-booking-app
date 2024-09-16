import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { useState, useEffect } from "react";
function ReviewCard({ review }) {
  const [images, setImages] = useState([]);

  const storage = getStorage();
  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, review.roomId);

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
    <div className="ReviewCard">
      <div className="img-rating">
        <div className="img">
          <img src={images[0]} />
        </div>
        <p>
          {review.room_name} {review.rating}
        </p>
      </div>
      <div className="review-text">
        {review.reviewText}
        <p>{review.date}</p>
      </div>
    </div>
  );
}
export default ReviewCard;
