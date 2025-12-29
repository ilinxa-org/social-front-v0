import { 
  MapPin, Phone, Mail, Clock, 
  Facebook, Twitter, Linkedin, Instagram, Youtube,
  Building, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const contactDetails = [
  {
    icon: Building,
    title: "Merkez Ofis",
    content: "Levent Mahallesi, Büyükdere Caddesi No:185\nLevent Loft, Kat:12, 34394\nŞişli/İstanbul",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "+90 212 555 01 23\n+90 212 555 01 24",
    href: "tel:+902125550123",
  },
  {
    icon: Mail,
    title: "E-posta",
    content: "info@kasder.org.tr\nbasin@kasder.org.tr",
    href: "mailto:info@kasder.org.tr",
  },
  {
    icon: Globe,
    title: "Web",
    content: "www.kasder.org.tr",
    href: "https://www.kasder.org.tr",
  },
];

const workingHours = [
  { day: "Pazartesi - Cuma", hours: "09:00 - 18:00" },
  { day: "Cumartesi", hours: "10:00 - 14:00" },
  { day: "Pazar", hours: "Kapalı" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const ContactInfo = () => {
  return (
    <div className="space-y-8 ">
      {/* Contact Details */}
      <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg">
        <h2 className="text-2xl font-bold text-foreground mb-6">İletişim Bilgileri</h2>

        
        <div className="space-y-6 ">
          {contactDetails.map((item, index) => {
            const Icon = item.icon;
            const Content = item.href ? 'a' : 'div';
            
            return (
              <Content
                key={index}
                href={item.href}
                className={`flex gap-4 ${item.href ? 'hover:text-primary transition-colors cursor-pointer' : ''}`}
                {...(item.href && item.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{item.content}</p>
                </div>
              </Content>
            );
          })}
        </div>
      </div>

      {/* Working Hours */}
      <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Çalışma Saatleri</h2>
        </div>
        
        <div className="space-y-3">
          {workingHours.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
              <span className="text-foreground font-medium">{item.day}</span>
              <span className={`text-sm ${item.hours === "Kapalı" ? "text-destructive" : "text-muted-foreground"}`}>
                {item.hours}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg">
        <h2 className="text-2xl font-bold text-foreground mb-6">Sosyal Medya</h2>
        <p className="text-muted-foreground mb-6">
          Bizi sosyal medyada takip ederek güncel gelişmelerden haberdar olun.
        </p>
        
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                asChild
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <Icon className="w-5 h-5" />
                </a>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-lg">
        <div className="aspect-video bg-muted relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.207811099045!2d29.0108!3d41.0773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzM4LjMiTiAyOcKwMDAnMzguOSJF!5e0!3m2!1str!2str!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ofis Konumu"
            className="absolute inset-0"
          />
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">Levent, Şişli/İstanbul</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://maps.google.com/?q=41.0773,29.0108" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Yol Tarifi Al
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
