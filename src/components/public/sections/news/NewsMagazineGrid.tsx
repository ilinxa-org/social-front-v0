"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Calendar, Filter, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import NewsCard, { NewsType } from "./NewsCard";

// Mock news data
const generateMockNews = (): NewsType[] => {
  const today = new Date();
  
  return [
    {
      id: "1",
      title: "Türkiye'nin Yeşil Şehir Dönüşümü: 2025 Hedefleri Açıklandı",
      excerpt: "Çevre ve Şehircilik Bakanlığı, 2025 yılına kadar 10 büyükşehirde yeşil alan oranını %40'a çıkarmayı hedefleyen kapsamlı planını açıkladı. Yeni düzenleme ile kentsel dönüşüm projelerinde yeşil alan zorunluluğu getiriliyor.",
      category: "Sürdürülebilirlik",
      author: "Ayşe Yılmaz",
      date: new Date(today.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 8,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
      featured: true,
      views: 2453
    },
    {
      id: "2",
      title: "Akıllı Şehir Teknolojileri Konferansı Başarıyla Tamamlandı",
      excerpt: "İstanbul'da düzenlenen konferans, 50'den fazla ülkeden 2000'i aşkın katılımcıyı bir araya getirdi. Yapay zeka destekli trafik yönetimi ve enerji optimizasyonu öne çıkan konular arasında yer aldı.",
      category: "Etkinlik",
      author: "Mehmet Kaya",
      date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 5,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      views: 1876
    },
    {
      id: "3",
      title: "Deprem Dirençli Yapı Standartları Güncellendi",
      excerpt: "Yeni yönetmelik ile tüm yeni yapılarda zorunlu deprem yalıtım sistemi şartı getirildi. Mevcut binalar için güçlendirme teşvikleri de açıklandı.",
      category: "Kentsel Dönüşüm",
      author: "Prof. Dr. Ali Demir",
      date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 12,
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
      views: 3421
    },
    {
      id: "4",
      title: "Elektrikli Toplu Taşıma Filosu Genişliyor",
      excerpt: "2025 sonuna kadar tüm büyükşehir belediyelerinde elektrikli otobüs oranı %60'a yükselecek. Yeni şarj istasyonları için altyapı yatırımları hız kazandı.",
      category: "Teknoloji",
      author: "Zeynep Öztürk",
      date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 6,
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800",
      views: 987
    },
    {
      id: "5",
      title: "Kentsel Dönüşüm Başvuru Süreci Dijitalleşiyor",
      excerpt: "E-devlet üzerinden başlatılacak yeni sistem ile kentsel dönüşüm başvuruları 3 günde sonuçlanacak. Pilot uygulama İstanbul'da başladı.",
      category: "Duyuru",
      author: "Burak Şahin",
      date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 4,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      views: 2134
    },
    {
      id: "6",
      title: "Uluslararası Şehir Planlama Ödülü Türkiye'ye",
      excerpt: "Ankara Büyükşehir Belediyesi'nin 'Yeşil Koridor' projesi, Avrupa Şehir Planlama Ödülü'nü kazandı. Proje, 50 km'lik kesintisiz yeşil alan oluşturuyor.",
      category: "Araştırma",
      author: "Dr. Selin Arslan",
      date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 7,
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
      views: 1543
    },
    {
      id: "7",
      title: "Yeni Nesil Akıllı Binalar: Enerji Tüketimi %70 Düşüyor",
      excerpt: "IoT sensörleri ve yapay zeka algoritmaları kullanan yeni nesil akıllı bina sistemleri, enerji maliyetlerini radikal şekilde azaltıyor.",
      category: "Teknoloji",
      author: "Can Yıldırım",
      date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 9,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      views: 2876
    },
    {
      id: "8",
      title: "Tarihi Yapıların Restorasyonunda Yeni Dönem",
      excerpt: "Kültür Bakanlığı, tarihi yapıların restorasyonunda 3D tarama ve dijital ikiz teknolojilerinin kullanımını zorunlu kıldı.",
      category: "Kentsel Dönüşüm",
      author: "Elif Demirbaş",
      date: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 6,
      image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800",
      views: 1234
    },
    {
      id: "9",
      title: "Sürdürülebilir Ulaşım Zirvesi 2025 Tarihleri Belli Oldu",
      excerpt: "Mart ayında İzmir'de gerçekleşecek zirve, dünya genelinden 100'den fazla konuşmacıyı ağırlayacak.",
      category: "Etkinlik",
      author: "Deniz Aydın",
      date: new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 3,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
      views: 876
    },
    {
      id: "10",
      title: "Kentsel Isı Adası Etkisine Karşı Yeni Stratejiler",
      excerpt: "Araştırmacılar, büyükşehirlerdeki sıcaklık artışını önlemek için yeşil çatı ve soğutucu kaplama çözümlerini test ediyor.",
      category: "Araştırma",
      author: "Prof. Dr. Hakan Öz",
      date: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 11,
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
      views: 1654
    },
    {
      id: "11",
      title: "Yürünebilir Şehirler İçin Yeni Kılavuz Yayınlandı",
      excerpt: "Derneğimiz, belediyeler için hazırladığı kapsamlı yaya dostu şehir tasarım kılavuzunu kamuoyuyla paylaştı.",
      category: "Duyuru",
      author: "TKB Editör",
      date: new Date(today.getTime() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 5,
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800",
      views: 2345
    },
    {
      id: "12",
      title: "Bisiklet Altyapısı Yatırımları Hız Kazanıyor",
      excerpt: "81 ilde toplam 5.000 km bisiklet yolu hedefiyle başlatılan proje kapsamında ilk etap tamamlandı.",
      category: "Sürdürülebilirlik",
      author: "Murat Çelik",
      date: new Date(today.getTime() - 22 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: 4,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      views: 1123
    }
  ];
};

const categories = ["Tümü", "Kentsel Dönüşüm", "Sürdürülebilirlik", "Teknoloji", "Etkinlik", "Duyuru", "Araştırma"];

const NewsMagazineGrid = () => {
  const [allNews] = useState<NewsType[]>(generateMockNews());
  const [displayedNews, setDisplayedNews] = useState<NewsType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const ITEMS_PER_PAGE = 6;

  // Filter news
  const getFilteredNews = useCallback(() => {
    return allNews.filter(news => {
      // Search filter
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          news.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      // Category filter
      if (activeCategory !== "Tümü" && news.category !== activeCategory) return false;

      // Date filter
      const newsDate = new Date(news.date);
      if (dateRange.from && newsDate < dateRange.from) return false;
      if (dateRange.to) {
        const endDate = new Date(dateRange.to);
        endDate.setHours(23, 59, 59, 999);
        if (newsDate > endDate) return false;
      }

      return true;
    });
  }, [allNews, searchQuery, activeCategory, dateRange]);

  // Sort by date (newest first)
  const getSortedNews = useCallback((filtered: NewsType[]) => {
    return [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  // Reset and load initial news when filters change
  useEffect(() => {
    const filtered = getFilteredNews();
    const sorted = getSortedNews(filtered);
    setDisplayedNews(sorted.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(sorted.length > ITEMS_PER_PAGE);
  }, [searchQuery, activeCategory, dateRange, getFilteredNews, getSortedNews]);

  // Load more
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const filtered = getFilteredNews();
      const sorted = getSortedNews(filtered);
      const nextPage = page + 1;
      const end = nextPage * ITEMS_PER_PAGE;
      
      setDisplayedNews(sorted.slice(0, end));
      setPage(nextPage);
      setHasMore(end < sorted.length);
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore, page, getFilteredNews, getSortedNews]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  const clearDateFilter = () => {
    setDateRange({ from: undefined, to: undefined });
  };

  const featuredNews = displayedNews.find(n => n.featured);
  const regularNews = displayedNews.filter(n => !n.featured || n !== featuredNews);
  const filteredCount = getFilteredNews().length;

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header with search and filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Haber ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg rounded-xl border-border/50 focus:border-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-full">
                  <Calendar className="w-4 h-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      `${format(dateRange.from, "d MMM", { locale: tr })} - ${format(dateRange.to, "d MMM", { locale: tr })}`
                    ) : (
                      format(dateRange.from, "d MMMM yyyy", { locale: tr })
                    )
                  ) : (
                    "Tarih Filtrele"
                  )}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {/* Clear date filter */}
            {(dateRange.from || dateRange.to) && (
              <Button variant="ghost" size="sm" onClick={clearDateFilter} className="gap-1">
                <X className="w-3 h-3" />
                Tarihi Temizle
              </Button>
            )}
          </div>

          {/* Results count */}
          <p className="text-center text-muted-foreground text-sm">
            {filteredCount} haber bulundu
          </p>
        </div>

        {/* Magazine Layout */}
        {displayedNews.length > 0 ? (
          <div className="space-y-12">
            {/* Featured Article */}
            {featuredNews && page === 1 && (
              <div className="mb-12">
                <NewsCard news={featuredNews} variant="featured" />
              </div>
            )}

            {/* Main Grid - Magazine Style */}
            <div className="grid grid-cols-12 gap-6">
              {/* Main Column */}
              <div className="col-span-12 lg:col-span-8 space-y-8">
                {/* Large Article */}
                {regularNews[0] && (
                  <NewsCard news={regularNews[0]} variant="large" />
                )}

                {/* Two Medium Articles */}
                <div className="grid md:grid-cols-2 gap-6">
                  {regularNews.slice(1, 3).map((news) => (
                    <NewsCard key={news.id} news={news} variant="medium" />
                  ))}
                </div>

                {/* Rest of articles in grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularNews.slice(3).map((news) => (
                    <NewsCard key={news.id} news={news} variant="medium" />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="col-span-12 lg:col-span-4">
                <div className="sticky top-24 space-y-8">
                  {/* Popular News */}
                  <div className="bg-card rounded-2xl p-6 border border-border/50">
                    <h3 className="text-lg font-serif font-bold text-foreground mb-4 pb-2 border-b border-border">
                      Popüler Haberler
                    </h3>
                    <div className="space-y-1">
                      {allNews
                        .sort((a, b) => (b.views || 0) - (a.views || 0))
                        .slice(0, 5)
                        .map((news) => (
                          <NewsCard key={news.id} news={news} variant="list" />
                        ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-card rounded-2xl p-6 border border-border/50">
                    <h3 className="text-lg font-serif font-bold text-foreground mb-4 pb-2 border-b border-border">
                      Kategoriler
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.filter(c => c !== "Tümü").map((category) => {
                        const count = allNews.filter(n => n.category === category).length;
                        return (
                          <Badge
                            key={category}
                            variant={activeCategory === category ? "default" : "secondary"}
                            className="cursor-pointer"
                            onClick={() => setActiveCategory(category)}
                          >
                            {category} ({count})
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* Newsletter CTA */}
                  <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                      Bültenimize Katılın
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      En güncel haberleri e-posta ile alın.
                    </p>
                    <div className="flex gap-2">
                      <Input placeholder="E-posta adresiniz" className="flex-1" />
                      <Button>Abone Ol</Button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Haber Bulunamadı</h3>
            <p className="text-muted-foreground">Arama kriterlerinize uygun haber bulunamamıştır.</p>
          </div>
        )}

        {/* Infinite Scroll Loader */}
        <div ref={loaderRef} className="py-8 flex justify-center">
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            </div>
          )}
          {!hasMore && displayedNews.length > 0 && (
            <p className="text-muted-foreground text-sm">Tüm haberler gösterildi</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsMagazineGrid;
