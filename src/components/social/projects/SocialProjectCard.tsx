
import { MapPin, Calendar, ArrowUpRight, Target, Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { Project } from "@/types/projectsType";
import Link from "next/link";

interface SocialProjectCardProps {
  project: Project;
}

const statusConfig = {
  completed: {
    label: "Tamamlandı",
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    icon: "✓",
  },
  ongoing: {
    label: "Devam Ediyor",
    color: "bg-amber-500",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: "◉",
  },
  planned: {
    label: "Planlanan",
    color: "bg-blue-500",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: "○",
  },
};

const SocialProjectCard = ({ project }: SocialProjectCardProps) => {
  const status = statusConfig[project.status];

  return (
    <div className="relative group">
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-background via-background to-muted/30 border border-border/70 hover:border-border transition-all duration-500">
        
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-accent to-primary opacity-60" />
        
        {/* Floating Label */}
        <div className="absolute top-0 left-6 z-20">
          <div className="flex items-center gap-2 bg-primary px-3 py-1.5 rounded-b-lg shadow-lg">
            <Target className="w-3.5 h-3.5 text-primary-foreground" />
            <span className="text-xs font-bold text-primary-foreground tracking-wider">KASDER PROJE</span>
          </div>
        </div>

        {/* Image Section */}
        <Link href={`/projects/${project.id}`}>
          <div className="relative h-100 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-accent/10 mix-blend-overlay" />
            
            {/* Status Badge - Floating */}
            <div className="absolute top-4 right-4">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${status.bgColor} ${status.borderColor} border backdrop-blur-sm`}>
                <span className={`text-xs ${status.textColor}`}>{status.icon}</span>
                <span className={`text-xs font-semibold ${status.textColor}`}>{status.label}</span>
              </div>
            </div>

            {/* Category Tag */}
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-neutral-900/10 backdrop-blur-md text-neutral-700 border-neutral-800/20 hover:bg-neutral-300/20 transition-colors">
                {project.category}
              </Badge>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-50"
              >
                <ArrowUpRight className="w-7 h-7 text-primary" />
              </motion.div>
            </div>
          </div>
        </Link>

        {/* Content Section */}
        <div className="relative p-5 pt-4">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-primary/5 to-transparent rounded-bl-full" />
          
          <Link href={`/projects/${project.id}`}>
            <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Info Row */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="truncate max-w-30">{project.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 text-accent" />
              </div>
              <span>{project.year}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Sürdürülebilir Gelecek</span>
            </div>
            
            <Link href={`/projects/${project.id}`}>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-primary hover:text-primary-foreground hover:bg-primary gap-1.5 text-xs font-semibold"
              >
                <span>Detaylar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /> */}
      </div>
    </div>
  );
};

export default SocialProjectCard;
