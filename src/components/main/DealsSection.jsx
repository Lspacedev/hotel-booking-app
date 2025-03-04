function DealsSection({ heading, subHeading, dealHeading, dealText }) {
  return (
    <div className="DealsSection">
      <div className="deal-heading">
        <div>{heading}</div>
        <div className="deal-heading-line"></div>
      </div>

      <div className="deal-sub-heading">{subHeading}</div>
      <div className="deal-container">
        <div className="deal-one">
          <div className="deal-one-heading">{dealHeading}</div>
          <p className="deal-text">{dealText}</p>
          <button className="deal-btn">Save 15% or more</button>
        </div>
        <div className="deal-two">
          <img src="/images/showcase2.jpg" />
        </div>
      </div>
    </div>
  );
}
export default DealsSection;
