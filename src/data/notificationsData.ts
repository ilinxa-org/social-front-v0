import { BusinessNotif, ConnectionRequest, NotificationItemData } from "@/types/notificationType";


// Mock data generators - simplified without time filter
export const connectionNotifications: NotificationItemData[] = [
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

export const engagementNotifications: NotificationItemData[] = [
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

export const platformNotifications: NotificationItemData[] = [
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

export const eventNotifications: NotificationItemData[] = [
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

export const generateNetworkNotifications = (count: number): NotificationItemData[] => {
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

export const systemNotifications: NotificationItemData[] = [
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



export const mockRequests: ConnectionRequest[] = [
  {
    id: "1",
    user: {
      name: "Ahmet Yıldız",
      username: "ahmet_yildiz",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      title: "Yazılım Mühendisi",
      mutualConnections: 12,
    },
    timestamp: "2 saat önce",
  },
  {
    id: "2",
    user: {
      name: "Zeynep Kaya",
      username: "zeynep_kaya",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      title: "Mimar",
      mutualConnections: 5,
    },
    timestamp: "5 saat önce",
  },
  {
    id: "3",
    user: {
      name: "Can Öztürk",
      username: "can_ozturk",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      title: "Şehir Plancısı",
      mutualConnections: 8,
    },
    timestamp: "1 gün önce",
  },
];

// Mock business notifications
export const mockNotifications: BusinessNotif[] = [
  {
    id: "1",
    type: "review",
    title: "Yeni Değerlendirme",
    message: "İşletmeniz 5 yıldız aldı: 'Harika bir hizmet, kesinlikle tavsiye ederim!'",
    user: {
      name: "Mehmet Yılmaz",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    timestamp: "1 saat önce",
    isRead: false,
  },
  {
    id: "2",
    type: "inquiry",
    title: "Yeni Mesaj",
    message: "Hizmetleriniz hakkında bilgi almak istiyorum. Fiyat teklifi alabilir miyim?",
    user: {
      name: "Ayşe Kara",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    timestamp: "3 saat önce",
    isRead: false,
  },
  {
    id: "3",
    type: "follower",
    title: "Yeni Takipçiler",
    message: "Bu hafta 15 yeni kişi işletmenizi takip etmeye başladı.",
    timestamp: "Bugün",
    isRead: false,
  },
  {
    id: "4",
    type: "stats",
    title: "Haftalık Rapor",
    message: "Profiliniz bu hafta %25 daha fazla görüntülendi. Detaylı raporu inceleyin.",
    timestamp: "Dün",
    isRead: true,
  },
  {
    id: "5",
    type: "event",
    title: "Etkinlik Hatırlatması",
    message: "Kayıt olduğunuz 'Sürdürülebilir İş Uygulamaları' semineri yarın başlıyor.",
    timestamp: "Dün",
    isRead: true,
  },
];