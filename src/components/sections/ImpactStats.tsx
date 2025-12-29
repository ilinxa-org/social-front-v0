"use client";
import {  useEffect, useRef, useState } from "react";
import { TrendingUp, Award, Globe, FileText } from "lucide-react";
const stats = [{
  icon: TrendingUp,
  value: 150,
  suffix: "+",
  label: "Tamamlanan Proje",
  description: "Türkiye genelinde"
}, {
  icon: Globe,
  value: 81,
  suffix: "",
  label: "İl Kapsamı",
  description: "Ülke çapında erişim"
}, {
  icon: Award,
  value: 25,
  suffix: "+",
  label: "Yıllık Tecrübe",
  description: "Sektör liderliği"
}, {
  icon: FileText,
  value: 300,
  suffix: "+",
  label: "Yayın & Rapor",
  description: "Akademik katkı"
}];
const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        // Animate numbers
        stats.forEach((stat, index) => {
          const duration = 2000;
          const steps = 60;
          const increment = stat.value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.value) {
              current = stat.value;
              clearInterval(timer);
            }
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[index] = Math.floor(current);
              return newCounts;
            });
          }, duration / steps);
        });
      }
    }, {
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [isVisible]);
  return <section ref={sectionRef} className="py-20 bg-gradient-subtle relative overflow-hidden lg:py-36.25">
      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-linear-to-b from-transparent via-accent/30 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-linear-to-b from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Etkimiz</span>
          </div>
          
          <h2 className={`font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Rakamlarla KASDER
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => <div key={stat.label} className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
          transitionDelay: `${0.2 + index * 0.1}s`
        }}>
              {/* Icon */}
              <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                <stat.icon className="w-7 h-7" />
              </div>

              {/* Number */}
              <div className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
                {counts[index]}
                <span className="text-accent">{stat.suffix}</span>
              </div>

              {/* Label */}
              <div className="font-semibold text-foreground mb-1">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default ImpactStats;