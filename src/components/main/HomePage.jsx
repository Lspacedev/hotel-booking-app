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
        <Card title="Pretoria" url="images/pretoria.jpg" />
        <Card title="Johannesburg" url="images/jozi.jpg" />
        <Card title="Cape Town" url="images/cape.jpg" />
      </Categories>

      <Categories heading="Room Types">
        <Card title="Standard" url="images/standard.jpg" />
        <Card title="Deluxe" url="images/deluxe.jpg" />
        <Card title="Suite" url="images/suite.jpg" />
      </Categories>

      <Footer />
    </div>
  );
}
export default HomePage;
