import { Building2, TreePine, Scale, Users, Landmark, BarChart3, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const focusAreas = [{
  icon: Building2,
  title: "Kentsel Dönüşüm",
  description: "Sürdürülebilir kentsel dönüşüm projeleri ve afet riskli alanların yeniden yapılandırılması.",
  projects: 45
}, {
  icon: Landmark,
  title: "Kamu Arazileri",
  description: "Hazine ve kamu arazilerinin etkin yönetimi, envanter çalışmaları ve politika önerileri.",
  projects: 32
}, {
  icon: Scale,
  title: "Mevzuat & Hukuk",
  description: "İmar mevzuatı, tapu kadastro düzenlemeleri ve yasal süreç danışmanlığı.",
  projects: 28
}, {
  icon: TreePine,
  title: "Sürdürülebilirlik",
  description: "Yeşil şehircilik, karbon ayak izi azaltma ve çevre dostu kentsel planlama.",
  projects: 38
}, {
  icon: Users,
  title: "Katılımcı Planlama",
  description: "Halkın katılımı ile şehir planlaması, mahalle bazlı çalışmalar ve sosyal etki analizleri.",
  projects: 22
}, {
  icon: BarChart3,
  title: "Araştırma & Analiz",
  description: "Akademik araştırmalar, veri analizi, raporlama ve politika belgesi hazırlama.",
  projects: 56
}];
const FocusAreasSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section ref={sectionRef} className="py-24 bg-muted/30 relative my-0 lg:py-17.5">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Faaliyet Alanlarımız</span>
          </div>
          
          <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Uzmanlık Alanlarımız
          </h2>
          
          <p className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Multidisipliner ekibimiz ile şehircilik ve kamu arazileri alanında 
            kapsamlı çözümler sunuyoruz.
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {focusAreas.map((area, index) => <Link key={area.title} href="/projects" className={`group relative bg-card rounded-2xl p-8 border border-border/50 hover:border-accent/50 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
          transitionDelay: `${0.2 + index * 0.08}s`
        }}>
              {/* Background Glow on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  <area.icon className="w-6 h-6" />
                </div>

                {/* Title & Arrow */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {area.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 mt-1" />
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {area.description}
                </p>

                {/* Project Count */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-accent">{area.projects}</span>
                  <span className="text-muted-foreground">Proje Tamamlandı</span>
                </div>
              </div>
            </Link>)}
        </div>
      </div>
    </section>;
};
export default FocusAreasSection;