import { Children } from "react";

function Categories({ heading, children }) {
  return (
    <div className="Categories">
      <div className="heading">
        {heading} <div className="categories-heading-line"></div>
      </div>

      <div className="cards">{children}</div>
    </div>
  );
}
export default Categories;
