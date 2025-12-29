"use client";
import { useState, useEffect } from "react";
import { Search, TrendingUp } from "lucide-react";
import { SearchCategory } from "./ExploreSearchTab";
import { SearchResultCard } from "./SearchResultCard";


export interface SearchResultItem {
  id: string;
  type: "user" | "business" | "news" | "event" | "post";
  title: string;
  subtitle?: string;
  image?: string;
  url: string;
  metadata?: {
    date?: string;
    location?: string;
    followers?: number;
    category?: string;
  };
}

interface ExploreSearchResultsProps {
  query: string;
  category: SearchCategory;
  hasSearched: boolean;
  onTrendingClick: (term: string) => void;
}

// Rich mock data for testing
const mockDatabase: SearchResultItem[] = [
  // Users
  { id: "u1", type: "user", title: "Ahmet Yılmaz", subtitle: "Yazılım Geliştirici • Full Stack", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", url: "/sosyal/profil/1", metadata: { followers: 1234 } },
  { id: "u2", type: "user", title: "Zeynep Kaya", subtitle: "UX/UI Tasarımcı", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", url: "/sosyal/profil/2", metadata: { followers: 892 } },
  { id: "u3", type: "user", title: "Mehmet Demir", subtitle: "Proje Yöneticisi", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", url: "/sosyal/profil/3", metadata: { followers: 2156 } },
  { id: "u4", type: "user", title: "Ayşe Yıldız", subtitle: "Yapay Zeka Mühendisi", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", url: "/sosyal/profil/4", metadata: { followers: 3421 } },
  { id: "u5", type: "user", title: "Can Özkan", subtitle: "Girişimci & Yatırımcı", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", url: "/sosyal/profil/5", metadata: { followers: 8765 } },
  
  // Businesses
  { id: "b1", type: "business", title: "Tech Solutions", subtitle: "Teknoloji Danışmanlık ve Yazılım", image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop", url: "/sosyal/isletme/1", metadata: { followers: 5678, category: "Teknoloji" } },
  { id: "b2", type: "business", title: "Creative Agency", subtitle: "Dijital Pazarlama Ajansı", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop", url: "/sosyal/isletme/2", metadata: { followers: 3421, category: "Pazarlama" } },
  { id: "b3", type: "business", title: "Startup Hub", subtitle: "Kuluçka Merkezi & Co-Working", image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=100&h=100&fit=crop", url: "/sosyal/isletme/3", metadata: { followers: 2890, category: "Girişimcilik" } },
  { id: "b4", type: "business", title: "AI Labs", subtitle: "Yapay Zeka Araştırma Şirketi", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop", url: "/sosyal/isletme/4", metadata: { followers: 12400, category: "Yapay Zeka" } },
  { id: "b5", type: "business", title: "Green Energy Co", subtitle: "Yenilenebilir Enerji Çözümleri", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=100&h=100&fit=crop", url: "/sosyal/isletme/5", metadata: { followers: 4560, category: "Enerji" } },
  
  // News
  { id: "n1", type: "news", title: "Yeni Teknoloji Trendleri 2024", subtitle: "Gelecek yılın en çok konuşulacak teknolojileri", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop", url: "/news/1", metadata: { date: "2024-01-15", category: "Teknoloji" } },
  { id: "n2", type: "news", title: "Girişimcilik Ekosistemi Büyüyor", subtitle: "Türkiye'de yeni yatırım fırsatları", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop", url: "/news/2", metadata: { date: "2024-01-12", category: "İş Dünyası" } },
  { id: "n3", type: "news", title: "Yapay Zeka Sektörde Devrim Yaratıyor", subtitle: "AI teknolojilerinin iş dünyasına etkisi", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop", url: "/news/3", metadata: { date: "2024-01-10", category: "Yapay Zeka" } },
  { id: "n4", type: "news", title: "Dijital Dönüşüm Hızlanıyor", subtitle: "Şirketlerin %80'i dijitalleşme planı yapıyor", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop", url: "/news/4", metadata: { date: "2024-01-08", category: "Dijital" } },
  { id: "n5", type:"news" , title:"Sürdürülebilirlik Yatırımları Artıyor" , subtitle:"Yeşil teknolojilere rekor yatırım" , image:"https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop" , url:"/news/5" , metadata:{ date:"2024-01-05", category:"Sürdürülebilirlik" } },
  // Events
  { id: "e1", type: "event", title: "Startup Summit 2024", subtitle: "İstanbul Kongre Merkezi", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop", url: "/events/1", metadata: { date: "2024-03-20", location: "İstanbul" } },
  { id: "e2", type: "event", title: "Tech Conference", subtitle: "Yapay Zeka ve Geleceğin Teknolojileri", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=100&h=100&fit=crop", url: "/events/2", metadata: { date: "2024-04-15", location: "Ankara" } },
  { id: "e3", type: "event", title: "Dijital Pazarlama Zirvesi", subtitle: "2024'ün Pazarlama Trendleri", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=100&h=100&fit=crop", url: "/events/3", metadata: { date: "2024-02-28", location: "İzmir" } },
  { id: "e4", type: "event", title: "Developer Meetup", subtitle: "Aylık Yazılımcı Buluşması", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop", url: "/events/4", metadata: { date: "2024-02-10", location: "İstanbul" } },
  { id: "e5", type: "event", title: "AI Workshop", subtitle: "Yapay Zeka Uygulamalı Eğitim", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop", url: "/events/5", metadata: { date: "2024-03-05", location: "Online" } },
  
  // Posts
  { id: "p1", type: "post", title: "Proje geliştirme sürecinde dikkat edilmesi gerekenler", subtitle: "Mehmet Demir tarafından paylaşıldı", url: "/sosyal/gonderi/1", metadata: { date: "2024-01-10" } },
  { id: "p2", type: "post", title: "Startup kurma deneyimimi paylaşıyorum", subtitle: "Can Özkan tarafından paylaşıldı", url: "/sosyal/gonderi/2", metadata: { date: "2024-01-09" } },
  { id: "p3", type: "post", title: "UX tasarımda en sık yapılan 10 hata", subtitle: "Zeynep Kaya tarafından paylaşıldı", url: "/sosyal/gonderi/3", metadata: { date: "2024-01-08" } },
  { id: "p4", type: "post", title: "Yapay zeka ile verimlilik artırma yöntemleri", subtitle: "Ayşe Yıldız tarafından paylaşıldı", url: "/sosyal/gonderi/4", metadata: { date: "2024-01-07" } },
  { id: "p5", type: "post", title: "Remote çalışma kültürü ve ipuçları", subtitle: "Ahmet Yılmaz tarafından paylaşıldı", url: "/sosyal/gonderi/5", metadata: { date: "2024-01-06" } },
];

const generateMockResults = (query: string, category: SearchCategory): SearchResultItem[] => {
  if (!query.trim()) return [];

  const searchTerms = query.toLowerCase().split(" ");
  
  let filtered = mockDatabase;
  
  // Filter by category
  if (category !== "all") {
    const categoryMap: Record<string, string> = {
      users: "user",
      businesses: "business",
      news: "news",
      events: "event",
      posts: "post"
    };
    filtered = filtered.filter(r => r.type === categoryMap[category]);
  }

  // Search filter - match any term
  return filtered.filter(r => 
    searchTerms.some(term =>
      r.title.toLowerCase().includes(term) ||
      r.subtitle?.toLowerCase().includes(term) ||
      r.metadata?.category?.toLowerCase().includes(term) ||
      r.metadata?.location?.toLowerCase().includes(term)
    )
  );
};

const trendingSearches = [
  "Teknoloji",
  "Yapay Zeka",
  "Startup",
  "Dijital Pazarlama",
  "İstanbul",
  "Girişimcilik",
];

export function ExploreSearchResults({ query, category, hasSearched, onTrendingClick }: ExploreSearchResultsProps) {
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasSearched && query.trim()) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setResults(generateMockResults(query, category));
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, category, hasSearched]);

  // Show trending when no search
  if (!hasSearched || !query.trim()) {
    return (
      <div className="py-8">
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">Popüler Aramalar</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onTrendingClick(search)}
              className="px-4 py-2 text-sm bg-muted/50 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center text-muted-foreground">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm">Aranıyor...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center text-muted-foreground">
        <Search className="h-12 w-12 mb-4 opacity-30" />
        <p className="text-lg font-medium">Sonuç bulunamadı</p>
        <p className="text-sm mt-1">Farklı anahtar kelimeler deneyin</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 py-4">
      <p className="text-sm text-muted-foreground mb-4">
        {results.length} sonuç bulundu
      </p>
      {results.map((result) => (
        <SearchResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
