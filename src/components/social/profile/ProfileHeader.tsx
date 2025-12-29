import { useState } from "react";

import { 
  Settings, 
  MapPin, 
  LinkIcon, 
  Calendar,
  Edit3,
  Share2,
  MoreHorizontal,
  UserPlus,
  MessageCircle,
  Users,
  Clock,
  X,
  Check
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
import Link from "next/link";

type ConnectionStatus = "none" | "pending" | "connected" | "received";

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    coverImage?: string;
    bio: string;
    location?: string;
    website?: string;
    joinedDate: string;
    isVerified?: boolean;
    isOwnProfile?: boolean;
    connectionStatus?: ConnectionStatus;
  };
  stats: {
    posts: number;
    connections: number;
  };
  onEditProfile?: () => void;
  onConnect?: () => void;
  onAcceptConnection?: () => void;
  onCancelConnection?: () => void;
}

export function ProfileHeader({ 
  user, 
  stats, 
  onEditProfile, 
  onConnect,
  onAcceptConnection,
  onCancelConnection 
}: ProfileHeaderProps) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(user.connectionStatus || "none");

  const handleConnect = () => {
    if (connectionStatus === "none") {
      setConnectionStatus("pending");
      onConnect?.();
    }
  };

  const handleCancelConnection = () => {
    setConnectionStatus("none");
    onCancelConnection?.();
  };

  const handleAcceptConnection = () => {
    setConnectionStatus("connected");
    onAcceptConnection?.();
  };

  const renderConnectionButton = () => {
    switch (connectionStatus) {
      case "connected":
        return (
          <Button variant="outline" className="gap-2">
            <Users className="h-4 w-4" />
            <span>Bağlantı</span>
          </Button>
        );
      case "pending":
        return (
          <Button variant="outline" className="gap-2" onClick={handleCancelConnection}>
            <Clock className="h-4 w-4" />
            <span>İstek Gönderildi</span>
          </Button>
        );
      case "received":
        return (
          <div className="flex gap-2">
            <Button className="gap-2" onClick={handleAcceptConnection}>
              <Check className="h-4 w-4" />
              <span>Kabul Et</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleCancelConnection}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      default:
        return (
          <Button className="gap-2" onClick={handleConnect}>
            <UserPlus className="h-4 w-4" />
            <span>Bağlantı Kur</span>
          </Button>
        );
    }
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm">
      {/* Cover Image */}
      <div className="relative h-32 sm:h-48 lg:h-56 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20">
        {user.coverImage && (
          <img
            src={user.coverImage}
            alt="Kapak fotoğrafı"
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Cover Edit Button - Only for own profile */}
        {user.isOwnProfile && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-3 right-3 gap-2 opacity-80 hover:opacity-100"
          >
            <Edit3 className="h-4 w-4" />
            <span className="hidden sm:inline">Kapağı Düzenle</span>
          </Button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 pb-6">
        {/* Avatar & Actions Row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 sm:-mt-16 mb-4">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-card">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {user.isVerified && (
              <div className="absolute bottom-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            {user.isOwnProfile ? (
              <>
                <Button variant="outline" className="gap-2" onClick={onEditProfile}>
                  <Edit3 className="h-4 w-4" />
                  <span>Profili Düzenle</span>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="/social/settings">
                    <Settings className="h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                {renderConnectionButton()}
                <Button variant="outline" size="icon" asChild>
                  <Link href="/social/chat/[id]" as={`/social/chat/${user.id}`}>
                    <MessageCircle className="h-4 w-4" />
                  </Link>
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
                      Profili Paylaş
                    </DropdownMenuItem>
                    <DropdownMenuItem>Bağlantıyı Kopyala</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Engelle</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Şikayet Et</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Name & Username */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
            {user.isVerified && (
              <Badge variant="secondary" className="gap-1">
                <svg className="w-3 h-3 fill-primary" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Doğrulanmış
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-sm sm:text-base mb-4 whitespace-pre-wrap">{user.bio}</p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
          {user.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {user.location}
            </span>
          )}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <LinkIcon className="h-4 w-4" />
              {user.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {user.joinedDate} tarihinde katıldı
          </span>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          <button className="hover:underline">
            <span className="font-bold">{stats.posts.toLocaleString()}</span>{" "}
            <span className="text-muted-foreground">gönderi</span>
          </button>
          <button className="hover:underline flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-bold">{stats.connections.toLocaleString()}</span>{" "}
            <span className="text-muted-foreground">bağlantı</span>
          </button>
        </div>
      </div>
    </div>
  );
}
