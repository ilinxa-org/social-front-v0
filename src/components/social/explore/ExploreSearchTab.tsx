"use client";
import { useState } from "react";
import { Search, X, Users, Building2, Newspaper, Calendar, FileText, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExploreSearchResults } from "./ExploreSearchResults";

export type SearchCategory = "all" | "users" | "businesses" | "news" | "events" | "posts";

interface CategoryOption {
  id: SearchCategory;
  label: string;
  icon: React.ElementType;
}

const categories: CategoryOption[] = [
  { id: "all", label: "Tümü", icon: Globe },
  { id: "users", label: "Kullanıcılar", icon: Users },
  { id: "businesses", label: "İşletmeler", icon: Building2 },
  { id: "news", label: "Haberler", icon: Newspaper },
  { id: "events", label: "Etkinlikler", icon: Calendar },
  { id: "posts", label: "Gönderiler", icon: FileText },
];

export function ExploreSearchTab() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery ?? query;
    if (q.trim()) {
      if (searchQuery) setQuery(searchQuery);
      setHasSearched(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setHasSearched(false);
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    setHasSearched(true);
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Kullanıcı, işletme, haber veya etkinlik ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-12 h-12 text-base rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <Badge
              key={category.id}
              variant={isActive ? "default" : "outline"}
              className={cn(
                "cursor-pointer px-3 py-1.5 text-sm font-medium transition-all",
                "hover:scale-105 active:scale-95",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-background hover:bg-muted border-border/50"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              <Icon className="h-3.5 w-3.5 mr-1.5" />
              {category.label}
            </Badge>
          );
        })}
      </div>

      {/* Search Results */}
      <ExploreSearchResults 
        query={query} 
        category={activeCategory} 
        hasSearched={hasSearched}
        onTrendingClick={handleTrendingClick}
      />
    </div>
  );
}
