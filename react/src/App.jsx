// import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { acknowledgedNotifications, openedNotifications } from "./data";
import Notifications from "./notifications";

const App = () => {
  const userName = "Ravi Kashyap";
  const acknowledgedNotificationsLength =
    Number(openedNotifications.length * 100) +
    Number(acknowledgedNotifications.length * 50);

  return (
    <Router>
      <Routes>
        <Route
          path="/user"
          element={
            <Notifications
              userName={userName}
              points={acknowledgedNotificationsLength}
            />
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
