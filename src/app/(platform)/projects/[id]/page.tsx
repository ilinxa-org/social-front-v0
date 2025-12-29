'use client';
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Building2, 
  Users, 
  Target, 
  CheckCircle2,
  Clock,
  Share2
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Extended project data
const projectsData: Record<string, {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  status: "completed" | "ongoing" | "planned";
  heroImage: string;
  gallery: string[];
  description: string;
  fullDescription: string;
  stats: { label: string; value: string }[];
  objectives: string[];
  outcomes: string[];
}> = {
  "fikirtepe-donusum": {
    id: "fikirtepe-donusum",
    title: "Fikirtepe Kentsel Dönüşüm Projesi",
    category: "Kentsel Dönüşüm",
    location: "İstanbul, Kadıköy",
    year: "2023",
    status: "ongoing",
    heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    ],
    description: "İstanbul'un en büyük kentsel dönüşüm projelerinden biri olan Fikirtepe'de 15.000 konutun yenilenmesi.",
    fullDescription: `Fikirtepe Kentsel Dönüşüm Projesi, İstanbul'un Anadolu yakasındaki en kapsamlı yenileme çalışmalarından biridir. Proje kapsamında, deprem riski taşıyan ve yaşam standartlarının altında kalan mevcut yapı stoku tamamen yenilenmektedir.

Bu dönüşüm projesi, sadece fiziksel yapıların yenilenmesini değil, aynı zamanda bölgenin sosyal dokusunun korunmasını ve geliştirilmesini de hedeflemektedir. Yeşil alanlar, sosyal tesisler ve modern altyapı ile donatılan yeni Fikirtepe, İstanbul'un örnek mahallelerinden biri olma yolunda ilerlemektedir.`,
    stats: [
      { label: "Toplam Konut", value: "15.000+" },
      { label: "Proje Alanı", value: "1.2M m²" },
      { label: "Etkilenen Aile", value: "12.000" },
      { label: "Yeşil Alan", value: "200.000 m²" },
    ],
    objectives: [
      "Depreme dayanıklı modern yapılar inşa etmek",
      "Bölge sakinlerinin yerinde dönüşümünü sağlamak",
      "Yeşil ve sürdürülebilir bir yaşam alanı oluşturmak",
      "Sosyal donatı alanlarını artırmak",
      "Ulaşım altyapısını iyileştirmek",
    ],
    outcomes: [
      "8.500 konutun tamamlanması (Devam Ediyor)",
      "3 yeni okul ve 2 sağlık merkezi planlanması",
      "Metro bağlantısı ile entegrasyon",
      "Afet toplanma alanlarının belirlenmesi",
    ],
  },
  "izmir-deprem-konutlari": {
    id: "izmir-deprem-konutlari",
    title: "İzmir Deprem Konutları",
    category: "Afet Yönetimi",
    location: "İzmir, Bayraklı",
    year: "2022",
    status: "completed",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
    ],
    description: "2020 İzmir depremi sonrası inşa edilen depreme dayanıklı modern konut kompleksi.",
    fullDescription: `30 Ekim 2020 tarihinde yaşanan yıkıcı deprem sonrasında, KASDER öncülüğünde başlatılan bu proje, afetten etkilenen ailelerin güvenli ve modern konutlara kavuşmasını sağlamıştır.

Proje, Türkiye'nin en yüksek deprem standartlarına uygun olarak tasarlanmış ve inşa edilmiştir. Tüm yapılar, izolasyonlu temel sistemleri ve güçlendirilmiş betonarme karkas ile donatılmıştır.`,
    stats: [
      { label: "Toplam Konut", value: "3.200" },
      { label: "Teslim Süresi", value: "18 Ay" },
      { label: "Deprem Dayanımı", value: "9.0" },
      { label: "Yatırım", value: "850M ₺" },
    ],
    objectives: [
      "Depremzede ailelerin acil barınma ihtiyacını karşılamak",
      "En yüksek deprem standartlarında yapılar inşa etmek",
      "Sosyal yaşam alanları ile entegre konutlar sunmak",
    ],
    outcomes: [
      "3.200 aile güvenli konutlarına kavuştu",
      "Proje 18 ay gibi rekor sürede tamamlandı",
      "Uluslararası afet yönetimi ödülü kazanıldı",
    ],
  },
};

// Default project for unknown IDs
const defaultProject = {
  id: "default",
  title: "Proje Bulunamadı",
  category: "Genel",
  location: "Türkiye",
  year: "2024",
  status: "planned" as const,
  heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&fit=crop",
  gallery: [],
  description: "Bu proje bulunamadı.",
  fullDescription: "Aradığınız proje mevcut değil veya kaldırılmış olabilir.",
  stats: [],
  objectives: [],
  outcomes: [],
};

const statusLabels = {
  completed: "Tamamlandı",
  ongoing: "Devam Ediyor",
  planned: "Planlanan",
};

const statusIcons = {
  completed: CheckCircle2,
  ongoing: Clock,
  planned: Target,
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectsData[projectId || ""] || defaultProject;
  const StatusIcon = statusIcons[project.status];

  return (

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/60 to-transparent" />
          </div>

          <div className="container relative z-10 px-4 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <Link href="/projects">
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Tüm Projeler
                </Button>
              </Link>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/90 text-accent-foreground rounded-full text-sm font-medium">
                  <StatusIcon className="w-4 h-4" />
                  {statusLabels[project.status]}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                  <Building2 className="w-4 h-4" />
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 max-w-4xl">
                {project.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {project.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {project.year}
                </span>
                <button className="inline-flex items-center gap-2 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                  Paylaş
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        {project.stats.length > 0 && (
          <section className="py-12 bg-muted/30 border-b border-border">
            <div className="container px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {project.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Content Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Proje Hakkında
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    {project.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>

                {/* Gallery */}
                {project.gallery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12"
                  >
                    <h3 className="text-xl font-display font-bold text-foreground mb-6">
                      Proje Görselleri
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video rounded-xl overflow-hidden"
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Görsel ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Objectives */}
                {project.objectives.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card border border-border rounded-2xl p-6 mb-6"
                  >
                    <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-accent" />
                      Hedefler
                    </h3>
                    <ul className="space-y-3">
                      {project.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Outcomes */}
                {project.outcomes.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-linear-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent" />
                      Sonuçlar
                    </h3>
                    <ul className="space-y-3">
                      {project.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-2 h-2 bg-accent rounded-full shrink-0 mt-2" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

  );
};

export default ProjectDetail;
