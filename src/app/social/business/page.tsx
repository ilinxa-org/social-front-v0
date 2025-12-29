"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

import { Code, Smartphone, Cloud, Shield, Palette, BarChart3, Zap, Database, Globe, Cpu } from "lucide-react";
import { BusinessAboutSection } from "@/components/social/business/BusinessAboutSection";
import BusinessServicesSection from "@/components/social/business/BusinessServicesSection";
import { BusinessProjectsSection } from "@/components/social/business/BusinessProjectsSection";
import { BusinessPostsSection } from "@/components/social/business/BusinessPostsSection";
import { BusinessContactSection } from "@/components/social/business/BusinessContactSection";
import { BusinessProfileHeader } from "@/components/social/business/BusinessProfileHeader";
import { BusinessProfileTabs } from "@/components/social/business/BusinessProfileTabs";
import { SuggestionsCard } from "@/components/social/SuggestionsCard";

// Mock business database
const businessDatabase: Record<string, {
  id: string;
  name: string;
  username: string;
  logo: string;
  coverImage: string;
  tagline: string;
  category: string;
  location: string;
  website: string;
  phone: string;
  email: string;
  foundedDate: string;
  isVerified: boolean;
  workingHours: string;
  stats: { followers: number; projects: number };
  services?: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    bgImage: string;
  }>;
  about: {
    description: string;
    mission: string;
    vision: string;
    values: string[];
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    status: "completed" | "ongoing" | "upcoming";
    link?: string;
    fullDescription?: string;
    location?: string;
    year?: string;
    team?: string;
    goals?: string[];
    gallery?: string[];
  }>;
  contact: {
    address: string;
    phone: string;
    email: string;
    mapEmbedUrl?: string;
  };
  posts: Array<{
    id: string;
    title: string;
    excerpt: string;
    image?: string;
    author: { name: string; avatar: string };
    publishedAt: string;
    category: string;
    likes: number;
    comments: number;
  }>;
}> = {
  kasder: {
    id: "b1",
    name: "KASDER",
    username: "kasder",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    tagline: "Kamu-Özel Sektör Diyalogu ve Ekonomik Reformlar Derneği",
    category: "Sivil Toplum Kuruluşu",
    location: "İstanbul, Türkiye",
    website: "https://kasder.org",
    phone: "+90 212 555 1234",
    email: "info@kasder.org",
    foundedDate: "2015",
    isVerified: true,
    workingHours: "Pzt-Cum 09:00-18:00",
    stats: { followers: 12450, projects: 24 },
    about: {
      description: "KASDER, kamu ve özel sektör arasındaki diyalogu güçlendirmek, ekonomik reformları desteklemek ve sürdürülebilir kalkınmaya katkıda bulunmak amacıyla kurulmuş bir sivil toplum kuruluşudur.\n\nKurulduğumuz günden bu yana, Türkiye'nin ekonomik gelişimine katkı sağlayacak politika önerileri geliştirmek, paydaşlar arasında köprü kurmak ve toplumsal fayda sağlayacak projeler yürütmek için çalışıyoruz.",
      mission: "Kamu-özel sektör işbirliğini güçlendirerek ekonomik kalkınmaya katkı sağlamak ve sürdürülebilir bir gelecek için çözümler üretmek.",
      vision: "Türkiye'nin ekonomik gelişiminde öncü rol oynayan, güvenilir ve etkin bir sivil toplum kuruluşu olmak.",
      values: ["Şeffaflık", "İşbirliği", "İnovasyon", "Sürdürülebilirlik", "Güvenilirlik"]
    },
    projects: [
            {
        id: "tp1",
        title: "E-Ticaret Platformu",
        description: "Küçük işletmeler için entegre e-ticaret çözümü.",
        fullDescription: "Küçük ve orta ölçekli işletmeler için geliştirdiğimiz e-ticaret platformu, stok yönetimi, ödeme entegrasyonları, kargo takibi ve müşteri ilişkileri yönetimini tek bir çatı altında birleştiriyor. Platform, kullanıcı dostu arayüzü sayesinde teknik bilgi gerektirmeden kolayca yönetilebiliyor.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
        category: "Web Uygulama",
        status: "completed",
        location: "İstanbul, Türkiye",
        year: "2023",
        team: "8 Geliştirici",
        goals: ["Online satış süreçlerini basitleştirmek", "Stok yönetimini otomatikleştirmek", "Müşteri deneyimini iyileştirmek"],
        gallery: [
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"
        ],
        link: "#"
      },
      {
        id: "tp2",
        title: "Akıllı Şehir Uygulaması",
        description: "Belediyeler için vatandaş hizmetleri mobil uygulaması.",
        fullDescription: "Belediyelerin vatandaşlara daha iyi hizmet sunmasını sağlayan kapsamlı mobil uygulama. Vatandaşlar, belediye hizmetlerine başvurabilir, şikayetlerini iletebilir, fatüralarını ödeyebilir ve şehirdeki etkinlikleri takip edebilir. Uygulama, gerçek zamanlı bildirimler ve konum tabanlı hizmetler sunuyor.",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
        category: "Mobil Uygulama",
        status: "ongoing",
        location: "Ankara, Türkiye",
        year: "2024",
        team: "12 Geliştirici",
        goals: ["Vatandaş-belediye iletişimini güçlendirmek", "Hizmet süreçlerini dijitalleştirmek", "Şehir verilerini analiz etmek"],
        link: "#"
      },
      {
        id: "tp3",
        title: "Fintech Ödeme Sistemi",
        description: "Güvenli ve hızlı dijital ödeme altyapısı.",
        fullDescription: "PCI-DSS uyumlu, yüksek güvenlikli dijital ödeme altyapısı. Kredi kartı, banka transferi, dijital cüzdan ve QR kod ile ödeme seçenekleri sunan sistem, saniyeler içinde işlem gerçekleştiriyor. Fraud detection ve 3D Secure entegrasyonları ile güvenlik en üst düzeyde.",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800",
        category: "Fintech",
        status: "completed",
        location: "İstanbul, Türkiye",
        year: "2023",
        team: "6 Geliştirici",
        goals: ["Güvenli ödeme altyapısı kurmak", "İşlem süresini minimize etmek", "Çoklu ödeme yöntemi desteği sağlamak"],
        gallery: [
          "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400",
          "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400"
        ],
        link: "#"
      },
      {
        id: "tp4",
        title: "IoT Sensör Platformu",
        description: "Endüstriyel IoT sensör verilerini yöneten bulut platformu.",
        fullDescription: "Fabrikalar ve üretim tesisleri için geliştirilen IoT platformu, binlerce sensörden gelen verileri gerçek zamanlı olarak toplıyor, işliyor ve analiz ediyor. Makine öğrenimi algoritmaları ile arıza tahmini yapılarak bakım maliyetleri düşürülüyor.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        category: "IoT",
        status: "ongoing",
        location: "Bursa, Türkiye",
        year: "2024",
        team: "10 Geliştirici",
        goals: ["Sensör verilerini merkezi yönetim", "Predictive maintenance sağlamak", "Üretim verimliliğini artırmak"],
        link: "#"
      },
      {
        id: "tp5",
        title: "Sağlık Takip Uygulaması",
        description: "Hastalar için kişisel sağlık takibi ve randevu sistemi.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
        category: "Sağlık Teknolojisi",
        status: "completed",
        location: "İzmir, Türkiye",
        year: "2022",
        team: "5 Geliştirici",
        link: "#"
      },
      {
        id: "tp6",
        title: "Eğitim LMS Platformu",
        description: "Kurumlar için online eğitim ve sertifika yönetim sistemi.",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
        category: "EdTech",
        status: "ongoing",
        location: "Ankara, Türkiye",
        year: "2024",
        team: "7 Geliştirici",
        link: "#"
      },
    ],
    contact: {
      address: "Levent Mah. Büyükdere Cad. No:123, Beşiktaş, İstanbul",
      phone: "+90 212 555 1234",
      email: "info@kasder.org",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.2!2d29.0!3d41.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA2JzAwLjAiTiAyOcKwMDAnMDAuMCJF!5e0!3m2!1sen!2str!4v1234567890"
    },
    posts: [
      {
        id: "blog1",
        title: "2024 Ekonomik Görünüm Raporu Yayınlandı",
        excerpt: "KASDER tarafından hazırlanan 2024 yılı ekonomik görünüm raporu, sektörel analizler ve öneriler içermektedir.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
        author: { name: "Ahmet Yılmaz", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
        publishedAt: "15 Aralık 2024",
        category: "Rapor",
        likes: 234,
        comments: 45
      },
      {
        id: "blog2",
        title: "Dijital Dönüşüm Eğitim Programı Başvuruları Açıldı",
        excerpt: "KOBİ'lere yönelik ücretsiz dijital dönüşüm eğitim programı için başvurular başladı.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        author: { name: "Zeynep Demir", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
        publishedAt: "10 Aralık 2024",
        category: "Duyuru",
        likes: 156,
        comments: 23
      },
      {
        id: "blog3",
        title: "Sürdürülebilir Kalkınma Hedefleri ve İş Dünyası",
        excerpt: "Birleşmiş Milletler Sürdürülebilir Kalkınma Hedefleri çerçevesinde iş dünyasının rolü.",
        image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800",
        author: { name: "Mehmet Kaya", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
        publishedAt: "5 Aralık 2024",
        category: "Makale",
        likes: 189,
        comments: 34
      }
    ]
  },
  techstartup: {
    id: "b2",
    name: "TechStartup",
    username: "techstartup",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    tagline: "İnovasyonu Şekillendiriyoruz",
    category: "Teknoloji Şirketi",
    location: "Ankara, Türkiye",
    website: "https://techstartup.com.tr",
    phone: "+90 312 444 5678",
    email: "hello@techstartup.com.tr",
    foundedDate: "2020",
    isVerified: true,
    workingHours: "Pzt-Cum 10:00-19:00",
    stats: { followers: 8760, projects: 12 },
    services: [
      {
        id: "s1",
        title: "Web Geliştirme",
        description: "Modern ve responsive web uygulamaları geliştiriyoruz. React, Vue, Angular teknolojileriyle kurumsal çözümler.",
        icon: Code,
        bgImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800"
      },
      {
        id: "s2",
        title: "Mobil Uygulama",
        description: "iOS ve Android için native ve cross-platform mobil uygulamalar. Flutter ve React Native uzmanlığı.",
        icon: Smartphone,
        bgImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800"
      },
      {
        id: "s3",
        title: "Bulut Çözümleri",
        description: "AWS, Azure ve Google Cloud üzerinde ölçeklenebilir altyapı kurulumu ve yönetimi.",
        icon: Cloud,
        bgImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800"
      },
      {
        id: "s4",
        title: "Siber Güvenlik",
        description: "Penetrasyon testleri, güvenlik denetimleri ve kurumsal güvenlik danışmanlığı hizmetleri.",
        icon: Shield,
        bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800"
      },
      {
        id: "s5",
        title: "UI/UX Tasarım",
        description: "Kullanıcı deneyimi odaklı arayüz tasarımları. Figma ve Adobe XD ile profesyonel tasarım.",
        icon: Palette,
        bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800"
      },
      {
        id: "s6",
        title: "Veri Analitiği",
        description: "Büyük veri analizi, iş zekası raporları ve veri görselleştirme çözümleri.",
        icon: BarChart3,
        bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
      },
      {
        id: "s7",
        title: "DevOps Hizmetleri",
        description: "CI/CD pipeline kurulumu, konteynerizasyon ve sürekli entegrasyon süreçleri.",
        icon: Zap,
        bgImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800"
      },
      {
        id: "s8",
        title: "Veritabanı Yönetimi",
        description: "PostgreSQL, MongoDB, Redis gibi veritabanlarının kurulumu, optimizasyonu ve yönetimi.",
        icon: Database,
        bgImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800"
      },
      {
        id: "s9",
        title: "API Geliştirme",
        description: "RESTful ve GraphQL API tasarımı, entegrasyon çözümleri ve mikroservis mimarisi.",
        icon: Globe,
        bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
      },
      {
        id: "s10",
        title: "Yapay Zeka Çözümleri",
        description: "Machine learning modelleri, NLP uygulamaları ve AI destekli otomasyon sistemleri.",
        icon: Cpu,
        bgImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800"
      }
    ],
    about: {
      description: "TechStartup olarak, yenilikçi yazılım çözümleri ve dijital ürünler geliştiriyoruz. Startuplardan kurumsal şirketlere kadar geniş bir müşteri portföyüne hizmet veriyoruz.\n\nEkibimiz, tutkulu mühendisler, tasarımcılar ve ürün yöneticilerinden oluşmaktadır.",
      mission: "Teknoloji ile hayatı kolaylaştıran çözümler üretmek.",
      vision: "Türkiye'nin lider teknoloji şirketlerinden biri olmak.",
      values: ["İnovasyon", "Kalite", "Müşteri Odaklılık", "Çeviklik"]
    },
    projects: [
      {
        id: "tp1",
        title: "E-Ticaret Platformu",
        description: "Küçük işletmeler için entegre e-ticaret çözümü.",
        fullDescription: "Küçük ve orta ölçekli işletmeler için geliştirdiğimiz e-ticaret platformu, stok yönetimi, ödeme entegrasyonları, kargo takibi ve müşteri ilişkileri yönetimini tek bir çatı altında birleştiriyor. Platform, kullanıcı dostu arayüzü sayesinde teknik bilgi gerektirmeden kolayca yönetilebiliyor.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
        category: "Web Uygulama",
        status: "completed",
        location: "İstanbul, Türkiye",
        year: "2023",
        team: "8 Geliştirici",
        goals: ["Online satış süreçlerini basitleştirmek", "Stok yönetimini otomatikleştirmek", "Müşteri deneyimini iyileştirmek"],
        gallery: [
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"
        ],
        link: "#"
      },
      {
        id: "tp2",
        title: "Akıllı Şehir Uygulaması",
        description: "Belediyeler için vatandaş hizmetleri mobil uygulaması.",
        fullDescription: "Belediyelerin vatandaşlara daha iyi hizmet sunmasını sağlayan kapsamlı mobil uygulama. Vatandaşlar, belediye hizmetlerine başvurabilir, şikayetlerini iletebilir, fatüralarını ödeyebilir ve şehirdeki etkinlikleri takip edebilir. Uygulama, gerçek zamanlı bildirimler ve konum tabanlı hizmetler sunuyor.",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
        category: "Mobil Uygulama",
        status: "ongoing",
        location: "Ankara, Türkiye",
        year: "2024",
        team: "12 Geliştirici",
        goals: ["Vatandaş-belediye iletişimini güçlendirmek", "Hizmet süreçlerini dijitalleştirmek", "Şehir verilerini analiz etmek"],
        link: "#"
      },
      {
        id: "tp3",
        title: "Fintech Ödeme Sistemi",
        description: "Güvenli ve hızlı dijital ödeme altyapısı.",
        fullDescription: "PCI-DSS uyumlu, yüksek güvenlikli dijital ödeme altyapısı. Kredi kartı, banka transferi, dijital cüzdan ve QR kod ile ödeme seçenekleri sunan sistem, saniyeler içinde işlem gerçekleştiriyor. Fraud detection ve 3D Secure entegrasyonları ile güvenlik en üst düzeyde.",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800",
        category: "Fintech",
        status: "completed",
        location: "İstanbul, Türkiye",
        year: "2023",
        team: "6 Geliştirici",
        goals: ["Güvenli ödeme altyapısı kurmak", "İşlem süresini minimize etmek", "Çoklu ödeme yöntemi desteği sağlamak"],
        gallery: [
          "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400",
          "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400"
        ],
        link: "#"
      },
      {
        id: "tp4",
        title: "IoT Sensör Platformu",
        description: "Endüstriyel IoT sensör verilerini yöneten bulut platformu.",
        fullDescription: "Fabrikalar ve üretim tesisleri için geliştirilen IoT platformu, binlerce sensörden gelen verileri gerçek zamanlı olarak toplıyor, işliyor ve analiz ediyor. Makine öğrenimi algoritmaları ile arıza tahmini yapılarak bakım maliyetleri düşürülüyor.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        category: "IoT",
        status: "ongoing",
        location: "Bursa, Türkiye",
        year: "2024",
        team: "10 Geliştirici",
        goals: ["Sensör verilerini merkezi yönetim", "Predictive maintenance sağlamak", "Üretim verimliliğini artırmak"],
        link: "#"
      },
      {
        id: "tp5",
        title: "Sağlık Takip Uygulaması",
        description: "Hastalar için kişisel sağlık takibi ve randevu sistemi.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
        category: "Sağlık Teknolojisi",
        status: "completed",
        location: "İzmir, Türkiye",
        year: "2022",
        team: "5 Geliştirici",
        link: "#"
      },
      {
        id: "tp6",
        title: "Eğitim LMS Platformu",
        description: "Kurumlar için online eğitim ve sertifika yönetim sistemi.",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
        category: "EdTech",
        status: "ongoing",
        location: "Ankara, Türkiye",
        year: "2024",
        team: "7 Geliştirici",
        link: "#"
      },
      {
        id: "tp7",
        title: "Lojistik Takip Sistemi",
        description: "Gerçek zamanlı kargo ve filo takip çözümü.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
        category: "Lojistik",
        status: "completed",
        link: "#"
      },
      {
        id: "tp8",
        title: "HR Yönetim Platformu",
        description: "İK süreçlerini dijitalleştiren kapsamlı platform.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
        category: "HR Tech",
        status: "upcoming",
        link: "#"
      },
      {
        id: "tp9",
        title: "Müşteri Sadakat Sistemi",
        description: "Perakende için puan ve kampanya yönetim sistemi.",
        image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800",
        category: "CRM",
        status: "completed",
        link: "#"
      },
      {
        id: "tp10",
        title: "Restoran Sipariş Sistemi",
        description: "QR menü ve dijital sipariş çözümü.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
        category: "FoodTech",
        status: "ongoing",
        link: "#"
      },
      {
        id: "tp11",
        title: "Gayrimenkul Portalı",
        description: "Emlak arama ve değerleme platformu.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
        category: "PropTech",
        status: "completed",
        link: "#"
      },
      {
        id: "tp12",
        title: "Tarım IoT Çözümü",
        description: "Akıllı tarım için sulama ve izleme sistemi.",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800",
        category: "AgriTech",
        status: "upcoming",
        link: "#"
      }
    ],
    contact: {
      address: "ODTÜ Teknokent, Çankaya, Ankara",
      phone: "+90 312 444 5678",
      email: "hello@techstartup.com.tr"
    },
    posts: [
      {
        id: "tblog1",
        title: "Yapay Zeka ve Geleceğin Yazılımları",
        excerpt: "AI teknolojilerinin yazılım geliştirme süreçlerini nasıl dönüştürdüğünü inceliyoruz.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        author: { name: "Can Özkan", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
        publishedAt: "18 Aralık 2024",
        category: "Teknoloji",
        likes: 312,
        comments: 67
      },
      {
        id: "tblog2",
        title: "Mikroservis Mimarisi: En İyi Pratikler",
        excerpt: "Ölçeklenebilir sistemler için mikroservis mimarisi tasarımı ve uygulama önerileri.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
        author: { name: "Elif Yıldız", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
        publishedAt: "15 Aralık 2024",
        category: "Mimari",
        likes: 245,
        comments: 42
      },
      {
        id: "tblog3",
        title: "DevOps Kültürü ve CI/CD",
        excerpt: "Sürekli entegrasyon ve dağıtım süreçlerinin şirket kültürüne entegrasyonu.",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
        author: { name: "Burak Arslan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
        publishedAt: "12 Aralık 2024",
        category: "DevOps",
        likes: 189,
        comments: 31
      },
      {
        id: "tblog4",
        title: "React Native vs Flutter: 2024 Karşılaştırması",
        excerpt: "Mobil uygulama geliştirme için popüler framework'lerin güncel karşılaştırması.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
        author: { name: "Selin Demir", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
        publishedAt: "8 Aralık 2024",
        category: "Mobil",
        likes: 421,
        comments: 89
      },
      {
        id: "tblog5",
        title: "Bulut Güvenliği: Temel İlkeler",
        excerpt: "AWS ve Azure üzerinde güvenli altyapı oluşturma stratejileri.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
        author: { name: "Murat Kılıç", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
        publishedAt: "5 Aralık 2024",
        category: "Güvenlik",
        likes: 298,
        comments: 56
      },
      {
        id: "tblog6",
        title: "PostgreSQL Performans Optimizasyonu",
        excerpt: "Veritabanı sorgularını hızlandırma ve indeksleme stratejileri.",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
        author: { name: "Ayşe Çelik", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
        publishedAt: "1 Aralık 2024",
        category: "Veritabanı",
        likes: 176,
        comments: 28
      },
      {
        id: "tblog7",
        title: "Kubernetes ile Konteyner Orkestrasyonu",
        excerpt: "Üretim ortamında Kubernetes kullanımı ve cluster yönetimi.",
        image: "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=800",
        author: { name: "Can Özkan", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
        publishedAt: "28 Kasım 2024",
        category: "DevOps",
        likes: 234,
        comments: 45
      },
      {
        id: "tblog8",
        title: "GraphQL API Tasarımı",
        excerpt: "REST'ten GraphQL'e geçiş ve API tasarım prensipleri.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
        author: { name: "Elif Yıldız", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
        publishedAt: "25 Kasım 2024",
        category: "API",
        likes: 287,
        comments: 52
      },
      {
        id: "tblog9",
        title: "Agile Metodolojiler: Scrum vs Kanban",
        excerpt: "Yazılım projelerinde çevik yöntemlerin karşılaştırmalı analizi.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
        author: { name: "Burak Arslan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
        publishedAt: "20 Kasım 2024",
        category: "Proje Yönetimi",
        likes: 156,
        comments: 34
      },
      {
        id: "tblog10",
        title: "TypeScript İleri Düzey Tipler",
        excerpt: "Generics, conditional types ve advanced type inference kullanımı.",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
        author: { name: "Selin Demir", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
        publishedAt: "15 Kasım 2024",
        category: "Frontend",
        likes: 345,
        comments: 67
      },
      {
        id: "tblog11",
        title: "Test Driven Development (TDD)",
        excerpt: "TDD yaklaşımı ile kaliteli ve sürdürülebilir kod yazma.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
        author: { name: "Murat Kılıç", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
        publishedAt: "10 Kasım 2024",
        category: "Test",
        likes: 198,
        comments: 41
      },
      {
        id: "tblog12",
        title: "Web3 ve Blockchain Geliştirme",
        excerpt: "Akıllı kontratlar ve merkezi olmayan uygulamalar geliştirme.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        author: { name: "Ayşe Çelik", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
        publishedAt: "5 Kasım 2024",
        category: "Blockchain",
        likes: 267,
        comments: 58
      }
    ]
  }
};

export default function BusinessProfile() {
  const  username  = "techstartup" ;
  // const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState("page");
  
  const businessData = username ? businessDatabase[username] : null;

  // Handle business not found
  if (!businessData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">İşletme Bulunamadı</h1>
        <p className="text-muted-foreground">@{username} işletme sayfası mevcut değil.</p>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "page":
        return (
          <>
            {/* About Section */}
            <BusinessAboutSection about={businessData.about} />

            {/* Services Section */}
            {businessData.services && (
              <BusinessServicesSection services={businessData.services} />
            )}

            {/* Projects Preview */}
            <BusinessProjectsSection 
              projects={businessData.projects} 
              isPreview={true}
              onSeeAll={() => setActiveTab("projects")}
            />

            {/* Posts Preview */}
            <BusinessPostsSection 
              posts={businessData.posts} 
              businessName={businessData.name}
              isPreview={true}
              onSeeAll={() => setActiveTab("posts")}
            />

            {/* Contact Section */}
            <BusinessContactSection contact={businessData.contact} />
          </>
        );
      case "projects":
        return (
          <BusinessProjectsSection projects={businessData.projects} />
        );
      case "posts":
        return (
          <BusinessPostsSection 
            posts={businessData.posts} 
            businessName={businessData.name}
            showHeader={false}
          />
        );
      default:
        return null;
    }
  };

  return (


        <div className="lg:col-span-8 space-y-6">
          {/* Business Header */}
          <BusinessProfileHeader
            business={businessData}
            stats={businessData.stats}
          />

          {/* Tabs */}
          <BusinessProfileTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          {/* Tab Content */}
          {renderTabContent()}
        </div>


  );
}
