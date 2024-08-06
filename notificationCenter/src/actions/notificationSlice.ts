import { acknowledgedNotifications, openedNotifications, unreadNotifications } from '@/data/data'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum NotificationType{
  openedNotifications = "Opened Notifcations",
  acknowledgedNotifications = "Acknowledged Notifications",
  undreadNotifications = "Unread Notifications"
}

export interface NotificationState {
  notification: string[] | undefined
  notificationType: NotificationType | undefined,
  unreadNotificationState: string[] 
  openedNotificationState: string[] 
  acknowledgedNotificationState: string[] 
}

const initialState: NotificationState = {
  notification: openedNotifications,
  notificationType: NotificationType.openedNotifications,
  unreadNotificationState: unreadNotifications,
  openedNotificationState: openedNotifications,
  acknowledgedNotificationState: acknowledgedNotifications
}


export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<{notification:string[] | undefined; notificationType:NotificationType | undefined}>){
        state.notification = action.payload.notification
        state.notificationType = action.payload.notificationType
    },
    setOpenedNotificationState(state, action: PayloadAction<string[]>){
        state.openedNotificationState = action.payload
    },
    setAcknowledgedNotificationState(state, action: PayloadAction<string[]>){
        state.acknowledgedNotificationState = action.payload
    },
    setUnreadNotificationState(state, action: PayloadAction<string[]>){
        state.unreadNotificationState = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setNotification , setOpenedNotificationState, setAcknowledgedNotificationState, setUnreadNotificationState} = notificationSlice.actions

export default notificationSlice.reducer