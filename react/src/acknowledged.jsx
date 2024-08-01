import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import { useState } from "react";
import { acknowledgedQuotes } from "./data";

const AcknowledgedNotifications = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const nextQuote = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % acknowledgedQuotes.length);
      setFade(true);
    }, 500);
  };

  const prevQuote = () => {
    setFade(false);
    setTimeout(() => {
      setIndex(
        (prevIndex) =>
          (prevIndex - 1 + acknowledgedQuotes.length) %
          acknowledgedQuotes.length
      );
      setFade(true);
    }, 500);
  };

  return (
    <div className="container">
      <h1 className="acknowledged">Acknowledged Notifications</h1>
      <h2 style={{ opacity: fade ? 1 : 0 }}>{acknowledgedQuotes[index]}</h2>
      <button className="arrow arrow-left" onClick={prevQuote}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="arrow arrow-right" onClick={nextQuote}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default AcknowledgedNotifications;
