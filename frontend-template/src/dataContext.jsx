import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, useContext, createContext } from 'react';

const DataContext = createContext();
const BASE_URL = 'http://localhost:3000';

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userNotifications, setUserNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateRecord, setUpdateRecord] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // First API call
        const responseA = await fetch(`${BASE_URL}/user`);
        const resultA = await responseA.json();
        console.log('Fetched User:', resultA[0]);
        setUser(resultA[0]);

        // Use resultA to make the second API call
        const userId = resultA[0].hostName;
        const responseB = await fetch(`${BASE_URL}/userNotification?userId=${userId}`);

        const resultB = await responseB.json();
        console.log('Fetched userNotification:', resultB);

        const posts = resultB
          .map((post, index) => ({
            id: post.notificationId,
            cover: `/assets/images/covers/cover_${(index % 24) + 1}.jpg`,
            title: post.header,
            desc: post.body,
            isRead: post.isRead,
            createdAt: post.createdDate,
            pointer: post.points,
            type: post.type,
            author: {
              name: post.createdBy,
              avatarUrl: `/assets/images/type/${post.type}.png`,
            },
          }))
          .sort((a, b) => {
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
  }, [updateRecord]);

  const postData = async (endpoint, data) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
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
      console.log('calling setUpdateRecord');
      setUpdateRecord(updateRecord + 1);
    }
  };

  const putData = async (endpoint, data) => {
    setLoading(true);
    try {
      console.log('base url', `${BASE_URL}/${endpoint}`);
      console.log('body', JSON.stringify(data));
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
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
      console.log('calling setUpdateRecord');
      setUpdateRecord(updateRecord + 1);
    }
  };

  const contextValue = useMemo(
    () => ({ user, userNotifications, loading, error, postData, putData }),
    [user, userNotifications, loading, error]
  );

  console.log('Current user:', user);
  console.log('Current userNotification:', userNotifications);

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
