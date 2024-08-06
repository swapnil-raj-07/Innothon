import { NotificationType, setNotification } from "@/actions/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { notificationSelect } from "@/store/store";
import { Outlet } from "react-router-dom";

function Layout() {
  const dispatch = useAppDispatch();
  const {
    notificationType,
    openedNotificationState,
    unreadNotificationState,
    acknowledgedNotificationState,
  } = useAppSelector(notificationSelect);
  const onSelect = (
    notification: string[],
    notificationType: NotificationType
  ) => {
    dispatch(setNotification({ notification, notificationType }));
  };
  return (
    <div className=" h-screen overflow-hidden">
      <div className=" bg-cyan-950 p-6 flex justify-between">
        <h1 className=" font-bold text-white"> Notification Center</h1>
        <div className=" flex items-center gap-5 ">
          <div className=" bg-gray-900 flex items-center rounded px-4 py-2 gap-2 font-bold">
            <p className=" text-white  ">Points</p>
            <p>
              {openedNotificationState?.length * 100 +
                acknowledgedNotificationState?.length * 50}
            </p>
          </div>
          <h1 className=" font-bold text-white">User</h1>
        </div>
      </div>
      <div className=" grid grid-cols-10">
        <div className=" col-span-2 bg-slate-900 h-screen">
          <h1 className=" p-4 text-slate-300 border-b  border-gray-400">
            Notifications
          </h1>
          <div className=" flex flex-col  text-gray-400 font-bold">
            <div
              onClick={() =>
                onSelect(
                  [...unreadNotificationState],
                  NotificationType.undreadNotifications
                )
              }
              className={`${
                notificationType === NotificationType.undreadNotifications
                  ? " scale-110 text-cyan-700 ml-2"
                  : "hover:bg-slate-800"
              } delay-100 transition-all cursor-pointer p-4`}
            >
              Unread Notifications
            </div>
            <div
              onClick={() =>
                onSelect(
                  [...acknowledgedNotificationState],
                  NotificationType.acknowledgedNotifications
                )
              }
              className={`${
                notificationType === NotificationType.acknowledgedNotifications
                  ? " scale-110 text-cyan-700 ml-2"
                  : "hover:bg-slate-800"
              } delay-100 transition-all cursor-pointer p-4 `}
            >
              Acknowledged Notifications
            </div>
            <div
              onClick={() =>
                onSelect(
                  [...openedNotificationState],
                  NotificationType.openedNotifications
                )
              }
              className={`${
                notificationType === NotificationType.openedNotifications
                  ? " scale-110 text-cyan-700 ml-2"
                  : "hover:bg-slate-800"
              } delay-100 transition-all cursor-pointer p-4 `}
            >
              Opened Notifications
            </div>
          </div>
        </div>
        <div className=" col-span-8 bg-slate-950 p-6 h-screen text-white">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Layout;
