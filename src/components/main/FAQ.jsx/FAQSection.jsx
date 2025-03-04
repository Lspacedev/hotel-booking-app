import React from "react";
import Accordion from "./Accordian";

const FAQSection = () => {
  const data = [
    {
      question: "Why choose ZaHotels.com?",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      question: "Where is ZaHotels.com located?",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      question: "Does ZaHotels.com provide refunds?",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      question: "How long can a guest stay at ZaHotels.com?",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      question: "How many guests does ZaHotels.com allow?",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      question: "Where can I recieve support after booking at ZaHotels.com?",
      answer: {
        title: "Ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Fusce dapibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida tempor massa quis blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
  ];
  return (
    <section className="FAQSection">
      <div className="FAQTitle">
        <div> Frequently Asked Questions</div>
        <div className="deal-heading-line"></div>
      </div>
      {data.map((item, i) => (
        <Accordion key={i} question={item.question} answer={item.answer} />
      ))}
    </section>
  );
};

export default FAQSection;
