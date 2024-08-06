import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { notificationSelect } from "@/store/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import {
  NotificationType,
  setAcknowledgedNotificationState,
  setNotification,
  setOpenedNotificationState,
  setUnreadNotificationState,
} from "@/actions/notificationSlice";

function User() {
  const dispatch = useAppDispatch();
  const {
    notification,
    notificationType,
    openedNotificationState,
    acknowledgedNotificationState,
    unreadNotificationState,
  } = useAppSelector(notificationSelect);
  const [value, setValue] = useState("");
  const toggleValueChange = (value: string) => {
    setValue(value);
  };
  const onRead = () => {
    if (notificationType === NotificationType.acknowledgedNotifications) {
      dispatch(setOpenedNotificationState([...openedNotificationState, value]));
      dispatch(
        setAcknowledgedNotificationState([
          ...acknowledgedNotificationState.filter((val) => val !== value),
        ])
      );
    }
    if (notificationType === NotificationType.undreadNotifications) {
      dispatch(setOpenedNotificationState([...openedNotificationState, value]));
      dispatch(
        setUnreadNotificationState([
          ...unreadNotificationState.filter((val) => val !== value),
        ])
      );
    }
    dispatch(
      setNotification({
        notification: notification?.filter((val) => val !== value),
        notificationType,
      })
    );
  };
  return (
    <div className=" flex flex-col gap-4">
      <h1>{notificationType}</h1>
      <ul>
        <ScrollArea className=" h-[80vh] rounded-md border px-4">
          <Accordion
            onValueChange={toggleValueChange}
            type="single"
            collapsible
            className="w-full"
          >
            {notification?.map((text, index) => (
              <AccordionItem
                className=" delay-200 transition-transform"
                value={text}
              >
                {value !== text ? (
                  <AccordionTrigger className=" !no-underline !font-normal">
                    <div>
                      <span className=" underline mr-2">{index} hrs ago</span>
                      <span className=" text-gray-200 text-xs">
                        {text.length > 50 ? text.slice(0, 50) + "..." : text}
                      </span>
                    </div>
                  </AccordionTrigger>
                ) : (
                  <AccordionTrigger className=" relative">
                    <div className=" underline mr-2">{index} hrs ago</div>
                    {notificationType !==
                      NotificationType.openedNotifications && (
                      <div
                        onClick={onRead}
                        className=" absolute right-8 flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        <EyeOpenIcon></EyeOpenIcon>
                        <div className=" text-xs">Mark as Read</div>
                      </div>
                    )}
                  </AccordionTrigger>
                )}
                <AccordionContent>{text}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </ul>
    </div>
  );
}

export default User;
