"use client";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

const leaders = [
  {
    name: "Ahmet Yılmaz",
    role: "Yönetim Kurulu Başkanı",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "30 yılı aşkın kentsel planlama deneyimi",
  },
  {
    name: "Fatma Demir",
    role: "Genel Sekreter",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    bio: "Kamu politikaları ve sivil toplum uzmanı",
  },
  {
    name: "Mehmet Kaya",
    role: "Proje Koordinatörü",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Sürdürülebilir mimari ve yeşil bina sertifikasyonu",
  },
  {
    name: "Elif Şahin",
    role: "Halkla İlişkiler Direktörü",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Kurumsal iletişim ve medya ilişkileri",
  },
];

const LeadershipSection = () => {
  return (
    <section className="py-20 bg-muted/30 w-full  flex items-center justify-center relative overflow-hidden">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Yönetim
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Liderlik Ekibimiz
          </h2>
          <p className="text-muted-foreground text-lg">
            Deneyimli ve vizyoner ekibimiz, KASDER'in misyonunu hayata geçirmek için çalışmaktadır.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Mail className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-accent font-medium text-sm mb-2">
                    {leader.role}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {leader.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
