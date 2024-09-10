import ReviewCard from "./ReviewCard";
import AddReview from "./AddReview";

function Reviews() {
  return (
    <div className="Reviews">
      <AddReview />
      <div className="reviews-div">
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
}
export default Reviews;
