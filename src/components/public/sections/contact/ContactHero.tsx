"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import PageHero from "../commons/PageHero";


const ContactHero = () => {
  return (
    <PageHero
      badge="Bize Ulaşın"
      badgeIcon={Mail}
      title="İletişim"
      titleHighlight="Size Yardımcı Olalım"
      description="Sorularınız, önerileriniz veya işbirliği talepleriniz için bizimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağız."
    >
      {/* Quick Contact */}
      <div className="flex flex-wrap justify-center gap-6">
        <a href="tel:+902125550123" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-sm">+90 212 555 01 23</span>
        </a>
        <a href="mailto:info@kasder.org.tr" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-sm">info@kasder.org.tr</span>
        </a>
        <div className="flex items-center gap-3 text-white/90">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-sm">İstanbul, Türkiye</span>
        </div>
      </div>
    </PageHero>
  );
};

export default ContactHero;
