import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext();
const BASE_URL = 'http://localhost:3000';

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userNotifications, setUserNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // First API call
        // const responseA = await fetch(`${BASE_URL}/user`);
        const resultA = [{firstName:'Rahul', lastName: 'Raj', emailId: 'rahul.raj@xyz.com'}]// await responseA.json();
        console.log('Fetched User:', resultA[0]);
        setUser(resultA[0]);

        // Use resultA to make the second API call
        const userId = resultA[0].hostName; // Assuming resultA[0] has an 'id' field
        // const responseB = await fetch(`${BASE_URL}/userNotification?userId=${userId}`);
        const resultB =  [
          {
            typeName: "Event",
            modeName: "Online",
            hostName: "John Doe",
            firstName: "Alice",
            lastName: "Smith",
            emailId: "alice.smith@example.com",
            header: "Upcoming Webinar",
            body: "Join us for an exciting webinar on AI advancements.",
            type: "Webinar",
            groupId: "group1",
            scheduledDate: "2023-11-01",
            scheduledTime: "10:00 AM",
            mode: "Online",
            points: 50,
            imagePath: "/images/webinar.jpg",
            notificationId: "notif1",
            userId: "user1",
            isRead: false,
            createdDate: "2023-10-01",
            createdBy: "admin",
            active: true,
          },
          {
            typeName: "Event",
            modeName: "Offline",
            hostName: "Jane Doe",
            firstName: "Bob",
            lastName: "Johnson",
            emailId: "bob.johnson@example.com",
            header: "Networking Event",
            body: "Join us for a networking event in your city.",
            type: "Networking",
            groupId: "group2",
            scheduledDate: "2023-11-05",
            scheduledTime: "2:00 PM",
            mode: "Offline",
            points: 30,
            imagePath: "/images/networking.jpg",
            notificationId: "notif2",
            userId: "user2",
            isRead: true,
            createdDate: "2023-10-02",
            createdBy: "admin",
            active: true,
          },
          {
            typeName: "Reminder",
            modeName: "Online",
            hostName: "Alice Doe",
            firstName: "Charlie",
            lastName: "Brown",
            emailId: "charlie.brown@example.com",
            header: "Project Deadline",
            body: "Reminder: Your project deadline is approaching.",
            type: "Reminder",
            groupId: "group3",
            scheduledDate: "2023-11-10",
            scheduledTime: "5:00 PM",
            mode: "Online",
            points: 20,
            imagePath: "/images/reminder.jpg",
            notificationId: "notif3",
            userId: "user3",
            isRead: false,
            createdDate: "2023-10-03",
            createdBy: "admin",
            active: true,
          },
          {
            typeName: "Alert",
            modeName: "Online",
            hostName: "Bob Doe",
            firstName: "David",
            lastName: "Williams",
            emailId: "david.williams@example.com",
            header: "Security Alert",
            body: "Important: Update your password immediately.",
            type: "Security",
            groupId: "group4",
            scheduledDate: "2023-11-15",
            scheduledTime: "9:00 AM",
            mode: "Online",
            points: 10,
            imagePath: "/images/alert.jpg",
            notificationId: "notif4",
            userId: "user4",
            isRead: true,
            createdDate: "2023-10-04",
            createdBy: "admin",
            active: true,
          },
          {
            typeName: "Notification",
            modeName: "Offline",
            hostName: "Charlie Doe",
            firstName: "Eve",
            lastName: "Davis",
            emailId: "eve.davis@example.com",
            header: "Maintenance Notice",
            body: "Scheduled maintenance will occur this weekend.",
            type: "Maintenance",
            groupId: "group5",
            scheduledDate: "2023-11-20",
            scheduledTime: "11:00 AM",
            mode: "Offline",
            points: 40,
            imagePath: "/images/maintenance.jpg",
            notificationId: "notif5",
            userId: "user5",
            isRead: false,
            createdDate: "2023-10-05",
            createdBy: "admin",
            active: true,
          },
        ];
        
        // await responseB.json();
        console.log('Fetched userNotification:', resultB);

        const posts = resultB.map((post, index) => ({
          id: post.notificationId,
          cover: `/assets/images/covers/cover_${(index % 24) + 1}.jpg`,
          title: post.header,
          desc: post.body,
          isRead: post.isRead,
          createdAt: post.createdDate,
          pointer: post.points,
          author: {
            name: post.createdBy,
            avatarUrl: `/assets/images/avatars/avatar_${(index % 24) + 1}.jpg`,
          },
        })).sort((a, b) => {
          if (a.isRead && !b.isRead) return 1;
          if (!a.isRead && b.isRead) return -1;
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        });


        setUserNotifications(posts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const postData = async (url, data) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('Posted data:', result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const putData = async (url, data) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('Updated data:', result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const contextValue = useMemo(() => ({ user, userNotifications, loading, error, postData, putData }), [user, userNotifications, loading, error]);

  console.log('Current user:', user);
  console.log('Current userNotification:', userNotifications);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};