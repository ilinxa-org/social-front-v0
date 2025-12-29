'use client';
import { useState } from "react";

import { toast } from "sonner";
import { ProfileHeader } from "@/components/social/profile/ProfileHeader";
import { ProfileTabs } from "@/components/social/profile/ProfileTabs";
import { ProfilePostsGrid } from "@/components/social/profile/ProfilePostsGrid";

import { useParams } from "next/navigation";
import { AdvancedPostData } from "@/components/social/posts/AdvancedPostCard";

// Mock current logged-in user
const currentLoggedInUser = {
  id: "1",
  username: "ahmetkaya",
};

// Mock users database with Facebook-style posts
const usersDatabase: Record<string, {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
  isVerified: boolean;
  connectionStatus: "none" | "pending" | "connected" | "received";
  stats: { posts: number; connections: number };
  posts: AdvancedPostData[];
}> = {
  ahmetkaya: {
    id: "1",
    name: "Ahmet Kaya",
    username: "ahmetkaya",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    coverImage: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200",
    bio: "Yazılım Geliştiricisi | Teknoloji Meraklısı\n🚀 Yeni projeler üzerinde çalışıyorum",
    location: "İstanbul, Türkiye",
    website: "https://ahmetkaya.dev",
    joinedDate: "Ocak 2023",
    isVerified: true,
    connectionStatus: "none",
    stats: { posts: 142, connections: 534 },
    posts: [
      { 
        id: "1", 
        author: {
          id: "1",
          name: "Ahmet Kaya",
          username: "ahmetkaya",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
          isVerified: true,
        },
        content: "Bugün yeni projemizin lansmanını gerçekleştirdik! Takım arkadaşlarımla birlikte 6 aydır üzerinde çalıştığımız bu projenin artık dünyayla buluşması inanılmaz heyecan verici. 🚀\n\nHerkese çok teşekkür ederim!",
        media: [
          { id: "1-1", type: "image", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800" },
          { id: "1-2", type: "image", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" },
        ],
        likes: 245, 
        comments: 32, 
        shares: 12,
        timestamp: "2 saat önce",
        isLiked: false,
        isBookmarked: false,
      },
      { 
        id: "2", 
        author: {
          id: "1",
          name: "Ahmet Kaya",
          username: "ahmetkaya",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
          isVerified: true,
        },
        content: "Ekip çalışmasının gücü! Birlikte başaramayacağımız hiçbir şey yok. 💪",
        media: [
          { id: "2-1", type: "image", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" },
        ],
        likes: 189, 
        comments: 45,
        shares: 8,
        timestamp: "5 saat önce",
        isLiked: true,
        isBookmarked: false,
      },
      { 
        id: "3", 
        author: {
          id: "1",
          name: "Ahmet Kaya",
          username: "ahmetkaya",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
          isVerified: true,
        },
        content: "Yeni tasarım çalışmalarımız devam ediyor. Kullanıcı deneyimini her zaman ön planda tutuyoruz.",
        media: [
          { id: "3-1", type: "image", url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800" },
        ],
        likes: 156, 
        comments: 23,
        shares: 5,
        timestamp: "1 gün önce",
        isLiked: false,
        isBookmarked: true,
      },
      {
        id: "4",
        author: {
          id: "1",
          name: "Ahmet Kaya",
          username: "ahmetkaya",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
          isVerified: true,
        },
        content: "Bugün çok güzel bir toplantı yaptık. Gelecek hedeflerimizi belirledik ve yol haritamızı çizdik. 2024 bizim yılımız olacak! 🎯\n\nÖzellikle yapay zeka ve makine öğrenmesi alanlarında ciddi yatırımlar yapmayı planlıyoruz.",
        media: [],
        likes: 312,
        comments: 67,
        shares: 23,
        timestamp: "2 gün önce",
        isLiked: false,
        isBookmarked: false,
      },
    ],
  },
  hessam_hezaveh: {
    id: "2",
    name: "Hessam Hezaveh",
    username: "hessam_hezaveh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    bio: "Tasarımcı & Girişimci 🎨\nUI/UX konusunda tutkulu\nİstanbul'da yaşıyorum",
    location: "İstanbul, Türkiye",
    website: "https://hessamhezaveh.com",
    joinedDate: "Mart 2022",
    isVerified: true,
    connectionStatus: "none",
    stats: { posts: 89, connections: 1243 },
    posts: [
      { 
        id: "h1", 
        author: {
          id: "2",
          name: "Hessam Hezaveh",
          username: "hessam_hezaveh",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          isVerified: true,
        },
        content: "Yeni UI kit tasarımımız hazır! 🎨 Modern ve minimalist bir yaklaşımla hazırladığımız bu kit, mobil uygulamalar için mükemmel bir başlangıç noktası sunuyor.\n\nİndirmek için biyografimdeki linke tıklayabilirsiniz.",
        media: [
          { id: "h1-1", type: "image", url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800" },
          { id: "h1-2", type: "image", url: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800" },
          { id: "h1-3", type: "image", url: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800" },
        ],
        likes: 567, 
        comments: 89, 
        shares: 45,
        timestamp: "3 saat önce",
        isLiked: true,
        isBookmarked: false,
      },
      { 
        id: "h2", 
        author: {
          id: "2",
          name: "Hessam Hezaveh",
          username: "hessam_hezaveh",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          isVerified: true,
        },
        content: "Tasarım sürecinde en önemli şey empati. Kullanıcılarınızı anlamadan iyi bir deneyim yaratamazsınız.",
        media: [
          { id: "h2-1", type: "image", url: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800" },
        ],
        likes: 432, 
        comments: 67,
        shares: 28,
        timestamp: "8 saat önce",
        isLiked: false,
        isBookmarked: true,
      },
      { 
        id: "h3", 
        author: {
          id: "2",
          name: "Hessam Hezaveh",
          username: "hessam_hezaveh",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          isVerified: true,
        },
        content: "Yeni proje üzerinde çalışırken çektiğim bir video. Tasarım sürecinin perde arkası! 🎬",
        media: [
          { id: "h3-1", type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", poster: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800" },
        ],
        likes: 345, 
        comments: 54,
        shares: 19,
        timestamp: "1 gün önce",
        isLiked: false,
        isBookmarked: false,
      },
      { 
        id: "h4", 
        author: {
          id: "2",
          name: "Hessam Hezaveh",
          username: "hessam_hezaveh",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          isVerified: true,
        },
        content: "Veri görselleştirme projeleri her zaman ilgimi çekmiştir. Karmaşık verileri anlaşılır hale getirmek gerçek bir sanat.",
        media: [
          { id: "h4-1", type: "image", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" },
        ],
        likes: 289, 
        comments: 41,
        shares: 15,
        timestamp: "2 gün önce",
        isLiked: true,
        isBookmarked: false,
      },
      {
        id: "h5",
        author: {
          id: "2",
          name: "Hessam Hezaveh",
          username: "hessam_hezaveh",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          isVerified: true,
        },
        content: "Bugün şöyle bir düşünce geldi aklıma:\n\nBazen en iyi tasarım, hiç tasarım yapmamaktır. Kullanıcının yolundan çekilmek ve ona tam olarak ihtiyacı olanı vermek.\n\nMinimalizm sadece az element kullanmak değil, doğru elementleri doğru yerde kullanmaktır. 🧠",
        media: [],
        likes: 678,
        comments: 123,
        shares: 89,
        timestamp: "3 gün önce",
        isLiked: false,
        isBookmarked: true,
      },
      { 
        id: "h6", 
        author: {
          id: "2",
          name: "Hessam Hezaveh",
          username: "hessam_hezaveh",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          isVerified: true,
        },
        content: "Remote çalışmanın avantajları! Bugün kafede çalışırken harika bir verimlilik yakaladım. ☕",
        media: [
          { id: "h6-1", type: "image", url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800" },
        ],
        likes: 156, 
        comments: 23,
        shares: 7,
        timestamp: "4 gün önce",
        isLiked: false,
        isBookmarked: false,
      },
    ],
  },
};

const savedPosts: AdvancedPostData[] = [
  {
    id: "s1", 
    author: {
      id: "3",
      name: "Zeynep Yılmaz",
      username: "zeynepyilmaz",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      isVerified: true,
    },
    content: "İlham verici bir makale okudum bugün. Girişimcilik yolculuğunda karşılaşılan zorluklar hakkında. Herkesin okumasını tavsiye ederim!",
    media: [
      { id: "s1-1", type: "image", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800" },
    ],
    likes: 567, 
    comments: 89,
    shares: 34,
    timestamp: "1 hafta önce",
    isLiked: true,
    isBookmarked: true,
  },
  { 
    id: "s2", 
    author: {
      id: "4",
      name: "Mehmet Özdemir",
      username: "mehmetozdemir",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400",
      isVerified: false,
    },
    content: "Networking etkinliğinden kareler. Harika insanlarla tanıştım ve çok değerli bağlantılar kurdum!",
    media: [
      { id: "s2-1", type: "image", url: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800" },
      { id: "s2-2", type: "image", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800" },
    ],
    likes: 432, 
    comments: 67,
    shares: 21,
    timestamp: "2 hafta önce",
    isLiked: false,
    isBookmarked: true,
  },
  { 
    id: "s3", 
    author: {
      id: "5",
      name: "Ayşe Demir",
      username: "aysedemir",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400",
      isVerified: true,
    },
    content: "Bu yılın en iyi kitaplarından birini bitirdim. Herkese tavsiye ederim! 📚 İş hayatında başarılı olmak isteyenler mutlaka okumalı.",
    media: [
      { id: "s3-1", type: "image", url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800" },
    ],
    likes: 345, 
    comments: 54,
    shares: 18,
    timestamp: "3 hafta önce",
    isLiked: true,
    isBookmarked: true,
  },
];

// Liked posts with different authors
const likedPosts: AdvancedPostData[] = [
  {
    id: "l1", 
    author: {
      id: "6",
      name: "Can Yücel",
      username: "canyucel",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400",
      isVerified: true,
    },
    content: "Yeni ofisimize taşındık! Modern ve ilham verici bir çalışma ortamı. 🏢 Ekibimiz için en iyisini seçtik.",
    media: [
      { id: "l1-1", type: "image", url: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800" },
      { id: "l1-2", type: "image", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" },
      { id: "l1-3", type: "image", url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800" },
    ],
    likes: 789, 
    comments: 123,
    shares: 56,
    timestamp: "5 gün önce",
    isLiked: true,
    isBookmarked: false,
  },
  { 
    id: "l2", 
    author: {
      id: "7",
      name: "Elif Şahin",
      username: "elifsahin",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      isVerified: false,
    },
    content: "Başarının sırrı: Tutku, çalışkanlık ve asla pes etmemek. 💪\n\nHayallerinizin peşinden koşmaktan asla vazgeçmeyin. Her gün bir adım daha yaklaşıyorsunuz.",
    media: [],
    likes: 654, 
    comments: 98,
    shares: 87,
    timestamp: "1 hafta önce",
    isLiked: true,
    isBookmarked: false,
  },
  { 
    id: "l3", 
    author: {
      id: "8",
      name: "Burak Aydın",
      username: "burakaydin",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400",
      isVerified: true,
    },
    content: "Podcast kaydından sahne arkası! Çok keyifli bir sohbet oldu. Yakında yayında!",
    media: [
      { id: "l3-1", type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", poster: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800" },
    ],
    likes: 543, 
    comments: 76,
    shares: 32,
    timestamp: "1 hafta önce",
    isLiked: true,
    isBookmarked: true,
  },
  { 
    id: "l4", 
    author: {
      id: "9",
      name: "Selin Kara",
      username: "selinkara",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      isVerified: false,
    },
    content: "Takım motivasyonu için küçük kutlama! 🎉 Başarılarımızı kutlamak da önemli.",
    media: [
      { id: "l4-1", type: "image", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800" },
    ],
    likes: 432, 
    comments: 65,
    shares: 24,
    timestamp: "2 hafta önce",
    isLiked: true,
    isBookmarked: false,
  },
];

export default function SocialProfile() {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // const { toast } = useToast();

  // Determine which profile to show
  const profileUsername = username || currentLoggedInUser.username;
  console.log("Profile Username:", profileUsername);
  const isOwnProfile = profileUsername === currentLoggedInUser.username;
  
  const profileData = usersDatabase[profileUsername];
  
  const [user, setUser] = useState(() => {
    if (!profileData) return null;
    return {
      ...profileData,
      isOwnProfile,
    };
  });

  // Update user when route changes
  useState(() => {
    if (profileData) {
      setUser({
        ...profileData,
        isOwnProfile,
      });
    }
  });

  const handleSaveProfile = (data: { name: string; bio: string; location: string; website: string }) => {
    if (user) {
      setUser({ ...user, ...data });
      toast("Profil güncellendi", {
          description: "Değişiklikleriniz başarıyla kaydedildi.",
          // action: {
          //   label: "Undo",
          //   onClick: () => console.log("Undo"),
          // },
        })

    }
  };

  // Handle user not found
  if (!user || !profileData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Kullanıcı Bulunamadı</h1>
        <p className="text-muted-foreground">@{profileUsername} kullanıcısı mevcut değil.</p>
      </div>
    );
  }

  const userStats = profileData.stats;
  const userPosts = profileData.posts;

  const getPostsForTab = () => {
    switch (activeTab) {
      case "saved":
        return savedPosts;
      case "liked":
        return likedPosts;
      case "tagged":
        return [];
      default:
        return userPosts;
    }
  };

  const getEmptyMessageForTab = () => {
    switch (activeTab) {
      case "saved":
        return "Henüz kaydedilen gönderi yok";
      case "liked":
        return "Henüz beğenilen gönderi yok";
      case "tagged":
        return "Henüz etiketlenen gönderi yok";
      default:
        return "Henüz gönderi yok";
    }
  };

  // Author info for posts
  const postAuthor = {
    name: user.name,
    username: user.username,
    avatar: user.avatar,
    isVerified: user.isVerified,
  };

  return (
    // <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
    //   <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        // {/* Main Content */}
        <div className="lg:col-span-8 space-y-4">
          {/* Profile Header */}
          <ProfileHeader
            user={user}
            stats={userStats}
            onEditProfile={() => setIsEditDialogOpen(true)}
          />

          {/* Tabs */}
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isOwnProfile={user.isOwnProfile}
          />

          {/* Posts List (Facebook-style) */}
          <ProfilePostsGrid
            posts={getPostsForTab()}
            author={postAuthor}
            emptyMessage={getEmptyMessageForTab()}
          />
        </div>
    //   </div>

    //   {/* Edit Profile Dialog */}
    //   <EditProfileDialog
    //     open={isEditDialogOpen}
    //     onOpenChange={setIsEditDialogOpen}
    //     user={user}
    //     onSave={handleSaveProfile}
    //   />
    // </div>
  );
}
