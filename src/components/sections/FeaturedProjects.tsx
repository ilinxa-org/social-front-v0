"use client";
import { ArrowRight, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import {  useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
const projects = [{
  id: 1,
  title: "İstanbul Kentsel Dönüşüm Master Planı",
  category: "Kentsel Dönüşüm",
  location: "İstanbul",
  year: "2024",
  description: "41 ilçeyi kapsayan, 15 milyonluk nüfus için hazırlanan kapsamlı kentsel dönüşüm yol haritası.",
  image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop",
  status: "Devam Ediyor",
  featured: true
}, {
  id: 2,
  title: "Ankara Yeşil Koridor Projesi",
  category: "Sürdürülebilirlik",
  location: "Ankara",
  year: "2023",
  description: "Başkentin merkezinden çevre ilçelerine uzanan 50 km'lik yeşil koridor tasarımı.",
  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  status: "Tamamlandı",
  featured: false
}, {
  id: 3,
  title: "Kamu Arazileri Dijital Envanter Sistemi",
  category: "Araştırma & Analiz",
  location: "Türkiye Geneli",
  year: "2024",
  description: "81 ilde kamu arazilerinin dijital haritalaması ve yönetim sistemi altyapısı.",
  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  status: "Devam Ediyor",
  featured: false
}];
const FeaturedProjects = () => {
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
  return <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden lg:py-17.5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
      backgroundSize: '40px 40px'
    }} />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Öne Çıkan Projeler</span>
            </div>
            
            <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Güncel Çalışmalarımız
            </h2>
            
            <p className={`text-lg text-muted-foreground transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Ülkemizin dört bir yanında yürüttüğümüz projelerden bazıları
            </p>
          </div>

          <Link href="/projects" className={`group inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Tüm Projeler
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Featured Large Project */}
          <Link href={`/projects/${projects[0].id}`} className={`group relative rounded-2xl overflow-hidden aspect-4/3 lg:aspect-auto lg:row-span-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
          transitionDelay: '0.3s'
        }}>
            <img src={projects[0].image} alt={projects[0].title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-overlay" />
            
            {/* Content */}
            <div className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  {projects[0].category}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-medium">
                  {projects[0].status}
                </span>
              </div>
              
              <h3 className="font-heading text-2xl lg:text-3xl font-bold text-primary-foreground mb-3 group-hover:text-accent transition-colors">
                {projects[0].title}
              </h3>
              
              <p className="text-primary-foreground/80 mb-4 line-clamp-2">
                {projects[0].description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {projects[0].location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {projects[0].year}
                </span>
              </div>
            </div>

            {/* Hover Arrow */}
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
            </div>
          </Link>

          {/* Smaller Projects */}
          {projects.slice(1).map((project, index) => <Link key={project.id} href={`/projects/${project.id}`} className={`group relative rounded-2xl overflow-hidden aspect-16/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
          transitionDelay: `${0.4 + index * 0.1}s`
        }}>
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-overlay" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-medium">
                    {project.status}
                  </span>
                </div>
                
                <h3 className="font-heading text-xl font-bold text-primary-foreground mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
              </div>
            </Link>)}
        </div>

        {/* View All Button - Mobile */}
        <div className="mt-10 text-center lg:hidden">
          <Button asChild variant="outline" size="lg">
            <Link href="/projects" className="inline-flex items-center gap-2">
              Tüm Projeleri Görüntüle
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default FeaturedProjects;