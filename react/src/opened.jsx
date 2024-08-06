import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import { useState } from "react";

const openedQuotes = [
  "Notification 1 opened.",
  "Notification 2 opened.",
  "Notification 3 opened.",
  "Notification 4 opened.",
  "Notification 5 opened.",
];

const OpenedNotifications = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const nextQuote = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % openedQuotes.length);
      setFade(true);
    }, 500);
  };

  const prevQuote = () => {
    setFade(false);
    setTimeout(() => {
      setIndex(
        (prevIndex) =>
          (prevIndex - 1 + openedQuotes.length) % openedQuotes.length
      );
      setFade(true);
    }, 500);
  };

  return (
    <div className="container">
      <h1 className="opened">Opened Notifications</h1>
      <h2 style={{ opacity: fade ? 1 : 0 }}>{openedQuotes[index]}</h2>
      <button className="arrow arrow-left" onClick={prevQuote}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="arrow arrow-right" onClick={nextQuote}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default OpenedNotifications;
