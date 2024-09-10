import Nav from "./Nav";
import ShowCase from "./ShowCase";
import Categories from "./Categories";
import Card from "./Card";
import Footer from "./Footer";

function HomePage() {
  return (
    <div className="HomePage">
      <Nav />
      <ShowCase />
      <Categories heading="Hotels">
        <Card title="Pretoria" />
        <Card title="Johannesburg" />
        <Card title="Cape Town" />
      </Categories>

      <Categories heading="Room Types">
        <Card title="Standard" />
        <Card title="Deluxe" />
        <Card title="Suite" />
      </Categories>

      <Footer />
    </div>
  );
}
export default HomePage;
