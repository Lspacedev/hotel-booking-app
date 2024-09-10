import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function AccomodationCard({ title }) {
  const { result_id } = useParams();
  const slidesRef = useRef(null);
  const [images, setImages] = useState([]);
  const storage = getStorage();
  const scrollAmount = 100;
  useEffect(() => {
    const imagesRef = ref(storage, result_id);
    listAll(imagesRef)
      .then((res) => {
        // res.prefixes.forEach((folderRef) => {
        //   // All the prefixes under listRef.
        //   // You may call listAll() recursively on them.
        //   console.log({ folderRef });
        // });
        res.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          // All the items under listRef.
          setImages((prev) => [...prev, url]);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);

  /* Slider */
  // console.log(slidesRef);
  // let slideIndex = 1;
  // showSlides(slideIndex);

  // // Next/previous controls
  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // Thumbnail image controls
  // function currentSlide(n) {
  //   showSlides((slideIndex = n));
  // }

  // function showSlides(n) {
  //   let i;

  //   if (n > slidesRef.length) {
  //     slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     slideIndex = slidesRef.length;
  //   }
  //   for (i = 0; i < slidesRef.length; i++) {
  //     slidesRef[i].style.display = "none";
  //   }
  //   slidesRef[slideIndex - 1].styles.display = "block";
  // }
  return (
    <div className="AccomodationCard">
      {JSON.stringify(images)}
      <h3 className="acc-name">Name</h3>
      <p className="acc-address">Address</p>
      <div className="slides" ref={slidesRef}>
        {images.map((image) => {
          return <img className="image" alt="sliderImage" src={image} />;
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
          <button className="book-btn">Book</button>
        </div>
      </div>
    </div>
  );
}
export default AccomodationCard;
