import SearchSvg from "../../assets/18611298_Sandy_Bus-02_Single-01.svg";
function FeaturesSection() {
  return (
    <div className="FeaturesSection">
      {/* <h3>Why use ZaHotels.com</h3> */}
      <div className="feature-cards">
        <div className="feature-card">
          <img src="/images/hotel.png" style={{ width: "100px" }} />
          <h3>Search simply</h3>
          <div>Search through 5 million hotels in just a few seconds.</div>
        </div>
        <div className="feature-card">
          <img src="/images/purse.png" style={{ width: "100px" }} />
          <h3>Search simply</h3>
          <div>Compare hotel prices from over 100 sites at once.</div>
        </div>
        <div className="feature-card">
          <img src="/images/desk-bell.png" style={{ width: "100px" }} />
          <h3>Search simply</h3>
          <div>Search through 5 million hotels in just a few seconds.</div>
        </div>
      </div>
    </div>
  );
}
export default FeaturesSection;
