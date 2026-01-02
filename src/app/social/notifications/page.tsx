"use client";
import { useState, useCallback } from "react";
import { User, Building2, UserCheck, Heart, Megaphone, Calendar, Users, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ConnectionRequestsCard } from "@/components/social/notification/ConnectionRequestsCard";
import { NotificationSection } from "@/components/social/notification/shared/NotificationSection";
import { BusinessNotificationsTab } from "@/components/social/notification/BusinessNotificationsTab";
import { connectionNotifications, engagementNotifications, eventNotifications, generateNetworkNotifications, platformNotifications, systemNotifications } from "@/data/notificationsData";
import { NotificationItemData } from "@/types/notificationType";


export default function Notifications() {
  const [activeTab, setActiveTab] = useState("personal");
  
  // Network activity load more state
  const [networkNotifications, setNetworkNotifications] = useState<NotificationItemData[]>(
    generateNetworkNotifications(5)
  );
  const [hasMoreNetwork, setHasMoreNetwork] = useState(true);

  const loadMoreNetwork = useCallback(() => {
    const currentCount = networkNotifications.length;
    const newNotifications = generateNetworkNotifications(currentCount + 5);
    setNetworkNotifications(newNotifications);
    if (newNotifications.length >= 30) {
      setHasMoreNetwork(false);
    }
  }, [networkNotifications.length]);

  const handleNotificationAction = (notification: NotificationItemData) => {
    console.log("Action for notification:", notification.id);
  };

  return (

        <div className="lg:col-span-8">
          <h1 className="text-2xl font-bold mb-6">Bildirimler</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Kişisel Hesap
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                İşletme Hesabı
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 mt-0">
              {/* Connection Requests */}
              <ConnectionRequestsCard />

              {/* Connection Accepted */}
              <NotificationSection
                title="Kabul Edilen Bağlantılar"
                icon={UserCheck}
                iconColor="text-green-500"
                notifications={connectionNotifications}
                collapsible
                defaultOpen
                onNotificationAction={handleNotificationAction}
              />

              {/* Engagement */}
              <NotificationSection
                title="Beğeni, Yorum ve Etiketler"
                icon={Heart}
                iconColor="text-red-500"
                notifications={engagementNotifications}
                collapsible
                defaultOpen
                onNotificationAction={handleNotificationAction}
              />

              {/* Platform Announcements */}
              <NotificationSection
                title="KASDER Duyuruları"
                icon={Megaphone}
                iconColor="text-primary"
                notifications={platformNotifications}
                variant="important"
                collapsible
                defaultOpen
                onNotificationAction={handleNotificationAction}
              />

              {/* Event Notifications */}
              <NotificationSection
                title="Etkinlik Bildirimleri"
                icon={Calendar}
                iconColor="text-primary"
                notifications={eventNotifications}
                collapsible
                defaultOpen
                onNotificationAction={handleNotificationAction}
              />

              {/* Network Activity */}
              <NotificationSection
                title="Ağınızdaki Aktiviteler"
                icon={Users}
                iconColor="text-muted-foreground"
                notifications={networkNotifications}
                totalCount={42}
                collapsible
                defaultOpen={false}
                onLoadMore={loadMoreNetwork}
                hasMore={hasMoreNetwork}
                onNotificationAction={handleNotificationAction}
              />

              {/* System Notifications */}
              <NotificationSection
                title="Sistem Bildirimleri"
                icon={Key}
                iconColor="text-muted-foreground"
                notifications={systemNotifications}
                collapsible
                defaultOpen
                onNotificationAction={handleNotificationAction}
              />
            </TabsContent>

            <TabsContent value="business" className="mt-0">
              <BusinessNotificationsTab />
            </TabsContent>
          </Tabs>
        </div>


  );
}