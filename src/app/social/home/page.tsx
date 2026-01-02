
"use client";
import { useState, useCallback } from "react";


// import { AdvancedPostCard, type AdvancedPostData, type Comment } from ;

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";
import { AdvancedPostCard, AdvancedPostData } from "@/components/social/posts/AdvancedPostCard";
import { Comment } from "@/components/social/posts/PostEngagementPanel";
import { StoriesSection } from "@/components/social/story/StoriesSection";
import { generateMockComments, generatePosts } from "@/data/homeData";
import SocialEventCard from "@/components/social/events/SocialEventCard";
import { generateMockEvents } from "@/data/eventsData";
import { generateMockNews, mockNews } from "@/data/newsData";
import SocialNewsCarousel from "@/components/social/news/SocialNewsCarousel";
import SocialProjectCard from "@/components/social/projects/SocialProjectCard";
import { allProjects } from "@/data/projectsData";

// Sample posts data with new structure

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

          {/* for news */}
          <SocialNewsCarousel  news={generateMockNews()} />

          {/* Posts */}
          <div className="space-y-4">
            {posts.slice(0, 3).map((post) => (
              <AdvancedPostCard 
                key={post.id} 
                post={post}
                currentUser={currentUser}
                onLoadComments={handleLoadComments}
                onAddComment={handleAddComment}
              />
            ))}
            {/* for event */}
            {generateMockEvents().slice(0, 1).map((item) =>
            <SocialEventCard key={`event-${item.id}`} event={item} />
            )}
            {
              allProjects.slice(0, 2).map((item) =>
              <SocialProjectCard key={`project-${item.id}`} project={item} />
              )
            }
            


 
            {/* for projects */}

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
