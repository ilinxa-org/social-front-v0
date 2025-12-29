"use client";
import { useState } from "react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Türkiye'nin Yeşil Şehir Dönüşümü: 2025 Hedefleri",
    category: "Sürdürülebilirlik",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
  },
  {
    id: "2",
    title: "Akıllı Şehir Teknolojileri Konferansı Tamamlandı",
    category: "Etkinlik",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
  },
  {
    id: "3",
    title: "Deprem Dirençli Yapı Standartları Güncellendi",
    category: "Kentsel Dönüşüm",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400",
  },
];

const mockEvents: EventItem[] = [
  {
    id: "1",
    title: "Sürdürülebilir Şehircilik Zirvesi 2025",
    date: "2025-01-15",
    time: "09:00 - 18:00",
    location: "İstanbul Kongre Merkezi",
    type: "Konferans",
  },
  {
    id: "2",
    title: "Akıllı Ulaşım Çözümleri Semineri",
    date: "2025-01-20",
    time: "14:00 - 17:00",
    location: "Ankara Ticaret Odası",
    type: "Seminer",
  },
  {
    id: "3",
    title: "Kentsel Dönüşüm Çalıştayı",
    date: "2025-01-28",
    time: "10:00 - 16:00",
    location: "İzmir Kültür Merkezi",
    type: "Çalıştay",
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
  });
};

const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  });
};

const typeColors: Record<string, string> = {
  "Konferans": "bg-primary/10 text-primary",
  "Seminer": "bg-accent/10 text-accent-foreground",
  "Çalıştay": "bg-secondary text-secondary-foreground",
};

export function NewsEventsCard() {
  const [activeTab, setActiveTab] = useState("news");

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("news")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "news"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Haberler
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "events"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Etkinlikler
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {activeTab === "news" ? (
          <div className="space-y-3">
            {mockNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="flex gap-3 group"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground mb-1">
                    {news.category}
                  </span>
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(news.date)}
                  </span>
                </div>
              </Link>
            ))}
            <Link
              href="/news"
              className="flex items-center justify-center gap-1 text-sm text-primary hover:underline pt-2"
            >
              Tüm Haberler
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {mockEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${typeColors[event.type] || "bg-muted"}`}>
                    {event.type}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatEventDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </Link>
            ))}
            <Link
              href="/events"
              className="flex items-center justify-center gap-1 text-sm text-primary hover:underline pt-2"
            >
              Tüm Etkinlikler
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
