"use client";
import { useState, useCallback } from "react";
import { User, Building2, UserCheck, Heart, Megaphone, Calendar, Users, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationItemData } from "@/components/social/notification/shared/NotificationItem";
import { ConnectionRequestsCard } from "@/components/social/notification/ConnectionRequestsCard";
import { NotificationSection } from "@/components/social/notification/shared/NotificationSection";
import { BusinessNotificationsTab } from "@/components/social/notification/BusinessNotificationsTab";


// Mock data generators - simplified without time filter
const connectionNotifications: NotificationItemData[] = [
  {
    id: "conn-1",
    type: "connection_accepted",
    user: { name: "Elif Şahin", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    timestamp: "1 saat önce",
    isRead: false,
  },
  {
    id: "conn-2",
    type: "connection_accepted",
    user: { name: "Murat Demir", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
    timestamp: "3 saat önce",
    isRead: true,
  },
  {
    id: "conn-3",
    type: "connection_accepted",
    user: { name: "Zeynep Kaya", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    timestamp: "1 gün önce",
    isRead: true,
  },
  {
    id: "conn-4",
    type: "connection_accepted",
    user: { name: "Ahmet Yıldız", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    timestamp: "2 gün önce",
    isRead: true,
  },
];

const engagementNotifications: NotificationItemData[] = [
  {
    id: "eng-1",
    type: "like",
    user: { name: "Ayşe Yılmaz", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
    postImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
    timestamp: "5 dk önce",
    isRead: false,
  },
  {
    id: "eng-2",
    type: "comment",
    user: { name: "Mehmet Kara", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    commentText: "Harika bir proje olmuş, tebrikler!",
    postPreview: "Bugün yeni projemizin lansmanını gerçekleştirdik...",
    timestamp: "15 dk önce",
    isRead: false,
  },
  {
    id: "eng-3",
    type: "mention",
    user: { name: "Fatma Demir", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    postImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop",
    timestamp: "1 saat önce",
    isRead: true,
  },
  {
    id: "eng-4",
    type: "like",
    user: { name: "Ali Öztürk", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    content: "ve 5 kişi daha gönderinizi beğendi",
    postImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    timestamp: "2 saat önce",
    isRead: true,
  },
  {
    id: "eng-5",
    type: "comment",
    user: { name: "Selin Arslan", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" },
    commentText: "Çok güzel bir paylaşım olmuş!",
    postImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
    timestamp: "3 saat önce",
    isRead: true,
  },
];

const platformNotifications: NotificationItemData[] = [
  {
    id: "plat-1",
    type: "platform_important",
    title: "Yeni Özellik: İş Profilleri",
    message: "Artık işletmeniz için ayrı bir profil oluşturabilirsiniz. Hemen deneyin!",
    link: "/sosyal/profil",
    timestamp: "Bugün",
    isRead: false,
  },
  {
    id: "plat-2",
    type: "platform_announcement",
    title: "KASDER Yılsonu Toplantısı",
    message: "2025 yılsonu değerlendirme toplantımıza davetlisiniz. Detaylar için tıklayın.",
    link: "/etkinlikler",
    timestamp: "Dün",
    isRead: false,
  },
  {
    id: "plat-3",
    type: "platform_feature",
    title: "Profil Güncelleme Hatırlatması",
    message: "Profilinizi güncelleyerek daha fazla kişiye ulaşabilirsiniz.",
    timestamp: "3 gün önce",
    isRead: true,
  },
];

const eventNotifications: NotificationItemData[] = [
  {
    id: "event-1",
    type: "event_reminder",
    title: "Sürdürülebilir Şehircilik Zirvesi",
    eventDate: "15 Ocak 2025",
    eventTime: "09:00",
    eventLocation: "İstanbul Kongre Merkezi",
    eventAttendees: 234,
    timestamp: "Yarın",
    isRead: false,
  },
  {
    id: "event-2",
    type: "event_invitation",
    title: "Akıllı Ulaşım Semineri",
    eventDate: "20 Ocak 2025",
    eventTime: "14:00",
    eventLocation: "Ankara Ticaret Odası",
    eventAttendees: 89,
    timestamp: "5 gün sonra",
    isRead: false,
  },
  {
    id: "event-3",
    type: "event_update",
    title: "Kentsel Dönüşüm Çalıştayı",
    eventDate: "28 Ocak 2025",
    eventTime: "10:00",
    eventLocation: "İzmir Kültür Merkezi",
    timestamp: "Güncellendi",
    isRead: true,
  },
];

const generateNetworkNotifications = (count: number): NotificationItemData[] => {
  const activities = [
    { action: "yeni bir gönderi paylaştı" },
    { action: "bir fotoğraf paylaştı" },
    { action: "profilini güncelledi" },
    { action: "bir etkinliğe katıldı" },
    { action: "yeni bir proje ekledi" },
    { action: "bir makale yazdı" },
    { action: "yeni bir bağlantı ekledi" },
  ];
  
  const users = [
    { name: "Elif Şahin", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    { name: "Murat Demir", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
    { name: "Ayşe Yılmaz", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
    { name: "Can Öztürk", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    { name: "Zeynep Kaya", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { name: "Ahmet Yıldız", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    { name: "Fatma Kara", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" },
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `network-${i}`,
    type: "network_activity" as const,
    user: users[i % users.length],
    content: activities[i % activities.length].action,
    timestamp: `${i + 1} saat önce`,
    isRead: true,
  }));
};

const systemNotifications: NotificationItemData[] = [
  {
    id: "sys-1",
    type: "system_security",
    title: "Yeni Cihazdan Giriş",
    message: "Hesabınıza İstanbul, Türkiye konumundan yeni bir cihazla giriş yapıldı.",
    actionLabel: "İncele",
    timestamp: "2 saat önce",
    isRead: false,
  },
  {
    id: "sys-2",
    type: "system_action",
    title: "E-posta Doğrulama",
    message: "Hesap güvenliğiniz için e-posta adresinizi doğrulayın.",
    actionLabel: "Doğrula",
    timestamp: "1 gün önce",
    isRead: false,
  },
  {
    id: "sys-3",
    type: "system_update",
    title: "Gizlilik Politikası Güncellendi",
    message: "Gizlilik politikamız güncellendi. Lütfen yeni koşulları inceleyin.",
    actionLabel: "Oku",
    timestamp: "3 gün önce",
    isRead: true,
  },
  {
    id: "sys-4",
    type: "system_success",
    title: "Şifre Değiştirildi",
    message: "Hesap şifreniz başarıyla değiştirildi.",
    timestamp: "1 hafta önce",
    isRead: true,
  },
];

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