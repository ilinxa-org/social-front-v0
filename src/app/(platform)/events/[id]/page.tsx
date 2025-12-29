'use client';
import { useState, useEffect } from "react";
import { 
  Calendar, Clock, MapPin, Users, ArrowLeft, Share2, 
  CheckCircle, XCircle, Timer, AlertCircle, User, 
  Building, Phone, Mail, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useParams } from "next/navigation";


interface EventDetail {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  type: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  address: string;
  capacity: number;
  registered: number;
  image: string;
  speakers: { name: string; title: string; image: string }[];
  schedule: { time: string; title: string; description: string }[];
  organizer: { name: string; phone: string; email: string };
  requirements: string[];
  featured?: boolean;
}

// Mock event data
const mockEventDetails: Record<string, EventDetail> = {
  "1": {
    id: "1",
    title: "Sürdürülebilir Kentleşme Konferansı 2025",
    description: "Türkiye'nin önde gelen şehir plancıları ve çevre uzmanlarının katılımıyla düzenlenen yıllık konferans.",
    fullDescription: `Sürdürülebilir Kentleşme Konferansı 2025, Türkiye'nin en kapsamlı kentsel gelişim etkinliğidir. Bu yıl "Geleceğin Şehirleri: Yeşil, Akıllı ve Kapsayıcı" temasıyla düzenlenen konferans, ulusal ve uluslararası uzmanları bir araya getirmektedir.

Konferansta ele alınacak konular arasında iklim değişikliğine uyum, akıllı şehir teknolojileri, sosyal kapsayıcılık, sürdürülebilir ulaşım ve yeşil altyapı yer almaktadır. Katılımcılar, interaktif çalıştaylar, panel tartışmaları ve networking oturumlarına katılma fırsatı bulacaktır.`,
    type: "Konferans",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: "09:00 - 18:00",
    location: "İstanbul Kongre Merkezi",
    address: "Darülbedai Caddesi No:3, 34367 Harbiye/Şişli/İstanbul",
    capacity: 500,
    registered: 423,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
    speakers: [
      { name: "Prof. Dr. Ahmet Yılmaz", title: "Şehir Plancısı", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" },
      { name: "Dr. Elif Kaya", title: "Çevre Mühendisi", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
      { name: "Mehmet Demir", title: "Akıllı Şehir Uzmanı", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" }
    ],
    schedule: [
      { time: "09:00", title: "Kayıt ve Karşılama Kahvaltısı", description: "Katılımcı kayıtları ve networking" },
      { time: "10:00", title: "Açılış Konuşması", description: "Dernek Başkanı tarafından açılış" },
      { time: "11:00", title: "Panel: Geleceğin Şehirleri", description: "Uzman panelimizle interaktif tartışma" },
      { time: "13:00", title: "Öğle Yemeği", description: "Networking lunch" },
      { time: "14:30", title: "Çalıştaylar", description: "Paralel çalıştay oturumları" },
      { time: "17:00", title: "Kapanış ve Networking", description: "Sonuç bildirisi ve kokteyl" }
    ],
    organizer: { name: "Etkinlik Koordinatörlüğü", phone: "+90 212 555 0123", email: "etkinlik@tkb.org.tr" },
    requirements: ["Laptop", "Kimlik belgesi", "Kayıt onay e-postası"],
    featured: true
  }
};

type EventStatus = "expired" | "ongoing" | "upcoming" | "open" | "full" | "lastSpots";

const getEventStatus = (event: EventDetail): EventStatus => {
  const now = new Date();
  const eventDate = new Date(event.date);
  const endDate = event.endDate ? new Date(event.endDate) : eventDate;
  
  eventDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (now > endDate) return "expired";
  if (now >= eventDate && now <= endDate) return "ongoing";

  const spotsLeft = event.capacity - event.registered;
  const percentFull = (event.registered / event.capacity) * 100;

  if (spotsLeft <= 0) return "full";
  if (percentFull >= 80) return "lastSpots";

  const daysUntil = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntil <= 7) return "upcoming";

  return "open";
};

const statusConfig: Record<EventStatus, { label: string; icon: React.ElementType; className: string }> = {
  expired: { label: "Sona Erdi", icon: XCircle, className: "bg-muted text-muted-foreground" },
  ongoing: { label: "Devam Ediyor", icon: Timer, className: "bg-accent text-accent-foreground" },
  upcoming: { label: "Yaklaşıyor", icon: AlertCircle, className: "bg-warning text-warning-foreground" },
  open: { label: "Kayıt Açık", icon: CheckCircle, className: "bg-success text-success-foreground" },
  full: { label: "Kontenjan Dolu", icon: XCircle, className: "bg-destructive text-destructive-foreground" },
  lastSpots: { label: "Son Yerler", icon: AlertCircle, className: "bg-warning text-warning-foreground" }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { 
    weekday: 'long',
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

const getTimeProgress = (event: EventDetail) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  const createdDate = new Date(eventDate.getTime() - 60 * 24 * 60 * 60 * 1000); // Assume created 60 days before
  
  const total = eventDate.getTime() - createdDate.getTime();
  const elapsed = now.getTime() - createdDate.getTime();
  
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
};

const getDaysUntil = (dateString: string) => {
  const now = new Date();
  const eventDate = new Date(dateString);
  now.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  return Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventDetail | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const eventData = mockEventDetails[id || "1"] || mockEventDetails["1"];
    setEvent(eventData);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const status = getEventStatus(event);
  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const spotsLeft = event.capacity - event.registered;
  const percentFull = (event.registered / event.capacity) * 100;
  const daysUntil = getDaysUntil(event.date);
  const timeProgress = getTimeProgress(event);

  return (

      
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-100">
          <img
            src={event.image}
            alt={event.title}
            className={`absolute inset-0 w-full h-full object-cover ${status === "expired" ? "grayscale-30" : ""}`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <Link href="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Tüm Etkinlikler
              </Link>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className={`${config.className} flex items-center gap-1.5 px-3 py-1`}>
                  <StatusIcon className="w-4 h-4" />
                  {config.label}
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {event.type}
                </Badge>
                {event.featured && (
                  <Badge className="bg-primary text-primary-foreground">Öne Çıkan</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
                {event.title}
              </h1>
              
              <p className="text-lg text-white/80 max-w-2xl">
                {event.description}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Time Bar */}
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Timer className="w-5 h-5 text-primary" />
                    Zaman Çizelgesi
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <Progress value={timeProgress} className="h-4 rounded-full" />
                      <div 
                        className="absolute top-0 h-4 flex items-center justify-center"
                        style={{ left: `${timeProgress}%`, transform: 'translateX(-50%)' }}
                      >
                        <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Kayıt Başlangıcı</span>
                      <span className="text-foreground font-medium">
                        {status === "expired" ? "Etkinlik Sona Erdi" : 
                         status === "ongoing" ? "Etkinlik Devam Ediyor" :
                         `${daysUntil} gün kaldı`}
                      </span>
                      <span className="text-muted-foreground">Etkinlik Günü</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Etkinlik Hakkında</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                    {event.fullDescription}
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Program</h2>
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-card rounded-xl border border-border/50">
                        <div className="w-20 shrink-0">
                          <span className="text-lg font-bold text-primary">{item.time}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Speakers */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Konuşmacılar</h2>
                  <div className="grid sm:grid-cols-3 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="text-center">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-primary/20"
                        />
                        <h4 className="font-semibold text-foreground">{speaker.name}</h4>
                        <p className="text-sm text-muted-foreground">{speaker.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Registration Card */}
                  <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Kayıt Durumu</h3>
                    
                    {/* Quota Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Kontenjan</span>
                        <span className={`font-medium ${spotsLeft <= 10 ? 'text-destructive' : 'text-foreground'}`}>
                          {spotsLeft > 0 ? `${spotsLeft} yer kaldı` : 'Dolu'}
                        </span>
                      </div>
                      <Progress value={percentFull} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{event.registered} kayıtlı</span>
                        <span>{event.capacity} kapasite</span>
                      </div>
                    </div>

                    {status !== "expired" && status !== "full" ? (
                      <Button className="w-full" size="lg">
                        Hemen Kayıt Ol
                      </Button>
                    ) : status === "expired" ? (
                      <Button variant="secondary" className="w-full" size="lg" disabled>
                        Etkinlik Sona Erdi
                      </Button>
                    ) : (
                      <Button variant="secondary" className="w-full" size="lg" disabled>
                        Kontenjan Dolu
                      </Button>
                    )}

                    <Button variant="outline" className="w-full mt-3 gap-2">
                      <Share2 className="w-4 h-4" />
                      Paylaş
                    </Button>
                  </div>

                  {/* Event Details */}
                  <div className="bg-card rounded-2xl p-6 border border-border/50">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Etkinlik Bilgileri</h3>
                    
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">{formatDate(event.date)}</p>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex gap-3">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">{event.location}</p>
                          <p className="text-sm text-muted-foreground">{event.address}</p>
                          <Button variant="link" className="px-0 h-auto text-primary gap-1">
                            Haritada Gör <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex gap-3">
                        <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">{event.capacity} Kişilik Kapasite</p>
                          <p className="text-sm text-muted-foreground">{event.registered} kişi kayıtlı</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="bg-card rounded-2xl p-6 border border-border/50">
                    <h3 className="text-lg font-semibold text-foreground mb-4">İletişim</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{event.organizer.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${event.organizer.phone}`} className="text-sm text-primary hover:underline">
                          {event.organizer.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${event.organizer.email}`} className="text-sm text-primary hover:underline">
                          {event.organizer.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="bg-muted/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Gerekli Belgeler</h3>
                    <ul className="space-y-2">
                      {event.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-success" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


  );
};

export default EventDetail;
