"use client";
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Heart, 
  MessageCircle, 
  Share2,
  Calendar,
  Loader2,
  ChevronRight
} from "lucide-react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  category: string;
  likes: number;
  comments: number;
}

interface BusinessPostsSectionProps {
  posts: Post[];
  businessName: string;
  showHeader?: boolean;
  isPreview?: boolean;
  onSeeAll?: () => void;
}

const ITEMS_PER_PAGE = 10;
const PREVIEW_COUNT = 3;

export function BusinessPostsSection({ 
  posts, 
  businessName, 
  showHeader = true,
  isPreview = false,
  onSeeAll
}: BusinessPostsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(isPreview ? PREVIEW_COUNT : ITEMS_PER_PAGE);
  
  const displayPosts = isPreview ? posts.slice(0, PREVIEW_COUNT) : posts.slice(0, visibleCount);
  const hasMore = !isPreview && visibleCount < posts.length;

  const loadMore = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, posts.length));
  }, [posts.length]);

  const { loadMoreRef, isLoading } = useInfiniteScroll(loadMore, hasMore, {
    rootMargin: "200px"
  });

  if (posts.length === 0) {
    return (
      <Card>
        {showHeader && (
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Paylaşımlar & Duyurular
            </CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Henüz paylaşım yayınlanmadı.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {showHeader && (
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Paylaşımlar & Duyurular
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {displayPosts.length} / {posts.length}
          </span>
        </CardHeader>
      )}
      <CardContent className={!showHeader ? "pt-6" : ""}>
        <div className="space-y-6">
          {displayPosts.map((post, index) => (
            <article 
              key={post.id}
              className={`group ${index !== displayPosts.length - 1 ? 'pb-6 border-b' : ''}`}
            >
              <div className="flex gap-4">
                {/* Post Image */}
                {post.image && (
                  <div className="shrink-0 w-28 h-28 sm:w-40 sm:h-28 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.publishedAt}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Post Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.substring(0, 1)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{post.author.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                        <Heart className="h-3.5 w-3.5" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Preview: See All Button */}
        {isPreview && posts.length > PREVIEW_COUNT && onSeeAll && (
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={onSeeAll} className="gap-2">
              Tüm Paylaşımları Gör ({posts.length})
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {/* Full view: Infinite scroll trigger */}
        {!isPreview && (
          <div ref={loadMoreRef} className="h-10 flex items-center justify-center mt-4">
            {isLoading && (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
