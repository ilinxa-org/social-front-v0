
"use client";
import { useState, useCallback } from "react";


// import { AdvancedPostCard, type AdvancedPostData, type Comment } from ;

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";
import { AdvancedPostCard, AdvancedPostData } from "@/components/social/posts/AdvancedPostCard";
import { Comment } from "@/components/social/posts/PostEngagementPanel";
import { StoriesSection } from "@/components/social/story/StoriesSection";

// Sample posts data with new structure
const generatePosts = (page: number): AdvancedPostData[] => {
  const basePosts: AdvancedPostData[] = [
    {
      id: `${page}-1`,
      author: {
        id: "u1",
        name: "Mehmet Yılmaz",
        username: "mehmet_yilmaz",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        isVerified: true,
      },
      content: "Bugün harika bir iş toplantısı geçirdik! Yeni projemiz için çok heyecanlıyız. 🚀 #Girişimcilik #Teknoloji\n\nEkibimizle birlikte çok önemli kararlar aldık ve önümüzdeki ay lansmanı planlıyoruz. Bu süreçte bizi destekleyen herkese teşekkür ederiz.",
      media: [
        { id: "1", type: "image", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600", alt: "İş toplantısı" },
        { id: "2", type: "image", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600", alt: "Takım çalışması" },
        { id: "3", type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", poster: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600" },
      ],
      likes: 245,
      likedBy: [
        { id: "l1", name: "Ayşe Demir", username: "ayse_demir", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
        { id: "l2", name: "Ali Öztürk", username: "ali_ozturk", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
        { id: "l3", name: "Fatma Kara", username: "fatma_kara", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
      ],
      comments: 32,
      shares: 15,
      timestamp: "2s",
    },
    {
      id: `${page}-2`,
      author: {
        id: "u2",
        name: "Ayşe Demir",
        username: "ayse_demir",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      },
      content: "Yeni tasarım projemden bir kesit paylaşmak istedim. Sizce nasıl olmuş? Fikirlerinizi bekliyorum! 🎨",
      media: [
        { id: "1", type: "image", url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600", alt: "Tasarım projesi" },
      ],
      likes: 189,
      likedBy: [
        { id: "l1", name: "Mehmet Yılmaz", username: "mehmet_yilmaz", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
      ],
      comments: 45,
      shares: 8,
      timestamp: "1s",
    },
    {
      id: `${page}-3`,
      author: {
        id: "u3",
        name: "Ali Öztürk",
        username: "ali_ozturk",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        isVerified: true,
      },
      content: "Yazılım geliştirme dünyasında sürekli öğrenme çok önemli. Bugün yeni bir framework öğrenmeye başladım. Sizin önerileriniz neler? #Yazılım #Öğrenme\n\nBu alanda kendinizi geliştirmek için neler yapıyorsunuz? Hangi kaynakları takip ediyorsunuz? Tecrübelerinizi paylaşırsanız çok mutlu olurum. Ben genellikle YouTube eğitimlerini ve resmi dökümantasyonları tercih ediyorum.",
      media: [],
      likes: 156,
      likedBy: [],
      comments: 67,
      shares: 23,
      timestamp: "3s",
    },
    {
      id: `${page}-4`,
      author: {
        id: "u4",
        name: "Fatma Kara",
        username: "fatma_kara",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      },
      content: "İstanbul'dan günaydın! ☀️ Bu sabah sahilde yürüyüş yaptım ve bu manzarayı sizinle paylaşmak istedim.",
      media: [
        { id: "1", type: "image", url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600", alt: "İstanbul manzarası" },
        { id: "2", type: "image", url: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600", alt: "Boğaz" },
        { id: "3", type: "image", url: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600", alt: "Gün batımı" },
        { id: "4", type: "video", url: "https://www.w3schools.com/html/movie.mp4", poster: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600" },
      ],
      likes: 423,
      likedBy: [
        { id: "l1", name: "Ayşe Demir", username: "ayse_demir", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
        { id: "l2", name: "Ali Öztürk", username: "ali_ozturk", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
      ],
      comments: 56,
      shares: 34,
      timestamp: "5s",
    },
  ];

  return basePosts.map((post) => ({
    ...post,
    id: `${page}-${post.id}`,
  }));
};

// Mock comments generator
const generateMockComments = (postId: string, page: number): Comment[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${postId}-comment-${page}-${i}`,
    author: {
      id: `user-${i}`,
      name: ["Ahmet Kaya", "Zeynep Yıldız", "Can Demir", "Elif Şahin", "Burak Öz"][i % 5],
      username: ["ahmet_kaya", "zeynep_yildiz", "can_demir", "elif_sahin", "burak_oz"][i % 5],
      avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=100`,
    },
    content: ["Harika bir paylaşım! 👏", "Çok güzel olmuş!", "Tebrikler 🎉", "Muhteşem görünüyor!", "Başarılarının devamını dilerim!"][i % 5],
    createdAt: new Date(Date.now() - i * 3600000),
    likes: Math.floor(Math.random() * 50),
    isLiked: Math.random() > 0.7,
  }));
};

export default function SocialHome() {
  const [posts, setPosts] = useState<AdvancedPostData[]>(generatePosts(1));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const currentUser = {
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    name: "Kullanıcı",
  };

  const loadMore = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const nextPage = page + 1;
    const newPosts = generatePosts(nextPage);
    
    setPosts((prev) => [...prev, ...newPosts]);
    setPage(nextPage);
    
    if (nextPage >= 5) {
      setHasMore(false);
    }
  }, [page]);

  const { loadMoreRef, isLoading } = useInfiniteScroll(loadMore, hasMore);

  const handleLoadComments = async (postId: string, commentPage: number): Promise<Comment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateMockComments(postId, commentPage);
  };

  const handleAddComment = async (postId: string, content: string): Promise<Comment> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      id: `new-${Date.now()}`,
      author: {
        id: "current-user",
        name: currentUser.name,
        username: "kullanici",
        avatar: currentUser.avatar,
      },
      content,
      createdAt: new Date(),
      likes: 0,
    };
  };

  return (

        <div className="lg:col-span-8 space-y-4">
          {/* Stories */}
          <StoriesSection />


          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <AdvancedPostCard 
                key={post.id} 
                post={post}
                currentUser={currentUser}
                onLoadComments={handleLoadComments}
                onAddComment={handleAddComment}
              />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          <div ref={loadMoreRef} className="flex justify-center py-8">
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Yükleniyor...</span>
              </div>
            )}
            {!hasMore && (
              <p className="text-muted-foreground text-sm">
                Tüm gönderileri gördünüz
              </p>
            )}
          </div>
        </div>


  );
}
