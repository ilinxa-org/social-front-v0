"use client";
import { useEffect, useRef, useState } from "react";

const partners = [
  { name: "Çevre ve Şehircilik Bakanlığı", logo: "ÇŞB" },
  { name: "TOKİ", logo: "TOKİ" },
  { name: "İller Bankası", logo: "İLBANK" },
  { name: "Türkiye Belediyeler Birliği", logo: "TBB" },
  { name: "TMMOB", logo: "TMMOB" },
  { name: "İTÜ", logo: "İTÜ" },
  { name: "ODTÜ", logo: "ODTÜ" },
  { name: "Dünya Bankası", logo: "WB" },
];

const PartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-muted/50 border-y border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div 
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Birlikte Çalıştığımız Kurumlar
          </p>
        </div>

        {/* Partners Logos */}
        <div 
          className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center justify-center"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-16 h-16 rounded-xl bg-background border border-border flex items-center justify-center font-heading font-bold text-muted-foreground group-hover:text-accent group-hover:border-accent/30 transition-all duration-300">
                {partner.logo}
              </div>
              <span className="mt-2 text-xs text-muted-foreground text-center line-clamp-1">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
