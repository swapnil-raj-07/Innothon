import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import { useState } from "react";
import {
  acknowledgedNotifications,
  openedNotifications,
  unreadNotifications,
} from "./data";
import logo from "./logo.png";

// eslint-disable-next-line react/prop-types
const Notification = ({ userName, points }) => {
  const [unreadIndex, setUnreadIndex] = useState(0);
  const [openedIndex, setOpenedIndex] = useState(0);
  const [acknowledgedIndex, setAcknowledgedIndex] = useState(0);
  const [unreadExpanded, setUnreadExpanded] = useState(false);
  const [openedExpanded, setOpenedExpanded] = useState(false);
  const [acknowledgedExpanded, setAcknowledgedExpanded] = useState(false);
  const [fullList, setFullList] = useState({
    unread: false,
    opened: false,
    acknowledged: false,
  });

  const toggleFullList = (type) => {
    setFullList((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const nextQuote = (type) => {
    if (type === "unread") {
      setUnreadIndex(
        (prevIndex) => (prevIndex + 1) % unreadNotifications.length
      );
    } else if (type === "opened") {
      setOpenedIndex(
        (prevIndex) => (prevIndex + 1) % openedNotifications.length
      );
    } else if (type === "acknowledged") {
      setAcknowledgedIndex(
        (prevIndex) => (prevIndex + 1) % acknowledgedNotifications.length
      );
    }
  };

  const prevQuote = (type) => {
    if (type === "unread") {
      setUnreadIndex(
        (prevIndex) =>
          (prevIndex - 1 + unreadNotifications.length) %
          unreadNotifications.length
      );
    } else if (type === "opened") {
      setOpenedIndex(
        (prevIndex) =>
          (prevIndex - 1 + openedNotifications.length) %
          openedNotifications.length
      );
    } else if (type === "acknowledged") {
      setAcknowledgedIndex(
        (prevIndex) =>
          (prevIndex - 1 + acknowledgedNotifications.length) %
          acknowledgedNotifications.length
      );
    }
  };

  return (
    <div className="parent-container">
      <div className="header">
        <h1>Welcome, {userName}</h1>
        <div className="points-container">
          <div className="points-box">Points: {points}</div>
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </div>

      {/* Unread Notifications */}
      <div className="container">
        <h1
          className="unread"
          onClick={() => setUnreadExpanded(!unreadExpanded)}
        >
          Unread Notifications
        </h1>
        {unreadExpanded && (
          <div>
            <button onClick={() => toggleFullList("unread")}>
              {fullList.unread ? "Show Less" : "Show All"}
            </button>
            {fullList.unread ? (
              <ul>
                {unreadNotifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))}
              </ul>
            ) : (
              <div>
                <h2>{unreadNotifications[unreadIndex]}</h2>
                <button
                  className="arrow arrow-left"
                  onClick={() => prevQuote("unread")}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="arrow arrow-right"
                  onClick={() => nextQuote("unread")}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Opened Notifications */}
      <div className="container">
        <h1
          className="opened"
          onClick={() => setOpenedExpanded(!openedExpanded)}
        >
          Opened Notifications
        </h1>
        {openedExpanded && (
          <div>
            <button onClick={() => toggleFullList("opened")}>
              {fullList.opened ? "Show Less" : "Show All"}
            </button>
            {fullList.opened ? (
              <ul>
                {openedNotifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))}
              </ul>
            ) : (
              <div>
                <h2>{openedNotifications[openedIndex]}</h2>
                <button
                  className="arrow arrow-left"
                  onClick={() => prevQuote("opened")}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="arrow arrow-right"
                  onClick={() => nextQuote("opened")}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Acknowledged Notifications */}
      <div className="container">
        <h1
          className="acknowledged"
          onClick={() => setAcknowledgedExpanded(!acknowledgedExpanded)}
        >
          Acknowledged Notifications
        </h1>
        {acknowledgedExpanded && (
          <div>
            <button onClick={() => toggleFullList("acknowledged")}>
              {fullList.acknowledged ? "Show Less" : "Show All"}
            </button>
            {fullList.acknowledged ? (
              <ul>
                {acknowledgedNotifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))}
              </ul>
            ) : (
              <div>
                <h2>{acknowledgedNotifications[acknowledgedIndex]}</h2>
                <button
                  className="arrow arrow-left"
                  onClick={() => prevQuote("acknowledged")}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="arrow arrow-right"
                  onClick={() => nextQuote("acknowledged")}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Notification;
