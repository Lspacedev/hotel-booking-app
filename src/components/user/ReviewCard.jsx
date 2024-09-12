function ReviewCard({ review }) {
  return (
    <div className="ReviewCard">
      <div className="img-rating">
        <div className="img"></div>
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
