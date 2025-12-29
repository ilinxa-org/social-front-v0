"use client";
import { useState } from "react";
import { 
  MapPin, 
  LinkIcon, 
  Calendar,
  Share2,
  MoreHorizontal,
  Users,
  Phone,
  Mail,
  Clock
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BusinessProfileHeaderProps {
  business: {
    id: string;
    name: string;
    username: string;
    logo: string;
    coverImage?: string;
    tagline: string;
    category: string;
    location?: string;
    website?: string;
    phone?: string;
    email?: string;
    foundedDate: string;
    isVerified?: boolean;
    workingHours?: string;
  };
  stats: {
    followers: number;
    projects: number;
  };
  isFollowing?: boolean;
  onFollow?: () => void;
}

export function BusinessProfileHeader({ 
  business, 
  stats,
  isFollowing: initialFollowing = false,
  onFollow 
}: BusinessProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow?.();
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm">
      {/* Cover Image */}
      <div className="relative h-40 sm:h-56 lg:h-72 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30">
        {business.coverImage && (
          <img
            src={business.coverImage}
            alt="Kapak fotoğrafı"
            className="w-full h-full object-cover"
          />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Business info overlay on cover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="flex items-end gap-4">
            {/* Logo */}
            <Avatar className="h-20 w-20 sm:h-28 sm:w-28 border-4 border-card shadow-xl">
              <AvatarImage src={business.logo} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {business.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            {/* Name & Category */}
            <div className="flex-1 text-white mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-lg">{business.name}</h1>
                {business.isVerified && (
                  <Badge className="bg-primary/90 text-primary-foreground gap-1">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Doğrulanmış
                  </Badge>
                )}
              </div>
              <p className="text-white/80 text-sm sm:text-base">{business.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 py-4">
        {/* Tagline */}
        <p className="text-muted-foreground text-sm sm:text-base mb-4">{business.tagline}</p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mb-4">
          <Button 
            className="gap-2 flex-1 sm:flex-none" 
            variant={isFollowing ? "outline" : "default"}
            onClick={handleFollow}
          >
            <Users className="h-4 w-4" />
            <span>{isFollowing ? "Takip Ediliyor" : "Takip Et"}</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">İletişim</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Sayfayı Paylaş
              </DropdownMenuItem>
              <DropdownMenuItem>Bağlantıyı Kopyala</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Şikayet Et</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-4 pb-4 border-b">
          <div className="text-center">
            <span className="font-bold text-lg">{stats.followers.toLocaleString()}</span>
            <p className="text-muted-foreground text-sm">Takipçi</p>
          </div>
          <div className="text-center">
            <span className="font-bold text-lg">{stats.projects}</span>
            <p className="text-muted-foreground text-sm">Proje</p>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {business.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{business.location}</span>
            </div>
          )}
          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <LinkIcon className="h-4 w-4 shrink-0" />
              {business.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {business.phone && (
            <a href={`tel:${business.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span>{business.phone}</span>
            </a>
          )}
          {business.email && (
            <a href={`mailto:${business.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span>{business.email}</span>
            </a>
          )}
          {business.workingHours && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span>{business.workingHours}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{business.foundedDate} yılında kuruldu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
