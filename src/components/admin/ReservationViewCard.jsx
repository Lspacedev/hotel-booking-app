function ReservationViewCard({ photosArr, title }) {
  return (
    <div className="ReservationViewCard">
      <div className="img-guest">
        <div className="img"></div>
        <div className="guest">
          <h3 className="guest-name">Name</h3>
          <div className="view-checkin-out">
            <div>
              <p>Check in</p>
              <h8>date</h8>
            </div>
            <div>
              <p>Check Out</p>
              <h8>date</h8>
            </div>
          </div>
          <div className="guests-room-type">
            <div>
              <p>Nr of guests</p>
              <h8>Number</h8>
            </div>
            <div>
              <p>Room Type</p>
              <h8>standard</h8>
            </div>
          </div>
        </div>
      </div>

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
        <div className="view-btns">
          <button className="approve-btn">Approve</button>
          <button className="reject-btn">Reject</button>
        </div>
      </div>
    </div>
  );
}
export default ReservationViewCard;
