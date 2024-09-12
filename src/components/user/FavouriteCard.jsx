function FavouriteCard({ favourite }) {
  return (
    <div className="FavouriteCard">
      <div className="remove-fav">x</div>
      <div className="img"></div>
      <p>
        {favourite.room_name}
        {favourite.rating}
      </p>
    </div>
  );
}
export default FavouriteCard;
