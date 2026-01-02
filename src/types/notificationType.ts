
// All possible notification types
export type NotificationType = 
  | "connection_accepted"
  | "like"
  | "comment"
  | "mention"
  | "platform_announcement"
  | "platform_feature"
  | "platform_important"
  | "event_reminder"
  | "event_invitation"
  | "event_update"
  | "network_activity"
  | "system_security"
  | "system_action"
  | "system_update"
  | "system_success";

export interface NotificationItemData {
  id: string;
  type: NotificationType;
  isRead: boolean;
  timestamp: string;
  // User info (for user-related notifications)
  user?: {
    name: string;
    avatar: string;
  };
  // Content fields
  content?: string;
  title?: string;
  message?: string;
  commentText?: string;
  postPreview?: string;
  postImage?: string;
  // Event specific
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventAttendees?: number;
  // Action
  actionLabel?: string;
  link?: string;
}

export interface NotificationItemProps {
  notification: NotificationItemData;
  onAction?: (notification: NotificationItemData) => void;
}

export interface ConnectionRequest {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    title?: string;
    mutualConnections?: number;
  };
  timestamp: string;
}

// business notification type
export interface BusinessNotif {
  id: string;
  type: "review" | "inquiry" | "follower" | "stats" | "event";
  title: string;
  message: string;
  user?: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  isRead: boolean;
}
