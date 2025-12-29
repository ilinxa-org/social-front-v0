import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgImage: string;
}

interface BusinessServicesSectionProps {
  services: Service[];
}

const BusinessServicesSection = ({ services }: BusinessServicesSectionProps) => {
  if (!services || services.length === 0) return null;

  return (
    <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Hizmetlerimiz</h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {services.map((service) => (
            <CarouselItem key={service.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div 
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.bgImage})` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-5 text-white">
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/80 transition-colors duration-300">
                    <service.icon className="w-6 h-6" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-white/80 line-clamp-3 group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm border-border hover:bg-background" />
        <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm border-border hover:bg-background" />
      </Carousel>
    </section>
  );
};

export default BusinessServicesSection;
