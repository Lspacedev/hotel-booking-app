import Nav from "./Nav";
import ShowCase from "./ShowCase";
import Categories from "./Categories";
import Card from "./Card";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function HomePage() {
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  function getRoomNumber(name) {
    let rooms = [];
    if (accomodations && accomodations.length > 0) {
      rooms = accomodations.filter((room) => room.hotel_name === name);
    }
    return rooms.length ?? "0";
  }
  function getRoomTypeNumber(type) {
    let rooms = [];
    if (accomodations && accomodations.length > 0) {
      rooms = accomodations.filter((room) => room.room_type === type);
    }
    return rooms.length ?? "0";
  }
  return (
    <div className="HomePage">
      <div className="background-image">
        <Nav />
        <ShowCase />
      </div>
      <Categories heading="Hotels">
        <Card
          title="Pretoria"
          url="images/pretoria.jpg"
          room_number={getRoomNumber("Pretoria")}
        />
        <Card
          title="Johannesburg"
          url="images/jozi.jpg"
          room_number={getRoomNumber("Johannesburg")}
        />
        <Card
          title="Cape Town"
          url="images/cape.jpg"
          room_number={getRoomNumber("Cape Town")}
        />
      </Categories>

      <Categories heading="Room Types">
        <Card
          title="Standard"
          url="images/standard.jpg"
          room_number={getRoomTypeNumber("Standard")}
        />
        <Card
          title="Deluxe"
          url="images/deluxe.jpg"
          room_number={getRoomTypeNumber("Deluxe")}
        />
        <Card
          title="Suite"
          url="images/suite.jpg"
          room_number={getRoomTypeNumber("Suite")}
        />
      </Categories>

      <Footer />
    </div>
  );
}
export default HomePage;
