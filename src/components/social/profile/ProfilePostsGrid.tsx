import { AdvancedPostCard, AdvancedPostCardProps, AdvancedPostData } from "../posts/AdvancedPostCard";



interface ProfilePostsGridProps {
  posts: AdvancedPostData[];
  author: {
    name: string;
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  emptyMessage?: string;
}

export function ProfilePostsGrid({ posts, author, emptyMessage = "Henüz gönderi yok" }: ProfilePostsGridProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-sm p-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">





    </div>
  );
}
