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

interface LocationFilter {
  country: string | null;
  city: string | null;
}

interface ExploreSearchResultsProps {
  query: string;
  category: SearchCategory;
  hasSearched: boolean;
  onTrendingClick: (term: string) => void;
  locationFilter?: LocationFilter;
}

// Rich mock data for testing - with location data added
const mockDatabase: SearchResultItem[] = [
  // Users
  { id: "u1", type: "user", title: "Ahmet Yılmaz", subtitle: "Yazılım Geliştirici • Full Stack", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", url: "/sosyal/profil/1", metadata: { followers: 1234, location: "İstanbul, Türkiye" } },
  { id: "u2", type: "user", title: "Zeynep Kaya", subtitle: "UX/UI Tasarımcı", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", url: "/sosyal/profil/2", metadata: { followers: 892, location: "Ankara, Türkiye" } },
  { id: "u3", type: "user", title: "Mehmet Demir", subtitle: "Proje Yöneticisi", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", url: "/sosyal/profil/3", metadata: { followers: 2156, location: "Berlin, Almanya" } },
  { id: "u4", type: "user", title: "Ayşe Yıldız", subtitle: "Yapay Zeka Mühendisi", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", url: "/sosyal/profil/4", metadata: { followers: 3421, location: "İzmir, Türkiye" } },
  { id: "u5", type: "user", title: "Can Özkan", subtitle: "Girişimci & Yatırımcı", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", url: "/sosyal/profil/5", metadata: { followers: 8765, location: "New York, Amerika" } },
  { id: "u6", type: "user", title: "Emma Schmidt", subtitle: "Data Scientist", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", url: "/sosyal/profil/6", metadata: { followers: 4521, location: "Münih, Almanya" } },
  { id: "u7", type: "user", title: "John Williams", subtitle: "Product Manager", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", url: "/sosyal/profil/7", metadata: { followers: 3890, location: "Londra, İngiltere" } },
  
  // Businesses
  { id: "b1", type: "business", title: "Tech Solutions", subtitle: "Teknoloji Danışmanlık ve Yazılım", image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop", url: "/sosyal/isletme/1", metadata: { followers: 5678, category: "Teknoloji", location: "İstanbul, Türkiye" } },
  { id: "b2", type: "business", title: "Creative Agency", subtitle: "Dijital Pazarlama Ajansı", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop", url: "/sosyal/isletme/2", metadata: { followers: 3421, category: "Pazarlama", location: "Amsterdam, Hollanda" } },
  { id: "b3", type: "business", title: "Startup Hub", subtitle: "Kuluçka Merkezi & Co-Working", image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=100&h=100&fit=crop", url: "/sosyal/isletme/3", metadata: { followers: 2890, category: "Girişimcilik", location: "Berlin, Almanya" } },
  { id: "b4", type: "business", title: "AI Labs", subtitle: "Yapay Zeka Araştırma Şirketi", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop", url: "/sosyal/isletme/4", metadata: { followers: 12400, category: "Yapay Zeka", location: "San Francisco, Amerika" } },
  { id: "b5", type: "business", title: "Green Energy Co", subtitle: "Yenilenebilir Enerji Çözümleri", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=100&h=100&fit=crop", url: "/sosyal/isletme/5", metadata: { followers: 4560, category: "Enerji", location: "Ankara, Türkiye" } },
  
  // News
  { id: "n1", type: "news", title: "Yeni Teknoloji Trendleri 2024", subtitle: "Gelecek yılın en çok konuşulacak teknolojileri", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop", url: "/haberler/1", metadata: { date: "2024-01-15", category: "Teknoloji", location: "İstanbul, Türkiye" } },
  { id: "n2", type: "news", title: "Girişimcilik Ekosistemi Büyüyor", subtitle: "Türkiye'de yeni yatırım fırsatları", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop", url: "/haberler/2", metadata: { date: "2024-01-12", category: "İş Dünyası", location: "Ankara, Türkiye" } },
  { id: "n3", type: "news", title: "Yapay Zeka Sektörde Devrim Yaratıyor", subtitle: "AI teknolojilerinin iş dünyasına etkisi", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop", url: "/haberler/3", metadata: { date: "2024-01-10", category: "Yapay Zeka", location: "Berlin, Almanya" } },
  { id: "n4", type: "news", title: "Dijital Dönüşüm Hızlanıyor", subtitle: "Şirketlerin %80'i dijitalleşme planı yapıyor", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop", url: "/haberler/4", metadata: { date: "2024-01-08", category: "Dijital", location: "Londra, İngiltere" } },
  { id: "n5", type: "news", title: "Sürdürülebilirlik Yatırımları Artıyor", subtitle: "Yeşil teknolojilere rekor yatırım", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop", url: "/haberler/5", metadata: { date: "2024-01-05", category: "Sürdürülebilirlik", location: "Amsterdam, Hollanda" } },
  
  // Events
  { id: "e1", type: "event", title: "Startup Summit 2024", subtitle: "İstanbul Kongre Merkezi", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop", url: "/etkinlikler/1", metadata: { date: "2024-03-20", location: "İstanbul, Türkiye" } },
  { id: "e2", type: "event", title: "Tech Conference", subtitle: "Yapay Zeka ve Geleceğin Teknolojileri", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=100&h=100&fit=crop", url: "/etkinlikler/2", metadata: { date: "2024-04-15", location: "Ankara, Türkiye" } },
  { id: "e3", type: "event", title: "Dijital Pazarlama Zirvesi", subtitle: "2024'ün Pazarlama Trendleri", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=100&h=100&fit=crop", url: "/etkinlikler/3", metadata: { date: "2024-02-28", location: "İzmir, Türkiye" } },
  { id: "e4", type: "event", title: "Developer Meetup", subtitle: "Aylık Yazılımcı Buluşması", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop", url: "/etkinlikler/4", metadata: { date: "2024-02-10", location: "Berlin, Almanya" } },
  { id: "e5", type: "event", title: "AI Workshop", subtitle: "Yapay Zeka Uygulamalı Eğitim", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop", url: "/etkinlikler/5", metadata: { date: "2024-03-05", location: "Online" } },
  { id: "e6", type: "event", title: "Web Summit", subtitle: "Avrupa'nın En Büyük Tech Etkinliği", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100&h=100&fit=crop", url: "/etkinlikler/6", metadata: { date: "2024-05-12", location: "Amsterdam, Hollanda" } },
  
  // Posts
  { id: "p1", type: "post", title: "Proje geliştirme sürecinde dikkat edilmesi gerekenler", subtitle: "Mehmet Demir tarafından paylaşıldı", url: "/sosyal/gonderi/1", metadata: { date: "2024-01-10", location: "İstanbul, Türkiye" } },
  { id: "p2", type: "post", title: "Startup kurma deneyimimi paylaşıyorum", subtitle: "Can Özkan tarafından paylaşıldı", url: "/sosyal/gonderi/2", metadata: { date: "2024-01-09", location: "New York, Amerika" } },
  { id: "p3", type: "post", title: "UX tasarımda en sık yapılan 10 hata", subtitle: "Zeynep Kaya tarafından paylaşıldı", url: "/sosyal/gonderi/3", metadata: { date: "2024-01-08", location: "Ankara, Türkiye" } },
  { id: "p4", type: "post", title: "Yapay zeka ile verimlilik artırma yöntemleri", subtitle: "Ayşe Yıldız tarafından paylaşıldı", url: "/sosyal/gonderi/4", metadata: { date: "2024-01-07", location: "İzmir, Türkiye" } },
  { id: "p5", type: "post", title: "Remote çalışma kültürü ve ipuçları", subtitle: "Ahmet Yılmaz tarafından paylaşıldı", url: "/sosyal/gonderi/5", metadata: { date: "2024-01-06", location: "Londra, İngiltere" } },
];

const generateMockResults = (
  query: string, 
  category: SearchCategory, 
  locationFilter?: LocationFilter
): SearchResultItem[] => {
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

  // Filter by location
  if (locationFilter?.country) {
    filtered = filtered.filter(r => {
      const itemLocation = r.metadata?.location?.toLowerCase() || "";
      const countryMatch = itemLocation.includes(locationFilter.country!.toLowerCase());
      
      if (locationFilter.city) {
        const cityMatch = itemLocation.includes(locationFilter.city.toLowerCase());
        return countryMatch && cityMatch;
      }
      
      return countryMatch;
    });
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

export function ExploreSearchResults({ query, category, hasSearched, onTrendingClick, locationFilter }: ExploreSearchResultsProps) {
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasSearched && query.trim()) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setResults(generateMockResults(query, category, locationFilter));
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, category, hasSearched, locationFilter]);

  // Show trending when no search
  if (!hasSearched || !query.trim()) {
    return (
      <div className="py-8">
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">Popüler Aramalar</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {trendingSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onTrendingClick(search)}
              className="px-4 py-2 text-sm bg-muted/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
            >
              {"#" +search}
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
