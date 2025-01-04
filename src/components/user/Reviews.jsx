import ReviewCard from "./ReviewCard";
import AddReview from "./AddReview";
import { useSelector } from "react-redux";

function Reviews() {
  const user = useSelector((state) => state.user.currentUser);
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  let reviews = [];
  accomodations.forEach((accomodation) => {
    if (accomodation.reviews.length > 0) {
      accomodation.reviews.forEach((review) => {
        if (review.userId === user) {
          reviews.push({
            ...review,
            roomId: accomodation.id,
            reviewUrl: accomodation.images[0],
          });
        }
      });
    }
  });
  return (
    <div className="Reviews">
      <AddReview />
      <div className="reviews-div">
        {typeof reviews !== "undefined" && reviews.length > 0 ? (
          reviews.map((review, i) => <ReviewCard key={i} review={review} />)
        ) : (
          <div>You have not made any reviews</div>
        )}
      </div>
    </div>
  );
}
export default Reviews;
