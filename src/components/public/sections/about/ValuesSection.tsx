"use client";
import { motion } from "framer-motion";
import { Shield, Heart, Lightbulb, Users, Leaf, Scale } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Güvenilirlik",
    description: "Her projede şeffaflık ve hesap verebilirlik ilkelerine bağlı kalıyoruz.",
  },
  {
    icon: Heart,
    title: "İnsan Odaklılık",
    description: "Tüm çalışmalarımızın merkezinde insan ve toplum yararı bulunmaktadır.",
  },
  {
    icon: Lightbulb,
    title: "Yenilikçilik",
    description: "En son teknoloji ve yöntemleri kullanarak sektöre öncülük ediyoruz.",
  },
  {
    icon: Users,
    title: "Katılımcılık",
    description: "Paydaşlarımızı karar süreçlerine dahil ederek birlikte çözümler üretiyoruz.",
  },
  {
    icon: Leaf,
    title: "Sürdürülebilirlik",
    description: "Çevreye duyarlı, gelecek nesilleri düşünen projeler geliştiriyoruz.",
  },
  {
    icon: Scale,
    title: "Adalet",
    description: "Kentsel dönüşümde hakkaniyeti ve eşit fırsatları savunuyoruz.",
  },
];

const ValuesSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-accent/5 to-transparent" />

      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Değerlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Bizi Tanımlayan İlkeler
          </h2>
          <p className="text-muted-foreground text-lg">
            KASDER olarak tüm faaliyetlerimizi bu temel değerler çerçevesinde yürütüyoruz.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:border-accent/30">
                  <div className="w-14 h-14 bg-linear-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-accent"/>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
