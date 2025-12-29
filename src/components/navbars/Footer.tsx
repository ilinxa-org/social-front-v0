
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  kurumsal: [
    { label: "Hakkımızda", href: "/about" },
    { label: "Yönetim Kurulu", href: "/admin" },
    { label: "Tarihçe", href: "/new" },
    { label: "Tüzük", href: "/tuzuk" },
  ],
  faaliyetler: [
    { label: "Projeler", href: "/projects" },
    { label: "Etkinlikler", href: "/events" },
    { label: "Yayınlar", href: "/yayinlar" },
    { label: "Haberler", href: "/news" },
  ],
  kaynaklar: [
    { label: "Üyelik", href: "/uyelik" },
    { label: "Bağış", href: "/bagis" },
    { label: "SSS", href: "/sss" },
    { label: "İletişim", href: "/iletisim" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center font-heading font-bold text-xl text-accent-foreground">
                K
              </div>
              <div>
                <span className="font-heading font-bold text-xl tracking-tight block">KASDER</span>
                <span className="text-xs text-primary-foreground/60 tracking-wider">
                  Kamu Arazi ve Şehircilik Derneği
                </span>
              </div>
            </div>
            
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
              Sürdürülebilir kentsel gelişim ve kamu arazilerinin etkin yönetimi için 
              çalışan, Türkiye'nin önde gelen sivil toplum kuruluşlarından biri.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:info@kasder.org.tr" 
                className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors group"
              >
                <Mail size={16} className="text-accent" />
                <span>info@kasder.org.tr</span>
              </a>
              <a 
                href="tel:+902123456789" 
                className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Phone size={16} className="text-accent" />
                <span>+90 (212) 345 67 89</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <span>Levent Mahallesi, İş Kuleleri<br />Beşiktaş, İstanbul 34330</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary-foreground/50">
              Kurumsal
            </h4>
            <ul className="space-y-2">
              {footerLinks.kurumsal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary-foreground/50">
              Faaliyetler
            </h4>
            <ul className="space-y-2">
              {footerLinks.faaliyetler.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary-foreground/50">
              Kaynaklar
            </h4>
            <ul className="space-y-2">
              {footerLinks.kaynaklar.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>© 2026 KASDER. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-6">
              <Link href="/gizlilik" className="hover:text-accent transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim" className="hover:text-accent transition-colors">
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
