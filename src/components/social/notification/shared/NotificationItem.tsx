import { LucideIcon, Heart, MessageCircle, AtSign, UserCheck, Megaphone, Star, AlertCircle, Calendar, Shield, AlertTriangle, Settings, CheckCircle, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface NotificationItemProps {
  notification: NotificationItemData;
  onAction?: (notification: NotificationItemData) => void;
}

// Type configurations - simplified with semantic colors
const typeConfig: Record<NotificationType, {
  icon: LucideIcon;
  iconColor: string;
}> = {
  connection_accepted: {
    icon: UserCheck,
    iconColor: "text-green-600",
  },
  like: {
    icon: Heart,
    iconColor: "text-red-500",
  },
  comment: {
    icon: MessageCircle,
    iconColor: "text-blue-500",
  },
  mention: {
    icon: AtSign,
    iconColor: "text-purple-500",
  },
  platform_announcement: {
    icon: Megaphone,
    iconColor: "text-blue-600",
  },
  platform_feature: {
    icon: Star,
    iconColor: "text-purple-600",
  },
  platform_important: {
    icon: AlertCircle,
    iconColor: "text-amber-600",
  },
  event_reminder: {
    icon: Calendar,
    iconColor: "text-amber-600",
  },
  event_invitation: {
    icon: Calendar,
    iconColor: "text-green-600",
  },
  event_update: {
    icon: Calendar,
    iconColor: "text-blue-600",
  },
  network_activity: {
    icon: Users,
    iconColor: "text-muted-foreground",
  },
  system_security: {
    icon: Shield,
    iconColor: "text-red-600",
  },
  system_action: {
    icon: AlertTriangle,
    iconColor: "text-amber-600",
  },
  system_update: {
    icon: Settings,
    iconColor: "text-blue-600",
  },
  system_success: {
    icon: CheckCircle,
    iconColor: "text-green-600",
  },
};

// Helper to get action text based on type
const getActionText = (type: NotificationType): string => {
  switch (type) {
    case "connection_accepted":
      return "bağlantı isteğinizi kabul etti";
    case "like":
      return "gönderinizi beğendi";
    case "comment":
      return "gönderinize yorum yaptı";
    case "mention":
      return "sizi bir gönderide etiketledi";
    case "network_activity":
      return "";
    default:
      return "";
  }
};

export function NotificationItem({ notification, onAction }: NotificationItemProps) {
  const config = typeConfig[notification.type];
  const IconComponent = config.icon;

  // Determine notification category
  const isUserNotification = ["connection_accepted", "like", "comment", "mention", "network_activity"].includes(notification.type);
  const isPlatformNotification = ["platform_announcement", "platform_feature", "platform_important"].includes(notification.type);
  const isEventNotification = ["event_reminder", "event_invitation", "event_update"].includes(notification.type);
  const isSystemNotification = ["system_security", "system_action", "system_update", "system_success"].includes(notification.type);

  // Unified simple notification style
  const baseClasses = `flex items-start gap-3 py-3 px-2 border-b border-border/50 last:border-b-0 cursor-pointer hover:bg-muted/30 transition-colors ${
    !notification.isRead ? "bg-primary/5" : ""
  }`;

  // User-based notifications
  if (isUserNotification && notification.user) {
    return (
      <div className={baseClasses} onClick={() => onAction?.(notification)}>
        <Avatar className="h-9 w-9 flex-shrink-0">
          <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
          <AvatarFallback className="text-xs">{notification.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-snug">
            <span className="font-medium">{notification.user.name}</span>{" "}
            <span className="text-muted-foreground">
              {notification.content || getActionText(notification.type)}
            </span>
          </p>
          {notification.commentText && (
            <p className="text-sm text-foreground mt-0.5 line-clamp-1">
              "{notification.commentText}"
            </p>
          )}
          {notification.postPreview && !notification.postImage && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1 bg-muted/50 px-2 py-1 rounded">
              {notification.postPreview}
            </p>
          )}
          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
        </div>
        {notification.postImage && (
          <img 
            src={notification.postImage} 
            alt="Post preview" 
            className="h-11 w-11 rounded object-cover flex-shrink-0"
          />
        )}
        {!notification.postImage && (
          <IconComponent className={`h-4 w-4 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
        )}
      </div>
    );
  }

  // Platform notifications
  if (isPlatformNotification) {
    return (
      <div className={baseClasses} onClick={() => onAction?.(notification)}>
        <div className={`p-2 rounded-full bg-muted flex-shrink-0`}>
          <IconComponent className={`h-4 w-4 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-snug">{notification.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{notification.message}</p>
          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
        </div>
      </div>
    );
  }

  // Event notifications
  if (isEventNotification) {
    return (
      <div className={baseClasses} onClick={() => onAction?.(notification)}>
        <div className={`p-2 rounded-full bg-muted flex-shrink-0`}>
          <IconComponent className={`h-4 w-4 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-snug">{notification.title}</p>
          <p className="text-xs text-muted-foreground">
            {notification.eventDate}{notification.eventTime && ` • ${notification.eventTime}`}
          </p>
          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
        </div>
      </div>
    );
  }

  // System notifications
  if (isSystemNotification) {
    return (
      <div className={baseClasses} onClick={() => onAction?.(notification)}>
        <div className={`p-2 rounded-full bg-muted flex-shrink-0`}>
          <IconComponent className={`h-4 w-4 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-snug">{notification.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{notification.message}</p>
          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
        </div>
      </div>
    );
  }

  return null;
}