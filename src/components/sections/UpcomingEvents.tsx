"use client";

import { Calendar, Clock, MapPin, ArrowRight, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Sürdürülebilir Şehircilik Zirvesi 2024",
    type: "Konferans",
    date: "15-16 Ocak 2025",
    time: "09:00 - 18:00",
    location: "İstanbul Kongre Merkezi",
    attendees: 500,
    description: "Türkiye'nin en büyük şehircilik etkinliğinde ulusal ve uluslararası uzmanlar bir araya geliyor.",
    featured: true,
  },
  {
    id: 2,
    title: "Kentsel Dönüşüm Hukuku Semineri",
    type: "Seminer",
    date: "22 Ocak 2025",
    time: "14:00 - 17:00",
    location: "KASDER Eğitim Salonu, Ankara",
    attendees: 80,
    description: "6306 sayılı kanun kapsamında güncel mevzuat değişiklikleri ve uygulama örnekleri.",
    featured: false,
  },
  {
    id: 3,
    title: "Yerel Yönetimler Çalıştayı",
    type: "Çalıştay",
    date: "5-6 Şubat 2025",
    time: "10:00 - 16:00",
    location: "İzmir Ticaret Odası",
    attendees: 120,
    description: "Belediyeler için akıllı şehir uygulamaları ve dijital dönüşüm stratejileri.",
    featured: false,
  },
];

const UpcomingEvents = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const typeColors: Record<string, string> = {
    Konferans: "bg-accent text-accent-foreground",
    Seminer: "bg-primary text-primary-foreground",
    Çalıştay: "bg-gold-dark text-primary-foreground",
  };

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div 
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-semibold text-primary-foreground/80 uppercase tracking-wider">Yaklaşan Etkinlikler</span>
            </div>
            
            <h2 
              className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Bizimle Buluşun
            </h2>
            
            <p 
              className={`text-lg text-primary-foreground/70 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Konferanslar, seminerler ve çalıştaylarımıza katılın
            </p>
          </div>

          <Link 
            href="/events" 
            className={`group inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Tüm Etkinlikler
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className={`group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 hover:border-accent/30 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Event Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[event.type]}`}>
                  {event.type}
                </span>
                {event.featured && (
                  <span className="text-xs text-accent font-medium">Öne Çıkan</span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-semibold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-primary-foreground/60 text-sm mb-5 line-clamp-2">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="space-y-2 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span>{event.attendees} Katılımcı Kapasitesi</span>
                </div>
              </div>

              {/* Register Button */}
              <div className="mt-6 pt-4 border-t border-primary-foreground/10">
                <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                  Kayıt Ol
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
