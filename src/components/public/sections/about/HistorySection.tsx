"use client";
import { motion } from "framer-motion";
import { Building2, Users, Award, Target } from "lucide-react";

const milestones = [
  {
    year: "2010",
    title: "Kuruluş",
    description: "KASDER, kentsel dönüşüm alanında faaliyet göstermek üzere İstanbul'da kuruldu.",
    icon: Building2,
  },
  {
    year: "2014",
    title: "İlk Büyük Proje",
    description: "Türkiye genelinde 10.000'den fazla konutu kapsayan ilk büyük dönüşüm projemiz başladı.",
    icon: Target,
  },
  {
    year: "2018",
    title: "Uluslararası Tanınırlık",
    description: "Avrupa Kentsel Gelişim Ödülü'nü kazanarak uluslararası arenada adımızdan söz ettirdik.",
    icon: Award,
  },
  {
    year: "2023",
    title: "50.000+ Aile",
    description: "Bugüne kadar 50.000'den fazla aileye güvenli ve modern yaşam alanları sunduk.",
    icon: Users,
  },
];

const HistorySection = () => {
  return (
    <section className="py-20 bg-background flex items-center justify-center relative overflow-hidden">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Tarihçemiz
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Yıllar İçinde KASDER
          </h2>
          <p className="text-muted-foreground text-lg">
            Kuruluşumuzdan bugüne kadar geçen süreçte kat ettiğimiz önemli kilometre taşları.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-linear-to-b from-accent via-primary to-primary-light hidden md:block" />

          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300">
                    <span className="inline-block text-accent font-display font-bold text-2xl mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                  <div className="w-14 h-14 bg-linear-to-br from-accent to-accent-light rounded-full flex items-center justify-center shadow-glow">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
