import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { deleteDoc, updateDoc, collection, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../config/firebase";


function FavouriteCard({ favourite, favourites }) {
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
  const user = useSelector((state) => state.user.currentUser);

  async function deleteFavourite() {

    const filteredFavourites = favourites.filter((favourite)=> favourite.id !== favourite.id);
    const usersCollection = collection(
      db,
      "users"
    );
    try {

      const userRef = doc(usersCollection, user);
      await updateDoc(userRef, {
        favourites: filteredFavourites,
      });
      alert("updated favourites");
    } catch (err) {
      console.log(err);
    }
    
  }
  return (
    <div className="FavouriteCard">
      <div className="remove-fav" onClick={deleteFavourite}>x</div>
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
