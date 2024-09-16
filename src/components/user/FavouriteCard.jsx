import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

function FavouriteCard({ favourite }) {
  const [images, setImages] = useState([]);

  const storage = getStorage();
  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, favourite.id);

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
    <div className="FavouriteCard">
      <div className="remove-fav">x</div>
      <div className="img">
        <img src={images[0]} />
      </div>
      <p>
        {favourite.room_name}
        {favourite.rating}
      </p>
    </div>
  );
}
export default FavouriteCard;
