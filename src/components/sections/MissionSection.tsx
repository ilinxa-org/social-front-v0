"use client"
import { Target, Eye, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const values = [
  {
    icon: Target,
    title: "Misyonumuz",
    description: "Türkiye'de kamu arazilerinin sürdürülebilir ve etkin kullanımını sağlamak, şehircilik alanında bilimsel araştırmalar yapmak ve politika önerileri geliştirmek.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Eye,
    title: "Vizyonumuz",
    description: "Yaşanabilir, sürdürülebilir ve kapsayıcı şehirlerin inşasında Türkiye'nin referans noktası olmak ve uluslararası arenada ülkemizi temsil etmek.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Heart,
    title: "Değerlerimiz",
    description: "Şeffaflık, bilimsellik, katılımcılık ve sürdürülebilirlik ilkeleri doğrultusunda, toplumun her kesimini kucaklayan bir yaklaşımla çalışıyoruz.",
    color: "bg-gold-dark/10 text-gold-dark",
  },
];

const MissionSection = () => {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-muted/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div 
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Kim Olduğumuz</span>
          </div>
          
          <h2 
            className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            25 Yılı Aşkın Süredir
            <span className="text-gradient-gold block md:inline"> Şehirlerimiz İçin</span> Çalışıyoruz
          </h2>
          
          <p 
            className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            KASDER, 1999 yılında kurulan ve Türkiye'nin şehircilik alanındaki en köklü 
            sivil toplum kuruluşlarından biridir. Akademisyenler, uzmanlar ve 
            uygulayıcıları bir araya getirerek, ülkemizin kentsel geleceğini şekillendiriyoruz.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`group relative bg-card rounded-2xl p-8 lg:p-10 border border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-500 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
