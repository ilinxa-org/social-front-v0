"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

import { Loader2 } from "lucide-react";
import ProjectCard, { Project } from "./ProjectCard";

// Sample projects data
const allProjects: Project[] = [
  {
    id: "fikirtepe-donusum",
    title: "Fikirtepe Kentsel Dönüşüm Projesi",
    category: "Kentsel Dönüşüm",
    location: "İstanbul, Kadıköy",
    year: "2023",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop",
    description: "İstanbul'un en büyük kentsel dönüşüm projelerinden biri olan Fikirtepe'de 15.000 konutun yenilenmesi.",
    status: "ongoing",
  },
  {
    id: "izmir-deprem-konutlari",
    title: "İzmir Deprem Konutları",
    category: "Afet Yönetimi",
    location: "İzmir, Bayraklı",
    year: "2022",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    description: "2020 İzmir depremi sonrası inşa edilen depreme dayanıklı modern konut kompleksi.",
    status: "completed",
  },
  {
    id: "ankara-yesil-sehir",
    title: "Ankara Yeşil Şehir Projesi",
    category: "Sürdürülebilir Gelişim",
    location: "Ankara, Etimesgut",
    year: "2024",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=500&fit=crop",
    description: "Sıfır karbon ayak izi hedefleyen, yenilenebilir enerji kaynaklarıyla desteklenen yaşam alanı.",
    status: "ongoing",
  },
  {
    id: "bursa-tarihi-koruma",
    title: "Bursa Tarihi Doku Koruma",
    category: "Tarihi Koruma",
    location: "Bursa, Osmangazi",
    year: "2021",
    image: "https://images.unsplash.com/photo-1555521893-3a0d8f9e4b3e?w=800&h=500&fit=crop",
    description: "UNESCO Dünya Mirası listesindeki Bursa tarihi merkezinin restorasyonu.",
    status: "completed",
  },
  {
    id: "antalya-sosyal-konut",
    title: "Antalya Sosyal Konut Projesi",
    category: "Sosyal Konut",
    location: "Antalya, Kepez",
    year: "2023",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    description: "Düşük gelirli aileler için inşa edilen 2.500 konutluk sosyal yaşam alanı.",
    status: "ongoing",
  },
  {
    id: "trabzon-akilli-sehir",
    title: "Trabzon Akıllı Şehir Altyapısı",
    category: "Akıllı Şehir",
    location: "Trabzon",
    year: "2025",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=500&fit=crop",
    description: "IoT sensörleri ve veri analitiği ile donatılmış modern şehir altyapısı projesi.",
    status: "planned",
  },
  {
    id: "konya-ekolojik-yerlesim",
    title: "Konya Ekolojik Yerleşim Alanı",
    category: "Sürdürülebilir Gelişim",
    location: "Konya, Selçuklu",
    year: "2022",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&h=500&fit=crop",
    description: "Doğayla uyumlu, enerji verimli konutlardan oluşan ekolojik yaşam köyü.",
    status: "completed",
  },
  {
    id: "gaziantep-sanayi-donusum",
    title: "Gaziantep Sanayi Dönüşüm Projesi",
    category: "Kentsel Dönüşüm",
    location: "Gaziantep, Şehitkamil",
    year: "2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
    description: "Eski sanayi bölgesinin karma kullanımlı modern yaşam alanına dönüştürülmesi.",
    status: "ongoing",
  },
  {
    id: "eskisehir-universite-konut",
    title: "Eskişehir Üniversite Konut Projesi",
    category: "Eğitim",
    location: "Eskişehir",
    year: "2021",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=500&fit=crop",
    description: "Öğrenciler için modern ve ekonomik yaşam alanları sunan konut kompleksi.",
    status: "completed",
  },
  {
    id: "mersin-liman-yenileme",
    title: "Mersin Liman Bölgesi Yenileme",
    category: "Kentsel Dönüşüm",
    location: "Mersin, Akdeniz",
    year: "2025",
    image: "https://images.unsplash.com/photo-1494522358652-f30e61e60942?w=800&h=500&fit=crop",
    description: "Tarihi liman bölgesinin turizm ve kültür merkezine dönüştürülmesi.",
    status: "planned",
  },
  {
    id: "kayseri-deprem-guclendirme",
    title: "Kayseri Yapı Güçlendirme Programı",
    category: "Afet Yönetimi",
    location: "Kayseri",
    year: "2023",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
    description: "Mevcut binaların depreme karşı güçlendirilmesi için kapsamlı program.",
    status: "ongoing",
  },
  {
    id: "samsun-sahil-projesi",
    title: "Samsun Sahil Şeridi Projesi",
    category: "Kentsel Tasarım",
    location: "Samsun, Atakum",
    year: "2022",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=500&fit=crop",
    description: "Karadeniz kıyısında modern ve erişilebilir kamusal alan tasarımı.",
    status: "completed",
  },
];

const categories = [
  "Tümü",
  "Kentsel Dönüşüm",
  "Afet Yönetimi",
  "Sürdürülebilir Gelişim",
  "Sosyal Konut",
  "Akıllı Şehir",
  "Tarihi Koruma",
];

const ITEMS_PER_PAGE = 6;

const ProjectsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredProjects = selectedCategory === "Tümü"
    ? allProjects
    : allProjects.filter((p) => p.category === selectedCategory);

  // Reset when category changes
  useEffect(() => {
    setPage(1);
    setDisplayedProjects(filteredProjects.slice(0, ITEMS_PER_PAGE));
    setHasMore(filteredProjects.length > ITEMS_PER_PAGE);
  }, [selectedCategory]);

  // Load more projects
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newProjects = filteredProjects.slice(0, endIndex);

      setDisplayedProjects(newProjects);
      setPage(nextPage);
      setHasMore(endIndex < filteredProjects.length);
      setLoading(false);
    }, 500);
  }, [page, loading, hasMore, filteredProjects]);

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loadMore, hasMore, loading]);

  return (
    <section className="py-16 bg-background flex flex-col items-center">
      <div className="container px-4">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-accent text-accent-foreground shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Loading / Load More */}
        <div ref={loadMoreRef} className="flex justify-center py-12">
          {loading && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Yükleniyor...</span>
            </div>
          )}
          {!hasMore && displayedProjects.length > 0 && (
            <p className="text-muted-foreground text-sm">
              Tüm projeler gösteriliyor
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
