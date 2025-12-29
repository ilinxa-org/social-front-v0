"use client";
import { Calendar, Clock, MapPin } from "lucide-react";
import PageHero from "../commons/PageHero";


const EventsHero = () => {
  return (
    <PageHero
      badge="Etkinlikler & Organizasyonlar"
      badgeIcon={Calendar}
      title="Etkinliklerimiz"
      titleHighlight="Katılın & Öğrenin"
      description="Konferanslar, seminerler, çalıştaylar ve daha fazlası. Kentsel gelişim alanındaki en güncel etkinliklerimize katılın."
    >
      {/* Quick Stats */}
      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex items-center gap-3 text-white/90">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold">50+</div>
            <div className="text-sm text-white/70">Yıllık Etkinlik</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/90">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold">200+</div>
            <div className="text-sm text-white/70">Saat Eğitim</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/90">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold">15+</div>
            <div className="text-sm text-white/70">Şehir</div>
          </div>
        </div>
      </div>
    </PageHero>
  );
};

export default EventsHero;
