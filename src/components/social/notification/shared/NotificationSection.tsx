"use client";
import { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationItem, NotificationItemData } from "./NotificationItem";

interface NotificationSectionProps {
  title: string;
  icon: LucideIcon;
  notifications: NotificationItemData[];
  iconColor?: string;
  totalCount?: number;
  collapsible?: boolean;
  defaultOpen?: boolean;
  initialDisplayCount?: number;
  variant?: "default" | "important";
  className?: string;
  headerExtra?: ReactNode;
  onNotificationAction?: (notification: NotificationItemData) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function NotificationSection({
  title,
  icon: Icon,
  notifications,
  iconColor = "text-muted-foreground",
  totalCount,
  collapsible = false,
  defaultOpen = true,
  initialDisplayCount = 3,
  variant = "default",
  className = "",
  headerExtra,
  onNotificationAction,
  onLoadMore,
  hasMore = true,
}: NotificationSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const visibleNotifications = notifications.slice(0, displayCount);
  const canShowMore = onLoadMore ? hasMore : displayCount < notifications.length;

  const handleSeeMore = () => {
    if (onLoadMore) {
      onLoadMore();
    } else {
      setDisplayCount((prev) => prev + 5);
    }
  };

  const isImportant = variant === "important";

  const renderContent = () => (
    <div>
      {visibleNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onAction={onNotificationAction}
        />
      ))}
      {canShowMore && visibleNotifications.length > 0 && (
        <div className="pt-3 pb-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-primary hover:text-primary/80 hover:bg-primary/5"
            onClick={handleSeeMore}
          >
            Daha fazla gör
          </Button>
        </div>
      )}
      {!canShowMore && visibleNotifications.length > 0 && (
        <p className="text-center text-xs text-muted-foreground py-3">
          Tüm bildirimleri gördünüz
        </p>
      )}
    </div>
  );

  const headerContent = (
    <>
      <div className="flex items-center gap-2">
        <Icon className={`h-5 w-5 ${iconColor}`} />
        <span className="font-semibold text-foreground">{title}</span>
        {totalCount !== undefined && (
          <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
            {totalCount}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {headerExtra}
        {collapsible && (
          isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )
        )}
      </div>
    </>
  );

  return (
    <Card className={`${isImportant ? "border-primary/20" : ""} ${className}`}>
      <CardHeader className="pb-2">
        {collapsible ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            {headerContent}
          </button>
        ) : (
          <CardTitle className="text-base flex items-center justify-between">
            {headerContent}
          </CardTitle>
        )}
        
        {collapsible && !isOpen && totalCount !== undefined && (
          <p className="text-sm text-muted-foreground mt-2">
            {totalCount} yeni bildirim
          </p>
        )}
      </CardHeader>

      {collapsible ? (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="pt-0 px-2">
                {renderContent()}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <CardContent className="pt-0 px-2">
          {renderContent()}
        </CardContent>
      )}
    </Card>
  );
}