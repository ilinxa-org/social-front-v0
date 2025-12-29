"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

interface ConnectionRequest {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    title?: string;
    mutualConnections?: number;
  };
  timestamp: string;
}

const mockRequests: ConnectionRequest[] = [
  {
    id: "1",
    user: {
      name: "Ahmet Yıldız",
      username: "ahmet_yildiz",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      title: "Yazılım Mühendisi",
      mutualConnections: 12,
    },
    timestamp: "2 saat önce",
  },
  {
    id: "2",
    user: {
      name: "Zeynep Kaya",
      username: "zeynep_kaya",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      title: "Mimar",
      mutualConnections: 5,
    },
    timestamp: "5 saat önce",
  },
  {
    id: "3",
    user: {
      name: "Can Öztürk",
      username: "can_ozturk",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      title: "Şehir Plancısı",
      mutualConnections: 8,
    },
    timestamp: "1 gün önce",
  },
];

export function ConnectionRequestsCard() {
  const [isOpen, setIsOpen] = useState(true);
  const [requests, setRequests] = useState(mockRequests);

  const handleAccept = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  if (requests.length === 0) return null;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">Bağlantı İstekleri</h3>
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {requests.length}
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
      </CardHeader>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="pt-2 space-y-3">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background border"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={request.user.avatar} alt={request.user.name} />
                    <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{request.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {request.user.title}
                    </p>
                    {request.user.mutualConnections && (
                      <p className="text-xs text-muted-foreground">
                        {request.user.mutualConnections} ortak bağlantı
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handleReject(request.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleAccept(request.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
