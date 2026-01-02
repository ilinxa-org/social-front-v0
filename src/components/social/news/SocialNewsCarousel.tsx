"use client";
import { useState,  useEffect } from "react";

import { Calendar, Clock, ChevronLeft, ChevronRight, Newspaper, ArrowRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import useEmblaCarousel from "embla-carousel-react";
// import { motion, AnimatePresence } from "framer-motion";
import { NewsType } from "@/types/newsTypes";
import Link from "next/link";
import { categoryColors, getRelativeTime } from "@/components/public/sections/news/NewsCard";

interface SocialNewsCarouselProps {
  news: NewsType[];
}

const SocialNewsCarousel = ({ news }: SocialNewsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg shadow-primary/20">
              <Newspaper className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm tracking-wide">GÜNDEM</h3>
            <p className="text-xs text-white/50">Son dakika haberler</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 border border-white/10"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {news.map((item, index) => (
            <div 
              key={item.id} 
              className="flex-[0_0_100%] min-w-0"
            >
              <Link href={`/news/${item.id}`} className="block group">
                <div className="p-5">
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* Image */}
                    <div className="relative md:w-2/5 aspect-[16/10] md:aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className={`${categoryColors[item.category] || "bg-white/20"} text-xs backdrop-blur-sm border-0 shadow-lg`}>
                          {item.category}
                        </Badge>
                      </div>

                      {/* Trending indicator */}
                      {index === 0 && (
                        <div className="absolute top-3 right-3">
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-medium">
                            <TrendingUp className="w-3 h-3" />
                            Trend
                          </div>
                        </div>
                      )}

                      {/* Read time overlay */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                        <Clock className="w-3 h-3" />
                        {item.readTime} dk
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{getRelativeTime(item.date)}</span>
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          <span>{item.author}</span>
                        </div>
                        
                        <h4 className="text-white font-bold text-lg md:text-xl leading-tight mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        
                        <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 mt-4 text-primary group-hover:text-accent transition-colors">
                        <span className="text-sm font-semibold">Devamını Oku</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 pb-4">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`transition-all duration-300 rounded-full ${
              index === selectedIndex 
                ? "w-6 h-2 bg-primary" 
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* View All Link */}
      <div className="border-t border-white/10 px-5 py-3">
        <Link 
          href="/news" 
          className="flex items-center justify-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors group"
        >
          <span>Tüm Haberleri Görüntüle</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default SocialNewsCarousel;
