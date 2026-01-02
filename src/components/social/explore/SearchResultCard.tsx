
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Newspaper, Calendar, FileText, MapPin, Clock } from "lucide-react";
import { SearchResultItem } from "./ExploreSearchResults";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SearchResultCardProps {
  result: SearchResultItem;
}

const typeConfig = {
  user: {
    icon: Users,
    label: "Kullanıcı",
    color: "bg-blue-500/10 text-blue-600 border-blue-200"
  },
  business: {
    icon: Building2,
    label: "İşletme",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200"
  },
  news: {
    icon: Newspaper,
    label: "Haber",
    color: "bg-orange-500/10 text-orange-600 border-orange-200"
  },
  event: {
    icon: Calendar,
    label: "Etkinlik",
    color: "bg-purple-500/10 text-purple-600 border-purple-200"
  },
  post: {
    icon: FileText,
    label: "Gönderi",
    color: "bg-gray-500/10 text-gray-600 border-gray-200"
  }
};

export function SearchResultCard({ result }: SearchResultCardProps) {
  const config = typeConfig[result.type];
  const Icon = config.icon;

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Link
      href={result.url}
      className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted/50 border border-border/50 transition-all hover:shadow-sm group"
    >
      {/* Avatar / Image */}
      <Avatar className="h-14 w-14 rounded-xl">
        <AvatarImage src={result.image} alt={result.title} className="object-cover" />
        <AvatarFallback className="rounded-xl bg-muted">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {result.title}
            </h4>
            {result.subtitle && (
              <p className="text-sm text-muted-foreground truncate mt-0.5">
                {result.subtitle}
              </p>
            )}
          </div>
          <Badge 
            variant="outline" 
            className={cn("shrink-0 text-xs font-medium", config.color)}
          >
            {config.label}
          </Badge>
        </div>

        {/* Metadata */}
        {result.metadata && (
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            {result.metadata.followers !== undefined && (
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {formatNumber(result.metadata.followers)} takipçi
              </span>
            )}
            {result.metadata.date && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(result.metadata.date).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "short"
                })}
              </span>
            )}
            {result.metadata.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {result.metadata.location}
              </span>
            )}
            {result.metadata.category && (
              <span className="px-2 py-0.5 bg-muted rounded-full">
                {result.metadata.category}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
