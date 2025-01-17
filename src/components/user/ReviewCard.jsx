import { IoStarSharp } from "react-icons/io5";

function ReviewCard({ review }) {
  function printStars(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(0);
    }
    return arr;
  }
  return (
    <div className="ReviewCard">
      <div className="img-rating">
        <div className="img">
          <img src={review.reviewUrl} />
        </div>
      </div>
      <div className="review-text">
        <div className="review-header">
          <p>{review.room_name}</p>
          <p>{review && new Date(review.date).toDateString()}</p>
        </div>

        <div>
          <p>
            {printStars(review.rating) &&
              printStars(review.rating).map((elem, i) => (
                <IoStarSharp key={i} className="star" />
              ))}
          </p>
        </div>
        <p>{review.reviewText}</p>
      </div>
    </div>
  );
}
export default ReviewCard;
