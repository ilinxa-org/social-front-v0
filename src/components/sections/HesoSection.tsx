'use client"'
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Slide {
  id: number;
  type: "image" | "video";
  media: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}
const slides: Slide[] = [{
  id: 1,
  type: "image",
  media: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop",
  eyebrow: "Türkiye'nin Güvenilir Şehircilik Platformu",
  title: "Geleceğin Şehirlerini",
  highlight: "Birlikte İnşa Ediyoruz",
  description: "KASDER olarak, sürdürülebilir kentsel gelişim ve kamu arazilerinin etkin yönetimi için 25 yılı aşkın süredir çalışıyoruz.",
  primaryCta: {
    label: "Projelerimizi Keşfedin",
    href: "/projects"
  },
  secondaryCta: {
    label: "Hakkımızda",
    href: "/hakkimizda"
  }
}, {
  id: 2,
  type: "image",
  media: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&h=1080&fit=crop",
  eyebrow: "Kentsel Dönüşüm Çözümleri",
  title: "Sürdürülebilir",
  highlight: "Kentsel Dönüşüm",
  description: "Modern şehircilik anlayışı ile afet riskli alanların yeniden yapılandırılması ve yaşam kalitesinin artırılması için projeler geliştiriyoruz.",
  primaryCta: {
    label: "Dönüşüm Projelerimiz",
    href: "/projects"
  },
  secondaryCta: {
    label: "İletişime Geçin",
    href: "/iletisim"
  }
}, {
  id: 3,
  type: "image",
  media: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop",
  eyebrow: "2025 Şehircilik Zirvesi",
  title: "Geleceği Şekillendiren",
  highlight: "Etkinlikler",
  description: "Ulusal ve uluslararası uzmanları bir araya getiren konferanslar, seminerler ve çalıştaylarımıza katılın.",
  primaryCta: {
    label: "Etkinlikleri Görüntüle",
    href: "/events"
  },
  secondaryCta: {
    label: "Kayıt Ol",
    href: "/events"
  }
}, {
  id: 4,
  type: "image",
  media: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop",
  eyebrow: "Araştırma & Analiz",
  title: "Bilimsel Yaklaşım,",
  highlight: "Güvenilir Sonuçlar",
  description: "Akademik araştırmalar, veri analizi ve politika belgeleri ile karar alıcılara yol gösteriyoruz.",
  primaryCta: {
    label: "Yayınlarımız",
    href: "/yayinlar"
  },
  secondaryCta: {
    label: "Üye Ol",
    href: "/uyelik"
  }
}];
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setContentKey(prev => prev + 1);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentSlide, isTransitioning]);
  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    setIsTransitioning(true);
    setCurrentSlide(next);
    setContentKey(prev => prev + 1);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentSlide]);
  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    setIsTransitioning(true);
    setCurrentSlide(prev);
    setContentKey(prev => prev + 1);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [currentSlide]);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);
  const currentSlideData = slides[currentSlide];
  return <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => <div key={slide.id} className={cn("absolute inset-0 transition-all duration-1000 ease-out", index === currentSlide ? "opacity-100 scale-100 z-1" : "opacity-0 scale-105 z-0")}>
          {/* Background Media */}
          {slide.type === "image" ? <img src={slide.media} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" /> : <video src={slide.media} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-dark/90  via-slate-dark/70 to-slate-dark/40" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-dark/80 via-transparent to-slate-dark/30 "  />
        </div>)}

      {/* Content Layer - Always on Top */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl" key={contentKey}>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-6 animate-fade-in" style={{
            animationDelay: "0.1s",
            animationFillMode: "backwards"
          }}>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-primary-foreground/90 font-medium">
                {currentSlideData.eyebrow}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6 animate-fade-in" style={{
            animationDelay: "0.2s",
            animationFillMode: "backwards"
          }}>
              {currentSlideData.title}
              <span className="block mt-2 text-gradient-gold">{currentSlideData.highlight}</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-8 leading-relaxed animate-fade-in" style={{
            animationDelay: "0.3s",
            animationFillMode: "backwards"
          }}>
              {currentSlideData.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-in" style={{
            animationDelay: "0.4s",
            animationFillMode: "backwards"
          }}>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-14 text-base group">
                <Link href={currentSlideData.primaryCta.href}>
                  {currentSlideData.primaryCta.label}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              {currentSlideData.secondaryCta && <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 h-14 text-base bg-transparent">
                  <Link href={currentSlideData.secondaryCta.href}>
                    {currentSlideData.secondaryCta.label}
                  </Link>
                </Button>}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="items-center justify-between flex flex-row mx-0">
            {/* Slide Indicators */}
            <div className="flex items-center gap-3">
              {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className="group relative h-1 rounded-full overflow-hidden transition-all duration-300" style={{
              width: index === currentSlide ? "48px" : "24px"
            }} aria-label={`Slide ${index + 1}`}>
                  <div className="absolute inset-0 bg-primary-foreground/30" />
                  <div className={cn("absolute inset-0 bg-accent origin-left", index === currentSlide && isAutoPlaying ? "animate-[line-grow_6s_linear]" : index === currentSlide ? "scale-x-100" : "scale-x-0")} />
                </button>)}
            </div>

            {/* Slide Counter & Controls */}
            <div className="flex items-center gap-4">
              {/* Slide Counter */}
              <div className="hidden sm:flex items-center gap-2 text-primary-foreground/70 text-sm font-medium">
                <span className="text-accent font-bold text-lg">
                  {String(currentSlide + 1).padStart(2, "0")}
                </span>
                <span>/</span>
                <span>{String(slides.length).padStart(2, "0")}</span>
              </div>

              {/* Play/Pause */}
              {/* <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className="w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors" aria-label={isAutoPlaying ? "Pause" : "Play"}>
                {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button> */}

              {/* Prev/Next */}
              <div className="flex items-center gap-2">
                <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors" aria-label="Previous slide">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors" aria-label="Next slide">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center gap-2">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-accent animate-bounce" />
        </div>
      </div> */}

      {/* Side Dot Navigation - Desktop Only */}
      {/* <div className="absolute top-1/2 right-8 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-4">
        {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={cn("w-3 h-3 rounded-full border-2 transition-all duration-300", index === currentSlide ? "bg-accent border-accent scale-125" : "bg-transparent border-primary-foreground/40 hover:border-accent")} aria-label={`Go to slide ${index + 1}`} />)}
      </div> */}

      {/* Bottom Gradient Fade */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent z-10" /> */}
    </section>;
};
export default HeroSection;